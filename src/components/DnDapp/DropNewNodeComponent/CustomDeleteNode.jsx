import React, { useState, memo, useEffect, useCallback, useRef } from 'react';
import { useNodes, useReactFlow } from '@xyflow/react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { X } from 'lucide-react';
import './CustomDeleteNode.css';
import { IoLogoCodepen } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { handleSideBar, toggleSidebar } from '../../../redux/reducers/DnDapp/RightBarReducer';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { activeNodeId } from '../../../redux/reducers/DnDapp/AddStyleCSS';
import { MdOutlineCopyAll, MdOutlineTextFormat } from 'react-icons/md';
import { ImPaste } from "react-icons/im";
import { increaceNewElementId, setTextFieldOpen } from '../../../redux/reducers/DnDapp/CreateNewNode';
import { AiFillApi } from 'react-icons/ai';
import { setLayoutApi } from '../../../redux/reducers/DnDapp/ApiReducer';
import { FaPlusCircle } from 'react-icons/fa';


const CustomDeleteNode = (props) => {
  const { layoutApi } = useSelector((state) => state.api);
  const { elementCounter } = useSelector((state) => state.newNode);
  const elementCounterRef = useRef({...elementCounter});
  const counter = useRef(0);
  const posX = useRef(0);

  const { textFieldOpen } = useSelector((state) => state.newNode);

  const { validText } = useSelector((state) => state.newNode)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteChildren, setDeleteChildren] = useState(false);
  const { setNodes, setEdges, getNodes, getEdges, getNode } = useReactFlow();
  const [hideOrNot, setHideOrNot] = useState(true);

  //Current Node
  const [currentNode, setCurrentNode] = useState(false)
  const pastToProperties = useCallback(() => {
    navigator.clipboard.readText().then((text) => {
      try {
        const getProperties = JSON.parse(text);
        setNodes((nodes) => {
          return nodes.map((node) => {
            if (node.id === props.id) {
              return {
                ...node,
                properties: getProperties
              };
            }
            return node;
          });
        });
      } catch (err) {
        console.error('Yapıştırılan veri geçerli bir JSON değil', err);
      }
    }).catch((err) => {
      console.error('Yapıştırma işlemi başarısız oldu', err);
    });
  }, [])
  // Node'u güncelle




  // ----------------



  // for right bar
  const { side } = useSelector((state) => state.rightBar);
  const dispatch = useDispatch();

  //


  const getChildNodes = (nodeId, nodes, edges) => {
    const childEdges = edges.filter(edge => edge.source === nodeId);
    const childIds = childEdges.map(edge => edge.target);

    let allChildIds = [...childIds];
    childIds.forEach(childId => {
      const grandChildren = getChildNodes(childId, nodes, edges);
      allChildIds = [...allChildIds, ...grandChildren];
    });

    return allChildIds;
  };

  const handleDelete = () => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    let nodesToDelete = [props.id];

    if (deleteChildren) {
      const childrenToDelete = getChildNodes(props.id, currentNodes, currentEdges);
      nodesToDelete = [...nodesToDelete, ...childrenToDelete];
    }

    setNodes((nodes) => nodes.filter((node) => !nodesToDelete.includes(node.id)));
    setEdges((edges) => edges.filter((edge) => {
      if (deleteChildren) {
        return !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target);
      }
      return edge.source !== props.id && edge.target !== props.id;
    }));

    setShowDeleteDialog(false);
    setDeleteChildren(false); // Reset checkbox state
  };

  //hide or show node
  const toggleHideOrShow = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    const childNodeIds = getChildNodes(props.id, currentNodes, currentEdges);

    setNodes(currentNodes =>
      currentNodes.map(node =>
        childNodeIds.includes(node.id) ? { ...node, hidden: hideOrNot } : node
      )
    );

    setHideOrNot(prev => !prev);
  }, [hideOrNot, getChildNodes, getNodes, getEdges, props.id, setNodes]);
  // -------------------------------

  const getChildNodesCount = useCallback((nodeId) => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    const childNodeIds = getChildNodes(nodeId, currentNodes, currentEdges);
    return childNodeIds.length;
  }, [getNodes, getEdges, getChildNodes]);

  const copyToClipBoard = useCallback(() => {
    const cNode = getNode(currentNode.id)
    navigator.clipboard.writeText(JSON.stringify(cNode.properties))
  }, [currentNode])
  useEffect(() => {
    posX.current = 0;
    getChildNodesCount(props.id)
    const currentNodes = getNodes();
    setCurrentNode(currentNodes.filter((node) => node.id === props.id)[0])
  }, [props.id])

  // get All Children of Node
  const getNodeWithAllChildren = (nodeId) => {
    const node = getNode(nodeId);
    const nodes = getNodes();
    const edges = getEdges();
    if (!node) return null;

    posX.current < node.position.x ? (posX.current = node.position.x) : null;

    const childConnections = edges
      .filter((edge) => edge.source === nodeId)
      .map((edge) => {
        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!targetNode) return null;

        return getNodeWithAllChildren(edge.target);
      })
      .filter(Boolean); // Remove null values

    if (childConnections.length === 0) {
      return {
        node: { ...node },
      };
    }
    return {
      node: { ...node },
      children: { ...childConnections },
    };
  };


  const addClone = () => {
    const cNode = getNode(props.id)
    const edges = getEdges()
    let parentId = edges.find((edge) => edge.target === props.id).source

    const structure = {
      ...getNodeWithAllChildren(cNode.id)
    };
    const nodeTypes = []
    const nodeEdges = []
    // edgeId renaming
    const findEdge = (nodeEdges, id) => {
      const newId = `${id}_${counter.current}_copy_edge`;

      if (nodeEdges.find((edge) => edge.id === newId)) {
        counter.current += 1;
        findEdge(nodeEdges, newId) 
      }
      counter.current += 1;
      return newId;
    }
    // Prevent infinite recursion by tracking visited nodes
    const traverseObjectModern = (obj, visitedNodes = new Set()) => {
      // Prevent processing the same node multiple times
      if (!obj || visitedNodes.has(obj.node.id)) return;
      visitedNodes.add(obj.node.id);
      const targetNode = obj.node;
      const id = `${targetNode.id.split('-')[0]}-${elementCounterRef.current[targetNode.id.split('-')[0]]}`;
      targetNode.id = id;
      targetNode.position = { x: (Object.keys(structure).includes("children") && posX.current) + targetNode.position.x + targetNode.measured.width + 100, y: targetNode.position.y };

      elementCounterRef.current[targetNode.id.split('-')[0]] += 1
      nodeTypes.push(targetNode)
      const newId = findEdge(nodeEdges, targetNode.id);
      nodeEdges.push(
        {
          id: newId,
          source: parentId,
          target: obj.node.id,
          type: 'smoothstep',
          animated: true
        }
      )
      dispatch(increaceNewElementId({id: targetNode.id.split('-')[0]}));

      if (obj.children) {
        Object.values(obj.children).forEach(child => {

          parentId = obj.node.id
          traverseObjectModern(child, visitedNodes)
        }
        );
      }
    };

    traverseObjectModern(structure);

    setNodes((nds) => nds.concat(nodeTypes));
    setEdges((eds) => eds.concat(nodeEdges));
  }

  // Redux state her değiştiğinde ref'i güncelle
  useEffect(() => {
    elementCounterRef.current = {...elementCounter};
    posX.current = 0;
    counter.current = 0;
  }, [elementCounter]);

  return (
    <>
      <div className="relative border-2 border-white border-solid bg-red-500 rounded-md m-0 p-3">
        {
          props.data.label.toLowerCase() === "containers" ||
            props.data.label.toLowerCase() === "div" ||
            props.data.label.toLowerCase() === "section" ||
            props.data.label.toLowerCase() === "table" ||
            props.data.label.toLowerCase() === "columns" ||
            props.data.label.toLowerCase() === "rows" ||
            props.data.label.toLowerCase() === "nav" ||
            props.data.label.toLowerCase() === "ul" ||
            props.data.label.toLowerCase() === "aside" ?
            (hideOrNot ? (
              <IoEye
                className="cursor-pointer text-white bg-orange rounded-lg w-4 h-4 text-center absolute"
                style={{ top: "-1em", left: "-1em" }}
                onClick={toggleHideOrShow}
              />
            ) : (
              <IoEyeOff
                className="cursor-pointer text-white bg-orange rounded-lg w-4 h-4 text-center absolute"
                style={{ top: "-1em", left: "-1em" }}
                onClick={toggleHideOrShow}
              />
            )) : ""}
        {
          props.data.label.toLowerCase() === "div" ||
            props.data.label.toLowerCase() === "section" ||
            props.data.label.toLowerCase() === "table" ||
            props.data.label.toLowerCase() === "nav" ||
            props.data.label.toLowerCase() === "li" ||
            props.data.label.toLowerCase() === "aside" ?
            <FaPlusCircle
              className="cursor-pointer text-white bg-orange rounded-lg w-4 h-4 text-center absolute"
              style={{ top: "-1em", left: "-2.2em" }}
              onClick={() => addClone()}
            /> : ""
        }

        <button
          onClick={() => setShowDeleteDialog(true)}
          className="absolute border-2 border-white border-solid  p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          style={{ top: "-10px", right: "-10px", }}
        >
          <X size={9} className="text-white" />
        </button>
        <div className="flex items-center">
          {props.data.label}
        </div>
        <div className=' absolute rounded-full bg-white flex justify-center items-center  absolute'
          style={{ bottom: "-11px", padding: "2px 5px", left: "50%", transform: "translateX(-50%)", gap: "5px" }}
        >
          {validText.filter(item => item === props.data.label.toLowerCase()).length > 0 ? (
            <MdOutlineTextFormat onClick={() => (dispatch(setTextFieldOpen({ id: props.id, open: !textFieldOpen.open })))}
              className='  text-white cursor-pointer bg-orange rounded-full'
              style={{ fontSize: "16px" }} />
          ) : ""}

          {
            props.id.includes("containers-") || props.id.includes("columns-") || props.id.includes("rows-") ?
              "" :
              <>
                <MdOutlineCopyAll onClick={copyToClipBoard} className=' text-orange cursor-pointer '
                  style={{ fontSize: "16px" }} />

                <ImPaste onClick={pastToProperties} className=' text-orange cursor-pointer '
                  style={{ fontSize: "16px" }} />
              </>
          }

          {// burada işlem yapcaz. yeni bir komponent ve bu komponente oluşturulan api datasını ekleyeceğiz
            props.id.includes("containers-") || props.id.includes("columns-") || props.id.includes("rows-") ?
              <AiFillApi
                onClick={() => dispatch(setLayoutApi(!layoutApi))}
                className="cursor-pointer text-orange"
                style={{ fontSize: "18px" }}
              />
              : ''
          }
          {
            props.id.includes("containers-") || props.id.includes("columns-") || props.id.includes("rows-") ?
              "" :
              <IoLogoCodepen
                className="cursor-pointer text-orange"
                style={{ fontSize: "18px" }}
                onClick={(e) => (dispatch(toggleSidebar(!side)), dispatch(handleSideBar()), dispatch(activeNodeId(props.id)))}

              />
          }
        </div>
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
            {getChildNodesCount(props.id) > 0 ?
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
};

export default memo(CustomDeleteNode);