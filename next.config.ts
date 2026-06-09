import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // use true (308) for production
      },
    ];
  },
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "media.licdn.com",
    },
    {
      protocol: "https",
      hostname: "png.pngtree.com",
    },
    {
      protocol: "https",
      hostname: "upload.wikimedia.org",
    },
    {
      protocol: "https",
      hostname: "nodejs.org",
    },
    {
      protocol: "https",
      hostname: "encrypted-tbn0.gstatic.com",
    },

    // Additional domains for skill logos
    {
      protocol: "https",
      hostname: "github.githubassets.com",
    },
    {
      protocol: "https",
      hostname: "about.gitlab.com",
    },
    {
      protocol: "https",
      hostname: "reactnative.dev",
    },
    {
      protocol: "https",
      hostname: "firebase.google.com",
    },
        {
      protocol: "https",
      hostname: "camo.githubusercontent.com",
    },
            {
      protocol: "https",
      hostname: "i.ibb.co",
    },
  
  ],
},
};

export default nextConfig;
