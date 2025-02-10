import React, { useState, memo, useCallback, useEffect } from 'react';
import '../DropNewNodeComponent/CustomDeleteNode.css';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { IoLogoCodepen } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { handleSideBar, toggleSidebar } from '../../../redux/reducers/DnDapp/RightBarReducer';
import { activeNodeId } from '../../../redux/reducers/DnDapp/AddStyleCSS';


export const ChildNode = memo(({ data, id }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteChildren, setDeleteChildren] = useState(false);
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const [hideOrNot, setHideOrNot] = useState(true);

  // for right bar
  const { side } = useSelector((state) => state.rightBar);
  const dispatch = useDispatch();

  //

  const getChildNodes = useCallback((nodeId, nodes, edges) => {
    const childEdges = edges.filter(edge => edge.source === nodeId);
    const childIds = childEdges.map(edge => edge.target);

    let allChildIds = [...childIds];
    childIds.forEach(childId => {
      const grandChildren = getChildNodes(childId, nodes, edges);
      allChildIds = [...allChildIds, ...grandChildren];
    });
    return allChildIds;
  }, []);

  const getChildNodesCount = useCallback((nodeId) => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    const childNodeIds = getChildNodes(nodeId, currentNodes, currentEdges);
    return childNodeIds.length;
  }, [getNodes, getEdges, getChildNodes]);

  const handleDelete = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    let nodesToDelete = [id];

    if (deleteChildren) {
      const childrenToDelete = getChildNodes(id, currentNodes, currentEdges);
      nodesToDelete = [...nodesToDelete, ...childrenToDelete];
    }

    setNodes((prevNodes) => prevNodes.filter(node => !nodesToDelete.includes(node.id)));
    setEdges((prevEdges) => prevEdges.filter(edge => {
      if (deleteChildren) {
        return !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target);
      }
      return edge.source !== id && edge.target !== id;
    }));


    setShowDeleteDialog(false);
    setDeleteChildren(false); // Reset checkbox state
  }, [deleteChildren, getChildNodes, getNodes, getEdges, id, setNodes, setEdges]);

  const toggleHideOrShow = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    const childNodeIds = getChildNodes(id, currentNodes, currentEdges);

    setNodes(currentNodes =>
      currentNodes.map(node =>
        childNodeIds.includes(node.id) ? { ...node, hidden: hideOrNot } : node
      )
    );

    setHideOrNot(prev => !prev);
  }, [hideOrNot, getChildNodes, getNodes, getEdges, id, setNodes]);

  useEffect(() => {
    getChildNodesCount(id)
  }, [id])

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
    <>
      <div className="child-node relative">
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="absolute w-4 h-4 flex justify-center items-center bg-orange rounded-full hover:bg-red-600 transition-colors"
          style={{ top: "-1em", right: "-1em" }}
        >
          <X size={12} className="text-white font-extrabold cursor-pointer" />
        </button>
        {hideOrNot ? (
          <IoEye
            className="cursor-pointer text-white bg-orange rounded-lg w-4 h-4 text-center absolute"
            style={{ padding: "2px", top: "-1em", left: "-1em" }}
            onClick={toggleHideOrShow}
          />
        ) : (
          <IoEyeOff
            className="cursor-pointer text-white bg-orange rounded-lg w-4 h-4 text-center absolute"
            style={{ padding: "2px", top: "-1em", left: "-1em" }}
            onClick={toggleHideOrShow}
          />
        )}
        <div className=' rounded-full bg-white flex justify-center items-center  absolute'
          style={{ bottom: "-1em", right: "-1em" }}
        >

          <IoLogoCodepen
            className="cursor-pointer text-orange"
            style={{fontSize: "22px"}}
            onClick={(e) => (dispatch(toggleSidebar(!side)), dispatch(handleSideBar()), dispatch(activeNodeId(id)))}

          />
        </div>
        <Handle type="target" style={handleStyles.target} position={Position.Top} />
        <div>{data.label.toUpperCase()}</div>
        <Handle type="source" style={handleStyles.source} position={Position.Bottom} />
      </div>
      <AlertDialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="alert-overlay" />
          <AlertDialog.Content className="alert-content">
            <AlertDialog.Title className="alert-title">
              Bu elementi silmek istediğinize emin misiniz?
            </AlertDialog.Title>
            <AlertDialog.Description className="alert-description">
              Bu işlem geri alınamaz.
            </AlertDialog.Description>
            {getChildNodesCount(id) > 0 ?
              <div className="my-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={deleteChildren}
                    onChange={(e) => setDeleteChildren(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Alt elemanları da sil</span>
                </label>
              </div>
              : ""}
            <div className="alert-buttons">
              <AlertDialog.Cancel asChild>
                <button className="cancel-button">
                  İptal
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="delete-button" onClick={handleDelete}>
                  Sil
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
});

