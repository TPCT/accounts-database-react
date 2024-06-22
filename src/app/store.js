import { configureStore } from "@reduxjs/toolkit";
import accountDetailsReducer from "../features/accountDetails/accountDetailsSlice";

export const store = configureStore({
  reducer: {
    accountDetails: accountDetailsReducer,
  },
});
