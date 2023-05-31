// FIXME: 멀티 모델 데이터 렌더링 기초 코드
import { Vector3, MeshStandardMaterial } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

import modelList from './modelList';

const MyGLTFComponent = ({ id, url, location }) => {
  const { nodes } = useGLTF(url);

  return (
    <>
      {Object.values(nodes).map((node, j) => {
        return (
          <mesh
            // castShadow
            // receiveShadow
            key={`${id}-${j}`}
            geometry={node.geometry}
            material={node.material}
            //   position={position}
            position={[
              node.position.x + location.x,
              node.position.y + location.y,
              node.position.z + location.z,
            ]}
            scale={[0.5, 0.5, 0.5]} // 50% reduction in size
          />
        );
      })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Canvas
        style={{ height: '800px' }}
        camera={{ position: [15, 15, 15], fov: 120 }}
        // shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {modelList.map(({ id, url, location }) => {
          return (
            <MyGLTFComponent key={id} id={id} url={url} location={location} />
          );
        })}
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
};

export default App;
