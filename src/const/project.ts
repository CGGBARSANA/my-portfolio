export type ProjectItem = {
  title: string;
  image?: string;
  images?: string[];
  imageAlt: string;
  badges: string[];
  webhref?: string;
  description: string;
  highlights: string[];
  href?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "IM.AI Tablet Application",
    images: ["https://christianbarsana.netlify.app/uploads/im.ai.gif"],
    imageAlt: "IM.AI Tablet App",
    badges: ["Python", "PyQt", "SQL Server", "TensorFlow", "MongoDB"],
    description:
      "Tablet-based application integrated with payment systems and machine learning for product classification. link for this project is private..",
    highlights: [
      "Built tablet UI using PyQt and Python",
      "Integrated PayMaya/PayPay payment systems",
      "Developed ML model for product classification",
    ],
  },
{
    title: "EmotiCom (AAC) System",
    image: "/emoticom.jpg",
    imageAlt: "EmotiCom AAC System",
    badges: ["Python", "TensorFlow"],
    webhref: "https://github.com/BarsanaXD/emoticom-repo",
    description:
      "AI-powered AAC system designed to assist users with communication challenges.",
    highlights: [
      "Developed emotion recognition ML model",
      "Built assistive communication interface",
      "Optimized for real-time interaction",
    ],
  },
  {
    title: "Iconic Trio – Personal Branding Project",
    images: ["https://i.ibb.co/5gZyrw5G/iconic-trio.png"],
    imageAlt: "Iconic Trio Website Preview",
    badges: ["Wix", "Web Design", "UI/UX", "Branding"],
    webhref: "https://barsanaxd.wixsite.com/iconictrio",
    description:
      "A personal branding and portfolio website showcasing the Iconic Trio concept, featuring curated visuals, layout design, and creative identity presentation built using Wix.",
    highlights: [
      "Designed and structured a personal branding portfolio using Wix",
      "Focused on visual storytelling and thematic consistency",
      "Implemented responsive layout and section-based navigation",
    ],
  },
  {
    title: "Green Market – Capstone Project",
    images: [
      "https://i.ibb.co/rKDrPdtG/greenmarkety.jpg",
      "https://i.ibb.co/fY5YBKP0/greenmarket-Rating.jpg",
      "https://i.ibb.co/Vc191F3Z/green-market-receipt.jpg",
      "https://i.ibb.co/ynZbY9Cg/greenmarketmessage.jpg",
      "https://i.ibb.co/r2cgRy91/greenmarketmobile.jpg",
      "https://i.ibb.co/8L3MkTCv/greenmarketmobilelogin.jpg",
      "https://i.ibb.co/tTmbh8z6/greenmarketlandingpagemobile.jpg",
      "https://i.ibb.co/2YRn8syF/greenmarketdashboardmobile.jpg",
      "https://i.ibb.co/DfJkT20W/greenmarketmessagemobile.jpg",
      "https://i.ibb.co/yFNKMs4Z/greenmarketmarloumobile.jpg",
    ],
    imageAlt: "Green Market App",
    badges: ["Flutter", "Dart", "Firebase", "Android Studio"],
    webhref: "https://sites.google.com/tip.edu.ph/greenmarket/home",
    description:
      "A full-stack mobile and web capstone project designed and developed using Flutter and Firebase.",
    highlights: [
      "Designed UI/UX using Figma and implemented using Flutter",
      "Built real-time chat system using Firebase",
      "Developed cross-platform mobile application",
    ],
  },

  {
    title: "UGC Sniper",
    image: "/ugc-sniper.jpg",
    imageAlt: "UGC Sniper Bot",
    badges: ["Python", "Flask", "API"],
    description:
      "Automation tool designed to purchase limited and in-demand Roblox virtual items.",
    highlights: [
      "Integrated Roblox API for automated purchasing",
      "Optimized system for real-time item acquisition",
      "Built high-speed backend automation with Flask",
    ],
  },
  {
    title: "K-12 Student Enrollment System",
    image: "/k12-enrollment.jpg",
    imageAlt: "Enrollment System",
    badges: ["PHP", "MySQL"],
    description:
      "Full-stack enrollment system for managing student records, classes, and analytics.",
    highlights: [
      "Designed relational database schema in MySQL",
      "Built admin, teacher, and student interfaces",
      "Implemented enrollment and scheduling system",
      "Created analytics dashboard with charts",
    ],
  },
  {
    title: "Computer Shop POS System",
    image: "/pos-system.jpg",
    imageAlt: "POS System",
    badges: ["Django", "Python", "SQLite"],
    description:
      "Point-of-sale system for managing sales, inventory, and financial reporting.",
    highlights: [
      "Built transaction and billing system",
      "Implemented inventory management features",
      "Added role-based authentication",
      "Created sales and financial reporting module",
    ],
  },
  {
    title: "MDL Man (Flappy Bird)",
    image: "/mdl-man.jpg",
    imageAlt: "Flappy Bird Computer Vision Game",
    badges: ["Unity", "Python", "Computer Vision"],
    description:
      "Flappy Bird-inspired game controlled using head tracking and computer vision.",
    highlights: [
      "Implemented head movement controls",
      "Integrated real-time computer vision tracking",
      "Optimized gameplay performance",
    ],
  },
  {
    title: "REALTI",
    images: [
      "https://i.ibb.co/fzXCXtNn/realti-start.png",
      "https://i.ibb.co/1fTrGB0D/option-realti.png",
      "https://i.ibb.co/NdD7SBSz/introduction-realti.png",
    ],
    imageAlt: "Computer Learning Game",
    badges: ["HTML", "CSS", "JavaScript"],
    webhref: "https://fabulous-quokka-47dab3.netlify.app/",
    description:
      "Interactive educational web application for learning computer hardware assembly.",
    highlights: [
      "Built drag-and-drop interactive learning system",
      "Designed computer assembly simulation game",
      "Improved engagement through gamification",
    ],
  },
  {
    title: "RENT(A)CAR",
    images: [
      "https://i.ibb.co/SwF1Q47G/main.png",
      "https://i.ibb.co/5xTChpG5/rental.png",
    ],
    imageAlt: "Car Rental System",
    badges: ["Java", "MySQL"],
    description:
      "Car rental management system for booking, tracking, and managing rentals.",
    highlights: [
      "Built booking and rental management system",
      "Designed secure database structure",
      "Implemented user-friendly UI for operations",
    ],
  },
];
