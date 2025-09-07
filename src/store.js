import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    accountReducer: accountReducer,
    customerReducer: customerReducer,
  },
});
console.log(store);
export default store;
