
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Vehicle3DProps {
  vehicleType?: string;
  color?: string;
}

const Vehicle3D = ({ vehicleType = 'sedan', color = '#ff5f00' }: Vehicle3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameId = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create car based on type
    const carGroup = new THREE.Group();
    
    // Car body
    const bodyGeometry = vehicleType === 'suv' ? 
      new THREE.BoxGeometry(4, 1.5, 2) : 
      new THREE.BoxGeometry(4, 1, 1.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    body.castShadow = true;
    carGroup.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(2.5, 0.8, 1.6);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: color });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, vehicleType === 'suv' ? 2.2 : 1.9, 0);
    roof.castShadow = true;
    carGroup.add(roof);

    // Windows
    const windowMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x87ceeb, 
      transparent: true, 
      opacity: 0.7 
    });
    
    const frontWindowGeometry = new THREE.PlaneGeometry(1.6, 0.6);
    const frontWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial);
    frontWindow.position.set(1.26, vehicleType === 'suv' ? 2.2 : 1.9, 0);
    frontWindow.rotation.y = Math.PI / 2;
    carGroup.add(frontWindow);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const wheelPositions = [
      [-1.5, 0.4, -1.2],
      [-1.5, 0.4, 1.2],
      [1.5, 0.4, -1.2],
      [1.5, 0.4, 1.2]
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      carGroup.add(wheel);
    });

    scene.add(carGroup);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouseX * 0.5;
        targetRotationX = mouseY * 0.2;
      }
    };

    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      
      // Smooth rotation based on mouse position
      carGroup.rotation.y += (targetRotationY - carGroup.rotation.y) * 0.05;
      carGroup.rotation.x += (targetRotationX - carGroup.rotation.x) * 0.05;
      
      // Auto rotation when not hovering
      if (Math.abs(mouseX) < 0.1 && Math.abs(mouseY) < 0.1) {
        carGroup.rotation.y += 0.005;
      }

      camera.lookAt(carGroup.position);
      renderer.render(scene, camera);
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [vehicleType, color]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-64 rounded-lg overflow-hidden border border-gray-200"
      style={{ minHeight: '250px' }}
    />
  );
};

export default Vehicle3D;
