import './assets/css/App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PlaygroundPage from './pages/PlaygroundPage';
import PredictPage from './pages/PredictPage';
import WeatherPage from './pages/WeatherPage';
import WeatherNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  

  return (
    <BrowserRouter>
      <div className="App">
        <div><WeatherNavbar /></div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/Playground" element={<PlaygroundPage />}></Route>
          <Route path="/Predict" element={<PredictPage />}></Route>
          <Route path="/Weather" element={<WeatherPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;