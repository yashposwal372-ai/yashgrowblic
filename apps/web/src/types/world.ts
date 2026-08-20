export interface WorldStage {
  id: string;
  index: string;
  title: string;
  facility: string;
  description: string;
  color: string;
  position: [number, number, number];
  camera: [number, number, number];
  route: [number, number, number][];
}
