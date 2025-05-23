
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    setDataProduct: (state, action) => {
      console.log(action)
      state.productList = [...action.payload];
    },


    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      console.log(action)
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },

    

    deleteCartItem: (state, action) => {
      toast("one Item Delete");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        let qty = state.cartItem[index].qty;
        const qtyInc = ++qty;
        state.cartItem[index].qty = qtyInc;

        const price = state.cartItem[index].price;
        const total = price * qtyInc;

        state.cartItem[index].total = total;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        let qty = state.cartItem[index].qty;
        if (qty > 1) {
          const qtyDec = --qty;
          state.cartItem[index].qty = qtyDec;

          const price = state.cartItem[index].price;
          const total = price * qtyDec;

          state.cartItem[index].total = total;
        }
      }
    },

    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;
