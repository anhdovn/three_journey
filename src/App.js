import { Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Portal from './components/models/Portal';

function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0.9309010881956397, 2.2793358244488804, -4.351787145918334] }}>
          <Portal />
          {/* <axesHelper args={[100, 100, 100]} /> */}
          <OrbitControls maxPolarAngle={Math.PI / 2} />
          {/* <ambientLight intensity={1} color="#fff" /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
