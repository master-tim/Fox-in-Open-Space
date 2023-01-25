import { OrbitControls } from "@react-three/drei"
import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState, useMemo, Suspense } from "react"
import { useFrame } from "@react-three/fiber"

import Fox from "./Fox"

export default function Experience(){

    const numberOfFoxes = 5

    useFrame((state) => 
    {
        // state.camera.position.x = 5*Math.sin(state.clock.elapsedTime)
        // state.camera.position.y = 3
        // state.camera.position.z = 5*Math.cos(state.clock.elapsedTime)

    })
    
    const positionFox = useMemo(()=>
    {
        const position = []

        for(let i=0; i<numberOfFoxes; i++){
            let temp = []
            temp.push(5*(Math.random()-0.5))
            temp.push(-1)
            temp.push(5*(Math.random()-0.5))
            position.push(temp)
        }
        
        return position
    }, [numberOfFoxes])

    return <>
    
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />

        <ambientLight intensity={ 0.5 } />
        {/* <Suspense fallback={null}>
            {[...Array(numberOfFoxes)].map((value, index)=>
                <Fox 
                    key={`index${index}`} 
                    keyName={`count${index}`} 
                    foxAnimation='Walk'  
                    scale={ 0.02 } 
                    position={positionFox[index]} 
                    foxName={`count${index}`} 
                />
                
            )}
        </Suspense> */}
        <Fox 
            // key={`index${index}`} 
            foxAnimation='Run'  
            scale={ 0.02 } 
            position={[2, -1, 0]} 
            foxName='하카'
        />
        <Fox 
            // key={`index${index}`} 
            foxAnimation='Run'  
            scale={ 0.02 } 
            position={[0, -1, 0]} 
            foxName='하카'
        />

        
        <mesh 
            position-y={ - 1 } 
            rotation-x={ - Math.PI * 0.5 } 
            scale={ 20 }
        >
            <planeGeometry />
            <meshBasicMaterial color="yellowgreen" />
        </mesh>


    </>
}