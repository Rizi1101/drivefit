
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

// Add type definition for GLTF return type
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

// Define the car model component with proper typing
function CarModel({ modelPath, rotationSpeed = 0.003 }: { modelPath: string; rotationSpeed?: number }) {
  // Use proper typing for the ref
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath) as GLTFResult;
  
  // Use proper typing for useFrame
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  return <primitive ref={group} object={scene} position={[0, -1, 0]} scale={1.5} />;
}

interface CarView3DProps {
  modelPath?: string;
  carName: string;
}

const DEFAULT_CAR_PATH = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/car-muscle/model.gltf";

const CarView3D = ({ 
  modelPath = DEFAULT_CAR_PATH, 
  carName = "Vehicle" 
}: CarView3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(1);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    toast({
      title: autoRotate ? "Auto-rotate disabled" : "Auto-rotate enabled",
      description: `You can ${autoRotate ? "now manually" : "no longer manually"} rotate the ${carName}`,
    });
  };

  return (
    <div className="w-full h-[400px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center glass-card rounded-xl animate-pulse z-10">
          <div className="w-16 h-16 border-4 border-royal-green border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-royal-green font-medium">Loading 3D model...</p>
        </div>
      )}
      
      <div className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Canvas className="glass-card rounded-xl" shadows>
          <PerspectiveCamera makeDefault position={[7, 3, 7]} fov={40} />
          <color attach="background" args={["#111111"]} />
          
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={lightIntensity} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={lightIntensity/2} />
          
          <Suspense fallback={null}>
            <CarModel modelPath={modelPath} rotationSpeed={autoRotate ? 0.003 : 0} />
            <Environment preset="sunset" />
          </Suspense>
          
          <OrbitControls 
            makeDefault
            enableZoom={true}
            enablePan={false}
            enabled={!autoRotate}
            minDistance={4}
            maxDistance={9}
          />
        </Canvas>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        <Button 
          onClick={toggleAutoRotate}
          className="bg-royal-green hover:bg-royal-green/90 text-white glass-button"
          size="sm"
        >
          {autoRotate ? "Stop Rotation" : "Auto Rotate"}
        </Button>
      </div>
    </div>
  );
};

export default CarView3D;
