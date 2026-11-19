import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "./styles/TechStack.css";

// 20 technologies, shown as a neat grid of 3D balls.
// Rows: languages + web / AI + backend / data + tools + 3D.
const techs: { label: string; bg: string; fg: string }[] = [
  { label: "Python", bg: "#3776ab", fg: "#ffd43b" },
  { label: "Java", bg: "#e76f00", fg: "#ffffff" },
  { label: "Kotlin", bg: "#7f52ff", fg: "#ffffff" },
  { label: "C++", bg: "#00599c", fg: "#ffffff" },
  { label: "Go", bg: "#00add8", fg: "#ffffff" },
  { label: "JavaScript", bg: "#f7df1e", fg: "#222222" },
  { label: "React", bg: "#20232a", fg: "#61dafb" },
  { label: "TensorFlow", bg: "#ff6f00", fg: "#ffffff" },
  { label: "Keras", bg: "#d00000", fg: "#ffffff" },
  { label: "OpenCV", bg: "#0b3d91", fg: "#ffffff" },
  { label: "LangChain", bg: "#1c3c3c", fg: "#8be9d0" },
  { label: "Flask", bg: "#2b2b2b", fg: "#ffffff" },
  { label: "Spring Boot", bg: "#6db33f", fg: "#ffffff" },
  { label: "MongoDB", bg: "#13aa52", fg: "#ffffff" },
  { label: "MySQL", bg: "#00758f", fg: "#ffffff" },
  { label: "Firebase", bg: "#ffca28", fg: "#222222" },
  { label: "Docker", bg: "#2496ed", fg: "#ffffff" },
  { label: "Git", bg: "#f05032", fg: "#ffffff" },
  { label: "Blender", bg: "#ea7600", fg: "#ffffff" },
  { label: "Three.js", bg: "#111111", fg: "#ffffff" },
];

// Draw each technology name on a canvas and use it as the sphere texture.
// The label is drawn twice so it is readable from more angles.
function makeLabelTexture(label: string, bg: string, fg: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let size = 96;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  do {
    ctx.font = `bold ${size}px Arial, sans-serif`;
    size -= 4;
  } while (ctx.measureText(label).width > 250 && size > 24);
  ctx.fillStyle = fg;
  ctx.fillText(label, 256, 256);
  ctx.fillText(label, 768, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
const textures = techs.map((t) => makeLabelTexture(t.label, t.bg, t.fg));
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

type Pointer = React.MutableRefObject<{ x: number; y: number }>;

type BallProps = {
  index: number;
  target: [number, number];
  size: number;
  material: THREE.Material;
  active: boolean;
  startTime: React.MutableRefObject<number | null>;
  pointer: Pointer;
};

// Every ball flies up from below, bounces into its place in the grid and
// gets pushed away a little when the mouse comes close (like a physics pile).
function Ball({ index, target, size, material, active, startTime, pointer }: BallProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const body = useRef({ x: 0, y: 0, vx: 0, vy: 0, ready: false });

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const b = body.current;
    const now = state.clock.elapsedTime;
    const { width, height } = state.viewport;

    if (!b.ready) {
      b.x = target[0] + (Math.random() - 0.5) * 6;
      b.y = -height * 0.8 - Math.random() * 4;
      b.ready = true;
    }
    if (active && startTime.current === null) startTime.current = now;
    const elapsed = startTime.current === null ? -1 : now - startTime.current;
    if (elapsed < index * 0.07) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;

    const dt = Math.min(delta, 1 / 30);
    // spring towards the grid position (under-damped, so it bounces)
    let ax = 34 * (target[0] - b.x) - 8 * b.vx;
    let ay = 34 * (target[1] - b.y) - 8 * b.vy;
    // push away from the mouse
    const px = (pointer.current.x * width) / 2;
    const py = (pointer.current.y * height) / 2;
    const dx = b.x - px;
    const dy = b.y - py;
    const d = Math.hypot(dx, dy);
    const reach = size * 2.2;
    if (d < reach && d > 0.001) {
      const force = (1 - d / reach) * 160;
      ax += (dx / d) * force;
      ay += (dy / d) * force;
    }
    b.vx += ax * dt;
    b.vy += ay * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    mesh.position.set(b.x, b.y + Math.sin(now * 1.2 + index * 0.8) * 0.05, 0);
    const s = THREE.MathUtils.lerp(mesh.scale.x, size * (hovered ? 1.1 : 1), 0.15);
    mesh.scale.setScalar(s);
    // tiny tilt only, so the label always stays on the front of the ball
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -b.vx * 0.05, 0.1);
    // turn a little towards the mouse, but only while the mouse is over the section
    const mouseHere = Math.abs(pointer.current.x) <= 1.5;
    const turn = mouseHere ? THREE.MathUtils.clamp((px - b.x) * 0.04, -0.2, 0.2) : 0;
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, turn, 0.08);
  });

  return (
    <mesh
      ref={ref}
      visible={false}
      scale={size}
      geometry={sphereGeometry}
      material={material}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

function Grid({ active, pointer }: { active: boolean; pointer: Pointer }) {
  const { viewport } = useThree();
  const startTime = useRef<number | null>(null);

  const materials = useMemo(
    () =>
      textures.map(
        (texture) =>
          new THREE.MeshPhysicalMaterial({
            map: texture,
            emissive: "#ffffff",
            emissiveMap: texture,
            emissiveIntensity: 0.3,
            metalness: 0.4,
            roughness: 0.8,
            clearcoat: 0.3,
          })
      ),
    []
  );

  // rows x columns that fit the free space under the title, last row centred
  const count = techs.length;
  const cols = viewport.width > 19 ? 7 : viewport.width > 14 ? 5 : 4;
  const rows = Math.ceil(count / cols);
  const spacing = Math.min(
    2.7,
    viewport.width / (cols + 1),
    (viewport.height * 0.9) / (rows - 1 + 0.84)
  );
  const size = spacing * 0.42;

  return (
    <>
      {techs.map((tech, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const inRow = row === rows - 1 ? count - row * cols : cols;
        const x = (col - (inRow - 1) / 2) * spacing;
        const y = ((rows - 1) / 2 - row) * spacing;
        return (
          <Ball
            key={tech.label}
            index={i}
            target={[x, y]}
            size={size}
            material={materials[i]}
            active={active}
            startTime={startTime}
            pointer={pointer}
          />
        );
      })}
    </>
  );
}

const TechStack = () => {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 999, y: 999 }); // far away until the mouse enters

  // start the animation when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="techstack" ref={sectionRef}>
      <h2> My Techstack</h2>

      <div
        className="tech-wrap"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          pointer.current = {
            x: ((e.clientX - r.left) / r.width) * 2 - 1,
            y: -(((e.clientY - r.top) / r.height) * 2 - 1),
          };
        }}
        onPointerLeave={() => (pointer.current = { x: 999, y: 999 })}
      >
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 33], fov: 20, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight position={[20, 20, 25]} penumbra={1} angle={0.3} color="white" />
          <directionalLight position={[0, 5, 4]} intensity={2} />
          <Grid active={active} pointer={pointer} />
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default TechStack;
