import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    _id: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        LoginRedux: (state, action) => {
            console.log(action.payload.data);
            state._id = action.payload.data._id;
            state.firstName = action.payload.data.firstName;
            state.lastName = action.payload.data.lastName;
            state.email = action.payload.data.email; // ✅ fixed
            state.image = action.payload.data.image;
        },
        LogoutRedux: (state) => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.image = "";
        }
    }
});

export const { LoginRedux, LogoutRedux } = userSlice.actions;

export default userSlice.reducer;
