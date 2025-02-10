// CustomNodeType.jsx
import React, { useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import CustomDeleteNode from './CustomDeleteNode';
import ResponsiveTextarea from './TextFieldComponent';
import { useSelector } from 'react-redux';

function CustomNode({ id, data }) {
  const {textFieldOpen} = useSelector((state) => state.newNode);
  const handleStyles = {
    source: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      border: '2px solid #2563eb',
      borderRadius: '50%',
      cursor: 'pointer',
      bottom: "-20px",
    },
    target: {
      width: '15px',
      height: '15px',
      backgroundColor: 'transparent',
      border: '2px solid #16a34a',
      borderRadius: '50%',
      cursor: 'pointer',
      top: "-20px",
    }
  };
  // navigator.clipboard.writeText(JSON.stringify(node.properties))
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={handleStyles.target}
       // onConnect={(params) => console.log('handle onConnect', params)}
      />

      <div className="relative shadow-md rounded-md nowheel cursor-auto">
        {
          id === textFieldOpen.id && textFieldOpen.open ? (
            <div className='absolute z-10' style={{ left: "50%", width: "400px", bottom: "55px", transform: "translateX(-50%)" }}>
              <ResponsiveTextarea />
            </div>
          ):''
        }
        <CustomDeleteNode id={id} data={data}  />
        <img 
        src={"/icons/move.gif"} alt={data.alt}
        className="object-cover rounded-md drag-me-bro cursor-grab"  
        style={{
          width: "20px", 
          height: "20px",
          position: "absolute",
          left: "-25px",
          top: "50%",
          transform: "translateY(-50%)",

          }}/>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyles.source}
      />
    </>
  );
}

export default CustomNode;