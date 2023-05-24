import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

const MyGLTFComponent = () => {
  const { nodes } = useGLTF('/house_draco.glb');
  const modelWidth = 5; // adjust this value based on the actual width of your models

  const cameraRef = useRef();

  // Check and adjust camera position every frame
  useFrame(({ camera }) => {
    console.log('x : ', camera.position.x);
    console.log('y : ', camera.position.y);
    console.log('z : ', camera.position.z);
    camera.position.x = Math.max(Math.min(camera.position.x, 10), -10); // Limit x between -10 and 10
    camera.position.y = Math.max(Math.min(camera.position.y, 10), -10); // Limit y between -10 and 10
    camera.position.z = Math.max(Math.min(camera.position.z, 10), -10); // Limit z between -10 and 10
    camera.updateProjectionMatrix(); // Need to update after changing position
  });

  return (
    <perspectiveCamera ref={cameraRef}>
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
    </perspectiveCamera>
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
