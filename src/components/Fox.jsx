import { useAnimations, useGLTF } from "@react-three/drei"
import { useControls } from "leva"
import { useEffect, useRef } from "react"

export default function Fox(props)
{
    const fox = useGLTF('../Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)
    
    useEffect(()=>
    {
        console.log(props.foxAnimation)
        const action = animations.actions[props.foxAnimation]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () =>
        {
            action.fadeOut(0.5)
            console.log('fade out')
        }
    }, [props.foxAnimation] )

    return <primitive {...props} object={fox.scene} />
}