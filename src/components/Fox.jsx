import { useAnimations, useGLTF } from "@react-three/drei"
import { useControls } from "leva"
import { useEffect } from "react"

export default function Fox(props)
{
    const fox = useGLTF('../Fox/glTF/Fox.gltf')
    console.log(fox)

    return <primitive {...props} object={fox.scene} />
}