import { OrbitControls } from "@react-three/drei"
import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"

import Fox from "./Fox"

export default function Experience(){

    const [key, setKey] = useState('')

    useFrame((state) => 
    {
        // console.log(state.camera.position)
        // console.log([Math.random(), Math.random(), Math.random() ])
        // console.log(randPos());
        // state.camera.position.x = 5*Math.sin(state.clock.elapsedTime)
        // state.camera.position.z = 5*Math.cos(state.clock.elapsedTime)

    })

    return <>
    
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />

        <ambientLight intensity={ 0.5 } />
        
        <Fox foxAnimation='Walk' scale={ 0.02 } position={[0, -1, 0]} foxName='하카'/> 
        
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
            <planeGeometry />
            <meshBasicMaterial color="yellowgreen" />
        </mesh>


    </>
}