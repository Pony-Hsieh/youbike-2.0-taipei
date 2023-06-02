import "../styles/pages/spotInfo.scss";
import { MdArrowDropDown, MdArrowDropUp, MdClose } from "react-icons/md";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cloneDeep } from "lodash-es";
import { fetchData, selectYoubikeData } from "../slices/youbikeDataSlice";

function SpotInfo() {
  const dispatch = useDispatch();
  const youbikeData = useSelector(selectYoubikeData);
  const [countyAndDistrictMap, setCountyAndDistrictMap] = useState(new Map());
  const [showCounties, setShowCounties] = useState([]);
  const [showDistricts, setShowDistricts] = useState([]);
  // 篩選縣市的關鍵字
  const [countyFilterKeyword, setCountyFilterKeyword] = useState("");

  const [allDistrictsChecked, setAllDistrictsChecked] = useState(true);
  const [showFilterCountyList, setShowFilterCountyList] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
    fetchCountyAndDistrictData();
  }, []);

  /** 將所有行政區的資料加上 checked 的欄位
   */
  function convertDistricts(arr) {
    const res = arr.map((district) => {
      return { ...district, checked: true };
    });
    return res;
  }

  /** 撈取縣市 + 行政區資訊
   */
  async function fetchCountyAndDistrictData() {
    // Step: 撈取後資訊
    const res = await axios.get(
      "https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json"
    );
    const countyList = [];
    const myMap = new Map();
    res.data.forEach((el) => {
      // Step: 手動新增 "臺大專區"
      if (el.name === "臺北市") {
        el.districts.push({ zip: "0", name: "臺大專區" });
      }
      // Step: 轉為 map 便為取用；以縣市名稱為 key，行政區為 value 存入 map 中
      myMap.set(el.name, el.districts);
      // Step: 將縣市名稱存入 showCountyAndDistrict.county 中
      countyList.push(el.name);
    });
    setCountyAndDistrictMap(myMap);
    setShowCounties(countyList);
  }

  /** 點擊縣市後要做的事情
   */
  function countyClickHandler(e) {
    const county = e.target.textContent;
    // Step: 重新從 map 依據縣市 deepclone 一份行政區資訊出來
    const districts = convertDistricts(countyAndDistrictMap.get(county));
    // 預設為全選
    setShowDistricts(districts);
    setAllDistrictsChecked(true);
    setCountyFilterKeyword(county);
    setShowFilterCountyList(false);
  }

  /** 點擊行政區後要做的事情
   */
  function districtClickHandler(e) {
    const district = e.target.value;
    const newDistricts = cloneDeep(showDistricts);

    for (let i = 0; i < newDistricts.length; i++) {
      if (newDistricts[i].name === district) {
        newDistricts[i].checked = e.target.checked;
        break;
      }
    }
    setShowDistricts(newDistricts);
    // TODO: 如果勾選完的項目數量相等，則 setAllDistrictsChecked(true);
  }

  /** 點擊 全部選取 後要做的事情
   */
  function clickAllDistricts(e) {
    const { checked } = e.target;
    if (showDistricts.length === 0) {
      return;
    }
    const newDistricts = showDistricts.map((district) => {
      return { ...district, checked };
    });
    setShowDistricts(newDistricts);
    setAllDistrictsChecked(checked);
  }

  /** 點擊 thead 之後要做的事情
   */
  function theadClickHandler(field) {
    const { order } = compareInfo;
    if (compareInfo.field === field) {
      setCompareInfo((state) => {
        return { ...state, order: !order };
      });
      return;
    }

    setCompareInfo((state) => {
      return { ...state, field };
    });
  }

  /** 排序基準
   */
  const [compareInfo, setCompareInfo] = useState({
    field: "sarea", // 行政區
    // field: "bemp", // 目前可借數量
    order: false, // true: 由小到大, false: 由大到小
  });

  /** 排序 function
   */
  function order(a, b) {
    if (a[compareInfo.field] === b[compareInfo.field]) {
      return 0;
    }
    if (compareInfo.order) {
      return a[compareInfo.field] > b[compareInfo.field] ? 1 : -1;
    }
    return a[compareInfo.field] > b[compareInfo.field] ? -1 : 1;
  }

  function filterBikeData(eachData) {
    // 因為臺中也有一個大安區，所以新增這個邏輯
    if (countyFilterKeyword !== "臺北市") {
      return false;
    }
    for (let i = 0; i < showDistricts.length; i++) {
      if (
        showDistricts[i].checked &&
        eachData.sarea.includes(showDistricts[i].name)
      ) {
        return true;
      }
    }
    return false;
  }

  const theadList = [
    {
      name: "縣市",
      field: "",
    },
    {
      name: "區域",
      field: "sarea",
    },
    {
      name: "站點名稱",
      field: "ar",
    },
    {
      name: "可借車輛",
      field: "sbi",
    },
    {
      name: "可還空位",
      field: "bemp",
    },
  ];

  /** 渲染車輛資訊列表
   */
  const renderList = youbikeData
    // 應該只有行政區需要做 filter
    .filter((eachData) => filterBikeData(eachData))
    .toSorted(order)
    .map((el) => (
      <tr key={el.sno}>
        <td>台北市</td>
        <td>{el[theadList[1].field]}</td>
        <td>{el[theadList[2].field]}</td>
        <td>{el[theadList[3].field]}</td>
        <td>{el[theadList[4].field]}</td>
      </tr>
    ));

  /** 篩選過後的縣市列表
   */
  const filteredCountyList = showCounties
    .filter((county) => {
      const keyword = countyFilterKeyword.replace(/台/g, "臺");
      return county.includes(keyword);
    })
    .map((county) => (
      <li
        key={county}
        onClick={(e) => {
          countyClickHandler(e);
        }}
        className={`${county === countyFilterKeyword ? "match" : ""}`}
      >
        {county}
      </li>
    ));

  return (
    <div className="spotInfo">
      <h1>站點資訊</h1>

      <div className={`filter-wrapper ${showFilterCountyList ? "active" : ""}`}>
        <div className="input-wrapper">
          <input
            className="filter-input"
            type="text"
            placeholder="搜尋縣市"
            value={countyFilterKeyword}
            onChange={(e) => {
              setCountyFilterKeyword(e.target.value);
              setShowFilterCountyList(false);
            }}
            onFocus={() => {
              setShowFilterCountyList(true);
            }}
            onClick={() => {
              setShowFilterCountyList(true);
            }}
          />
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              setCountyFilterKeyword("");
              setShowFilterCountyList(true);
            }}
          >
            {showFilterCountyList ? <MdClose /> : <MdClose />}
          </button>
          <button
            type="button"
            className="toggle-button"
            onClick={() => {
              setShowFilterCountyList(!showFilterCountyList);
            }}
          >
            {showFilterCountyList ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </button>
        </div>
        <ul className="filtered-list">
          {filteredCountyList.length === 0 ? (
            <li>查無相關縣市名稱</li>
          ) : (
            filteredCountyList
          )}
        </ul>
      </div>

      <div className="district-wrapper">
        {filteredCountyList.length === 1 ? (
          <>
            <input
              type="checkbox"
              checked={allDistrictsChecked}
              onChange={(e) => {
                clickAllDistricts(e);
              }}
              className="chck-all-distirct-button"
              id="check-all"
            />
            <label htmlFor="check-all">
              {allDistrictsChecked ? "全部取消勾選" : "全部勾選"}
            </label>
            {showDistricts.map((district) => (
              <>
                <input
                  type="checkbox"
                  name={district.name}
                  value={district.name}
                  checked={district.checked}
                  onChange={(e) => {
                    districtClickHandler(e);
                  }}
                  id={`districtList${district.name}`}
                />
                <label htmlFor={`districtList${district.name}`}>
                  {district.name}
                </label>
              </>
            ))}
          </>
        ) : null}
        <br />
      </div>

      <div className="bike-data-table-wrapper">
        {renderList.length > 0 ? (
          <table>
            <thead>
              <tr>
                {theadList.map((eachTHead) => (
                  <th
                    key={eachTHead.name}
                    onClick={() => {
                      theadClickHandler(eachTHead.field);
                    }}
                  >
                    {eachTHead.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderList}</tbody>
          </table>
        ) : (
          <>
            <p className="no-data-info">目前僅提供台北市的資料</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SpotInfo;
