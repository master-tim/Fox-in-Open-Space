import { OrbitControls, Html } from "@react-three/drei"
import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
// import * as THREE from "three"
import { useControls } from "leva"

import Fox from "./Fox"
import Grass from "./Grass"
import { useFrame } from "@react-three/fiber"

function randPos(){
    let arr = []
    arr.push(Math.random())
    arr.push(-1)
    arr.push(Math.random())

    return arr
}

export default function Experience(){

    const [key, setKey] = useState('')
    const fox = useRef()
    const foxAnimationOptions = ['Walk', 'Run', 'Survey', 'Stop']
    
    const { foxPosition } = useControls ('fox position', {
        foxPosition : {value: [0, -1, 0]}
    })
    
    
    let foxAnimation = 'Walk'

    window.addEventListener("keypress", (e) => {setKey(e.code)})
    

    useFrame((state) => 
    {
        // console.log(state.camera.position)
        // console.log([Math.random(), Math.random(), Math.random() ])
        // console.log(randPos());
        // state.camera.position.x = 5*Math.sin(state.clock.elapsedTime)
        // state.camera.position.z = 5*Math.cos(state.clock.elapsedTime)

    })
    // THREE.Camera.getWorldDirection(THREE.Vector3(0, 0, 0))


    switch (key)
    {
        case 'KeyW': foxAnimation = foxAnimationOptions[0] 
        break
        case 'KeyS': foxAnimation = foxAnimationOptions[3] 
        break
        case 'KeyC': foxAnimation = foxAnimationOptions[2]
        break
        case 'KeyE': foxAnimation = foxAnimationOptions[1]
        break
    }
    // console.log(foxAnimation)

    return <>
    
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight intensity={ 0.5 } />

        <Grass />
        
        <Fox ref={fox} foxAnimation={foxAnimation}  scale={ 0.02 } position={foxPosition} foxName='하카'/> 


    </>
}