import React from "react";
import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';
import { ControlsComponent } from '../components/ControlsComponent.jsx';
import { useRef } from "react";
import { BoxGraphic, ShadersGraphic } from '../components/WeatherGraphics';
import { Canvas, useFrame } from '@react-three/fiber'

const AboutPage = () => {
    return (
    <div>
        <h1>About Page</h1>
    </div>
    );
};

export default AboutPage;