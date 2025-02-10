import React, { useCallback, useEffect, useState } from 'react'
import { Box, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useReactFlow } from "@xyflow/react";

export default function PMequels() {
    let MAX = 100;
    const MIN = 0;
    const marks = [
        {
            value: MIN,
            label: '',
        },
        {
            value: MAX,
            label: '',
        },
    ];
    const [val, setVal] = React.useState(MIN);
    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNode } = useReactFlow();
    const { activeButton } = useSelector((state) => state.addStyleCSS);
    const { side } = useSelector((state) => state.rightBar);
    
    if (activeButton === "padding"){
        MAX = 20;
    }else{
        MAX = 100;
    }

    const handleChangeVal = useCallback((_, newValue) => {
        // Slider değerini güncelle
        setVal(newValue);

        // Node'u güncelle
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    if (newValue === 0) {
                        const nProperties = {...node.properties};
                        delete nProperties[activeButton];
                        return {
                            ...node,
                            properties: {
                                ...nProperties,
                            }
                        };
                    }
                    return {
                        ...node,
                        properties: {
                            ...node.properties,
                            [activeButton]: `${newValue}px`,
                        }
                    };
                }
                return node;
            });
        });
    }, [id, activeButton, side]);
    useEffect(() => {
        if (id) {
            const node = getNode(id).properties;
            node[activeButton] ?  setVal(Number(node[activeButton].split('px')[0])): setVal(0)
        }
    }, [id, activeButton, side])

    return (
        <Box className=" p-5 w-full ">
            <Slider
                marks={marks}
                step={1}
                value={val}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={handleChangeVal}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    onClick={() => handleChangeVal(null, MIN)}
                    sx={{ cursor: 'pointer' }}
                >
                    {MIN} min
                </Typography>
                <Typography
                    variant="body2"
                    onClick={() => handleChangeVal(null, MAX)}
                    sx={{ cursor: 'pointer' }}
                >
                    {MAX} max
                </Typography>
            </Box>
        </Box>
    )
}