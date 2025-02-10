import { useEffect, useState, useRef } from 'react';
import { Player } from '@lordicon/react';
import ICON from '../../assets/json/wired-gradient-1315-computer-mouse-hover-pinch.json';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/reducers/DnDapp/TopBarAction';
import { useReactFlow } from "@xyflow/react";
import { addElement } from '../../redux/reducers/DnDapp/NodeToHTMLtag';


export default function PlayOnce() {
    const playerRef = useRef(null);
    const isFirstRender = useRef(true); // İlk render durumunu takip etmek için
    const dispatch = useDispatch();
    const { sidebarOpenOrClosed } = useSelector((state) => state.topBar);

    useEffect(() => {
        playerRef.current?.playFromBeginning();
        isFirstRender.current = false; // İlk renderdan sonra false yap
    }, [isFirstRender]);

    const handleClick = () => {
        dispatch(toggleSidebar(!sidebarOpenOrClosed));
    };


    const { getNodes, getEdges } = useReactFlow();

    const edges = getEdges()
    const nodes = getNodes()
    const getNodeWithAllChildren = (nodeId) => {
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
        const isA = node.typeOf === 'a' ? {href: node.href} : {innerText: node.innerText}
        return {
            typeOf: node.typeOf || "div",
            properties: node.properties || {},
            cName: node.cName || '',
            children: childConnections,
            ...isA,
        };
    };

    const logGraphStructure = () => {
        const rootNode = nodes[0];
        if (!rootNode) return null;

        const structure = {
            [rootNode.data.typeOf || "div"]: getNodeWithAllChildren(rootNode.id)
        };

    

        // If you need to dispatch the structure itself (not the string)
        dispatch(addElement(structure));

        return structure;
    };

    useEffect(() => {
        logGraphStructure();
    }, [edges,nodes]);

    return (
        <div
            className='flex'
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <Player
                ref={playerRef}
                icon={ICON}
                onComplete={() => playerRef.current?.playFromBeginning()}
            />

        </div>
    );
}
