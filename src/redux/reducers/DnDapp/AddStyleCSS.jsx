import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    id: null,
    apiId: null, // api id for apiConnect
    style: null,
    typeOf: null,
    activeButton: "padding",
    borderStyle: "none",
    sborderColor: "none",
    borderColor: {
        top: "none",
        left: "none",   
        bottom: "none",
        right: "none",
    },
    backgroundColor: "none",
    backgroundImage: "none",
}




const addStyleCSSSlice = createSlice({
    name: 'addStyleCSS',
    initialState,
    reducers: {
        activeNodeId: (state, action) => {
            state.id = action.payload
        },
        activeAPI: (state, action) => {
            state.apiId = action.payload
        },
        addStyleCSS: (state, action) => {
            state.style = action.payload.style;
            state.typeOf = action.payload.typeOf;
        },
        setActiveButton: (state, action) => {
            state.activeButton = action.payload;
        },
        setBorderColor: (state, action) => {
            const { id , value, grub } = action.payload;
            grub ? state.borderColor[id] = value: state.sborderColor = value;
        },
        setBorderStyle: (state, action) => {
            state.borderStyle = action.payload;
        },
        setBackgroundProperties: (state, action) => {
            const { bgColor , bgImage } = action.payload;
            if (bgColor) state.backgroundColor = bgColor;
            if (bgImage) state.backgroundImage = bgImage;
        },
    },
});

export const { activeNodeId, activeAPI, addStyleCSS, setActiveButton, setBorderColor, setBorderStyle, setBackgroundProperties } = addStyleCSSSlice.actions;
export default addStyleCSSSlice.reducer;    