import { useGLTF, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';

const Portal = () => {
  const three = useThree();
  console.log('three', three);
  const bakedTexture = useTexture('models/baked-02.jpeg');
  const result = useGLTF('models/portal-2.glb');
  const nodes = result.nodes;
  console.log(nodes);
  const bakedMaterial = useRef();
  const portalCircleMaterial = useRef();

  return (
    <group>
      <mesh
        geometry={nodes.lampLightL.geometry}
        material-color="#f0bf94"
        scale={nodes.lampLightL.scale}
        position={nodes.lampLightL.position}
        rotation={nodes.lampLightL.rotation}
      />
      <mesh
        geometry={nodes.lampLightR.geometry}
        material-color="#f0bf94"
        scale={nodes.lampLightR.scale}
        position={nodes.lampLightR.position}
        rotation={nodes.lampLightR.rotation}
      />
      <mesh geometry={nodes.portalCircle.geometry}>
        <meshBasicMaterial
          ref={portalCircleMaterial}
          scale={nodes.portalCircle.scale}
          position={nodes.portalCircle.position}
          rotation={nodes.portalCircle.rotation}
          quaternion={nodes.portalCircle.quaternion}
        />
      </mesh>
      <mesh
        geometry={nodes.baked.geometry}
        scale={nodes.baked.scale}
        position={nodes.baked.position}
        rotation={nodes.baked.rotation}
        material-map={bakedTexture}
        material-map-flipY={false}
      />
    </group>
  );
};

export default Portal;
