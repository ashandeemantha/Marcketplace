import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    _id: "",
    role: "", // added role to state
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
            state.email = action.payload.data.email;
            state.image = action.payload.data.image;
            state.role = action.payload.data.role; // added role to login action
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