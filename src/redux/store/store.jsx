import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "../reducers/DnDapp/SidebarReducer.jsx";
import createNewNodeReducer from "../reducers/DnDapp/CreateNewNode.jsx";
import topbarReducer from "../reducers/DnDapp/TopBarAction.jsx";
import  rightBarReducer  from "../reducers/DnDapp/RightBarReducer.jsx";
import  addStyleCSSReducer  from "../reducers/DnDapp/AddStyleCSS.jsx";
import  nodeToHTMLtagReducer from "../reducers/DnDapp/NodeToHTMLtag.jsx";
import  apiReducer  from "../reducers/DnDapp/ApiReducer.jsx";
import pageReducer from "../reducers/DnDapp/LeftPanelReducers/Pages.jsx"
import apiConnectReducer from "../reducers/DnDapp/LeftPanelReducers/ApiConnect.jsx"

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        newNode : createNewNodeReducer,
        topBar: topbarReducer,
        rightBar: rightBarReducer,
        addStyleCSS : addStyleCSSReducer,
        nodeToHtml: nodeToHTMLtagReducer,
        api: apiReducer,
        pages: pageReducer,
        apiConnect: apiConnectReducer,
    },
});