import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDot } from 'react-icons/rx'
import { Collapse, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ImNewTab } from 'react-icons/im';
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Badge } from 'lucide-react';
import { sanitizeFileName } from '../SanitizeInputValidation'
import { addPage, removePage, setActivePage, updatePage } from '../../../../redux/reducers/DnDapp/LeftPanelReducers/Pages';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { red } from '@mui/material/colors';

import 'react-toastify/dist/ReactToastify.css';

export default function PagesComponent() {
    const [open, setOpen] = React.useState(false);
    const { sidebarOpenOrClosed } = useSelector((state) => state.sidebar);
    const { mode, modeColor } = useSelector((state) => state.sidebar);
    // const { activePage } = useSelector((state) => state.pages);
    const [selectedPage, setSelectedPage] = useState(0);

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
    // dispatch and pages etc.

    const dispatch = useDispatch()
    const { pages } = useSelector((state) => state.pages)

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
        if (pages.filter(p => p === sanitizedName).length === 0 && sanitizedName.length > 0) {
            dispatch(addPage(sanitizedName))
            setSanitizedFileName("")
        } else {
            notify()
        }
    }

    const removePageHandler = (page) => {
        dispatch(removePage(page))

        const data = localStorage.getItem('pages');
        const arryData = JSON.parse(data) || [];
        const updatedData = arryData.filter((item) => Object.keys(item)[0] !== page);
        localStorage.setItem('pages', JSON.stringify(updatedData));
    }

    return (
        <>
        <ToastContainer />
            <ListItemButton onClick={handleClick} sx={{ borderRadius: "5px" }}>
                <ListItemIcon sx={{ width: "content" }}>
                    <ImNewTab style={{ color: "#ee6c4d" }} size={16} />
                </ListItemIcon>
                {sidebarOpenOrClosed &&
                    <><ListItemText sx={{ color: mode === "dark" ? modeColor.lightMore : modeColor.darkMore }} primary="Pages" />
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
                            pages.map((page, index) => (
                                <ListItemButton key={index} 
                                sx={{ 
                                    pl: 4, 
                                    gap: 0,
                                    bgcolor: mode === "dark" ? (selectedPage === index ? modeColor.darkMore : modeColor.darkLess) : (selectedPage === index ? modeColor.lightMore : modeColor.lightLess),
                                }}
                                onClick={() => (dispatch(setActivePage(page)),setSelectedPage(index))}
                                >
                                    <TextField
                                        value={page}
                                        onChange={(event) => dispatch(updatePage({ index: index, value: event.target.value }))}
                                        variant="standard"
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                color:  mode === "dark" ?( selectedPage === index ? modeColor.lightMore : modeColor.lightLess) : (selectedPage === index ? modeColor.darkMore : modeColor.darkLess), // Renk ayarı
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
                                    <IconButton sx={{ m: 0, p: 0 }}>
                                        <Badge color={redColor} size={15}> {/* Badge düzeltildi */}
                                            <RemoveCircleIcon onClick={(_)=>removePageHandler(page)} />
                                        </Badge>
                                    </IconButton>
                                </ListItemButton>
                            ))
                        }
                    </List>
                    <ListItemButton sx={{ bgcolor: mode === "dark" ? modeColor.darkLess : modeColor.lightLess }}>
                        <TextField
                            id="addNewPage"
                            ref={valueOfNewPage}
                            value={sanitizedName && sanitizedName}
                            onChange={sanitizeHandler}
                            placeholder="Add Page"
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
