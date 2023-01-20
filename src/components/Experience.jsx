import { OrbitControls, Html } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useControls } from "leva"

import Fox from "./Fox"
import Grass from "./Grass"

export default function Experience(){

    const [key, setKey] = useState('')
    const fox = useRef()
    const foxAnimationOptions = ['Walk', 'Run', 'Survey', 'Stop']
    
    const { foxPosition } = useControls ('fox position', {
        foxPosition : {value: [0, -1, 0]}
    })
    // let {foxAnimation} = useControls ('fox animation', {
    //     foxAnimation: { options: foxAnimationOptions }
    // })
    let foxAnimation = 'Walk'
    
    // window.addEventListener('keydown', e =>
    // {
    //     // console.log(e.code)
    //     switch (e.code)
    //     {
    //         case 'KeyW': foxAnimation = foxAnimationOptions[0] 
    //         break
    //         case 'KeyS': foxAnimation = foxAnimationOptions[3] 
    //         break
    //         case 'KeyC': foxAnimation = foxAnimationOptions[2]
    //         break
    //         case 'KeyE': foxAnimation = foxAnimationOptions[1]
    //         break
    //     }
    //     console.log(foxAnimation)

    // })
    // useEffect(()=>
    // {
    //     window.addEventListener("keypress", (e) => {setKey(e.code)})
    //     // console.log(key)
    //     switch (key)
    //     {
    //         case 'KeyW': foxAnimation = foxAnimationOptions[0] 
    //         break
    //         case 'KeyS': foxAnimation = foxAnimationOptions[3] 
    //         break
    //         case 'KeyC': foxAnimation = foxAnimationOptions[2]
    //         break
    //         case 'KeyE': foxAnimation = foxAnimationOptions[1]
    //         break
    //     }
    //     console.log(foxAnimation)
    //     return () => {
    //         window.removeEventListener("keypress", ()=>{});
    //     };
    // }, [key])

    window.addEventListener("keypress", (e) => {setKey(e.code)})
    // console.log(key)
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
    console.log(foxAnimation)

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