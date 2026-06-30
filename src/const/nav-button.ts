export type ActiveView = "projects" | "experience" | "game" | "chat";
export const navButtons: { label: string; view: ActiveView }[] = [
    { label: "ASK ME", view: "chat" },
    { label: "PROJECTS", view: "projects" },
    { label: "WORK EXPERIENCE", view: "experience" },
    { label: "SPACE BLASTER", view: "game" },

  ];
