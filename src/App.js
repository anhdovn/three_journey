import { Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Portal from './components/models/Portal';

function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <Suspense fallback={<Loader />}>
        <Canvas>
          <Portal />
          <axesHelper args={[100, 100, 100]} />
          <OrbitControls />
          {/* <ambientLight intensity={1} color="#fff" /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
