import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
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
          <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: 'white'
              }}>
                Loading...
              </div>
            }>
              <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
              <RubiksCube cubeState={cubeState} rotation={rotation} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="controls-container">
          <ControlPanel cubeControls={cubeControls} />
        </div>
      </main>
    </div>
  );
}

export default App;
