import { Box } from '@mui/material'
import React, { useCallback, useRef } from 'react'
import { useReactFlow } from '@xyflow/react';
import { useDispatch, useSelector } from 'react-redux';
import { CiImageOn } from "react-icons/ci";
import { IoIosCloseCircle, IoMdClose } from "react-icons/io";
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaArrowsAltH, FaArrowsAltV, FaRegSquare, FaUndoAlt, FaExpand, FaCompress } from "react-icons/fa";


export default function BGproperties() {
    const presentColors = [
        { color: "transparent", title: "None" }, // None seçeneği
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#808080",
        "#C0C0C0",
        "#800000",
        "#808000",
        "#008000",
        "#800080",
        "#008080",
        "#000080"
    ];
    const { mode, modeColor, righBarTitleColor } = useSelector((state) => state.sidebar)
    // add image
    const [image, setImage] = useState(null);
    // color palette
    const [color, setColor] = useState(mode ? righBarTitleColor.pink : righBarTitleColor.dark);
    const bColor = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    // Repeat , position
    const [backgroundRepeat, setBackgroundRepeat] = useState('no-repeat');
    const [backgroundPosition, setBackgroundPosition] = useState('center');
    const [backgroundSize, setBackgroundSize] = useState('cover');

    const handleColorChange = (newColor) => {
        setColor(newColor.rgb);
    };


    const { id } = useSelector((state) => state.addStyleCSS);

    const { setNodes, getNode } = useReactFlow();
    const handleChangeVal = useCallback(() => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    if (!image) {
                        const { backgroundImage, backgroundRepeat, backgroundPosition, backgroundSize, ...rest } = node.properties;
                        node.properties = rest;
                        const colorValue = color.a === 0 ? 'none' : `rgba(${color.r},${color.g},${color.b},${color.a})`;
                        if (colorValue === 'none') {
                            const { backgroundColor, ...restt } = node.properties;
                            node.properties = restt;
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
                                'backgroundColor': colorValue,
                            }
                        };
                    } else {

                        return {
                            ...node,
                            properties: {
                                ...node.properties,
                                'backgroundImage': `url(${image})`,
                                "backgroundRepeat": backgroundRepeat, /* Tekrar etmesin */
                                "backgroundPosition": backgroundPosition, /* Ortala */
                                "backgroundSize": backgroundSize,
                            }
                        };
                    }
                }
                return node;
            });
        });
    }, [image, color, backgroundRepeat, backgroundPosition, backgroundSize]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // console.log(file); // Yüklenen dosya bilgileri
            // console.log(URL.createObjectURL(file)); // Dosyanın önizleme URL'si
            setImage(URL.createObjectURL(file)); // Görüntüyü state'e kaydediyoruz
        }
    };

    const handleIconClick = () => {
        document.getElementById("fileInput").click(); // Gizli input'a tıklatıyoruz
    };
    // size and position
    const handleChangeRepeat = (repeatType) => {
        setBackgroundRepeat(repeatType);
    };

    const handleChangePosition = (position) => {
        setBackgroundPosition(position);
    };

    // Background size handler
    const handleChangeSize = (size) => {
        setBackgroundSize(size);
    };

    const extractBlobUrl = (backgroundImage) => {
        const match = backgroundImage.match(/url\(["']?(blob:[^)]+)["']?\)/);
        return match ? match[1] : null;
    };



    useEffect(() => {
        handleChangeVal();
        bColor.current.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }, [image, color, backgroundRepeat, backgroundPosition, backgroundSize]);

    useEffect(() => {
        if (!id) return
        const node = getNode(id)
        showPicker ? setShowPicker(!showPicker) : setShowPicker(showPicker)
        if (node.properties.backgroundColor && node.properties.backgroundColor !== "rgba(undefined,undefined,undefined,undefined)") {
            bColor.current.style.backgroundColor = node.properties.backgroundColor;
        } else {
            setColor({ r: 0, g: 0, b: 0, a: 0 });
        }
        setBackgroundRepeat(node.properties.backgroundRepeat)
        setBackgroundPosition(node.properties.backgroundPosition)
        setBackgroundSize(node.properties.backgroundSize)
        node.properties.backgroundImage ? setImage(extractBlobUrl(node.properties.backgroundImage)) : setImage(null)
    }, [id])


    return (
        <Box >
            <h6 className=' my-3' >Background </h6>
            <Box className='flex justify-around items-center'>
                <div className='flex flex-row justify-around items-center'>
                    <div className=' cursor-pointer relative' >
                        <div title={color} ref={bColor} onClick={() => setShowPicker(!showPicker)} className='cursor-pointer relative flex justify-center items-center' style={{ width: "20px", height: "20px" }}>
                            {color.a === 0 && <IoMdClose size={20} color={mode === "dark" ? modeColor.light : modeColor.dark} />}
                        </div>
                        {showPicker && (
                            <div style={{ position: 'absolute', zIndex: 2, bottom: "0" }}>
                                <IoIosCloseCircle onClick={() => setShowPicker(!showPicker)} style={{ fontSize: "20px", position: "absolute", right: "-20px", top: "-30px", color: mode === "dark" ? "white" : "black", cursor: "pointer" }} />
                                <SketchPicker color={color} onChangeComplete={handleColorChange} presetColors={presentColors} styles={{ default: { picker: { color: modeColor.dark, backgroundColor: mode === "light" ? righBarTitleColor.dark : righBarTitleColor.pink, border: `1px solid ${mode === "dark" ? modeColor.light : modeColor.dark}`, } } }} />
                            </div>
                        )}
                    </div><span className=' ml-2'>Fill</span>

                </div>
                <div>
                    <CiImageOn
                        onClick={handleIconClick}
                        className="float-left cursor-pointer"
                        style={{ width: "20px", height: "20px" }}
                    />
                    <span className="clear-left ml-2">Image</span>
                </div>
                {/* Gizli input */}
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                />
                {/* Yüklenen resmin önizlemesi */}
                {image && (
                    <div className='relative'>
                        <img
                            className='rounded-full'
                            src={image}
                            alt="Uploaded"
                            style={{ width: "30px", height: "30px", objectFit: "cover" }}
                        />
                        <IoIosCloseCircle onClick={() => setImage(null)} style={{ fontSize: "20px", position: "absolute", right: "-10px", top: "-10px", color: "white", cursor: "pointer" }} />

                    </div>
                )}
            </Box>
            <div className="flex items-center  justify-between w-80 mb-5 mt-10">
                <Box className="relative flex justify-around">
                    <h6 className='absolute' style={{ top: "-20px", left: "0" }}>Repeat</h6>
                    <FaArrowsAltH
                        onClick={() => handleChangeRepeat('repeat-x')}
                        className="cursor-pointer m-2"
                        title="Repeat Horizontally"
                        style={{ backgroundColor: backgroundRepeat === "repeat-x" ? "#80C4E9" : "transparent" }}
                    />
                    <FaArrowsAltV
                        onClick={() => handleChangeRepeat('repeat-y')}
                        className="cursor-pointer m-2"
                        title="Repeat Vertically"
                        style={{ backgroundColor: backgroundRepeat === "repeat-y" ? "#80C4E9" : "transparent" }}
                    />
                    <FaUndoAlt
                        onClick={() => handleChangeRepeat('no-repeat')}
                        className="cursor-pointer m-2"
                        title="No Repeat"
                        style={{ backgroundColor: backgroundRepeat === "no-repeat" ? "#80C4E9" : "transparent" }}
                    />
                </Box>
                <Box className="relative flex justify-around">
                    <h6 className='absolute' style={{ top: "-20px", left: "0" }}>Position</h6>
                    <FaRegSquare
                        onClick={() => handleChangePosition('center')}
                        className="cursor-pointer m-2"
                        title="Center Position"
                        style={{ backgroundColor: backgroundPosition === "center" ? "#80C4E9" : "transparent" }}
                    />
                    <FaArrowsAltH
                        onClick={() => handleChangePosition('top')}
                        className="cursor-pointer m-2"
                        title="Top Position"
                        style={{ backgroundColor: backgroundPosition === "top" ? "#80C4E9" : "transparent" }}
                    />
                    <FaArrowsAltV
                        onClick={() => handleChangePosition('bottom')}
                        className="cursor-pointer m-2"
                        title="Bottom Position"
                        style={{ backgroundColor: backgroundPosition === "bottom" ? "#80C4E9" : "transparent" }}
                    />
                </Box>
                <Box className="relative flex justify-around">
                    <h6 className='absolute' style={{ top: "-20px", left: "0" }}>Size</h6>
                    <FaExpand
                        onClick={() => handleChangeSize('cover')}
                        className="cursor-pointer m-2"
                        title="Cover"
                        style={{ backgroundColor: backgroundSize === "cover" ? "#80C4E9" : "transparent" }}
                    />
                    <FaCompress
                        onClick={() => handleChangeSize('contain')}
                        className="cursor-pointer m-2"
                        title="Contain"
                        style={{ backgroundColor: backgroundSize === "contain" ? "#80C4E9" : "transparent" }}
                    />
                </Box>
            </div>
        </Box>
    )
}
