import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const WaveShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.Texture() },
        uHover: { value: 0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float noise = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.01;
      uv.x += noise * uHover;
      uv.y += noise * uHover;
      
      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `
};

const ImageMesh = ({ image, isHovered }: { image: string, isHovered: boolean }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const texture = useTexture(image);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTexture: { value: texture },
            uHover: { value: 0 }
        }),
        [texture]
    );

    useFrame((state) => {
        if (mesh.current) {
            // @ts-ignore
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            // @ts-ignore
            mesh.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
                // @ts-ignore
                mesh.current.material.uniforms.uHover.value,
                isHovered ? 1.0 : 0.0,
                0.1
            );
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[5, 3.5]} /> {/* Aspect ratio approx matching the card */}
            <shaderMaterial
                args={[WaveShaderMaterial]}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
};

export const DistortedImage = ({ image, isHovered }: { image: string, isHovered: boolean }) => {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 2.5] }}>
                <ImageMesh image={image} isHovered={isHovered} />
            </Canvas>
        </div>
    );
};
