export type ActiveView = "projects" | "experience" | "game" | "chat";
export const navButtons: { label: string; view: ActiveView }[] = [
    { label: "AI Agent", view: "chat" },
    { label: "Projects", view: "projects" },
    { label: "Work Experience", view: "experience" },
    { label: "Space Blaster", view: "game" },

  ];
