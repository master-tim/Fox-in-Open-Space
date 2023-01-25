import * as THREE from "three"
import { Perf } from "r3f-perf"
import React, { useRef, useEffect, useState, useMemo, Suspense } from "react"
import { useFrame, useGraph } from "@react-three/fiber"
import Stacy from "./Stacy"
import { useControls } from "leva"

function Rig() {
    return useFrame((state) => {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1.5 + state.mouse.x / 4, 0.075)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
    })
  }

export default function Experience(){

    const { numberOfModels } = useControls ('number of models', {
        numberOfModels : {value: 3}
    })
    
    const positionModels = useMemo(()=>
    {
        const position = []

        for(let i=0; i<numberOfModels; i++){
            let temp = []
            temp.push(10*(Math.random()-0.3))
            temp.push(-1)
            temp.push(7*(Math.random()-0.7))
            position.push(temp)
        }
        return position

    }, [numberOfModels])

    const modelNames = ['Debra','Judith','Anne','Janet','Carolyn','Mildred','Deborah','Dorothy','Susan','Norma','Cheryl','Barbara','Ashley','Linda','Brenda','Laura','Tammy','Emily','Elizabeth','Irene','Paula','Amy','Frances','Christina','Cynthia']

    return <>
    
        <Perf position="top-left"/>

        <directionalLight castShadow position={[-2, 5, 10]} shadow-mapSize-width={1024} shadow-mapSize-height={1024} intensity={ 1 } />

        <ambientLight intensity={ 0.5 } />

        <Suspense fallback={null}>
            {[...Array(numberOfModels)].map((value, index)=>
                <Stacy 
                    key={`index${index}`} 
                    keyName={`count${index}`} 
                    pose={Math.floor(Math.random() * 9)}
                    position={positionModels[index]} 
                    modelName={modelNames[Math.floor(Math.random() * 24)]} 
                />
                
            )}
        </Suspense>
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow >
            <planeBufferGeometry args={[10, 10, 1, 1]} />
            <shadowMaterial transparent opacity={0.3} />
        </mesh>
        <Rig />


    </>
}