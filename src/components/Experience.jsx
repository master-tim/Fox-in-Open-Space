import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { DirectionalLightHelper } from "three"
import { Html, OrbitControls, useHelper, useAnimations, useGLTF  } from "@react-three/drei"

import Grass from "./Grass"

const useKeyPress = targetKey => {
    const [keyPressed, setKeyPressed] = useState(false)
  
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

    const fox = useGLTF('../Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    const  action = animations.actions['Run'].play()

    const grass = useRef()
    const directionalLight = useRef()

    useHelper(directionalLight, DirectionalLightHelper, 'blue')

    useFrame((state, delta) => 
    {
        // console.log(fox.current.rotation.y)

        state.camera.position.x = fox.current.position.x
        state.camera.position.y = fox.current.position.y + 4
        state.camera.position.z = fox.current.position.z + 5
        state.camera.lookAt(fox.current.position.x, fox.current.position.y , fox.current.position.z)

        directionalLight.current.position.x = fox.current.position.x - 2
        directionalLight.current.position.y = fox.current.position.y + 5
        directionalLight.current.position.z = fox.current.position.z + 10

        directionalLight.current.target.position.x = fox.current.position.x 
        directionalLight.current.target.position.y = fox.current.position.y 
        directionalLight.current.target.position.z = fox.current.position.z 

        if (forward){
            fox.current.position.z -= 0.05
            console.log('forward')
        }
        else if (back){
            fox.current.position.z += 0.05
            console.log('backward')
        }
        else if (left){
            fox.current.position.x -= 0.05
            console.log('left')
        }
        else if (right){
            fox.current.position.x += 0.05
            console.log('right')
        }
        else{
            console.log('stop')
            action.fadeOut(0)
        }

    })
    useEffect(()=>{

        action.reset().fadeIn().play()

        if (forward && fox.current.rotation.y != Math.PI){
            fox.current.rotation.y = Math.PI
        }
        else if (back && fox.current.rotation.y != 0){
            fox.current.rotation.y = 0
        }
        else if (right && fox.current.rotation.y != Math.PI/2){
            fox.current.rotation.y = Math.PI/2
        }
        else if (left && fox.current.rotation.y != Math.PI*1.5){
            fox.current.rotation.y = Math.PI*1.5
        }

    },[forward, back, left, right])

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
        

        <primitive ref={fox} position={[0, -1, 0]} rotation-y={Math.PI} scale={ 0.02 } object={fox.scene} />


    </>
}