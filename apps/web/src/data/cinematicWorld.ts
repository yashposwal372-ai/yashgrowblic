export interface CinematicChapter {
  id: "home" | "services" | "products" | "industries" | "work" | "about" | "contact";
  index: string;
  title: string;
  label: string;
  description: string;
  range: [number, number];
  position: [number, number, number];
  camera: [number, number, number];
  routeColor?: string;
  route?: [number, number, number][];
}

export const cinematicChapters: CinematicChapter[] = [
  { id: "home", index: "01", title: "Home", label: "Growblic HQ", description: "The connected starting point for every Growblic digital system.", range: [0,.12], position: [0,0,0], camera: [10,11,16] },
  { id: "services", index: "02", title: "Services", label: "Services Boulevard", description: "Eight specialist facilities connected around real business workflows.", range: [.12,.29], position: [0,0,-42], camera: [10,11,-26], routeColor: "#E94F57", route: [[-.7,.3,1],[-.7,.3,-1],[1.7,.3,-1],[1.7,.3,-3.3],[4.1,.3,-3.3],[4.1,.3,-10],[4,.3,-15],[-3,.3,-15],[-3,.3,-27],[2,.3,-27],[0,.3,-42]] },
  { id: "products", index: "03", title: "Products", label: "Product Labs", description: "Concept platforms where AI, automation, learning, commerce and security take shape.", range: [.29,.45], position: [38,0,-74], camera: [48,11,-58], routeColor: "#FF6368", route: [[0,.3,-42],[8,.3,-48],[18,.3,-48],[18,.3,-60],[29,.3,-60],[29,.3,-70],[38,.3,-74]] },
  { id: "industries", index: "04", title: "Industries", label: "Industries City", description: "Digital operating environments shaped around six distinct industry journeys.", range: [.45,.59], position: [72,0,-118], camera: [82,11,-102], routeColor: "#6950E8", route: [[38,.3,-74],[45,.3,-82],[45,.3,-91],[58,.3,-91],[58,.3,-105],[68,.3,-105],[72,.3,-118]] },
  { id: "work", index: "05", title: "How We Work", label: "Build Works", description: "Discover, design, build, launch, then grow and care for the system.", range: [.59,.71], position: [34,0,-164], camera: [44,11,-148], routeColor: "#23CBE5", route: [[72,.3,-118],[68,.3,-129],[58,.3,-129],[58,.3,-143],[45,.3,-143],[45,.3,-155],[34,.3,-164]] },
  { id: "about", index: "06", title: "About Growblic", label: "Growblic Campus", description: "A product-minded software company building useful, connected digital experiences.", range: [.71,.82], position: [-18,0,-204], camera: [-8,11,-188], routeColor: "#24C8B1", route: [[34,.3,-164],[25,.3,-171],[13,.3,-171],[13,.3,-185],[0,.3,-185],[0,.3,-197],[-18,.3,-204]] },
  { id: "contact", index: "07", title: "Contact", label: "Contact Hub", description: "Bring the challenge, goals and context. We’ll shape the right starting point.", range: [.82,.93], position: [-55,0,-244], camera: [-45,11,-228], routeColor: "#FF9D42", route: [[-18,.3,-204],[-29,.3,-210],[-29,.3,-220],[-41,.3,-220],[-41,.3,-233],[-51,.3,-233],[-55,.3,-244]] },
];

export const cinematicFinal = {
  position: [-55,0,-284] as [number,number,number],
  camera: [-55,4,-267] as [number,number,number],
  routeColor: "#356DFF",
  route: [[-55,.3,-244],[-61,.3,-252],[-61,.3,-263],[-55,.3,-270],[-55,.3,-284]] as [number,number,number][],
};

export function getCinematicChapter(progress: number) {
  return cinematicChapters.findIndex((chapter) => progress >= chapter.range[0] && progress < chapter.range[1]);
}

export function getArrivedCinematicChapter(progress: number) {
  if (progress < cinematicChapters[1].range[0]) return 0;
  const destination = cinematicChapters.slice(1).findIndex((chapter) => progress >= chapter.range[0] && progress < chapter.range[1]);
  if (destination < 0) return cinematicChapters.length - 1;
  const chapterIndex = destination + 1;
  const chapter = cinematicChapters[chapterIndex];
  const local = (progress - chapter.range[0]) / (chapter.range[1] - chapter.range[0]);
  return local >= .72 ? chapterIndex : chapterIndex - 1;
}

export function getChapterArrivalProgress(chapter: CinematicChapter) {
  if (chapter.id === "home") return 0;
  return chapter.range[0] + (chapter.range[1] - chapter.range[0]) * .96;
}
