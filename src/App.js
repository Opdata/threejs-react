// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { useGLTF, OrbitControls } from '@react-three/drei';

// function House(props) {
//   const { nodes, materials } = useGLTF('/stelsi.glb');
//   //   const { nodes, materials } = useGLTF('/house.glb');
//   //   const { nodes: bananaNodes, materials: bananaMaterials } = useGLTF(
//   //     '/banana-v1-transformed.glb'
//   //   );
//   //   console.log('materials : ', materials);
//   //   console.log('bananaNodes : ', bananaNodes);

//   console.log('nodes : ', nodes);
//   const nodeList = Object.keys(nodes);

//   nodeList.map((mesh) => {
//     console.log('nodes[mesh] : ', nodes[mesh]);
//     return (
//       <mesh
//         castShadow
//         geometry={nodes[mesh].geometry}
//         // material={materials.lambert1}
//         material-roughness={1}
//         {...props}
//         dispose={null}
//       ></mesh>
//     );
//   });

//   return (
//     <mesh
//       castShadow
//       geometry={
//         nodes
//           .StaticMeshActor_UAID_047C1610AA3B6D3601_1621541371_StaticMeshComponent0
//           .geometry
//       }
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       {/* <Decal
//         position={[0, 0.04, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.15}
//         map={texture}
//         map-anisotropy={16}
//       /> */}
//     </mesh>
//   );
// }
// // TODO: useFrame, Decal;
// function Box() {
//   return (
//     <mesh>
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <meshStandardMaterial attach="material" color="orange" />
//     </mesh>
//   );
// }

// const App = () => {
//   return (
//     <Canvas
//       style={{ height: '800px' }}
//       shadows
//       camera={{ position: [2, 2, 2], fov: 75 }}
//     >
//       <color attach="background" args={['skyblue']} />
//       <ambientLight intensity={0.5} />
//       {/* <Box /> */}
//       <House />
//       <OrbitControls makeDefault />
//     </Canvas>
//   );
// };
// export default App;

// import React, { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { useLoader } from '@react-three/fiber';
// import { OrbitControls, Html, Loader } from '@react-three/drei';

// function Model({ url }) {
//   const gltf = useLoader(GLTFLoader, url);
//   console.log('gltf : ', gltf);
//   return <primitive object={gltf.scene} />;
// }

// export default function App() {
//   return (
//     <Canvas style={{ height: '100vh', width: '100vw' }}>
//       <ambientLight intensity={0.5} />
//       <Suspense
//         fallback={
//           <Html center>
//             <Loader />
//           </Html>
//         }
//       >
//         <Model url="/stelsi.glb" />
//       </Suspense>
//       <OrbitControls />
//     </Canvas>
//   );
// }

// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';
// import { OrbitControls } from '@react-three/drei';

// const MyGLTFComponent = () => {
//   const { nodes } = useGLTF('/house.glb');

//   return (
//     <>
//       {Object.values(nodes).map((node, i) => (
//         <mesh
//           castShadow
//           receiveShadow
//           key={i}
//           geometry={node.geometry}
//           material={node.material}
//           position={node.position}
//         />
//       ))}
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Canvas
//       style={{ height: '800px' }}
//       camera={{ position: [0, 10, 10], fov: 100 }}
//       shadows
//     >
//       <ambientLight />
//       <directionalLight castShadow position={[2.5, 2.5, 2.5]} intensity={0.7} />
//       <pointLight position={[10, 10, 10]} />
//       <MyGLTFComponent />
//       <OrbitControls makeDefault />
//     </Canvas>
//   );
// };

// export default App;

// FIXME: 1000개 glb 렌더링 코드 및 카메라 최소 줌 인, 줌 아웃 설정, 모델 스케일 축소 적용
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

const MyGLTFComponent = () => {
  const { nodes } = useGLTF('/house_draco.glb');
  const modelWidth = 5; // adjust this value based on the actual width of your models

  return (
    <>
      {Array.from({ length: 1000 }).map((_, i) =>
        Object.values(nodes).map((node, j) => (
          <mesh
            // castShadow
            // receiveShadow
            key={`${i}-${j}`}
            geometry={node.geometry}
            material={node.material}
            position={[
              node.position.x + i * modelWidth,
              node.position.y,
              node.position.z,
            ]}
            scale={[0.5, 0.5, 0.5]} // 50% reduction in size
          />
        ))
      )}
    </>
  );
};

const App = () => {
  return (
    <Canvas
      style={{ height: '800px' }}
      camera={{ position: [0, 10, 10], fov: 100 }}
      //   shadows
    >
      <ambientLight />
      <directionalLight castShadow position={[2.5, 2.5, 2.5]} intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <MyGLTFComponent />
      <OrbitControls minDistance={5} maxDistance={10} />
    </Canvas>
  );
};

export default App;
