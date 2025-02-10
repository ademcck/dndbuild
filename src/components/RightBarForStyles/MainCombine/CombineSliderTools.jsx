import React, { useState } from 'react'
import CombinePM from '../PaddingMargin/CombinePM'
import CombineBorder from '../Border/CombineBorder'
import { LuPanelRightClose, LuPanelRightOpen } from "react-icons/lu";
import Combiner from '../MainProperties/Combiner';
import { useDispatch, useSelector } from 'react-redux';
import { handleSideBar, toggleSidebar } from '../../../redux/reducers/DnDapp/RightBarReducer';
import FlexComponent from '../FlexBox/FlexComponent';
import {  ToastContainer, toast, Bounce, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//<LuPanelRightOpen />
export default function CombineSliderTools() {
  const { side } = useSelector((state) => state.rightBar);
  const { mode } = useSelector((state) => state.sidebar);
  const { id } = useSelector((state) => state.addStyleCSS);
  const notify = () => toast.error('Please Select A Node First', {

    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
    });

  const classMode = `h-full  transition-all ease-in-out duration-300 bg-${mode === "dark" ? "_black" : "white"} `
  const dispatch = useDispatch();

  return (
    <aside id='rightPanel' className={classMode} style={{ width: "350px", position: "absolute", right: "-350px"}}>
      <div className="absolute" style={{ left: "-40px", bottom: "50%",  transform: "translateY(-50%)" }}>
        {
          side ?
            <LuPanelRightClose onClick={(e) => (dispatch(toggleSidebar(!side)), dispatch(handleSideBar()))} className='text-white cursor-pointer' style={{ fontSize: "40px", backgroundColor: mode === "dark" ? "#80C4E9" : "#EE66A6", borderRadius: "10px 0 0 10px ", padding: "3px"}} /> :
            <LuPanelRightOpen onClick={(e) => (!id ? notify() : dispatch(toggleSidebar(!side)), dispatch(handleSideBar()))} className='text-white cursor-pointer' style={{ fontSize: "40px", backgroundColor: mode === "dark" ? "#80C4E9" : "#EE66A6", borderRadius: "10px 0 0 10px ", padding: "3px"}} />

        }
      </div>
      <ToastContainer />
      <div className='w-full h-full' style={{ overflowY: "auto", borderLeft: `3px solid ${mode === "dark" ? "#80C4E9" : "#EE66A6"}` }}>
        <CombinePM />
        <CombineBorder  />
        <Combiner  />
        <FlexComponent />
      </div>
    </aside>
  )
}
