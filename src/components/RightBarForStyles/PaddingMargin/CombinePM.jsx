import React from 'react'
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Button } from '@mui/material';


// padding margin

import PMmanuel from './PMmanuel';
import PMequels from './PMequels';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveButton } from '../../../redux/reducers/DnDapp/AddStyleCSS';

export default function CombinePM() {
    const { mode, modeColor, righBarTitleColor } = useSelector((state) => state.sidebar);
    const classMode = `w-full flex flex-col justify-between bg-${mode === "dark" ? "_black" : "white"} text-${mode === "dark" ? "white" : "_black"}`
    const classModeBg = `w-full flex justify-start bg-${mode === "dark" ? "_black" : "white"} `
    const [selectedTab, setSelectedTab] = useState(0); // Aktif tab'ı takip etmek için
    const { activeButton } = useSelector((state) => state.addStyleCSS);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };


    return (
        <Box className={classMode} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box className={classModeBg}>
                <h2 className="p-2 pr-5 font-bold" style={{ borderRadius: "0 10px 10px 0", color: "#fff", backgroundColor: `${mode === "dark" ? righBarTitleColor.dark : modeColor.dark}`, borderLeft: `5px solid ${mode === "dark" ? righBarTitleColor.dark : righBarTitleColor.pink}` }}>Padding Margin</h2>
            </Box>
            {/* Tabs Section */}
            <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
                <Button
                    size="small"
                    variant={activeButton === "padding" ? "contained" : "outlined"}
                    onClick={() => dispatch(setActiveButton("padding"))}
                >
                    Padding
                </Button>
                <Button
                    size="small"
                    variant={activeButton === "margin" ? "contained" : "outlined"}
                    onClick={() => dispatch(setActiveButton("margin"))}
                >
                    Margin
                </Button>
            </Box>
            <div className='w-full' style={{ display: "flex" }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab}
                    onChange={handleChange}
                    sx={{
                        bgcolor: "transparent",
                        height: "content-fit",
                        width: 40,
                        alignItems: "center",

                    }}
                >
                    <Tab
                        label={<FaLock className="font-bold size-3" />}
                        sx={{
                            color: `${mode === "dark" ? modeColor.light : righBarTitleColor.light}`,
                        }}
                    />
                    <Tab
                        label={<FaLockOpen className="font-bold size-3" />}
                        sx={{
                            color: `${mode === "dark" ? modeColor.light : righBarTitleColor.light}`,
                        }}
                    />
                </Tabs>

                {/* Tab Panels Section */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {selectedTab === 0 && <PMequels />}
                    {selectedTab === 1 && <PMmanuel />}
                </Box>
            </div>

        </Box>
    )
}
