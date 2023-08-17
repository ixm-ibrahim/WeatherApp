import logo from './logo.svg';
import './App.css';
import { useRef } from "react"
import { ControlsComponent } from './ControlsComponent';
import { BoxGraphic, ShadersGraphic } from './WeatherGraphics';
import { Canvas, useFrame } from '@react-three/fiber'

function App() {
  const canvasRef = useRef(null);
  //const canvasRef = React.createRef();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      <div ref={canvasRef}>
        <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
          <ShadersGraphic canvasRef={canvasRef}/>
        </Canvas>
      </div>
    </div>
  );
}

export default App;