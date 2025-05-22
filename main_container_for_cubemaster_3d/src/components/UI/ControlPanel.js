import React from 'react';
import CubeControls from '../Controls/CubeControls';

// PUBLIC_INTERFACE
/**
 * ControlPanel component that holds all the UI controls for the Rubik's Cube
 * @param {Object} cubeControls - Object containing all the control functions for the cube
 * @returns {JSX.Element} UI control panel for the application
 */
const ControlPanel = ({ cubeControls }) => {
  const { rotateCube, rotateFaceClockwise, resetCube, scrambleCube } = cubeControls;
  
  return (
    <div className="control-panel">
      <div className="panel-header">
        <h2>CubeMaster 3D Controls</h2>
        <p className="panel-description">
          Use the controls below to interact with the Rubik's Cube.
          <br />
          You can also use the mouse to rotate the view.
        </p>
      </div>
      
      <CubeControls 
        rotateCube={rotateCube}
        rotateFaceClockwise={rotateFaceClockwise}
        resetCube={resetCube}
        scrambleCube={scrambleCube}
      />
    </div>
  );
};

export default ControlPanel;
