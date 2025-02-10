import React from 'react'
import { CgDisplayFullwidth } from "react-icons/cg";
import { CiLineHeight } from "react-icons/ci";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useSelector } from 'react-redux';


export default function WHcontainer({ mode }) {

    const [sizeMode, setSizeMode] = useState('default');

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [wOrH, setwOrH] = useState(null)

    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNodes, getNode } = useReactFlow();
    const handleChangeVal = useCallback(() => {

        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        cName: `content-box ${sizeMode === 'fullwidth'
                            ? 'w-full h-auto'
                            : sizeMode === 'lineheight'
                                ? 'w-auto h-full'
                                : sizeMode === 'fullscreen'
                                    ? 'w-screen h-screen'
                                    : 'w-60 h-60'
                            }`
                    }
                }
                return node;
            });
        });
    }, [id, sizeMode]);

    const handleChangeWidthHeight = () => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    if (wOrH === null) return node;
                    if (!isNaN(wOrH)) {
                        return {
                            ...node,
                            properties: {
                                ...node.properties,
                            }
                        }
                    }

                    if (wOrH === 'width') {
                        return {
                            ...node,
                            properties: {
                                ...node.properties,
                                width: width + 'px',
                            },
                        };
                    } else {
                        return {
                            ...node,
                            properties: {
                                ...node.properties,
                                height: height + 'px',
                            },
                        };

                    }
                }
                return node;
            });
        });
    };

    const handleChangeCollapse = (mode) => {
        setSizeMode(mode);
    };

    useEffect(() => {
        handleChangeVal();
    }, [sizeMode])
    useEffect(() => {
        handleChangeWidthHeight();
    }, [ width, height]);

    useEffect(() => {
        if (!id) return
        const node = getNodes().find(n => n.id === id);
        setWidth(controller(node.properties.width))
        setHeight(controller(node.properties.height))
    }, [id]);

    const controller = (value) => {
        let result = "";
        if (value === undefined) return result;
        value.includes('px') ? result = value.replace('px', '') :
            value.includes('%') ? result = value.replace('%', '') :
                value.includes('vw') ? result = value.replace('vw', '') :
                    value.includes('vh') ? result = value.replace('vh', '') :
                        value.includes('rem') ? result = value.replace('rem', '') :
                            value.includes('em') ? result = value.replace('em', '') : result = 0;
        return result;
    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center w-60 mb-5 '>
                <CgDisplayFullwidth title='Full Width' onClick={() => handleChangeCollapse('fullwidth')} className='cursor-pointer m-2 ' />
                <CiLineHeight title='Line Height' onClick={() => handleChangeCollapse('lineheight')} className='cursor-pointer m-2 ' />
                <MdFullscreen title="Fullscreen" onClick={() => handleChangeCollapse('fullscreen')} className='cursor-pointer m-2 ' />
                <MdFullscreenExit title="Default" onClick={() => handleChangeCollapse('default')} className='cursor-pointer m-2 ' />
            </div>
            <Box className='flex w-full items-center justify-around'>
                <Box>
                    <h6>Width</h6>
                    <OutlinedInput
                        id="width"
                        onChange={(event) => [setWidth(event.target.value), setwOrH("width")]}
                        value={width}
                        endAdornment={<InputAdornment sx={{
                            color: `${mode === "dark" ? "white" : "#001C30"}`,
                            '& .MuiTypography-root': {
                                color: `${mode === "dark" ? "white" : "#001C30"}`,
                            }
                        }} position="end">px</InputAdornment>}
                        aria-describedby="outlined-bottom-helper-text"
                        placeholder='width'
                        inputProps={{
                            'aria-label': 'bottom',
                        }}
                        sx={{
                            width: "90px",
                            fontSize: "10px",
                            color: `${mode === "dark" ? "white" : "_black"}`,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${mode === "dark" ? "white" : "black"}`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${mode === "dark" ? "white" : "black"}`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${mode === "dark" ? "white" : "black"}`,
                            },
                        }}
                    />
                </Box>
                <Box>
                    <h6>Height</h6>
                    <OutlinedInput
                        id="height"
                        onChange={(event) => [setHeight(event.target.value), setwOrH("height")]}
                        value={height}
                        endAdornment={<InputAdornment sx={{
                            color: `${mode === "dark" ? "white" : "#001C30"}`,
                            '& .MuiTypography-root': {
                                color: `${mode === "dark" ? "white" : "#001C30"}`,
                            }
                        }} position="end">px</InputAdornment>}
                        aria-describedby="outlined-bottom-helper-text"
                        placeholder='height'
                        inputProps={{
                            'aria-label': 'bottom',
                        }}
                        sx={{
                            width: "90px",
                            fontSize: "10px",
                            color: `${mode === "dark" ? "white" : "_black"}`,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${mode === "dark" ? "white" : "black"}`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${mode === "dark" ? "white" : "black"}`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${mode === "dark" ? "white" : "black"}`,
                            },
                        }}
                    />
                </Box>

            </Box>

        </div>
    )
}
