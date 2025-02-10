import { createSlice  } from "@reduxjs/toolkit";


const initialState = {
    elementCounter: {
        "containers": 2,
        "rows": 1,
        "columns": 1,
        "metadatas": 1,
        "meta": 1,
        "link": 1,
        "style": 1,
        "script": 1,
        "noscript": 1,
        "base": 1,
        "div": 1,
        "span": 1,
        "header": 2,
        "footer": 2,
        "section": 2,
        "article": 1,
        "aside": 1,
        "navigation": 1,
        "image": 1,
        "audio": 1,
        "video": 1,
        "canvas": 1,
        "svg": 1,
        "table": 1,
        "table-head": 1,
        "table-body": 1,
        "table-row": 1,
        "table-data": 1,
        "table-header": 1,
        "form": 1,
        "input": 1,
        "textarea": 1,
        "button": 1,
        "select": 1,
        "option": 1,
        "label": 1,
        "checkbox": 1,
        "radio": 1,
        "ul": 1,
        "ol": 1,
        "li": 1,
        "nav": 1,
        "formfield": 1,
        "a":1,
        "p":1,
        "h1": 1,
        "h2": 1,
        "h3": 1,
        "h4": 1,
        "h5": 1,
        "h6": 1,

      },
      validText : ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "a", "strong", "em", "ul", "ol", "li", "label", "input", "textarea", "blockquote", "pre", "code"],
      nodes: [],
      edges: [],
      hideOrVisibleNodes: [],
      textFieldOpen: {id: '',
        open: false,}
      
}

export const selectElementCounter = (id) => {
    return state.createNewNode.elementCounter[id]
};

export const  createNewNodeSlice = createSlice({
    name: 'createNewNode',
    initialState,
    reducers: {
        increaceNewElementId: (state, action)=>{
            const { id } = action.payload
            state.elementCounter[id]++;
        },
        setNodesToRedux: (state,action) => {
            state.nodes = action.payload;
        },
        setEdgesToRedux: (state,action) => {
            state.edges = action.payload;
        },
        setHideOrVisibleNodes: (state, action) => {
            state.hideOrVisibleNodes 
        },
        setTextFieldOpen: (state, action) => {
            state.textFieldOpen = action.payload
        }
    }   

})

export const { increaceNewElementId, setNodesToRedux, setEdgesToRedux, setTextFieldOpen } = createNewNodeSlice.actions
export default createNewNodeSlice.reducer