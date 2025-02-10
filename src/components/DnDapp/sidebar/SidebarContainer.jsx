import React from 'react'
import {  useSelector } from 'react-redux';
import { NAVIGATION } from './ElementList';
import { useDnD } from '../DnDContextFile/DnDcontext';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import { List } from '@mui/material';
import PagesComponent from './settings/PagesComponent';
import ApiComponent from './settings/ApiComponent';
import Layers from './settings/Layers';


export default () => {


  const [_, setType] = useDnD();
  const { sidebarOpenOrClosed } = useSelector((state) => state.sidebar);
  const { mode } = useSelector((state) => state.sidebar);
  const [openMenus, setOpenMenus] = useState({});

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('id', event.target.id);
  };
  // Alt menüyü açıp kapatmak için fonksiyon
  const handleToggleMenu = (segment) => {
    setOpenMenus((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };


  // 

  // Sidebar'ın genel stilini belirle
  const sidebarClasses = `relative h-full bg-${mode === "dark" ? "_black" : "white"} ${sidebarOpenOrClosed ? "w-64" : ""
    } transition-all duration-300 flex flex-col overflow-y-auto`;

  const iconOnlyClasses = `flex justify-center`;

  return (
    <aside className={sidebarClasses} style={{ borderRight: `${sidebarOpenOrClosed ? 0 : 3}px solid ${mode === "dark" ? "#80C4E9" : "#EE66A6"}` }}>
      {/* Navigasyon Menüsü */}
      <ul className="flex-1 space-y-4 p-4">
        {NAVIGATION.map((item, index) => {
          if (item.kind === "header") {
            return sidebarOpenOrClosed ? (
              <li key={index} className={`${mode === 'dark' ? 'text-gray-600' : 'text-gray-400'} uppercase text-xs font-semibold`}>
                {item.title}
              </li>
            ) : null;
          } else if (item.children) {
            const isOpen = openMenus[item.segment];
            return (
              <li key={index}>
                <div
                  className={`flex items-center justify-between ${sidebarOpenOrClosed ? "px-2" : ""
                    } ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'} cursor-pointer`}
                  onClick={() => handleToggleMenu(item.segment)}
                >
                  <div className=" flex items-center space-x-2">
                    <div className={iconOnlyClasses}>{item.icon}</div>
                    {sidebarOpenOrClosed && <span>{item.title}</span>}
                  </div>
                  {sidebarOpenOrClosed && (
                    <span>{isOpen ? <FiChevronDown /> : <FiChevronRight />}</span>
                  )}
                </div>
                {isOpen && sidebarOpenOrClosed && (
                  <ul className="ml-6 mt-2 space-y-2">
                    {item.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        draggable
                        id={child.title && child.title.toLowerCase().replace(/\s+/g, '-')}
                        onDragStart={(event) => onDragStart(event, 'default')}
                        className={`cursor-grab flex items-center space-x-2 ${mode === 'dark' ? 'text-white' : 'text-gray-500'} border border-transparent rounded-md hover:border-gray-500 hover:px-2`}
                      >
                        <div className={iconOnlyClasses} style={{ color: mode === "dark" ? "#80C4E9" : "#EE66A6" }}>{child.icon}</div>
                        <span>{child.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          } else {
            return (
              <li
                key={index}
                draggable
                id={item.title && item.title.toLowerCase().replace(/\s+/g, '-')}
                onDragStart={(event) => onDragStart(event, 'default')}
                className={`flex items-center space-x-2 ${mode === 'dark' ? 'text-gray-300' : 'text-_black'} rounded-md hover:border-gray-500 hover:px-2 ${sidebarOpenOrClosed ? "px-2" : ""
                  } cursor-grab`}
                style={{
                  border: `1px solid ${item.segment === "container" && sidebarOpenOrClosed ? "#ee6c4d" :
                    item.segment === "row" && sidebarOpenOrClosed ? "#C62300" :
                      item.segment === "column" && sidebarOpenOrClosed ? "#6A669D" : "transparent"
                    }`
                }}
              >
                <div className={iconOnlyClasses} style={{
                  color:
                    item.segment === "container" ? "#ee6c4d" :
                      item.segment === "row" ? "#C62300" :
                        item.segment === "column" ? "#6A669D" :
                          mode === "dark" ? "#80C4E9" : "#EE66A6"
                }} >{item.icon}</div>
                {sidebarOpenOrClosed && <span style={{
                  color:
                    item.segment === "container" ? "#ee6c4d" :
                      item.segment === "row" ? "#C62300" :
                        item.segment === "column" ? "#6A669D" : ""
                }}>{item.title}</span>}
              </li>
            );
          }
        })}
      </ul>
      {/* Pages Menüsü */}
      {sidebarOpenOrClosed && <h6 className={`flex px-4 ${mode === 'dark' ? 'text-gray-600' : 'text-gray-400'} uppercase text-xs font-semibold`}>
        Settings
      </h6>}
      <List
        sx={{ width: sidebarOpenOrClosed ? '100%' : "40px", overflow: 'hidden' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <PagesComponent />
      </List>
      <List
        sx={{ width: sidebarOpenOrClosed ? '100%' : "40px", overflow: 'hidden' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ApiComponent />
      </List>
      <List
        sx={{ width: sidebarOpenOrClosed ? '100%' : "40px", overflow: 'hidden' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Layers />
      </List>
    </aside>
  );
};




