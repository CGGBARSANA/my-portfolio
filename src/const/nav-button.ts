export type ActiveView = "projects" | "experience" | "game";
export const navButtons: { label: string; view: ActiveView }[] = [
  { label: "PROJECTS", view: "projects" },
  { label: "WORK EXPERIENCE", view: "experience" },
  { label: "PLAY SPACESHIP GAME", view: "game" },
];
