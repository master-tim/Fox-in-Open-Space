import { Html, useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"

export default function Fox(props)
{
    const fox = useGLTF('../Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    let action = animations.actions[props.foxAnimation]

    useEffect(()=>
    {
        // console.log('recieved props: ', props.foxAnimation)
        
        if(props.foxAnimation == 'Stop')
        {
            action = animations.actions['Walk']
        }
        else 
        {
            action = animations.actions[props.foxAnimation]
            action
                .reset()
                .fadeIn(0.1)
                .play()
        }
        return () =>
        {
            action.fadeOut(0.1)
            // console.log('fade out')
        }
    }, [props.foxAnimation] )

    return <primitive {...props} object={fox.scene} >
        <Html
                position={ [0, 92, 43] }
                wrapperClass="label"
                center
                distanceFactor={ 8 }
                occlude={ [ fox ] }
            >
                {props.foxName}
            </Html>
    </primitive>
}