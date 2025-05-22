import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

import RubiksCube from './components/RubiksCube/RubiksCube';
import ControlPanel from './components/UI/ControlPanel';
import useCubeState from './hooks/useCubeState';

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
          <ErrorBoundary
            fallback={
              <div className="error-message">
                There was an error loading the 3D cube. Please refresh the page.
              </div>
            }
          >
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
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
