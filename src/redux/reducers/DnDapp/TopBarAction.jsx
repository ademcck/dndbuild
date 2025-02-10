import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpenOrClosed: false,
    mode: "dark",
};

export const sidebarSlice = createSlice({
    name: 'topsidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpenOrClosed = !state.sidebarOpenOrClosed;
        },
        toggleMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        }
    },
})

export const { toggleSidebar, toggleMode } = sidebarSlice.actions;
export default sidebarSlice.reducer;