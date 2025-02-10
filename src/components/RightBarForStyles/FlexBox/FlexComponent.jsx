import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { MdViewComfy,  MdSwapHoriz, MdSwapVert } from "react-icons/md";
import { BiAlignMiddle, BiAlignRight, BiAlignLeft, BiAlignJustify } from "react-icons/bi";
import { AiOutlineVerticalAlignTop, AiOutlineVerticalAlignMiddle, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useReactFlow } from '@xyflow/react';

export default function FlexComponent() {
    const { mode } = useSelector((state) => state.sidebar);
    const classMode = `w-full flex flex-col p-5 justify-between bg-${mode === "dark" ? "_black" : "white"} text-${mode === "dark" ? "white" : "_black"}`
    const classModeBg = `w-full flex justify-start bg-${mode === "dark" ? "_black" : "white"} `

    // Flex State
    const [flex, setFlex] = useState(false);
    const [direction, setDirection] = useState("normal");
    const [jContent, setJustify] = useState('normal');
    const [aItem, setItems] = useState('normal');


    // Flex Handle

    const handleFlexAlign = ({ event, value, w }) => {
        w === "i" ? setItems(value) :
            w === "j" ? setJustify(value) :
                w === "d" ? setDirection(value) :
                    setFlex(value)
    }

    // Add Node
    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNode } = useReactFlow();

    const handleChangeVal = useCallback(() => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    if (flex) {
                        console.log({
                            display: "flex",
                            justifyContent: jContent,
                            alignItems: aItem,
                            flexDirection: direction,
                        })

                        return {
                            ...node,
                            properties: {
                                ...node.properties,
                                display: "flex",
                                justifyContent: jContent,
                                alignItems: aItem,
                                flexDirection: direction,
                            }
                        }
                    } else {
                        if (node.properties.display) {
                            const { justifyContent, ...rest } = node.properties;
                            const { alignItems, ...restt } = rest;
                            const { flexDirection, ...resttt } = restt;
                            const { display, ...restttt } = resttt;
                            node.properties = restttt;
                            return {
                                ...node,
                                properties: {
                                    ...node.properties,
                                }
                            }
                        }
                    }
                }
                return node;
            });
        });
    }, [aItem, jContent, direction, flex])


    useEffect(() => {
        handleChangeVal()
    }, [aItem, jContent, direction, flex])

    useEffect(() => {
        const node = getNode(id)
        if (!node) return
        setFlex(node.properties.display)
        setJustify(node.properties.justifyContent)
        setItems(node.properties.alignItems)
        setDirection(node.properties.flexDirection)

    }, [id])

    return (
        <Box >
            <div
            style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}></div>
            <Box className={classModeBg}>
                <h2 className="p-2 pr-5 font-bold" style={{ borderRadius: "0 10px 10px 0", color: "#fff", backgroundColor: `${mode === "dark" ? "#80C4E9" : "#001C30"}`, letterSpacing: "2px", borderLeft: `5px solid ${mode === "dark" ? "#80C4E9" : "#EE66A6"}` }}>Flex Properties</h2>
            </Box>
            <Box className={classMode}>
                {/* Flex  */}
                <Box >
                    <h6>Flex</h6>
                </Box>
                <Box className="relative flex justify-end">
                    {/* Direction  */}
                    <MdViewComfy title="Flex" onClick={(event) => handleFlexAlign({ event: event, value: !flex, w: "f" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: flex ? "#80C4E9": "transparent"}}
                        />
                </Box>
                <Box >
                    <h6>Direction</h6>
                </Box>
                <Box className="relative flex justify-end">
                    {/* Justify Content İkonları */}
                    <MdSwapVert title="Column" onClick={(event) => handleFlexAlign({ event: event, value: "column", w: "d" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: direction === "column" ? "#80C4E9": "transparent"}}
                        />
                    <MdSwapHoriz title="Row" onClick={(event) => handleFlexAlign({ event: event, value: "row", w: "d" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: direction === "row" ? "#80C4E9": "transparent"}}
                        />
                </Box>
                <Box >
                    <h6>Justify Content</h6>
                </Box>
                <Box className="relative flex justify-end">
                    <BiAlignMiddle title="Center" onClick={(event) => handleFlexAlign({ event: event, value: "center", w: "j" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: jContent === "center" ? "#80C4E9": "transparent"}}
                        />
                    <BiAlignRight title="End" onClick={(event) => handleFlexAlign({ event: event, value: "end", w: "j" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: jContent === "end" ? "#80C4E9": "transparent"}}
                        />
                    <BiAlignLeft title="Start" onClick={(event) => handleFlexAlign({ event: event, value: "start", w: "j" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: jContent === "start" ? "#80C4E9": "transparent"}}
                        />
                    <BiAlignJustify title="Between" onClick={(event) => handleFlexAlign({ event: event, value: "space-between", w: "j" })} className="cursor-pointer my-3 mx-5" 
                        style={{backgroundColor: jContent === "space-between" ? "#80C4E9": "transparent"}}
                        />
                </Box>
                <Box >
                    <h6>Align Items</h6>
                </Box>
                <Box className="relative flex justify-end">
                    {/* Align Items İkonları */}
                    <AiOutlineVerticalAlignTop title="Start" onClick={(event) => handleFlexAlign({ event: event, value: "start", w: "i" })} className="cursor-pointer my-3 mx-5"
                        style={{ backgroundColor: aItem === "start" ? "#80C4E9" : "transparent"}}
                    />
                    <AiOutlineVerticalAlignMiddle title="Center" onClick={(event) => handleFlexAlign({ event, value: "center", w: "i" })} className="cursor-pointer my-3 mx-5"
                        style={{ backgroundColor: aItem === "center" ? "#80C4E9" : "transparent"}}
                    />
                    <AiOutlineVerticalAlignBottom title="End" onClick={(event) => handleFlexAlign({ event: event, value: "end", w: "i" })} className="cursor-pointer my-3 mx-5"
                        style={{ backgroundColor: aItem === "end" ? "#80C4E9" : "transparent"}}
                    />
                </Box>
            </Box>
        </Box>
    )
}
