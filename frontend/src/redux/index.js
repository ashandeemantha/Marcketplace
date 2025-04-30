import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSlideReducer from "./productslide";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSlideReducer
    
  },
});