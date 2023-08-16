import logo from './logo.svg';
import './App.css';
import { ControlsComponent } from './ControlsComponent';
import { WeatherGraphcis } from './WeatherGraphics';
import { Canvas, useFrame } from '@react-three/fiber'

function App() {
  
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
      <WeatherGraphcis position={[-1.2, 0, 0]} />
      <WeatherGraphcis position={[1.2, 0, 0]} />
    </Canvas>,
    </div>
  );
}

export default App;