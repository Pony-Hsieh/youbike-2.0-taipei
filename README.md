# YouBike 2.0 站點搜尋

## 頁面連結
- [GitHub Page 連結](https://pony-hsieh.github.io/youbike-2.0-taipei/)

## 功能
- RWD，斷點為 768px
  - 表格內容超出顯示範圍時，可左右滑動
  - Navbar 在不同裝置下有不同的設計
- 縣市搜尋 input
  - 輸入關鍵字時，即時篩選符合的縣市清單  
    ex. 輸入 "北市"，縣市清單顯示 臺北市、新北市
  - 點擊按鈕，顯示/收合 縣市清單
  - 點擊 "x" 可清除鍵入的關鍵字
- 行政區 checkbox
  - 預設為全選
  - 可全選、全不選
- youbike 站點 table
  - 點擊表頭，可依據該欄位排序
- 當用戶進入不存在的頁面時，5 秒後自動導回首頁，也可點擊按鈕立即前往首頁

## 串接 api 資訊
- [YouBike2.0臺北市公共自行車即時資訊](https://data.gov.tw/dataset/137993)
- [全部縣市、行政區清單列表](https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json)