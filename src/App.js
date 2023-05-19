import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PivotControls } from '@react-three/drei';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';

import { memo } from 'react';
import {
  AccumulativeShadows,
  RandomizedLight,
  Environment as EnvironmentImpl,
} from '@react-three/drei';

const box = new THREE.BoxGeometry();
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20);
const tri = new THREE.CylinderGeometry(1, 1, 2, 3);

export const Environment = memo(({ direction = [5, 5, 5] }) => (
  <>
    <directionalLight
      position={direction}
      intensity={0.5}
      shadow-mapSize={1024}
      castShadow
    />
    <directionalLight
      position={[-5, 5, 5]}
      intensity={0.1}
      shadow-mapSize={128}
      castShadow
    />
    <directionalLight
      position={[-5, 5, -5]}
      intensity={0.1}
      shadow-mapSize={128}
      castShadow
    />
    <directionalLight
      position={[0, 5, 0]}
      intensity={0.1}
      shadow-mapSize={128}
      castShadow
    />
    <AccumulativeShadows
      frames={100}
      alphaTest={0.85}
      opacity={0.75}
      scale={30}
      position={[0, -1.5, 0]}
    >
      <RandomizedLight
        amount={8}
        radius={2.5}
        ambient={0.5}
        intensity={1}
        position={direction}
        bias={0.001}
      />
    </AccumulativeShadows>
    <EnvironmentImpl preset="city" />
  </>
));

export default function App() {
  return (
    <Canvas
      style={{ height: '800px' }}
      shadows
      camera={{ position: [-15, 10, 15], fov: 100 }}
    >
      <color attach="background" args={['skyblue']} />
      <House position={[20, 20, 20]} />
      <Environment />
      <OrbitControls makeDefault />
    </Canvas>
  );
}

function House(props) {
  const csg = useRef();
  return (
    <mesh receiveShadow castShadow {...props}>
      <Geometry ref={csg} computeVertexNormals>
        <Base name="base" geometry={box} scale={[3, 3, 3]} />
        <Subtraction name="cavity" geometry={box} scale={[2.7, 2.7, 2.7]} />
        <Addition
          name="roof"
          geometry={tri}
          scale={[2.5, 1.5, 1.425]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.2, 0]}
        />
        <Chimney scale={0.5} position={[-0.75, 3, 0.8]} />
        <Window
          position={[1.1, 2.5, 0]}
          scale={0.6}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Window position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} />
        <Window position={[0, 0.25, 1.5]} scale={1.25} />
        <Window
          rotation={[0, Math.PI / 2, 0]}
          position={[1.425, 0.25, 0]}
          scale={1.25}
        />
        <Door
          rotation={[0, Math.PI / 2, 0]}
          position={[-1.425, -0.45, 0]}
          scale={[1, 0.9, 1]}
        />
      </Geometry>
      <meshStandardMaterial envMapIntensity={0.25} />
    </mesh>
  );
}

const Door = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} scale={[1, 2, 1]} />
      <Addition
        geometry={cyl}
        scale={0.5}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 1, 0]}
      />
    </Geometry>
  </Subtraction>
);

const Window = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} />
      <Subtraction geometry={box} scale={[0.05, 1, 1]} />
      <Subtraction geometry={box} scale={[1, 0.05, 1]} />
    </Geometry>
  </Subtraction>
);

const Chimney = (props) => (
  <Addition name="chimney" {...props}>
    <Geometry>
      <Base name="base" geometry={box} scale={[1, 2, 1]} />
      <Subtraction
        name="hole"
        geometry={box}
        scale={[0.7, 2, 0.7]}
        position={[0, 0.5, 0]}
      />
    </Geometry>
  </Addition>
);
