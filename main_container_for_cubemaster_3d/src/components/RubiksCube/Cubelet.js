import React from 'react';
import { Box } from '@react-three/drei';

// PUBLIC_INTERFACE
/**
 * Cubelet component representing a single piece of the Rubik's Cube
 * @param {number} position - The position of the cubelet in 3D space [x, y, z]
 * @param {Array} colors - Array of colors for each face [right, left, top, bottom, front, back]
 * @param {number} size - Size of the cubelet
 * @returns {JSX.Element} A 3D cubelet with colored faces
 */
const Cubelet = ({ position, colors, size = 1 }) => {
  // Scale slightly smaller than 1 to create gaps between cubelets
  const scale = size * 0.95;
  
  return (
    <Box 
      position={position}
      args={[scale, scale, scale]}
      castShadow
    >
      {colors.map((color, index) => (
        <meshStandardMaterial 
          key={index} 
          attachArray="material" 
          color={color} 
          roughness={0.7}
          metalness={0.1}
        />
      ))}
    </Box>
  );
};

export default Cubelet;
