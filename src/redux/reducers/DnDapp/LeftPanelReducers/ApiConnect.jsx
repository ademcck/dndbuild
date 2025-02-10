import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    api : [

    ]
}


export const apilice = createSlice({
    name: "api",
    initialState,
    reducers: {
        updateAPI: (state, action) => {
            const {index, value} = action.payload;
            state.api[index] = value;
        },
        addAPI: (state, action) => {
            const newAPI = action.payload;
            state.api.push(newAPI);
        },
        removeAPI: (state, action)=> {
            const deleteItem = action.payload; // payload'ı al
            state.api = state.api.filter((API) => API !== deleteItem);

        }
    }
})


export const { addAPI, removeAPI, updateAPI } = apilice.actions
export default apilice.reducer