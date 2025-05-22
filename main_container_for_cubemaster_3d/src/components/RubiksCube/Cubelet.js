import React from 'react';
import { useRef } from 'react';
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
  const meshRef = useRef();
  
  // Scale slightly smaller than 1 to create gaps between cubelets
  const scale = size * 0.95;
  
  return (
    <group position={position}>
      <Box 
        ref={meshRef}
        args={[scale, scale, scale]}
        castShadow
        receiveShadow
      >
        {/* Materials for each face of the cubelet */}
        <meshStandardMaterial attachArray="material" color={colors[0]} /> {/* Right face */}
        <meshStandardMaterial attachArray="material" color={colors[1]} /> {/* Left face */}
        <meshStandardMaterial attachArray="material" color={colors[2]} /> {/* Top face */}
        <meshStandardMaterial attachArray="material" color={colors[3]} /> {/* Bottom face */}
        <meshStandardMaterial attachArray="material" color={colors[4]} /> {/* Front face */}
        <meshStandardMaterial attachArray="material" color={colors[5]} /> {/* Back face */}
      </Box>
    </group>
  );
};

export default Cubelet;
