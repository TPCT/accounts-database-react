import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountsData: [],
  buyNowLink: "",
  itemsData: [],
  accountsLoading: true,
  accountDetails: null,
};

export const accountDetailsSlice = createSlice({
  name: "accountDetails",
  initialState,
  reducers: {
    fetchingAccountData: (state, action) => {
      state.accountsData = action.payload;
    },
    changeBuyNowLink: (state, action) => {
      state.buyNowLink = action.payload;
    },
    fetchingItemsData: (state, action) => {
      state.itemsData = action.payload;
    },
    accountLoadingStatus: (state, action) => {
      state.accountsLoading = action.payload;
    },
    fetchingSingleAccountDetails: (state, action) => {
      state.accountDetails = action.payload;
    },
  },
});

export const {
  fetchingAccountData,
  accountLoadingStatus,
  changeBuyNowLink,
  fetchingItemsData,fetchingSingleAccountDetails
} = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;
