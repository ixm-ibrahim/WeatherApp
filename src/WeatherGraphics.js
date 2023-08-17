import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vec2 } from "three";

import vertexShader from './Shaders/vert';
import fragmentShader from './Shaders/frag';

export const BoxGraphic = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

export const ShadersGraphic = ({ canvasRef}) => {
    const { mouse } = useThree()

    // This reference will give us direct access to the mesh
    const mesh = useRef();
    
    const uniforms = useMemo(
        () => ({
            iTime: {
                value: 0.0,
            },
            u_aspectRatio: {
                value: 1.0,
            },
            iMouse: {
                value: mouse,
            },
        }), []
    );

    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.iTime.value = clock.getElapsedTime();
        mesh.current.material.uniforms.u_aspectRatio.value = canvasRef.current.clientHeight / canvasRef.current.clientWidth;
    });
    
    return (
      <mesh ref={mesh} position={[0, 0, 0]} scale={1.0}>
        {/*PlaneBufferGeometry?*/}
        <planeGeometry args={[2, 2, 1, 1]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </mesh>
    );
  };