// FIXME: 모바일/태블릿은 미적용, PC기준 카메라 경계적용
// 터치드래그: touchmove, event.touches로
// 핀치드래그: gesturechange, event.scale
// 좌클릭 드래그: mousedown, mousemove, mouseup,
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const MyGLTFComponent = () => {
  const { nodes } = useGLTF('/house_draco.glb');
  const { camera } = useThree();
  const modelWidth = 5; // adjust this value based on the actual width of your models
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseButton, setMouseButton] = useState(null);

  useEffect(() => {
    const handleMouseDown = (event) => {
      setMouseButton(event.button);
    };

    const handleMouseUp = () => {
      setMouseButton(null);
    };

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useFrame(() => {
    const dx = mousePosition.x - previousMousePosition.current.x;
    const dy = mousePosition.y - previousMousePosition.current.y;

    // Rotate the camera if the left mouse button is pressed (button 0)
    if (mouseButton === 0) {
      camera.rotation.y -= dx * 0.001;
      camera.rotation.x -= dy * 0.001;
    }

    // Move the camera if the right mouse button is pressed (button 2)
    if (mouseButton === 2) {
      const newPositionX = camera.position.x - dx * 0.01;
      const newPositionZ = camera.position.z + dy * 0.01; // this is "backwards" because moving the mouse up should move the camera forward

      // Check if the new position is within the allowed boundaries (-25, 25)
      if (newPositionX > -10 && newPositionX < 10) {
        camera.position.x = newPositionX;
      }
      if (newPositionZ > -10 && newPositionZ < 10) {
        camera.position.z = newPositionZ;
      }
    }

    // Update the previous mouse position
    previousMousePosition.current = mousePosition;

    camera.updateProjectionMatrix();
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
  return (
    <Canvas
      style={{ height: '800px' }}
      camera={{ position: [0, 10, 10], fov: 150 }}
    >
      <ambientLight />
      <directionalLight castShadow position={[2.5, 2.5, 2.5]} intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <MyGLTFComponent />
    </Canvas>
  );
};

export default App;
