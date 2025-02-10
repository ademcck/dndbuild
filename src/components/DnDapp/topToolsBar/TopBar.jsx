import React from 'react'
import { GoSidebarCollapse } from 'react-icons/go';
import { GoSidebarExpand } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../redux/reducers/DnDapp/SidebarReducer';
import { toggleMode } from '../../../redux/reducers/DnDapp/SidebarReducer';
import PlayOnce from '../../AnimatedIcon/AnimatedIcon';

export default function TopBar() {
    const { sidebarOpenOrClosed } = useSelector((state) => state.sidebar);
    const { mode } = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();
    return (
        // <div className={mode === "dark" ? "bg-_black w-full h-16 px-5 flex justify-between items-center" : "bg-white w-full p-5 flex justify-between"}>
        <div className={`${mode === "dark" ? "bg-_black": "bg-white"} w-full p-5 flex justify-between transition-all duration-300` } style={{ borderBottom: `3px solid ${mode === "dark" ? "#80C4E9" : "#EE66A6"}`}}>
            {sidebarOpenOrClosed ? (
                <GoSidebarExpand
                    className={mode === "light" ? "text-3xl text-_black cursor-pointer" : "text-3xl text-white cursor-pointer"}
                    onClick={() => dispatch(toggleSidebar())}
                />
            ) : (
                <GoSidebarCollapse
                    className={mode === "light" ? "text-3xl text-_black cursor-pointer" : "text-3xl text-white cursor-pointer"}
                    onClick={() => dispatch(toggleSidebar())}
                />
            )
            }
            <PlayOnce />
            {
                mode === "dark" ? (
                    <MdLightMode
                        className="text-3xl text-white cursor-pointer"
                        onClick={() => dispatch(toggleMode())}
                    />
                ) : (
                    <MdDarkMode
                        className="text-3xl  cursor-pointer"
                        onClick={() => dispatch(toggleMode())}
                    />
                )
            }
        </div>
    )
}
