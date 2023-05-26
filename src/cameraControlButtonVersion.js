import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const MyGLTFComponent = ({ cameraControl }) => {
  const { nodes } = useGLTF('/house_draco.glb');
  const { camera } = useThree(); // access the camera
  const modelWidth = 5; // adjust this value based on the actual width of your models

  useEffect(() => {
    if (!camera || !cameraControl) return;

    const speed = 1;
    switch (cameraControl.direction) {
      case 'up':
        camera.position.y += speed;
        break;
      case 'down':
        camera.position.y -= speed;
        break;
      case 'left':
        camera.position.x -= speed;
        break;
      case 'right':
        camera.position.x += speed;
        break;
      case 'forward':
        camera.position.z -= speed;
        break;
      case 'backward':
        camera.position.z += speed;
        break;
      default:
        break;
    }
  }, [camera, cameraControl]);

  useFrame(() => {
    // check camera's position and correct it if it's outside the bounds
    camera.position.x = Math.max(Math.min(camera.position.x, 10), -10);
    camera.position.y = Math.max(Math.min(camera.position.y, 10), -10);
    camera.position.z = Math.max(Math.min(camera.position.z, 10), -10);
  });

  return (
    <>
      {Array.from({ length: 1000 }).map((_, i) =>
        Object.values(nodes).map((node, j) => (
          <mesh
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
  const [cameraControl, setCameraControl] = useState({ direction: null });

  const handleButtonClick = (direction) => {
    setCameraControl({ direction });
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('up')}>Up</button>
      <button onClick={() => handleButtonClick('down')}>Down</button>
      <button onClick={() => handleButtonClick('left')}>Left</button>
      <button onClick={() => handleButtonClick('right')}>Right</button>
      <button onClick={() => handleButtonClick('forward')}>Forward</button>
      <button onClick={() => handleButtonClick('backward')}>Backward</button>
      <Canvas
        style={{ height: '800px' }}
        camera={{ position: [0, 10, 10], fov: 100 }}
      >
        <ambientLight />
        <directionalLight
          castShadow
          position={[2.5, 2.5, 2.5]}
          intensity={0.7}
        />
        <pointLight position={[10, 10, 10]} />
        <MyGLTFComponent cameraControl={cameraControl} />
      </Canvas>
    </div>
  );
};

export default App;
