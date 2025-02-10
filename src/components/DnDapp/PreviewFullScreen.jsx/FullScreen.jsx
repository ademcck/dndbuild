import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/reducers/DnDapp/TopBarAction';

export default function FullScreen() {
  const dispatch = useDispatch();
  const { elements } = useSelector((state) => state.nodeToHtml);

  const createReactElementFromJson = (data) => {
    if (!data || !data.typeOf ) return null;

    const style = data.properties || {};
    const className = data.cName || '';
    // Rekürsif render
    if (data.typeOf.toLowerCase().includes("containers")){
      console.log(data.typeOf)
    }
    const children = (data.children || []).map((child, index) =>
      createReactElementFromJson(child)
    );

    if (data.typeOf === 'a') {
      const href = data.href || '';
      return React.createElement(data.typeOf, { key: Math.random(), style, className, href }, ...children);
    } else {
      const innerText = data.innerText || '';
      // innerText'i children listesine ekle
      if (innerText) { 
        children.unshift(innerText); // innerText'i en başa ekle (opsiyonel, konum önemine göre değişebilir)
      }

      return React.createElement(data.typeOf, { key: Math.random(), style, className }, ...children);
    }


  }
  return (
    <div
      className="w-screen h-screen p-2 absolute overflow-y-scroll"
      style={{
        backgroundColor: '#00000046',
        zIndex: '10',
        backdropFilter: 'blur(10px)',
      }}
    >
      <CloseIcon
        onClick={() => dispatch(toggleSidebar(false))}
        className="font-bold text-white size-2xl absolute top-2 right-2 cursor-pointer"
      />
      <div className='w-full h-full'>
        {createReactElementFromJson(elements.div)}
      </div>
    </div>
  );
}

