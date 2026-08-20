export function WorldLighting() {
  return (
    <>
      <ambientLight intensity={1.15} />
      <hemisphereLight color="#f8fcff" groundColor="#86a5ba" intensity={1.25} />
      <directionalLight castShadow color="#ffffff" intensity={2.85} position={[7, 13, 9]} shadow-bias={-.0004} shadow-mapSize-height={1024} shadow-mapSize-width={1024} />
      <directionalLight color="#8eafc4" intensity={0.8} position={[-8, 7, -6]} />
    </>
  );
}
