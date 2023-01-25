import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
import { useControls } from "leva"

import Fox from "./Fox"
import Grass from "./Grass"
import { useFrame } from "@react-three/fiber"

export default function Experience(){

    const fox = useRef()

    const { foxPosition } = useControls ('fox position', {
        foxPosition : {value: [0, -1, 0]}
    })
    
    
    useFrame((state) => 
    {
        state.camera.position.x = foxPosition[0]
        state.camera.position.y = foxPosition[1] + 4
        state.camera.position.z = foxPosition[2] - 8
        state.camera.lookAt(foxPosition[0], foxPosition[1], foxPosition[2])
    })

    return <>
    
        <Perf position="top-left"/>

        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight intensity={ 0.5 } />

        <Grass />
        
        <Fox ref={fox} foxAnimation={'Walk'}  scale={ 0.02 } position={foxPosition} foxName='하카'/> 


    </>
}