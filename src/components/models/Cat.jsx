import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
export function Cat(props) {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF('/models/animated_bengal_cat.glb');
  const { actions, names } = useAnimations(animations, group);

  useFrame((state, delta) => {
    actions[names[0]].play();
  });
  return (
    <>
      <group ref={group} {...props} dispose={null} scale={1.5}>
        <primitive object={nodes.GLTF_created_0_rootJoint} />

        <skinnedMesh
          name="Object_108"
          geometry={nodes.Object_108.geometry}
          material={materials.GoogleAR_StingrayPBS_StingrayPBS}
          skeleton={nodes.Object_108.skeleton}
        ></skinnedMesh>
      </group>
    </>
  );
}

useGLTF.preload('/models/animated_bengal_cat.glb');
