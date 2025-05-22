import React from 'react';
import '../../App.css';

// PUBLIC_INTERFACE
/**
 * CubeControls component for controlling the Rubik's Cube
 * @param {Function} rotateCube - Function to rotate the entire cube
 * @param {Function} rotateFaceClockwise - Function to rotate a specific face clockwise
 * @param {Function} resetCube - Function to reset the cube to its initial state
 * @param {Function} scrambleCube - Function to scramble the cube
 * @returns {JSX.Element} UI controls for manipulating the cube
 */
const CubeControls = ({ rotateCube, rotateFaceClockwise, resetCube, scrambleCube }) => {
  // Amount to rotate by (in radians) when using rotation controls
  const rotateAmount = Math.PI / 8;
  
  return (
    <div className="cube-controls">
      <div className="control-section">
        <h3>View Controls</h3>
        <div className="control-buttons">
          <button 
            className="btn control-btn" 
            onClick={() => rotateCube(0, -rotateAmount)}
          >
            ← Rotate Left
          </button>
          <button 
            className="btn control-btn" 
            onClick={() => rotateCube(0, rotateAmount)}
          >
            Rotate Right →
          </button>
          <button 
            className="btn control-btn" 
            onClick={() => rotateCube(-rotateAmount, 0)}
          >
            ↑ Rotate Up
          </button>
          <button 
            className="btn control-btn" 
            onClick={() => rotateCube(rotateAmount, 0)}
          >
            Rotate Down ↓
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h3>Face Controls</h3>
        <div className="face-buttons">
          <button 
            className="btn face-btn" 
            onClick={() => rotateFaceClockwise('up')}
          >
            Top
          </button>
          <button 
            className="btn face-btn" 
            onClick={() => rotateFaceClockwise('down')}
          >
            Bottom
          </button>
          <button 
            className="btn face-btn" 
            onClick={() => rotateFaceClockwise('front')}
          >
            Front
          </button>
          <button 
            className="btn face-btn" 
            onClick={() => rotateFaceClockwise('back')}
          >
            Back
          </button>
          <button 
            className="btn face-btn" 
            onClick={() => rotateFaceClockwise('left')}
          >
            Left
          </button>
          <button 
            className="btn face-btn" 
            onClick={() => rotateFaceClockwise('right')}
          >
            Right
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h3>Actions</h3>
        <div className="action-buttons">
          <button 
            className="btn btn-large action-btn" 
            onClick={resetCube}
          >
            Reset Cube
          </button>
          <button 
            className="btn btn-large action-btn" 
            onClick={scrambleCube}
          >
            Scramble
          </button>
        </div>
      </div>
    </div>
  );
};

export default CubeControls;
