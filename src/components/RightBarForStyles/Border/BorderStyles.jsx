import React, { useState, useEffect, useCallback } from 'react'
import { Box, InputAdornment, OutlinedInput, TextField, MenuItem } from '@mui/material'
import { HiDotsVertical } from "react-icons/hi";
import { SketchPicker } from 'react-color';
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useReactFlow } from '@xyflow/react';
import { setBorderColor, setBorderStyle } from '../../../redux/reducers/DnDapp/AddStyleCSS';

export default function BorderStyles({ grub, border, borderSize }) {
    const { mode } = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();
    const { borderColor, sborderColor, borderStyle } = useSelector(state => state.addStyleCSS);
    const [borderS, setbordersize] = useState(0);
    const handleChangeError = useCallback((event) => {
        const value = event.target.value;
        setbordersize(value);

    }, [borderS])

    // grub false
    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNode } = useReactFlow();
    const handleChangeVal = useCallback((value) => {

        // Node'u güncelle
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {

                    if (!grub) {
                        const cloneProperties = { ...node.properties };
                        const resBorder = Object.keys(cloneProperties).filter(key => key.includes("border"))
                        resBorder.forEach(key => delete cloneProperties[key])
                        node.properties = cloneProperties
                    }
                    if (Number(value) === 0) {
                        const cloneProperties = { ...node.properties };
                        cloneProperties.border && delete cloneProperties.border;
                        return {
                            ...node,
                            properties: cloneProperties,
                        };
                    }
                    return {
                        ...node,
                        properties: {
                            ...node.properties,
                            border: `${isNaN(Number(value)) ? 0 : Number(value)}px ${borderStyle} ${sborderColor}`
                        }
                    };
                }
                return node;
            });
        });
    }, [id, setNodes, sborderColor, borderStyle]);



    // color palette
    const [showPicker, setShowPicker] = useState(false);

    const handleColorChange = (newColor) => {
        grub ? dispatch(setBorderColor({ id: border, value: newColor.hex, grub: true })) :
            dispatch(setBorderColor({ grub: false, value: newColor.hex }))

    };

    useEffect(() => {
        !grub && handleChangeVal(borderS);
    }, [borderS, borderColor, sborderColor, borderStyle]);

    useEffect(() => {
        showPicker ? setShowPicker(!showPicker) : setShowPicker(showPicker)
        if (id) {

            const getBorderProperties = getNode(id).properties
            if (grub) {
                if (getBorderProperties["border"+ border.charAt(0).toUpperCase() + border.slice(1)]) {
                    const borderProperties = getBorderProperties["border"+ border.charAt(0).toUpperCase() + border.slice(1)].split(" ");
                    setbordersize(Number(borderProperties[0].replace("px", "")));
                    dispatch(setBorderStyle(borderProperties[1]));
                    dispatch(setBorderColor({ grub: grub, value: borderProperties[2] }));
                } else {
                    setbordersize(0);
                    dispatch(setBorderStyle("none"));
                    dispatch(setBorderColor({ grub: grub, value: "#000" }));
                }
            } else {
                if (getBorderProperties.border) {
                    const borderProperties = getBorderProperties.border.split(" ");
                    setbordersize(Number(borderProperties[0].replace("px", "")));
                    dispatch(setBorderStyle(borderProperties[1]));
                    dispatch(setBorderColor({ grub: grub, value: borderProperties[2] }));
                } else {
                    setbordersize(0);
                    dispatch(setBorderStyle("none"));
                    dispatch(setBorderColor({ grub: grub, value: "#000" }));
                }
            }
        }
    }, [id, border]);
    return (
        <Box className='flex justify-between items-center mt-2'>
            <OutlinedInput
                id="borderSize"
                onChange={handleChangeError}
                value={grub ? borderSize : borderS}
                disabled={grub ? true : false}
                endAdornment={<InputAdornment sx={{
                    color: `${mode === "dark" ? "white" : "#001C30"}`,
                    '& .MuiTypography-root': {
                        color: `${mode === "dark" ? "white" : "#001C30"}`,
                    }
                }} position="end">px</InputAdornment>}
                aria-describedby="outlined-left-helper-text"
                placeholder='size'
                inputProps={{
                    'aria-label': 'left',
                }}
                sx={{
                    width: "80px",
                    fontSize: "10px",
                    color: `${mode === "dark" ? "white" : "black"}`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${mode === "dark" ? "white" : "black"}`,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${mode === "dark" ? "white" : "black"}`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${mode === "dark" ? "white" : "black"}`,
                    },
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-input': {
                            WebkitTextFillColor: `${mode === "dark" ? "#a8a8a8" : "#444"}`, // Disabled metin rengi
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: `${mode === "dark" ? "#a8a8a8" : "#a8a8a8"}`, // Disabled çerçeve rengi
                        },
                        '& .MuiInputAdornment-root': {
                            color: `${mode === "dark" ? "#a8a8a8" : "#a8a8a8"}`, // Disabled adornment rengi
                        },
                    },
                }}

            />
            <HiDotsVertical />
            <TextField
                id="borderType"
                select
                label="Type"
                value={borderStyle}
                onChange={(event) => dispatch(setBorderStyle(event.target.value))}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: `${mode === "dark" ? "white" : "black"}`, // Input metin rengi
                        '& fieldset': {
                            borderColor: `${mode === "dark" ? "white" : "black"}`, // Çerçeve rengi
                        },
                        '&:hover fieldset': {
                            borderColor: `${mode === "dark" ? "white" : "black"}`, // Hover durumu için çerçeve rengi
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: `${mode === "dark" ? "white" : "black"}`, // Focus durumu için çerçeve rengi
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: `${mode === "dark" ? "white" : "black"}`, // Etiket metin rengi
                    },
                    '& .MuiSelect-icon': {
                        color: `${mode === "dark" ? "white" : "black"}`, // Seçim ikonu rengi
                    },
                }}
            >
                {[{ key: 1, type: "dotted" },
                { key: 2, type: "dashed" },
                { key: 3, type: "solid" },
                { key: 4, type: "double" },
                { key: 5, type: "groove" },
                { key: 6, type: "ridge" },
                { key: 7, type: "inset" },
                { key: 8, type: "outset" },
                { key: 9, type: "none" },
                { key: 10, type: "hidden" },].map((option) => (
                    <MenuItem key={option.key} value={option.type}>
                        {option.type}
                    </MenuItem>
                ))}
            </TextField>
            <HiDotsVertical />
            <OutlinedInput
                id="borderColor"
                startAdornment={<InputAdornment sx={{
                    color: `${mode === "dark" ? "white" : "#001C30"}`,
                    '& .MuiTypography-root': {
                        color: `${mode === "dark" ? "white" : "#001C30"}`,
                    }
                }} position="start">#</InputAdornment>}
                aria-describedby="outlined-left-helper-text"
                placeholder='hex'
                onClick={() => setShowPicker(!showPicker)}
                value={grub ? (borderColor[border] !== "none" ? borderColor[border] : "#ffffff") : sborderColor !== "none" ? sborderColor : "#ffffff"}
                inputProps={{
                    'aria-label': 'left',
                }}
                sx={{
                    width: "80px",
                    fontSize: "10px",
                    color: `${mode === "dark" ? "white" : "black"}`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${mode === "dark" ? "white" : "black"}`,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${mode === "dark" ? "white" : "black"}`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${mode === "dark" ? "white" : "black"}`,
                    },
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-input': {
                            WebkitTextFillColor: `${mode === "dark" ? "#a8a8a8" : "#444"}`, // Disabled metin rengi
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: `${mode === "dark" ? "#a8a8a8" : "#a8a8a8"}`, // Disabled çerçeve rengi
                        },
                        '& .MuiInputAdornment-root': {
                            color: `${mode === "dark" ? "#a8a8a8" : "#a8a8a8"}`, // Disabled adornment rengi
                        },
                    },
                }}

            />
            {showPicker && (
                <div style={{ position: 'absolute', zIndex: 2 }}>
                    <IoIosCloseCircle onClick={() => setShowPicker(!showPicker)} style={{ color: mode === "dark" ? "white" : "black", fontSize: "20px", position: "absolute", right: "-20px", top: "-30px", cursor: "pointer" }} />
                    <SketchPicker id="sketchPicker" color={grub ? (borderColor[border] !== "none" ? borderColor[border] : "#ffffff") : sborderColor !== "none" ? sborderColor : "#ffffff"} onChange={handleColorChange} />
                </div>
            )}

        </Box>
    )
}




