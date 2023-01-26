import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { DirectionalLightHelper } from "three"
import { Html, OrbitControls, useHelper } from "@react-three/drei"
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
    const grass = useRef()
    const directionalLight = useRef()

    useHelper(directionalLight, DirectionalLightHelper, 'blue')

    useFrame((state, delta) => 
    {
        // console.log(grass.current)

        state.camera.position.x = cubeRef.current.position.x
        state.camera.position.y = cubeRef.current.position.y + 4
        state.camera.position.z = cubeRef.current.position.z + 5
        state.camera.lookAt(cubeRef.current.position.x, cubeRef.current.position.y , cubeRef.current.position.z)

        directionalLight.current.position.x = cubeRef.current.position.x - 2
        directionalLight.current.position.y = cubeRef.current.position.y + 5
        directionalLight.current.position.z = cubeRef.current.position.z + 10

        directionalLight.current.target.position.x = cubeRef.current.position.x 
        directionalLight.current.target.position.y = cubeRef.current.position.y 
        directionalLight.current.target.position.z = cubeRef.current.position.z 

        // console.log(directionalLight.current.target.position.x);

        cubeRef.current.rotation.y -= delta * 0.5

        if (forward){
            cubeRef.current.position.z -= 0.05
            console.log('forward')
        }
        else if (back){
            cubeRef.current.position.z += 0.05
            console.log('backward')
        }
        else if (left){
            cubeRef.current.position.x -= 0.05
            console.log('left')
        }
        else if (right){
            cubeRef.current.position.x += 0.05
            console.log('right')
        }

    })
    useEffect(()=>console.log(grass.current),[])

    return <>
    
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>
        
        <directionalLight 
            ref={directionalLight}
            castShadow
            position={[-2, 90, 90]} 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
            intensity={ 1 }
        />

        <ambientLight intensity={ 0.5 } />

        <Grass ref={grass}/>
        
        {/* <Fox ref={fox} position={foxPosition} scale={ 0.02 } foxAnimation={'Walk'}  foxName='하카'>
        </Fox>  */}
        
        <mesh ref={ cubeRef } castShadow receiveShadow position={[0,0,0]}rotation-y={ Math.PI * 0.25 } scale={ 1 } >
            <boxGeometry />
            <meshStandardMaterial color="pink" />
        </mesh>

    </>
}