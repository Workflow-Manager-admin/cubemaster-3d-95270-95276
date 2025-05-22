import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

import RubiksCube from './components/RubiksCube/RubiksCube';
import ControlPanel from './components/UI/ControlPanel';
import useCubeState from './hooks/useCubeState';

function ErrorFallback({ error }) {
  return (
    <div className="error-message">
      <p>Something went wrong rendering the cube:</p>
      <pre>{error.message || 'Unknown error'}</pre>
      <p>Please refresh the page to try again.</p>
    </div>
  );
}

function App() {
  // Use our custom hook for managing Rubik's cube state
  const {
    cubeState,
    rotation,
    rotateCube,
    rotateFaceClockwise,
    resetCube,
    scrambleCube,
  } = useCubeState();

  // Create an object with all cube control functions to pass to ControlPanel
  const cubeControls = {
    rotateCube,
    rotateFaceClockwise,
    resetCube,
    scrambleCube
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> CubeMaster 3D
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="cube-container">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Canvas 
              shadows 
              camera={{ position: [0, 0, 7], fov: 45 }}
              style={{ background: '#1A1A1A' }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <Suspense fallback={null}>
                <RubiksCube cubeState={cubeState} rotation={rotation} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>
        
        <div className="controls-container">
          <ControlPanel cubeControls={cubeControls} />
        </div>
      </main>
    </div>
  );
}

export default App;
