import React from 'react';
import { Box } from '@react-three/drei';

/**
 * A simple test cube to verify Three.js rendering is working
 */
const SimpleCube = () => {
  return (
    <Box position={[0, 0, 0]} args={[1, 1, 1]}>
      <meshStandardMaterial color="hotpink" />
    </Box>
  );
};

export default SimpleCube;
