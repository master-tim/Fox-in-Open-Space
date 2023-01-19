import { OrbitControls, Html } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useControls } from "leva"

import Fox from "./Fox"
import Grass from "./Grass"

export default function Experience(){

    const fox = useRef()
    const foxAnimationOptions = ['Walk', 'Run', 'Survey']
    
    const { foxPosition } = useControls ('fox position', {
        foxPosition : {value: [0, -1, 0]}
    })
    const {foxAnimation} = useControls ('fox animation', {
        foxAnimation: { options: foxAnimationOptions }
    })
    

    useEffect(()=>
    {
        
    }, [])

    return <>
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight intensity={ 0.5 } />

        <Grass />
        
        <Fox ref={fox} foxAnimation={foxAnimation}  scale={ 0.02 } position={foxPosition} > 
            <Html
                position={ [0, 92, 43] }
                wrapperClass="label"
                center
                distanceFactor={ 8 }
                occlude={ [ fox ] }
            >
                하카
            </Html>
        </Fox>

    </>
}