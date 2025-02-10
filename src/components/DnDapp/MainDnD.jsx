import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  ControlButton,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from './DnDContextFile/DnDcontext';
import TopBar from './topToolsBar/TopBar';
import SidebarContainer from './sidebar/SidebarContainer';
import './main.css'
import CombineSliderTools from '../RightBarForStyles/MainCombine/CombineSliderTools';
import { increaceNewElementId } from '../../redux/reducers/DnDapp/CreateNewNode';
import { initialNodes } from './DefaultNodes/DefaultNodes';
import { initialEdges } from './DefaultNodes/DefaultEdges';
import NodeSelector from './DialogNode/DialogNode';
import { VscRunAll } from "react-icons/vsc";
import FullScreen from './PreviewFullScreen.jsx/FullScreen';
import useHTMLValidation from './useHTMLValidation';
import CustomNodeType from './DropNewNodeComponent/CustomNodeType';
import { ContainerNode } from './DefaultNodes/ContainerNode';
import { ChildNode } from './DefaultNodes/ChildNodes';
import { defaultEdgeOptions } from './DefaultEdgeOptions';
import { addElement } from '../../redux/reducers/DnDapp/NodeToHTMLtag';
import { activeAPI, activeNodeId } from '../../redux/reducers/DnDapp/AddStyleCSS';
import ApiRequestForm from './api/ApiConnect';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import { FaSave } from 'react-icons/fa';


import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChoiceApiComponent from './choseApi/ChoiceApiComponent';

const DnDFlow = () => {
  // notify
  const notify = () => toast.success('saving successful', {

    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
  //

  const { activePage } = useSelector((state) => state.pages);
  // Api Window
  const { apiWindow } = useSelector((state) => state.api);
  ///
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { mode } = useSelector((state) => state.sidebar);
  const { screenToFlowPosition, getNodes, getEdges } = useReactFlow();
  const [type] = useDnD();
  const dispatch = useDispatch()
  const { elementCounter } = useSelector((state) => state.newNode);
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [newNodeType, setNewNodeType] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [sourceNodeLabel, setSourceNodeLabel] = useState(null);
  const [pendingConnection, setPendingConnection] = useState(null);
  const { sidebarOpenOrClosed } = useSelector((state) => state.topBar);

  const [startApp, setStartApp] = useState(true);

  const {layoutApi} = useSelector((state) => state.api);

  const updateStorage = () => {
    const data = localStorage.getItem('pages');
    const newDataOfPage = { [activePage]: [getNodes(), getEdges()] };
    const arryData = JSON.parse(data) || [];
    
    // activePage değerine sahip olanları filtrele
    const updatedData = arryData.filter((item) => Object.keys(item)[0] !== activePage);
    
    // Yeni veriyi ekle
    updatedData.push(newDataOfPage);
    
    // Güncellenmiş veriyi storage'a kaydet
    localStorage.setItem('pages', JSON.stringify(updatedData));
    
  }

  useEffect(() => {
    if (!startApp) return
    const data = localStorage.getItem('pages');
    const newDataOfPage = { "home": [nodes, edges] };
    const arryData = JSON.parse(data) || [];
    const index = arryData.findIndex(item => JSON.stringify(item) === JSON.stringify(newDataOfPage));
    if (index === -1) {
      arryData.push(newDataOfPage);
      localStorage.setItem('pages', JSON.stringify(arryData));
    }
    else {
      localStorage.setItem('pages', JSON.stringify(arryData));
      arryData[index] = newDataOfPage;
    }
    setStartApp(false);
  }, [startApp]);

  // Add HTML validation hook
  const { isValidConnection, isValidNewNode } = useHTMLValidation(nodes, edges);


  const onConnectEnd = useCallback(
    (event, params) => {
      if (!params.isValid && !isValidConnection(params)) {
        event.preventDefault();
        setShowNodeSelector(true);
        setPendingConnection({
          params,
          position: screenToFlowPosition({ x: event.clientX, y: event.clientY }),
        });
      }
    },
    [screenToFlowPosition]
  );

  const onConnectStart = (_, { nodeId, handleType }) => {
    setSourceNode(nodeId)
    const res = nodes.filter(node => node.id === nodeId)[0].data
    setSourceNodeLabel(res.label)
  };
  // json data for saving and loading

  
  const handleNodeTypeSelect = (selectedType) => {
    if (pendingConnection) {
      const { params, position } = pendingConnection;
      const id = `${selectedType}-${elementCounter[selectedType]}`;
      const isA = selectedType.toLowerCase() === "a" ? { href: "#" } : { innerText: "" }

      const newNode = {
        id,
        type: 'customNode',
        position,
        typeOf: selectedType.toLowerCase(),
        data: { label: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}` },
        properties: { width: "100%" },
        cName: '',
        dragHandle: ".drag-me-bro",
        ...isA,
      };

      dispatch(increaceNewElementId({ id: selectedType }));
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({ id: `${id}_edge`, source: params.fromNode.id, target: id, type: 'smoothstep', animated: true })
      );
      setPendingConnection(null);
    }
    setNewNodeType(selectedType);
    setShowNodeSelector(false);
  };


  const onConnect = useCallback(
    (params) => {
      if (isValidConnection(params)) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [isValidConnection],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      let id = event.dataTransfer.getData('id');
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newId = `${id}-${elementCounter[id]}`;
      const styleNewNode = {
        width: "100%",
      }

      const newNode = {
        id: newId,
        type: 'customNode', // Özel node tipiniz
        typeOf: id.toLowerCase(),
        position,
        data: { id: newId, label: `${id.charAt(0).toUpperCase() + id.slice(1)}` },
        style: id.toLowerCase() === "containers" || id.toLowerCase() === "rows" || id.toLowerCase() === "columns" ? {} : { backgroundColor: "#2563eb" },
        properties: id.toLowerCase() === "containers" || id.toLowerCase() === "rows" || id.toLowerCase() === "columns" ? {} : styleNewNode,
        cName: '',
        innerText: '',
        dragHandle: ".drag-me-bro",
      };
      dispatch(increaceNewElementId({ id: id }));
      setNodes((nds) => nds.concat(newNode));
      updateStorage();
      // Edge'ler için default options'ları set et
    },
    [screenToFlowPosition, type, elementCounter],
  );
  const nodeTypes = {
    customNode: CustomNodeType,
    container: ContainerNode,
    header: ChildNode,
    section: ChildNode,
    footer: ChildNode

  };

  const onNodeClick = (event, node) => {
    node.typeOf.toLowerCase() === "containers" ||
      node.typeOf.toLowerCase() === "rows" ||
      node.typeOf.toLowerCase() === "body" ||
      node.typeOf.toLowerCase() === "columns" ?
      dispatch(activeAPI(node.id)) :
      dispatch(activeNodeId(node.id))
  }


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        updateStorage();
        notify();

      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePage]);

  useEffect(() => {
    const data = localStorage.getItem('pages');
    const arryData = JSON.parse(data) || [];
    // activePage değerine sahip olanları filtrele
    const _data = arryData.filter((item) => Object.keys(item)[0] === activePage);
    const newNodes = Object.values(_data[0])[0][0]
    const newedges = Object.values(_data[0])[0][1]
    setNodes(newNodes);
    setEdges(newedges);
  }, [activePage])

  useEffect(() => {
    updateStorage();
  }, [nodes])
  return (
    <div className="flex flex-col w-full h-full min-h-screen relative" >
      <ToastContainer />
      {sidebarOpenOrClosed && <FullScreen />}
      {apiWindow && (
        <ThemeProvider theme={createTheme({ palette: { mode: mode } })}>
          <ApiRequestForm />
        </ThemeProvider>
      )}
      <div className="w-full">
        <TopBar />
      </div>
      <div className="flex w-full h-[calc(100vh-64px)] relative" ref={reactFlowWrapper}>
        <SidebarContainer />
        {layoutApi && <ChoiceApiComponent />}
        <ReactFlow
          noWheelClassName="nowheel"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodeClick={onNodeClick}
          snapToGrid
          snapGrid={[5, 5]}
          fitView
          className="w-full h-full"
          //edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          colorMode={mode === 'dark' ? 'dark' : 'light'}
        >

          <NodeSelector
            isVisible={showNodeSelector}
            onSelect={handleNodeTypeSelect}
            onCancel={() => setShowNodeSelector(false)}
            sourceNodeLabel={sourceNodeLabel}
          />
          <Controls>
            <ControlButton onClick={() => (updateStorage,notify())}>
              <FaSave />
            </ControlButton>
          </Controls>
          {/* <MiniMap /> */}
        </ReactFlow>
        <CombineSliderTools />
      </div>
    </div>
  );
};

// Root component with proper styling
const App = () => (
  <div className="w-screen h-screen overflow-hidden">
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  </div>
);

export default App;