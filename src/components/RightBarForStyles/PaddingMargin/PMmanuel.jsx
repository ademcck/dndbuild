import React, { useCallback, useEffect, useState } from 'react'
import { Box, OutlinedInput, InputAdornment } from '@mui/material';
import { RiDragMoveLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useReactFlow } from '@xyflow/react';


export default function PMmanuel() {
    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNode } = useReactFlow();
    const { activeButton } = useSelector((state) => state.addStyleCSS);
    const { mode } = useSelector((state) => state.sidebar);

    const [errors, setErrors] = useState({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    });

    const handleChangeError = (event) => {
        const { id, value } = event.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: isNaN(Number(value)) ? 0 : Number(value),
        }))
    };
    useEffect(() => {
        if (!id) return
        const node = getNode(id).properties;
        console.log(node[activeButton])
        setErrors({
            top: node[activeButton] ? Number(node[activeButton].split('px ')[0]): 0,
            left: node[activeButton] ? Number(node[activeButton].split('px ')[1]): 0,
            bottom: node[activeButton] ? Number(node[activeButton].split('px ')[2]): 0,
            right: node[activeButton] ? Number(node[activeButton].split('px ')[3]): 0,
        });
        handleChangeVal()
    }, [id, activeButton])


    const handleChangeVal = useCallback((_) => {
        // Slider değerini güncelle
        // Node'u güncelle
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        properties: {
                            ...node.properties,
                            [activeButton]: `${errors.top + "px "+errors.right + "px "+errors.bottom + "px "+errors.left + "px"} `
                        }
                    };
                }
                return node;
            });
        });
    }, [id,activeButton, errors]);

    useEffect(() => {
        handleChangeVal()
    }, [errors])

    
    return (
        <Box className=" p-5 w-full" sx={{ height: 210 }}>

            <div className='relative w-full h-full flex justify-center items-center' variant="outlined">
                <RiDragMoveLine className='absolute top-50 left-50 translate-x-50 translate-y-50'/>
                <div className=' absolute top-50 left-50 translate-x-50 translate-y-50 flex w-full  items-center justify-between '>
                    <OutlinedInput
                        id="left"
                        value={errors.left}
                        onChange={handleChangeError}
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
                        id="right"
                        value={errors.right}
                        onChange={handleChangeError}
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
                            // border: !errors.right ? '1px solid red' : '',
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
                        id="top"
                        value={errors.top}
                        onChange={handleChangeError}
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
                        id="bottom"
                        value={errors.bottom}
                        onChange={handleChangeError}
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
        </Box>
    )
}
