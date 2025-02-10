import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Collapse, List, ListItemButton, ListItem, ListItemText, Paper, ListItemIcon } from "@mui/material";
import { useReactFlow } from "@xyflow/react";
import { ToastContainer } from "react-toastify";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { IoLayers } from "react-icons/io5";

const Layers = () => {
    const [layers, setLayers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const { sidebarOpenOrClosed } = useSelector((state) => state.sidebar);
    const { mode, modeColor } = useSelector((state) => state.sidebar);
    const { getNodes, getEdges } = useReactFlow();
    const { elements } = useSelector((state) => state.nodeToHtml);
    // JSON içindeki tüm düğümleri alarak düz bir liste oluşturur
    const traverseJson = (node, depth = 1, result = []) => {
        if (!node || typeof node !== "object") return result;

        result.push({ id: `layer-${result.length}`, name: node.typeOf, depth });

        if (Array.isArray(node.children)) {
            node.children.forEach((child) => traverseJson(child, depth + 1, result));
        }

        return result;
    };

    const getNodeWithAllChildren = (nodeId) => {
        const nodes = getNodes();
        const edges = getEdges();
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return null;

        const childConnections = edges
            .filter((edge) => edge.source === nodeId)
            .map((edge) => {
                const targetNode = nodes.find((n) => n.id === edge.target);
                if (!targetNode) return null;

                return getNodeWithAllChildren(edge.target);
            })
            .filter(Boolean); // Remove null values
        const isA = node.typeOf === 'a' ? { href: node.href } : { innerText: node.innerText }
        return {
            typeOf: node.typeOf || "div",
            properties: node.properties || {},
            cName: node.cName || '',
            children: childConnections,
            ...isA,
        };
    };

    const logGraphStructure = () => {
        const nodes = getNodes();
        const rootNode = nodes[0];
        if (!rootNode) return null;

        const structure = {
            [rootNode.data.typeOf || "div"]: getNodeWithAllChildren(rootNode.id)
        };

        return structure;
    };

    // Redux'tan gelen elements değiştiğinde layers state'ini güncelle
    useEffect(() => {
        if (open) {

            const nodeJson = logGraphStructure();
            if (nodeJson?.div) {
                const newLayers = traverseJson(nodeJson.div);
                setLayers(newLayers);
            }
        }
    }, [open, elements]);
    const handleClick = () => {
        setOpen(!open);
    };

    // Drag işlemi tamamlandığında sıralamayı güncelle
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedLayers = [...layers];
        const [movedLayer] = reorderedLayers.splice(result.source.index, 1);
        reorderedLayers.splice(result.destination.index, 0, movedLayer);

        setLayers(reorderedLayers);
    };

    return (
        <>
            <ToastContainer />
            <ListItemButton onClick={handleClick} sx={{ borderRadius: "5px" }}>
                <ListItemIcon sx={{ width: "content" }}>
                    <IoLayers style={{ color: "#ee6c4d" }} size={16} />
                </ListItemIcon>
                {sidebarOpenOrClosed &&
                    <><ListItemText sx={{ color: mode === "dark" ? modeColor.lightMore : modeColor.darkMore }} primary="Layers" />
                        {open ?
                            <MdExpandLess style={{
                                color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess,
                            }} /> :
                            <MdExpandMore style={{
                                color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess,
                            }} />}</>
                }
            </ListItemButton>
            {sidebarOpenOrClosed && open && <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="layers-list">
                    {(provided) => (
                        <Collapse sx={{
                            backgroundColor: mode === "dark" ? modeColor.darkMore : modeColor.lightMore
                        }} in={open} timeout="auto" unmountOnExit>
                            <List
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{
                                    backgroundColor: mode === "dark" ? modeColor.darkMore : modeColor.lightMore,
                                    maxHeight: 200,
                                    overflowY: "auto",

                                }}
                            >
                                {layers.map((layer, index) => (
                                    <Draggable key={layer.id} draggableId={layer.id} index={index}>
                                        {(provided, snapshot) => (
                                            <Paper
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                provided={provided}
                                                sx={{
                                                    p: "0 5px",
                                                    pl: `${layer.depth * 10}px`, // İç içe yapıya göre padding ekler
                                                    display: "flex",
                                                    alignItems: "center",
                                                    color: mode === "dark" ? modeColor.lightLess : modeColor.darkLess,
                                                    backgroundColor: mode === "dark" ? modeColor.darkMore : modeColor.lightMore,
                                                    borderRadius: 0,
                                                }}
                                            >
                                                <ListItem disablePadding>
                                                    <ListItemText primary={":".repeat(layer.depth) + " " + layer.name} />
                                                </ListItem>
                                            </Paper>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        </ Collapse>
                    )}
                </Droppable>
            </DragDropContext>
            }
        </>
    );
};

export default Layers;
