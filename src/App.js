import { Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import { Cat } from './components/models/Cat';
import Portal from './components/models/Portal';

function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <a
        href="https://www.facebook.com/ducanh.fcds.gtvt"
        target="_blank"
        style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', zIndex: '9999' }}
      >
        Facebook
      </a>
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0.9309010881956397, 2.2793358244488804, -4.351787145918334] }}>
          <Portal />
          <Cat />

          {/* <axesHelper args={[100, 100, 100]} /> */}
          <OrbitControls maxPolarAngle={Math.PI / 2} />
          <ambientLight intensity={1} color="#fff" />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
