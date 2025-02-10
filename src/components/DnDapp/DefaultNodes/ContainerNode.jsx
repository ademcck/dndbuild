import { Handle, Position } from '@xyflow/react';

export const ContainerNode = ({ data }) => {
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
  return (
    <div className="body-node">
      <Handle type="source" style={handleStyles.source} position={Position.Bottom} />
      <div>{data.label.toUpperCase()}</div>
    </div>
  );
};