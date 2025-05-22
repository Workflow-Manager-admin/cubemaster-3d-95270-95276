import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Cubelet from './Cubelet';

// Colors for each face when not specified (for interior cubelets)
const DEFAULT_COLOR = '#111111';

// PUBLIC_INTERFACE
/**
 * RubiksCube component that renders a complete 3D Rubik's Cube
 * @param {Object} cubeState - The current state of the cube
 * @param {Object} rotation - The current rotation of the cube {x, y}
 * @returns {JSX.Element} A 3D Rubik's Cube
 */
const RubiksCube = ({ cubeState, rotation }) => {
  const groupRef = useRef();
  
  // Target rotation state
  const targetRotation = useRef({ x: 0, y: 0 });
  
  // Update target rotation when rotation prop changes
  useEffect(() => {
    targetRotation.current = rotation;
  }, [rotation]);
  
  // Use frame to apply smooth rotation animation
  useFrame(() => {
    if (groupRef.current) {
      // Apply smooth damping to rotation
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.1;
    }
  });
  
  // Create cubelets for a 3x3 cube
  const cubeSize = 3;
  const cubelets = [];
  const offset = (cubeSize - 1) / 2;
  
  for (let x = 0; x < cubeSize; x++) {
    for (let y = 0; y < cubeSize; y++) {
      for (let z = 0; z < cubeSize; z++) {
        // If this is not an interior cubelet (at least one component is 0 or cubeSize-1)
        if (x === 0 || x === cubeSize - 1 || y === 0 || y === cubeSize - 1 || z === 0 || z === cubeSize - 1) {
          // Position in 3D space, with offset to center the cube
          const position = [
            x - offset,
            y - offset,
            z - offset
          ];
          
          // Determine colors for each face based on position
          // Default color for non-visible faces
          const colors = [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR];
          
          // Right face (positive X)
          if (x === cubeSize - 1) {
            colors[0] = cubeState.right[y][z];
          }
          
          // Left face (negative X)
          if (x === 0) {
            colors[1] = cubeState.left[y][cubeSize - 1 - z];
          }
          
          // Top face (positive Y)
          if (y === cubeSize - 1) {
            colors[2] = cubeState.up[cubeSize - 1 - z][x];
          }
          
          // Bottom face (negative Y)
          if (y === 0) {
            colors[3] = cubeState.down[z][x];
          }
          
          // Front face (positive Z)
          if (z === cubeSize - 1) {
            colors[4] = cubeState.front[y][x];
          }
          
          // Back face (negative Z)
          if (z === 0) {
            colors[5] = cubeState.back[y][cubeSize - 1 - x];
          }
          
          // Create the cubelet with the determined position and colors
          cubelets.push(
            <Cubelet
              key={`${x}-${y}-${z}`}
              position={position}
              colors={colors}
              size={1}
            />
          );
        }
      }
    }
  }
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <group ref={groupRef}>
        {cubelets}
      </group>
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  );
};

export default RubiksCube;
