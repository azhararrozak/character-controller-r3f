import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import { Character } from "./Character"
import { useRef } from "react"
import { Vector3 } from "three"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useKeyboardControls } from "@react-three/drei"


export const CharacterController = () => {
    const { WALK_SPEED, RUN_SPEED } = useControls("Character Control", {
        WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
        RUN_SPEED: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
    })
    const rb = useRef()
    const container = useRef()
    const character = useRef()
    const cameraTarget = useRef()
    const cameraPosition = useRef()
    const cameraWorldPosition = useRef(new Vector3())
    const cameraLookAtWorldPosition = useRef(new Vector3())
    const cameraLookAt = useRef(new Vector3())
    const [, get] = useKeyboardControls()

    useFrame(({camera}) => {
        // if (rb.current) {
        //     const vel = rb.current.linvel()
        //     const movement = {
        //         x: 0,
        //         z: 0,
        //     }
        //     if (get().forward){
        //         movement.z = 1
        //     }
        //     if (get().backward){
        //         movement.z = -1
        //     }

        //     let speed = get().run ? RUN_SPEED : WALK_SPEED

        //     if(get().left){
        //         movement.x = 1
        //     }

        //     if(get().right){
        //         movement.x = -1
        //     }

        //     if(movement.x !== 0 || movement.z !==0 ){
        //         vel.z = speed * movement.z
        //     }

        //     rb.current.setLinvel(vel, true)
        // }
        cameraPosition.current.getWorldPosition(cameraWorldPosition.current)
        camera.position.lerp(cameraWorldPosition.current, 0.1)

        if(cameraTarget.current) {
            cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current)
            cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1)
            camera.lookAt(cameraLookAt.current)
        }
    })

    return (
        <RigidBody colliders={false} ref={rb} lockRotations>
            <group ref={container}>
                <group ref={cameraTarget} position-z={1.5} />
                <group ref={cameraPosition} position-y={4} position-z={-4} />
                <group ref={character}>
                <Character scale={0.18} position-y={-0.25} animation={"idle"} />
                </group>
            </group>  
            <CapsuleCollider args={[0.08, 0.15]}/>
        </RigidBody>
    )
}