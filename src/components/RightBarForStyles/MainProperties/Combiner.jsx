import React from 'react'
import WHcontainer from './WHcontainer'
import { Box, Button } from '@mui/material'
import BGproperties from './BGproperties'
import { useSelector } from 'react-redux'


export default function () {
    const { mode, modeColor, righBarTitleColor } = useSelector((state) => state.sidebar);
    const classMode = `w-full flex flex-col p-5 justify-between bg-${mode === "dark" ? "_black" : "white"} text-${mode === "dark" ? "white" : "_black"}`
    const classModeBg = `w-full flex justify-start bg-${mode === "dark" ? "_black" : "white"} `
    return (
        <>
            <Box className={classModeBg}>
                <h2 className="p-2 pr-5 font-bold" style={{ borderRadius: "0 10px 10px 0",color: "#fff", backgroundColor: `${mode === "dark" ? righBarTitleColor.dark : modeColor.dark}` , borderLeft: `5px solid ${mode === "dark" ? righBarTitleColor.dark : righBarTitleColor.pink}` }}>Properties</h2>
            </Box>
            <div className={classMode}>
                <WHcontainer mode={mode} />
                <BGproperties />
            </div>
        </>
    )
}
