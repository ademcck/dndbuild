import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDot } from 'react-icons/rx'
import { Collapse, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { MdEditSquare, MdExpandLess, MdExpandMore } from 'react-icons/md';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AiFillApi } from "react-icons/ai";
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Badge } from 'lucide-react';
import { sanitizeFileName } from '../SanitizeInputValidation'
import { addAPI, removeAPI, updateAPI } from '../../../../redux/reducers/DnDapp/LeftPanelReducers/ApiConnect';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { green, red } from '@mui/material/colors';
import { toggleApiWindow, activeApiName } from '../../../../redux/reducers/DnDapp/ApiReducer';
import 'react-toastify/dist/ReactToastify.css';

export default function PagesComponent() {
    const [open, setOpen] = React.useState(false);
    const { sidebarOpenOrClosed } = useSelector((state) => state.sidebar);
    const { mode, modeColor } = useSelector((state) => state.sidebar);

    // notify
    const notify = () => toast('Duplicate item detected. Please check your input.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
    });

    //------
    const redColor = red[800]
    const greenColor = green[800]
    // dispatch and pages etc.

    const dispatch = useDispatch()
    const { api } = useSelector((state) => state.apiConnect)

    // get value of new page Input
    const valueOfNewPage = useRef(null);
    const [sanitizedName, setSanitizedFileName] = useState("");
    const sanitizeHandler = (event) => {
        const value = sanitizeFileName(event.target.value)
        setSanitizedFileName(value)
    }

    const handleClick = () => {
        setOpen(!open);
    };
    const addItemToList = () => {
        if (api.filter(p => p === sanitizedName).length === 0 && sanitizedName.length > 0) {
            dispatch(addAPI(sanitizedName))
            setSanitizedFileName("")
        } else {
            notify()
        }
    }

    return (
        <>
        <ToastContainer />
            <ListItemButton onClick={handleClick} sx={{ borderRadius: "5px" }}>
                <ListItemIcon sx={{ width: "content" }}>
                    <AiFillApi  style={{ color: "#ee6c4d" }} size={16} />
                </ListItemIcon>
                {sidebarOpenOrClosed &&
                    <><ListItemText sx={{ color: mode === "dark" ? modeColor.lightMore : modeColor.darkMore }} primary="Api" />
                        {open ?
                            <MdExpandLess style={{
                                color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess,
                            }} /> :
                            <MdExpandMore style={{
                                color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess,
                            }} />}</>
                }
            </ListItemButton>
            {sidebarOpenOrClosed &&
                <Collapse sx={{ 
                    backgroundColor: mode === "dark" ? modeColor.darkMore : modeColor.lightMore 
                    }} in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding
                    sx={{ 
                        maxHeight: 100,
                        overflowY: "auto"
                    }}
                    >
                        {
                            api.map((page, index) => (
                                <ListItemButton key={index} sx={{ pl: 4, gap: 0 }}>
                                    <TextField
                                        value={page}
                                        onChange={(event) => dispatch(updateAPI({ index: index, value: event.target.value }))}
                                        variant="standard"
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess, // Renk ayarı
                                                letterSpacing: 1,
                                                "&:before, &:after": {
                                                    borderBottom: "none", // Alt çizgiyi kaldır
                                                },
                                                "&:hover:not(.Mui-disabled):before": {
                                                    borderBottom: "none", // Hover durumunda da çizgiyi kaldır
                                                },
                                            },
                                            "& .MuiInput-root": {
                                                "&:focus-visible": {
                                                    outline: "none", // Focus durumunda outline kaldır
                                                },
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <RxDot
                                                        style={{
                                                            color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess,
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <IconButton sx={{ m: 0, p: 0, mr: 1 }}>
                                        <Badge  size={15}> {/* Badge düzeltildi */}
                                            <MdEditSquare color={greenColor}  onClick={(e) => (dispatch(toggleApiWindow(true)), dispatch(activeApiName(page)))} />
                                        </Badge>
                                    </IconButton>
                                    <IconButton sx={{ m: 0, p: 0 }}>
                                        <Badge color={redColor} size={15}> {/* Badge düzeltildi */}
                                            <RemoveCircleIcon onClick={(e) => dispatch(removeAPI(page))} />
                                        </Badge>
                                    </IconButton>
                                </ListItemButton>
                            ))
                        }
                    </List>
                    <ListItemButton sx={{ bgcolor: mode === "dark" ? modeColor.darkLess : modeColor.lightLess }}>
                        <TextField
                            id="addNewApi"
                            ref={valueOfNewPage}
                            value={sanitizedName && sanitizedName}
                            onChange={sanitizeHandler}
                            placeholder="Add Api"
                            variant="standard"
                            sx={{
                                "& .MuiInputBase-root": {
                                    color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess, // Renk ayarı
                                    letterSpacing: 1,
                                    "&:before, &:after": {
                                        borderBottom: "none", // Alt çizgiyi kaldır
                                    },
                                    "&:hover:not(.Mui-disabled):before": {
                                        borderBottom: "none", // Hover durumunda da çizgiyi kaldır
                                    },
                                },
                                "& .MuiInput-root": {
                                    "&:focus-visible": {
                                        outline: "none", // Focus durumunda outline kaldır
                                    },
                                },
                            }}
                        />
                        <IconButton sx={{ m: 0, p: 0 }}>
                            <Badge size={15}>
                                <BsFillPlusSquareFill onClick={addItemToList} color='#009688' />
                            </Badge>
                        </IconButton>
                    </ListItemButton>
                </Collapse>
            }
        </>
    )
}
