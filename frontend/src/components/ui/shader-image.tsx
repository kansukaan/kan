import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
// import { Shadertoy } from 'shadertoy-react';
// Note: Shadertoy might not be the right tool for direct three.js integration like this. 
// I will use a custom shader material instead for better control.

import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Distortion effect based on mouse distance
  float dist = distance(uv, uMouse);
  float strength = 0.5 * smoothstep(0.5, 0.0, dist);
  
  uv.x += strength * 0.1 * sin(uv.y * 10.0 + uTime);
  uv.y += strength * 0.1 * cos(uv.x * 10.0 + uTime);

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

const ImageMesh = ({ url }: { url: string }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, url);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTime: { value: 0 },
        }),
        [texture]
    );

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Simple mouse tracking (center of screen for now, need raycaster for real interaction)
            // material.uniforms.uMouse.value.x = ...
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[3, 2, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
};

export const ShaderImage = ({ src }: { src: string }) => {
    return (
        <div className="w-full h-full relative">
            <Canvas>
                <ImageMesh url={src} />
            </Canvas>
        </div>
    );
};
