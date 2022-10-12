import { useGLTF, useTexture } from '@react-three/drei';
import React, { useRef } from 'react';

const Portal = () => {
  const bakedTexture = useTexture('models/baked-02.jpeg');
  const result = useGLTF('models/portal-2.glb');
  const nodes = result.nodes;
  console.log(nodes);
  const bakedMaterial = useRef();

  return (
    <group>
      <mesh geometry={nodes.lampLightL.geometry} material-color="#f0bf94" />
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial ref={bakedMaterial} map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  );
};

export default Portal;
