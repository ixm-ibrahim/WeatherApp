import React from "react";
import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';
import { ControlsComponent } from '../components/ControlsComponent.jsx';
import { useRef } from "react";
import { BoxGraphic, ShadersGraphic } from '../components/WeatherGraphics';
import { Canvas, useFrame } from '@react-three/fiber';

const HomePage = () => {
    const canvasRef = useRef(null);
    //const canvasRef = React.createRef();
  
    return (
    <div>
        <header className="App-header">
            <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        <div>
            <ControlsComponent />
        </div>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <BoxGraphic position={[-1.2, 0, 0]} />
            <BoxGraphic position={[1.2, 0, 0]} />
        </Canvas>
        <div className="App-canvas" ref={canvasRef}>
            <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
            <ShadersGraphic canvasRef={canvasRef}/>
            </Canvas>
        </div>
    </div>
    );
};

export default HomePage;