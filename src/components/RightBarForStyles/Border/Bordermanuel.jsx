import { Box, getNativeSelectUtilityClasses, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useCallback, useEffect, useRef } from 'react'
import BorderStyles from './BorderStyles';
import { RiDragMoveLine } from "react-icons/ri";
import { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useSelector } from 'react-redux';

export default function BorderManuel() {
    const { borderColor } = useSelector((state) => state.addStyleCSS);
    const [ eventTarget, setEventTarget ] = useState(null);
    const { borderStyle } = useSelector((state) => state.addStyleCSS);
    const { mode } = useSelector((state) => state.sidebar);

    const [borders, setBorders] = useState({});
    
    const [wichBorder, setWichBorder] = useState("top");

    const [borderSize, setSize] = useState(0);
    const _borderStyle = useCallback(() => {
        return <BorderStyles grub={true} border={wichBorder} borderSize={borderSize} />
    }, [borders, wichBorder, borderSize]);

    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNode } = useReactFlow();
    const handleChangeVal = useCallback(() => {
        handleChangeBorder(eventTarget)
        // Node'u güncelle
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    if (Object.values(borders).every(value => value === 0)){
                        return {
                            ...node,
                            properties: {
                                ...node.properties,
                            }
                        };
                    }
                    return {
                        ...node,
                        properties: {
                            ...node.properties,
                            ...borders
                        }
                    };
                }
                return node;
            });
        });
    }, [id, setNodes, borders, wichBorder, borderColor, eventTarget]);

    useEffect(() => {
        handleChangeVal()
        setEventTarget(document.getElementById(`M${wichBorder}`))
    }, [ wichBorder, borderColor[wichBorder], eventTarget])

    const handleChangeBorder = (event) => {
        if (event === null) return 
        const { placeholder, value } = event;
        if (placeholder === undefined) return
        setSize(value);
        if (borderStyle !== "none"){
            value !== 0 &&setBorders((prevBorders) => ({
                ...prevBorders,
                [`border${placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}`]: `${isNaN(Number(value)) ? 0 : Number(value)}px ${borderStyle} ${borderColor[placeholder]}`,
            }));
        }
    };

    useEffect(()=>{
        document.getElementById("Mtop").value = "";
        document.getElementById("Mleft").value = "";
        document.getElementById("Mright").value = "";
        document.getElementById("Mbottom").value = "";
        const copyNode = getNode(id).properties;
        const resBorder = Object.keys(copyNode).filter(key => key.includes("border"));
        const borderDefault = {}
        resBorder.length > 0 && resBorder.forEach(key => {
            borderDefault[key] = copyNode[key]
            document.getElementById(`M${key.charAt(6).toLowerCase() + key.slice(7)}`).value = copyNode[key].split(" ")[0].replace("px", "")
        });
        setBorders(borderDefault)
        
    },[id])


    return (
        <Box className=" p-5 w-full">
            <div style={{ height: "150px" }} className='relative w-full  flex justify-center items-center' variant="outlined">
                <RiDragMoveLine className='absolute top-50 left-50 translate-x-50 translate-y-50' />
  
                <div className=' absolute top-50 left-50 translate-x-50 translate-y-50 flex w-full  items-center justify-between '>
                    <OutlinedInput
                        id="Mleft"
                        //defaultValue={borders[`borderLeft`] ? borders[`borderLeft`].split(" ")[0].replace("px", "") : ""}
                        onChange={(event) => setEventTarget(event)}
                        onFocus={() => setWichBorder("left")}
                        endAdornment={<InputAdornment sx={{
                            color: `${mode === "dark" ? "white" : "#001C30"}`,
                            '& .MuiTypography-root': {
                                color: `${mode === "dark" ? "white" : "#001C30"}`,
                            }
                        }} position="end">px</InputAdornment>}
                        aria-describedby="outlined-left-helper-text"
                        placeholder='left'
                        inputProps={{
                            'aria-label': 'left',
                        }}
                        sx={{
                            width: "80px",
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
                    <OutlinedInput
                        id="Mright"
                        //defaultValue={borders[`borderRight`] ? borders[`borderRight`].split(" ")[0].replace("px", "") : ""}
                        onChange={(event) => setEventTarget(event)}
                        onFocus={() => setWichBorder("right")}
                        endAdornment={<InputAdornment sx={{
                            color: `${mode === "dark" ? "white" : "#001C30"}`,
                            '& .MuiTypography-root': {
                                color: `${mode === "dark" ? "white" : "#001C30"}`,
                            }
                        }} position="end">px</InputAdornment>}
                        aria-describedby="outlined-right-helper-text"
                        placeholder='right'
                        inputProps={{
                            'aria-label': 'right',
                        }}
                        sx={{
                            width: "80px",
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
                </div>

                <div className=' absolute top-50 left-50 translate-x-50 translate-y-50 flex  h-full items-center justify-between flex-col '>
                    <OutlinedInput
                        id="Mtop"
                        //defaultValue={borders[`borderTop`] ? borders[`borderTop`].split(" ")[0].replace("px", "") : ""}
                        onChange={(event) => setEventTarget(event)}
                        onFocus={() => setWichBorder("top")}
                        endAdornment={<InputAdornment sx={{
                            color: `${mode === "dark" ? "white" : "#001C30"}`,
                            '& .MuiTypography-root': {
                                color: `${mode === "dark" ? "white" : "#001C30"}`,
                            }
                        }} position="end">px</InputAdornment>}
                        aria-describedby="outlined-top-helper-text"
                        placeholder='top'
                        inputProps={{
                            'aria-label': 'top',
                        }}
                        sx={{
                            width: "80px",
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
                    <OutlinedInput
                        id="Mbottom"
                        //defaultValue={borders[`borderBottom`] ? borders[`borderBottom`].split(" ")[0].replace("px", "") : ""}
                        onChange={(event) => setEventTarget(event)}
                        onFocus={() => setWichBorder("bottom")}
                        endAdornment={<InputAdornment sx={{
                            color: `${mode === "dark" ? "white" : "#001C30"}`,
                            '& .MuiTypography-root': {
                                color: `${mode === "dark" ? "white" : "#001C30"}`,
                            }
                        }} position="end">px</InputAdornment>}
                        aria-describedby="outlined-bottom-helper-text"
                        placeholder='bottom'
                        inputProps={{
                            'aria-label': 'bottom',
                        }}
                        sx={{
                            width: "80px",
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

                </div>
                {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
            </div>
            <div className='flex justify-between'>
                <span >Border Style:</span>
                <span className='font-thin'>{wichBorder.toUpperCase()}</span>
            </div>

            {_borderStyle()}
        </Box>
    )
}
