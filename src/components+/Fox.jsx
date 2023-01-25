import { Html, useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef,useState } from "react"

export default function Fox(props)
{
    const fox = useGLTF('../Fox/glTF/Fox.gltf')

    const [count, setCount] = useState(parseInt(localStorage.getItem(props.keyName) ?? 0))
    const animations = useAnimations(fox.animations, fox.scene)
    

    useEffect(()=>
    {
        console.log(props.position)
        const action = animations.actions[props.foxAnimation]
        
        action
            .reset()
            .fadeIn(0.1)
            .play()
        
        return () =>
        {
            action.fadeOut(0.1)
            localStorage.removeItem(props.keyName)
        }
    } )

    useEffect(() => {
        localStorage.setItem(props.keyName, count)
    }, [count])

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