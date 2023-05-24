import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function House(props) {
  const { nodes, materials } = useGLTF('/stelsi.glb');
  //   const { nodes, materials } = useGLTF('/house.glb');
  //   const { nodes: bananaNodes, materials: bananaMaterials } = useGLTF(
  //     '/banana-v1-transformed.glb'
  //   );
  //   console.log('materials : ', materials);
  //   console.log('bananaNodes : ', bananaNodes);

  console.log('nodes : ', nodes);
  const nodeList = Object.keys(nodes);

  nodeList.map((mesh) => {
    console.log('nodes[mesh] : ', nodes[mesh]);
    return (
      <mesh
        castShadow
        geometry={nodes[mesh].geometry}
        // material={materials.lambert1}
        material-roughness={1}
        {...props}
        dispose={null}
      ></mesh>
    );
  });

  return (
    <mesh
      castShadow
      geometry={
        nodes
          .StaticMeshActor_UAID_047C1610AA3B6D3601_1621541371_StaticMeshComponent0
          .geometry
      }
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      {/* <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        map={texture}
        map-anisotropy={16}
      /> */}
    </mesh>
  );
}
// TODO: useFrame, Decal;
function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
}

const App = () => {
  return (
    <Canvas
      style={{ height: '800px' }}
      shadows
      camera={{ position: [2, 2, 2], fov: 75 }}
    >
      <color attach="background" args={['skyblue']} />
      <ambientLight intensity={0.5} />
      {/* <Box /> */}
      <House />
      <OrbitControls makeDefault />
    </Canvas>
  );
};
export default App;
