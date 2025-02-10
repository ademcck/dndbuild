import { light } from '@mui/material/styles/createPalette';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarOpenOrClosed: false,
    mode: "dark",
    modeColor: {
        dark: "#001C30",
        light: "#FFFFFF",
        darkMore: "#001629",
        lightMore: "#F2F2F2",
        darkLess: "#001222",
        lightLess: "#B5B3B3",
    },
    righBarTitleColor: {
        dark: "#80C4E9" ,
        light: "#001C30",
        pink: "#EE66A6"
    }
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpenOrClosed = !state.sidebarOpenOrClosed;
        },
        toggleMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },
    },
});

export const { toggleSidebar, toggleMode } = sidebarSlice.actions;
export default sidebarSlice.reducer;