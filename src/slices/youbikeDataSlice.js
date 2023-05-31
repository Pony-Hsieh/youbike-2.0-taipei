import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchData = createAsyncThunk("youbikeDataSlice/fetchData", async () => {
  const res = await axios.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json');
  return res;
});

export const youbikeDataSlice = createSlice({
  name: 'youbikeDataSlice',
  initialState,
  reducers: {
    /** 測試用
     * 
     */
    print: (state, action) => {
      console.log("print");
      // console.log("state", state);
      // console.log("action", action);
    },


    /**
     * 新增、增加商品至 local storage cart
     * @param {Object} dataProduct - 商品資料
     * @param {number} qty - 欲多增加的數量
     */
    /* addProduct: (state, action) => {
      const convertedDataProduct = cloneDeep(action.payload.dataProduct);
      const qty = action.payload.qty;
      const indexSameProduct = getIndexSameProduct(state, convertedDataProduct.id);
      convertedDataProduct.qty = qty;
      console.log('convertedDataProduct', convertedDataProduct);
      if (convertedDataProduct.id === '') {
        console.error('沒有傳入正確的商品資料');
        return;
      }
      // 防呆
      if (convertedDataProduct.qty <= 0) {
        console.error('請輸入正確的數字');
        return;
      }
      if (indexSameProduct === null) {
        state.push(convertedDataProduct);
        localStorage.setItem('arrLocalStorageCart', JSON.stringify(current(state)));
        AlertMessage.success({
          content: `已加入 ${convertedDataProduct.qty} ${convertedDataProduct.unit} 至購物車`
        });
      } else {
        localStorageCartSlice.caseReducers.mergeProductAmount(state, action);
      }
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        console.log("fetchData.fulfilled");
        state = payload.data;
        return state;
      });
  },
});

// export const {
//   print,
// } = youbikeDataSlice.actions;

export const selectYoubikeData = (state) => {
  // console.warn("state", state);
  return state.youbikeData; // 這裡的 state 指得是 initialState
  // return state.youbikeDataReducer; // 這裡的 state 指得是 initialState
};

export default youbikeDataSlice.reducer;
