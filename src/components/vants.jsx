import React, { useEffect, useRef, useContext } from 'react';
import WAVES from 'vanta/src/vanta.waves';
import AppContext from '../AppContext';

const config = {
  camera: {
    far: 400,
    fov: 30,
    near: 0.1,
  },
  color: "hsl(225, 40%, 20%)",
  colorCycleSpeed: 10,
  forceAnimate: true,
  hh: 50,
  lightness: 20,
  material: {
    options: {
      fog: false,
      wireframe: false,
    },
  },
  saturation: 40,
  shininess: 35,
  waveHeight: 20,
  waveSpeed: 0.25,
  ww: 50,
  hueShift: {
    minHue: 0,
    maxHue: 360,
    autoPlay: true,
    loop: true
  }
};

const disableControls = {
  gyroControls: false,
  mouseControls: false,
  mouseEase: false,
  touchControls: false,
};

const libs = [
  "/System/Vanta.js/three.min.js",
  "/System/Vanta.js/vanta.waves.min.js",
];

const VantaWaves = ({ children }) => {
  const vantaRef = useRef(null);

  const values = useContext(AppContext);

  useEffect(() => {
    // Initialize Vanta.js effect
    const vantaEffect = WAVES({
      el: vantaRef.current,
      ...disableControls,
      hueShift: {
        minHue: 0,
        maxHue: 360,
        autoPlay: true,
        loop: true
      },
      colorShift: {
        minColor: "#00000",
        maxColor: "#ffff00",
        autoPlay: true,
        loop: true
      },
      camera: {
        far: 400,
        fov: 30,
        near: 0.1,
      },
      color: "hsl(225, 40%, 20%)",
      colorCycleSpeed: 10,
      forceAnimate: true,
      hh: 50,
      hue: 225,
      lightness: 20,
      material: {
        options: {
          fog: false,
          wireframe: false,
        },
      },
      saturation: 40,
      shininess: 35,
      waveHeight: 20,
      waveSpeed: 0.25,
      ww: 50,
    });

    // Cleanup function to destroy Vanta.js effect
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [values.darkMode.value]);

  return <div ref={vantaRef}>{children}</div>;
};

export default VantaWaves;
