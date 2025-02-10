import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    layoutApi: false,
    activeApiName : null,
    apiWindow: false,
    keys: {},
    requestToAPI: [],
}



const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        toggleApiWindow: (state) => {
            state.apiWindow = !state.apiWindow;
        },

        addKeys: (state, action) => {
            const { keys, apiName, url, method, headers, body } = action.payload;

            if (keys.length < 1) {
                state.keys = state.keys.filter((_, key) => key !== apiName);
                state.requestToAPI = state.requestToAPI.filter(request => request.apiName !== apiName);
            } else {
                state.keys[apiName] = keys;
                const requestParams = { apiName, method, url, headers, body };

                // Eğer apiName zaten varsa güncelle, yoksa ekle
                const index = state.requestToAPI.findIndex(request => request.apiName === apiName);
                if (index !== -1) {
                    state.requestToAPI[index] = requestParams;
                } else {
                    state.requestToAPI.push(requestParams);
                }
            }
        },

        activeApiName: (state, action) => {
            state.activeApiName = action.payload;
        },

        setLayoutApi: (state, action) => {
            state.layoutApi = action.payload;
        },

    }
})
export const { toggleApiWindow, addKeys, activeApiName, setLayoutApi } = apiSlice.actions;
export default apiSlice.reducer;