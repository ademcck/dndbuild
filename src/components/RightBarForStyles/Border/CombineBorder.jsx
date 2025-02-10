import { Box, Slider, Tab, Tabs } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import BorderEquals from './BorderEquals'
import { FaLock, FaLockOpen } from 'react-icons/fa';
import BorderManuel from './Bordermanuel';
import { useSelector } from 'react-redux';
import { use } from 'react';
import { useReactFlow } from '@xyflow/react';

export default function CombineBorder() {
    const [selectedTab, setSelectedTab] = useState(0); // Aktif tab'ı takip etmek için
    const { mode, modeColor, righBarTitleColor } = useSelector((state) => state.sidebar);
    const classMode = `w-full flex flex-col items-center overflow-auto justify-between bg-${mode === "dark" ? "_black" : "white"} text-${mode === "dark" ? "white" : "_black"}`
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const { id } = useSelector((state) => state.addStyleCSS);
    const [value, setValue] = useState(0.0);

    const { getNode, setNodes } = useReactFlow();

    const handlerRadius = useCallback(() => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        properties: {
                            ...node.properties,
                            borderRadius: value + "em",
                        }
                    };
                }
                return node;
            });
        })
    }, [value]);
    
    useEffect(() => {
        handlerRadius();
    }, [value]);

    useEffect(() => {
        if (!id) return;
        const node = getNode(id);
        node.properties.borderRadius ? setValue(parseFloat(node.properties.borderRadius)) : setValue(0.0);
    }, [id]);
    return (
        <div className={classMode}>
            <Box className="w-full flex justify-start">
                <h2 className="p-2 pr-5 font-bold" style={{ borderRadius: "0 10px 10px 0", color: "#fff", backgroundColor: `${mode === "dark" ? righBarTitleColor.dark : righBarTitleColor.light}`, letterSpacing: "2px", borderLeft: `5px solid ${mode === "dark" ? righBarTitleColor.dark : righBarTitleColor.pink}` }}>Border</h2>
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
                            color: `${mode === "dark" ? modeColor.light : modeColor.dark}`,
                            //"&:hover": { bgcolor: "#e0e0e0" }, // Hover efekti
                        }}
                    />
                    <Tab
                        label={<FaLockOpen className="font-bold size-3" />}
                        sx={{
                            color: `${mode === "dark" ? modeColor.light : modeColor.dark}`,
                        }}
                    />
                </Tabs>

                {/* Tab Panels Section */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {selectedTab === 0 && <BorderEquals />}
                    {selectedTab === 1 && <BorderManuel />}
                </Box>

            </div>
            <Box className="w-full flex flex-col items-center py-2 px-5">
                <div className="w-full flex justify-start">
                    <span >Radius:</span>
                </div>
                <Slider
                    sx={{ width: "90%" }}
                    value={value}
                    step={0.1}
                    valueLabelDisplay="auto"
                    min={0.0}
                    max={20.0}
                    onChange={event => setValue(parseFloat(event.target.value))}
                />
            </Box>
        </div>
    )
}
