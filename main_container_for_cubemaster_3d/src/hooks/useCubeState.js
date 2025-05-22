import { useState, useCallback, useRef } from 'react';

// Standard colors for a Rubik's cube
const COLORS = {
  UP: '#FFFFFF',    // White
  DOWN: '#FFFF00',  // Yellow
  FRONT: '#FF0000', // Red
  BACK: '#FF8000',  // Orange
  LEFT: '#00FF00',  // Green
  RIGHT: '#0000FF', // Blue
};

// Size of the Rubik's cube (standard 3x3)
const CUBE_SIZE = 3;

/**
 * Creates the initial state of a solved Rubik's cube
 * @returns {Array} 3D array representing the cube state
 */
const createInitialCubeState = () => {
  // Create a 3D array to represent the cube
  // Each face will have its own color
  const cube = [];
  
  // UP face (White)
  const upFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(COLORS.UP));
  
  // DOWN face (Yellow)
  const downFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(COLORS.DOWN));
  
  // FRONT face (Red)
  const frontFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(COLORS.FRONT));
  
  // BACK face (Orange)
  const backFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(COLORS.BACK));
  
  // LEFT face (Green)
  const leftFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(COLORS.LEFT));
  
  // RIGHT face (Blue)
  const rightFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(COLORS.RIGHT));
  
  return {
    up: upFace,
    down: downFace,
    front: frontFace,
    back: backFace,
    left: leftFace,
    right: rightFace,
  };
};

/**
 * Custom hook for managing the Rubik's cube state
 */
const useCubeState = () => {
  // State for the cube configuration
  const [cubeState, setCubeState] = useState(createInitialCubeState);
  
  // State for tracking cube rotations for visualization
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Using ref to store some mutable state that doesn't trigger re-renders
  const stateRef = useRef({
    isRotating: false,
  });
  
  // Reset the cube to its initial solved state
  const resetCube = useCallback(() => {
    setCubeState(createInitialCubeState());
    setRotation({ x: 0, y: 0 });
  }, []);
  
  // Rotate the entire cube for viewing (not a cube move)
  const rotateCube = useCallback((x, y) => {
    if (stateRef.current.isRotating) return;
    
    setRotation(prevRotation => ({
      x: prevRotation.x + x,
      y: prevRotation.y + y,
    }));
  }, []);
  
  // Helper function to create a deep copy of the cube state
  const cloneCubeState = (state) => {
    return {
      up: state.up.map(row => [...row]),
      down: state.down.map(row => [...row]),
      front: state.front.map(row => [...row]),
      back: state.back.map(row => [...row]),
      left: state.left.map(row => [...row]),
      right: state.right.map(row => [...row]),
    };
  };
  
  // Rotate a face clockwise
  const rotateFaceClockwise = useCallback((face) => {
    if (stateRef.current.isRotating) return;
    stateRef.current.isRotating = true;
    
    setCubeState(prevState => {
      const newState = cloneCubeState(prevState);
      const faceState = newState[face];
      
      // Create a new rotated face
      const rotatedFace = Array(CUBE_SIZE).fill().map(() => Array(CUBE_SIZE).fill(null));
      
      for (let i = 0; i < CUBE_SIZE; i++) {
        for (let j = 0; j < CUBE_SIZE; j++) {
          // Rotate clockwise: (i, j) -> (j, n-1-i)
          rotatedFace[j][CUBE_SIZE - 1 - i] = faceState[i][j];
        }
      }
      
      newState[face] = rotatedFace;
      
      // For simplicity, we'll just update the face colors without
      // implementing the complete cube mechanics
      return newState;
    });
    
    // Reset the rotation flag after a short delay
    setTimeout(() => {
      stateRef.current.isRotating = false;
    }, 200);
  }, []);
  
  // Function to simulate a scramble
  const scrambleCube = useCallback(() => {
    const newState = cloneCubeState(createInitialCubeState());
    const colors = Object.values(COLORS);
    
    // Randomly assign colors to each face
    Object.keys(newState).forEach(face => {
      for (let i = 0; i < CUBE_SIZE; i++) {
        for (let j = 0; j < CUBE_SIZE; j++) {
          // For the center pieces, keep the original colors (for orientation)
          if (i === 1 && j === 1) continue;
          
          const randomColorIndex = Math.floor(Math.random() * colors.length);
          newState[face][i][j] = colors[randomColorIndex];
        }
      }
    });
    
    setCubeState(newState);
  }, []);
  
  // Return the hook's public interface
  return {
    cubeState,
    rotation,
    rotateCube,
    rotateFaceClockwise,
    resetCube,
    scrambleCube,
    COLORS
  };
};

export default useCubeState;
