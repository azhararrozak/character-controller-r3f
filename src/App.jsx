import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
]

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
    >
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
