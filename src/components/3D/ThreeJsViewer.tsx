import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A simple spinning mesh component with interaction
function SpinningMesh({ geometry, position = [0, 0, 0], color = '#3b82f6', onClick }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (clicked ? 0.5 : 0.2);
      meshRef.current.rotation.y += delta * (clicked ? 0.8 : 0.3);
      
      // Add a little bounce effect when hovering
      if (hovered) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        meshRef.current.position.y = position[1];
      }
    }
  });

  return (
    <mesh 
      position={position as [number, number, number]} 
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
        if (onClick) onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {geometry}
      <meshStandardMaterial 
        color={hovered ? "#ff9500" : color} 
        emissive={clicked ? "#ff4500" : "#000000"}
        emissiveIntensity={clicked ? 0.5 : 0}
        metalness={0.5} 
        roughness={0.5} 
      />
    </mesh>
  );
}

// Model implementations for different types
function BiologyModel({ color, onClick }) {
  return (
    <group>
      <SpinningMesh 
        geometry={<sphereGeometry args={[0.8, 32, 32]} />} 
        position={[0, 0, 0]} 
        color="#2563eb"
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<sphereGeometry args={[0.3, 32, 32]} />} 
        position={[1.2, 0.5, 0]} 
        color="#3b82f6"
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<sphereGeometry args={[0.2, 32, 32]} />} 
        position={[-0.8, 0.8, 0.5]} 
        color="#60a5fa"
        onClick={onClick}
      />
    </group>
  );
}

function PhysicsModel({ color, onClick }) {
  return (
    <group>
      <SpinningMesh 
        geometry={<torusGeometry args={[0.7, 0.2, 16, 32]} />} 
        position={[0, 0, 0]} 
        color="#a855f7"
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<sphereGeometry args={[0.4, 32, 32]} />} 
        position={[0, 0, 0]} 
        color="#d946ef"
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<torusGeometry args={[1.2, 0.1, 16, 64]} />} 
        position={[0, 0, 0]} 
        color="#a855f7"
        onClick={onClick}
      />
    </group>
  );
}

function ProgrammingModel({ color, onClick }) {
  return (
    <group>
      <SpinningMesh 
        geometry={<boxGeometry args={[0.8, 0.1, 1.5]} />} 
        position={[0, 0, 0]} 
        color="#22c55e"
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<boxGeometry args={[0.1, 0.8, 1.5]} />} 
        position={[0, 0.45, 0]} 
        color="#16a34a"
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<coneGeometry args={[0.5, 0.8, 8]} />} 
        position={[0.5, 0.5, 0.7]} 
        color="#4ade80"
        onClick={onClick}
      />
    </group>
  );
}

function AbstractModel({ color, onClick }) {
  return (
    <group>
      <SpinningMesh 
        geometry={<octahedronGeometry args={[0.8]} />} 
        position={[0, 0, 0]} 
        color={color}
        onClick={onClick}
      />
      <SpinningMesh 
        geometry={<dodecahedronGeometry args={[0.5]} />} 
        position={[1.5, 0, 0]} 
        color={color}
        onClick={onClick}
      />
    </group>
  );
}

// Scene setup component
function Scene({ type, color, onClick }) {
  // Select the appropriate model based on type
  let ModelComponent;
  switch (type) {
    case 'biology':
      ModelComponent = BiologyModel;
      break;
    case 'physics':
      ModelComponent = PhysicsModel;
      break;
    case 'programming':
      ModelComponent = ProgrammingModel;
      break;
    default:
      ModelComponent = AbstractModel;
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6466f1" />
      <ModelComponent color={color} onClick={onClick} />
    </>
  );
}

// Improved orbit controls implementation
function OrbitControls({ active = true }) {
  const controlsRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  
  useEffect(() => {
    if (!active) setAutoRotate(false);
  }, [active]);
  
  useFrame(({ camera, clock }) => {
    if (controlsRef.current && autoRotate) {
      // More dynamic auto-rotation
      const t = clock.getElapsedTime();
      camera.position.x = Math.sin(t * 0.2) * 5;
      camera.position.z = Math.cos(t * 0.2) * 5;
      camera.position.y = Math.sin(t * 0.1) * 1 + 1;
      camera.lookAt(0, 0, 0);
    }
  });

  return <group ref={controlsRef} onClick={() => setAutoRotate(!autoRotate)} />;
}

interface ThreeJsViewerProps {
  type?: 'abstract' | 'biology' | 'physics' | 'programming';
  className?: string;
  color?: string;
  fallback?: React.ReactNode;
  height?: string;
  onModelClick?: () => void;
  interactive?: boolean;
  onError?: () => void;
}

const ThreeJsViewer: React.FC<ThreeJsViewerProps> = ({ 
  type = 'abstract',
  className = '',
  color = '#3b82f6',
  fallback = <div className="w-full h-full flex items-center justify-center">Loading 3D model...</div>,
  height = '400px',
  onModelClick,
  interactive = true,
  onError
}) => {
  const [isActive, setIsActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  
  // Check for WebGL support
  useEffect(() => {
    // Simple WebGL detection
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsWebGLSupported(false);
        console.warn('WebGL not supported by this browser');
      }
    } catch (e) {
      setIsWebGLSupported(false);
      console.error('Error checking for WebGL support:', e);
    }
  }, []);
  
  const handleCanvasClick = () => {
    if (interactive && !hasError) {
      setIsActive(!isActive);
      if (onModelClick) onModelClick();
    }
  };

  const handleError = (error: any) => {
    console.error('THREE.js error:', error);
    setHasError(true);
    if (onError) onError();
  };

  // If WebGL is not supported, show a static fallback
  if (!isWebGLSupported || hasError) {
    return (
      <div 
        className={`w-full relative ${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <div className="mb-2 text-3xl">🧪</div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{hasError ? "3D rendering error" : "3D view not supported"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Try another browser for interactive 3D models</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full relative ${className} ${interactive && !hasError ? 'cursor-pointer' : ''}`} 
      style={{ height }}
      onClick={handleCanvasClick}
    >
      <Suspense fallback={fallback}>
        <ErrorBoundary onError={handleError} fallback={fallback}>
          <Canvas 
            camera={{ position: [0, 1, 5], fov: 45 }} 
            shadows
            dpr={[1, 1.5]} // Reduced from [1, 2] for better performance
            onCreated={({ gl }) => {
              // Set some renderer properties for better performance
              gl.localClippingEnabled = true;
              gl.setClearColor(new THREE.Color(0x000000), 0); // Transparent background
            }}
          >
            <Scene type={type} color={color} onClick={handleCanvasClick} />
            <OrbitControls active={isActive} />
          </Canvas>
        </ErrorBoundary>
      </Suspense>
      {interactive && !hasError && (
        <div className="absolute bottom-2 right-2 bg-white/30 dark:bg-black/30 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
          Click to interact
        </div>
      )}
    </div>
  );
};

// Simple error boundary component for React Three Fiber
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError: (error: any) => void;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ThreeJsViewer;
