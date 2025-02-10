import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField, IconButton, Box, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useReactFlow } from '@xyflow/react';
import { setTextFieldOpen } from '../../../redux/reducers/DnDapp/CreateNewNode';
import { FaFont, FaItalic } from 'react-icons/fa';
import { RiFontColor, RiFontSize, RiLetterSpacing2 } from 'react-icons/ri';
import { SketchPicker } from 'react-color';
import { IoIosCloseCircle } from 'react-icons/io';
import FontPicker from './FontSetting/ChoiceFont';

const ResponsiveTextarea = () => {
    // color palette
    // showOrHide tools
    const [showPicker, setShowPicker] = useState(false);
    const [fontWindow, setFontWindow] = useState(false);

    // properties
    const [fontColor, setFontColor] = useState("#000000");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [fontSizeWindow, setFontSizeWindow] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [letterSpacingWindow, setLetterSpacingWindow] = useState(false);
    const [italic, setItalic] = useState(false);
    //-------------


    const [isA, setIsA] = useState(false)

    const { textFieldOpen } = useSelector((state) => state.newNode);
    const dispatch = useDispatch();


    const text = useRef("");
    const [_text, setText ] = useState("");

    const [visible, setVisible] = useState(true);


    const { id } = useSelector((state) => state.addStyleCSS);
    const { setNodes, getNode } = useReactFlow();
    const changeNodeProperties = useCallback(() => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    const textIsA = isA ? { href: text.current } : { innerText: text.current }
                    console.log(textIsA);
                    const addProperties = {
                        fontSize: fontSize,
                        letterSpacing: letterSpacing,
                        fontFamily: fontFamily,
                        color: fontColor,
                        fontStyle: italic ? 'italic' : 'normal'

                    }
                    return {
                        ...node,
                        ...textIsA,
                        properties: { ...node.properties, ...addProperties },
                    };
                }
                return node;
            });
        });
    }, [_text, id, isA, fontColor, fontFamily, fontSize, letterSpacing, italic]);



    const handleColorChange = (newColor) => {
        setFontColor(newColor.hex);
    }

    useEffect(() => {
        changeNodeProperties();
    }, [id, _text, isA, fontColor, fontFamily, fontSize, letterSpacing, italic]);


    useEffect(() => {
        const tF = id.includes("a-");
        const node = getNode(id);
        setIsA(tF);
        node.properties.color && setFontColor(node.properties.color);
        node.properties.fontFamily && setFontFamily(node.properties.fontFamily);
        node.properties.fontSize && setFontSize(node.properties.fontSize);
        node.properties.letterSpacing && setLetterSpacing(node.properties.letterSpacing);
        node.properties.fontStyle && setItalic(node.properties.fontStyle === 'italic');
        text.current = tF ? node.href : node.innerText
        document.getElementById("text-field").value = text.current;
        showPicker ? setShowPicker(!showPicker) : setShowPicker(showPicker)
    }, [id]);

    useEffect(() => {
        if (!visible) return null;

    }, [visible]);


    const handleClose = () => {
        setShowPicker(false);
        setFontWindow(false);
    };

    const handlerOfSizeOrSpacing = ({ value, tOrF }) => {
        tOrF ? setFontSize(value) : setLetterSpacing(value)
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '16px',
                paddingLeft: '36px',
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
            }}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: 'text.secondary',
                    cursor: 'pointer',
                    zIndex: 1,
                }}
                onClick={() => {
                    dispatch(setTextFieldOpen({ id: id, open: !textFieldOpen }));
                    setVisible(false);
                }}
            >
                <CloseIcon className='w-full h-full' />
            </IconButton>
            <TextField
                id="text-field"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your text here..."
                onChange={(e) => {text.current = e.target.value, setText(e.target.value)}}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                            borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.dark',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: fontColor, // Metin rengini burada belirliyoruz
                        fontFamily: `${fontFamily}`, // Font adını burada belirliyoruz
                        fontStyle: italic ? 'italic' : 'normal', // Italic mi değil mi belirliyoruz
                        fontSize: `${fontSize}px`, // Font büyüklüğünü burada belirliyoruz
                        letterSpacing: `${letterSpacing}px`,
                        lineHeight: 1,
                    },
                }}
            />
            <div className=' absolute flex flex-col items-center justify-between'
                style={{
                    width: "36px",
                    padding: "16px 0",
                    height: "100%",
                    top: "50%",
                    left: "0",
                    transform: "translateY(-50%)",
                }}
            >
                <FaFont title="Font" onClick={() => (handleClose(), setFontWindow(!fontWindow))} className='w-full hover:bg-slate-300 cursor-pointer' style={{ height: "15px" }} />
                <RiFontSize title="Size" onClick={() => (handleClose(), setLetterSpacingWindow(false), setFontSizeWindow(!fontSizeWindow))} className={`${fontSizeWindow ? "bg-blue-100" : ""} w-full hover:bg-slate-300 cursor-pointer`} style={{ height: "15px" }} />
                <RiFontColor title="Color" onClick={() => (handleClose(), setShowPicker(!showPicker))} className='w-full hover:bg-slate-300 cursor-pointer' style={{ height: "15px" }} />
                <FaItalic title="Transform" onClick={() => (handleClose(), setItalic(!italic))} className={`${italic ? "bg-blue-100" : ""} w-full hover:bg-slate-300 cursor-pointer`} style={{ height: "15px" }} />
                <RiLetterSpacing2 title="Letter Space" onClick={() => (handleClose(), setFontSizeWindow(false), setLetterSpacingWindow(!letterSpacingWindow))} className='w-full hover:bg-slate-300 cursor-pointer' style={{ height: "15px" }} />
            </div>
            {showPicker && (
                <div style={{ position: 'absolute', left: '25.2em', top: '0' }}>
                    <IoIosCloseCircle onClick={() => setShowPicker(!showPicker)} style={{ color: "#fff", fontSize: "20px", position: "absolute", right: "-20px", top: "-30px", cursor: "pointer" }} />
                    <SketchPicker className='cursor-auto' id="sketchPicker" color={fontColor} onChange={handleColorChange} />
                </div>
            )}
            {
                fontWindow &&
                <div style={{ position: 'absolute', left: '25.2em', top: '0' }}>
                    <IoIosCloseCircle onClick={() => setFontWindow(!fontWindow)} style={{ color: "#fff", fontSize: "20px", position: "absolute", right: "-20px", top: "-30px", cursor: "pointer" }} />
                    <FontPicker setFontFamily={setFontFamily} />
                </div>
            }
            {
                (fontSizeWindow || letterSpacingWindow) &&
                <Box
                    className='bg-white flex flex-col items-center justify-center w-full rounded-md'
                    style={{ position: "absolute", right: "0", bottom: "-2.5em", cursor: "pointer", padding: "2px 2em" }}
                >

                    <Slider
                        value={fontSizeWindow ? fontSize : letterSpacing} // Kontrollü bileşen için value
                        valueLabelDisplay="auto"
                        onChange={(event, newValue) => handlerOfSizeOrSpacing({ value: newValue, tOrF: fontSizeWindow ? true : false })} // newValue
                        step={1}
                        min={fontSizeWindow ? 5 : 0}
                        max={fontSizeWindow ? 100 : 20}
                    />
                </Box>
            }
        </Box>
    );
};

export default ResponsiveTextarea;
