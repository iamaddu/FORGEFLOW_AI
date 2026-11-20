import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Layers } from 'lucide-react';

interface Interactive3DMetalPartProps {
  height?: number | string;
  className?: string;
  showTelemetry?: boolean;
}

export const Interactive3DMetalPart: React.FC<Interactive3DMetalPartProps> = ({
  height = 240,
  className = '',
  showTelemetry = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const wireframeRef = useRef(wireframeMode);
  wireframeRef.current = wireframeMode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const h = typeof height === 'number' ? height : container.clientHeight || 240;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.5);

    // 3. Renderer with antialias and alpha transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff4e6, 2.8); // Warm mango/amber key light
    dirLight1.position.set(4, 5, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x9d71e8, 2.2); // Royal purple rim light
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const laserLight = new THREE.PointLight(0xf5a636, 3.5, 6); // Laser spark point light
    laserLight.position.set(0.6, 0.3, 0.8);
    scene.add(laserLight);

    // 5. Build authentic 3D Fabricated Sheet Metal Bracket with ExtrudeGeometry
    const shape = new THREE.Shape();
    // Profile of an L-bracket with bend radius and cutouts
    shape.moveTo(-1.2, -0.6);
    shape.lineTo(1.2, -0.6);
    shape.lineTo(1.2, -0.4);
    shape.lineTo(-0.8, -0.4);
    shape.lineTo(-0.8, 0.9);
    shape.lineTo(-1.2, 0.9);
    shape.closePath();

    // Mounting holes
    const hole1 = new THREE.Path();
    hole1.absarc(0.5, -0.5, 0.12, 0, Math.PI * 2, true);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(-1.0, 0.4, 0.12, 0, Math.PI * 2, true);
    shape.holes.push(hole2);

    const extrudeSettings = {
      steps: 1,
      depth: 1.4,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // High quality metallic steel material
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a99ad,
      metalness: 0.85,
      roughness: 0.28,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, metalMaterial);
    scene.add(mesh);

    // Wireframe edge glow lines
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf5a636, // Warm mango accent edges
      transparent: true,
      opacity: 0.4,
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(wireframe);

    // 6. Laser cutting spark particles
    const particleCount = 35;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVels: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = 0.6 + (Math.random() - 0.5) * 0.1;
      particlePositions[i * 3 + 1] = 0.2 + (Math.random() - 0.5) * 0.1;
      particlePositions[i * 3 + 2] = 0.7 + (Math.random() - 0.5) * 0.1;
      particleVels.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.04 + 0.02,
          Math.random() * 0.05 + 0.02,
          (Math.random() - 0.5) * 0.04
        )
      );
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffaa33,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Laser Beam Line
    const laserBeamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.6, 2.2, 0.7),
      new THREE.Vector3(0.6, 0.2, 0.7),
    ]);
    const laserBeamMat = new THREE.LineBasicMaterial({
      color: 0xff7722,
      linewidth: 2,
      transparent: true,
      opacity: 0.75,
    });
    const laserBeam = new THREE.Line(laserBeamGeo, laserBeamMat);
    scene.add(laserBeam);

    // 7. Mouse interaction / Drag rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.25;
    let targetRotationY = -0.55;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = typeof height === 'number' ? height : container.clientHeight || 240;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth rotation with slight idle bobbing
      if (!isDragging) {
        targetRotationY += 0.006;
      }
      mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.08;
      mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.08;
      mesh.position.y = Math.sin(time * 1.5) * 0.05;

      // Update wireframe mode
      metalMaterial.wireframe = wireframeRef.current;

      // Update laser sparks
      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);
        const vel = particleVels[i];

        px += vel.x;
        py += vel.y;
        pz += vel.z;
        vel.y -= 0.0018; // gravity

        // Reset if fell or too far
        if (py < -0.4 || px > 1.2) {
          px = 0.6 + (Math.random() - 0.5) * 0.05;
          py = 0.2 + (Math.random() - 0.5) * 0.05;
          pz = 0.7 + (Math.random() - 0.5) * 0.05;
          vel.set(
            (Math.random() - 0.5) * 0.03 + 0.015,
            Math.random() * 0.04 + 0.02,
            (Math.random() - 0.5) * 0.03
          );
        }

        pos.setXYZ(i, px, py, pz);
      }
      pos.needsUpdate = true;

      // Pulse laser light
      laserLight.intensity = 2.5 + Math.sin(time * 25) * 1.2;
      laserBeam.visible = Math.sin(time * 20) > -0.6;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      metalMaterial.dispose();
      edges.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      laserBeamGeo.dispose();
      laserBeamMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [height]);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden select-none cursor-grab active:cursor-grabbing group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height }}
    >
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Telemetry HUD */}
      {showTelemetry && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] font-heading font-black tracking-wider uppercase text-white">
              3D FABRICATION VIEW
            </span>
          </div>
          <div className="mt-1 text-[11px] text-[#F8C8BE] font-bold drop-shadow-sm pl-1">
            MS Grade 2062 • 3.0mm Sheet
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWireframeMode(!wireframeMode);
          }}
          title="Toggle Wireframe CAD Mode"
          className="p-1.5 rounded-xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 transition-all shadow-sm"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none">
        <div className="flex items-center gap-1 text-[10px] font-bold text-white/70 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
          <RotateCw className="w-3 h-3 text-[#F5A636]" />
          <span>Drag to inspect 3D part</span>
        </div>
      </div>
    </div>
  );
};
