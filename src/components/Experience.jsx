import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useControls } from "leva"

import Fox from "./Fox"
import Grass from "./Grass"

const useKeyPress = targetKey => {
    const [keyPressed, setKeyPressed] = useState(false)
    const [posX, setPosX] = useState(0)
  
    const downHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(true)
    }
  
    const upHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(false)
    }
    
    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
    
        return () => {
          window.removeEventListener('keydown', downHandler)
          window.removeEventListener('keyup', upHandler)
        }
      }, [])

      return keyPressed
}

export default function Experience(){

    const forward = useKeyPress('w')
    const back = useKeyPress('s')
    const left = useKeyPress('a')
    const right = useKeyPress('d')

    const cubeRef = useRef()
    
    
    useFrame((state, delta) => 
    {
        state.camera.position.x = cubeRef.current.position.x
        state.camera.position.y = cubeRef.current.position.y + 4
        state.camera.position.z = cubeRef.current.position.z + 5
        state.camera.lookAt(cubeRef.current.position.x, cubeRef.current.position.y , cubeRef.current.position.z)
        cubeRef.current.rotation.y -= delta * 0.5
        // cubeRef.current.position.x = Math.sin(state.clock.elapsedTime)* 5
        // cubeRef.current.position.z = Math.cos(state.clock.elapsedTime)* 5
        if (forward){
            cubeRef.current.position.z -= 0.05
            console.log('forward');
        }
        else if (back){
            cubeRef.current.position.z += 0.05
            console.log('backward');
        }
        else if (left){
            cubeRef.current.position.x -= 0.05
            console.log('left');
        }
        else if (right){
            cubeRef.current.position.x += 0.05
            console.log('right');
        }
        // console.log(cubeRef.current.position.x)
    })

    return <>
    
        <Perf position="top-left"/>

        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight intensity={ 0.5 } />

        <Grass />
        
        {/* <Fox position={foxPosition} scale={ 0.02 } foxAnimation={'Walk'}  foxName='하카'>
        </Fox>  */}
        
        <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

    </>
}