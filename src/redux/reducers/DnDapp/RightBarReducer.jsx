import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    side : false,
    mode: "dark",
}


export const rightBarSlice = createSlice({
    name: 'rightbar',
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.side = action.payload;
        },
        toggleMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },
        handleSideBar: (state) => {
            document.getElementById("rightPanel").style.right = state.side ? "0px" : "-350px";
        },
    }
})



export const { toggleSidebar, toggleMode, handleSideBar } = rightBarSlice.actions;
export default rightBarSlice.reducer;