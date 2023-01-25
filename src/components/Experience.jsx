import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
import { useControls } from "leva"

import Fox from "./Fox"
import Grass from "./Grass"
import { useFrame } from "@react-three/fiber"

const useKeyPress = targetKey => {
    const [keyPressed, setKeyPressed] = useState(false);
  
    const downHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(true);
    };
  
    const upHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(false);
    };
    
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
    
        return () => {
          window.removeEventListener('keydown', downHandler);
          window.removeEventListener('keyup', upHandler);
        };
      }, []);

      return keyPressed;
}

export default function Experience(){

    const forwardPressed = useKeyPress('w')
    const backPressed = useKeyPress('s')
    
    const cubeRef = useRef()

    const { foxPosition } = useControls ('fox position', {
        foxPosition : {value: [0, -1, 0]}
    })
    
    
    useFrame((state, delta) => 
    {
        // state.camera.position.x = foxPosition[0]
        // state.camera.position.y = foxPosition[1] + 4
        // state.camera.position.z = foxPosition[2] - 8
        // state.camera.lookAt(foxPosition[0], foxPosition[1], foxPosition[2])
        // cubeRef.current.rotation.y -= delta * 0.5

    }, )

    return <>
    
        <Perf position="top-left"/>

        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight intensity={ 0.5 } />

        <Grass />
        
        <Fox foxAnimation={'Walk'}  scale={ 0.02 } position={foxPosition} foxName='하카'/> 

        <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

    </>
}