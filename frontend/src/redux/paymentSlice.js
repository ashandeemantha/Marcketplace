import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentDetails: null,
  orderSummary: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    savePaymentDetails(state, action) {
      state.paymentDetails = action.payload.paymentDetails;
      state.orderSummary = action.payload.orderSummary;
    },
    clearPaymentDetails(state) {
      state.paymentDetails = null;
      state.orderSummary = null;
    },
  },
});

export const { savePaymentDetails, clearPaymentDetails } = paymentSlice.actions;

export default paymentSlice.reducer;
