import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    elements: [],
}


export const nodeToHTMLtagSlice = createSlice({
    name: 'nodeToHTMLtag',
    initialState,
    reducers: {
        addElement: (state, action) => {
            state.elements = action.payload;
            // const newElements = Array.isArray(action.payload) ? action.payload : [action.payload];
            // state.elements = [...state.elements, ...newElements];
        },
        removeElement: (state, action) => {
            const id = action.payload;
            delete state.elements[id];
        },

    },
})

export const { addElement, removeElement } = nodeToHTMLtagSlice.actions
export default nodeToHTMLtagSlice.reducer