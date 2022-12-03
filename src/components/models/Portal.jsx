import { shaderMaterial, useGLTF, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide } from 'three';
import glsl from 'babel-plugin-glsl/macro';
import SparklesRandom from '../SparklesRandom';

const Portal = (props) => {
  const { camera } = useThree();
  const bakedTexture = useTexture('models/baked-02.jpeg');
  const result = useGLTF('models/portal-2.glb');
  const nodes = result.nodes;
  const portalCircleMaterial = useRef();
  useFrame((state, delta) => {
    portalCircleMaterial.current.uTime += delta;
    console.log(camera);
  });
  return (
    <group {...props}>
      <SparklesRandom count={50} size={5} scale={[4, 2, 4]} position={[0, 1, 0]} random={true} />
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
        <mesh
          geometry={nodes.portalCircle.geometry}
          scale={nodes.portalCircle.scale}
          position={nodes.portalCircle.position}
          rotation={nodes.portalCircle.rotation}
          quaternion={nodes.portalCircle.quaternion}
        >
          <portalMaterial
            ref={portalCircleMaterial}
            blending={AdditiveBlending}
            uColorStart="pink"
            uColorEnd="white"
            side={DoubleSide}
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
    </group>
  );
};
extend({
  // shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
  // extend makes it available in JSX, in this case <portalMaterial />
  PortalMaterial: shaderMaterial(
    { uTime: 0, uColorStart: new Color('hotpink'), uColorEnd: new Color('white') },
    glsl`
    varying vec2 vUv;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }`,
    glsl`
    #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;
    void main() {
      vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
      float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
      float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
      strength += outerGlow;
      strength += step(-0.2, strength) * 0.8;
      strength = clamp(strength, 0.0, 1.0);
      vec3 color = mix(uColorStart, uColorEnd, strength);
      gl_FragColor = vec4(color, 1.0);
    }`
  ),
});
export default Portal;
