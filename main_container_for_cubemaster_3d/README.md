# CubeMaster 3D

A 3D interactive Rubik's Cube application built with React, Three.js, and React Three Fiber.

## Features

- 3D Rubik's Cube with realistic rendering
- Interactive controls for cube manipulation
- Face rotation controls
- Cube scrambling
- Reset functionality
- Responsive design for desktop and mobile devices

## Technologies Used

- React
- Three.js for 3D rendering
- React Three Fiber for integrating Three.js with React
- React Three Drei for additional Three.js helpers

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

### Cube Controls

- **View Controls**: Use the buttons to rotate the cube view left, right, up, or down.
- **Face Controls**: Use the buttons to rotate individual faces of the cube (Top, Bottom, Front, Back, Left, Right).
- **Actions**: Use the Reset button to return the cube to its solved state, or the Scramble button to randomly mix up the cube.
- **Mouse Controls**: You can also use the mouse to rotate the cube (click and drag), zoom (scroll), and pan (right-click and drag).

## Project Structure

```
src/
├── components/
│   ├── Controls/
│   │   └── CubeControls.js
│   ├── RubiksCube/
│   │   ├── Cubelet.js
│   │   └── RubiksCube.js
│   └── UI/
│       └── ControlPanel.js
├── hooks/
│   └── useCubeState.js
├── App.css
├── App.js
├── index.css
└── index.js
```

## Further Development

- Add timer functionality for speedcubing practice
- Implement cube solving algorithms
- Add animation effects for cube rotations
- Implement touch controls for mobile devices
- Add sound effects

## License

This project is licensed under the MIT License.
