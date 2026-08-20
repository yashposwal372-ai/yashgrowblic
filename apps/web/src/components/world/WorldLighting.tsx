export function WorldLighting() {
  return (
    <>
      <ambientLight intensity={2.1} />
      <hemisphereLight color="#f7fbfe" groundColor="#9eb8ca" intensity={1.8} />
      <directionalLight color="#ffffff" intensity={2.4} position={[6, 12, 8]} />
      <directionalLight color="#a8c9df" intensity={0.65} position={[-8, 6, -5]} />
    </>
  );
}
