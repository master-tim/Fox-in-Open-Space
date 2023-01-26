import { Sphere, useTexture, Plane } from "@react-three/drei";

export default function Grass()
{
    const [aoMap,map,displacementMap,normalMap,roughnessMap] = useTexture([
        "Grass001_1K_AmbientOcclusion.jpg",
        "Grass001_1K_Color.jpg",
        "Grass001_1K_Displacement.jpg",
        "Grass001_1K_Normal.jpg",
        "Grass001_1K_Roughness.jpg"
    ]);
    return <Plane 
        rotation-x={ - Math.PI * 0.5 }
        position-y={ - 1 }
        args={[40 , 40]} 
        positionY={2}
    >
        <meshPhysicalMaterial
            aoMap={aoMap}
            map={map}
            displacementMap={displacementMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            displacementScale={0.2}
        />
    </Plane>
    // <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
    //     <planeGeometry />
    //     <meshBasicMaterial color="yellowgreen" />
    // </mesh>
}