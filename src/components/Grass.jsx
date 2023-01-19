export default function Grass()
{

    return <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
        <planeGeometry />
        <meshBasicMaterial color="yellowgreen" />
    </mesh>
}