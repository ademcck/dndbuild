import { createSlice } from '@reduxjs/toolkit'
import { initialNodes } from '../../../../components/DnDapp/DefaultNodes/DefaultNodes';
import { initialEdges } from '../../../../components/DnDapp/DefaultNodes/DefaultEdges';

const initialState = {
    activePage: "home",
    pages :  JSON.parse(localStorage.getItem('pages') || "[]").map(obj => Object.keys(obj)[0]).length > 0 ? JSON.parse(localStorage.getItem('pages') || "[]").map(obj => Object.keys(obj)[0]) : ["home"]
}


export const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        updatePage: (state, action) => {
            const {index, value} = action.payload;
            state.pages[index] = value;
        },
        addPage: (state, action) => {
            const newPage = action.payload;
            state.pages.push(newPage);
            const data = localStorage.getItem('pages');
            const newDataOfPage = { [newPage] : [initialNodes, initialEdges] };
            const arryData = JSON.parse(data) || [];
            arryData.push(newDataOfPage);
            localStorage.setItem('pages', JSON.stringify(arryData));
        },
        removePage: (state, action)=> {
            const deleteItem = action.payload; // payload'ı al
            state.pages = state.pages.filter((page) => page !== deleteItem);

        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        }
    }
})


export const { addPage, removePage, updatePage, setActivePage } = pageSlice.actions
export default pageSlice.reducer