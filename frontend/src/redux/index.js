import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSlideReducer from "./productslide";
import paymentSliceReducer from "./paymentSlice";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSlideReducer,
    payment: paymentSliceReducer
  },
});
