import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toast } from '@base-ui/react/toast';
import { AuthProvider } from "@/api/auth/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ogImageUrl = "https://christianbarsana.netlify.app/uploads/image.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://christianbarsana.netlify.app/dashboard"),
  title: "Christian Barsana | AI & Software Engineer",
  description: "Explore my portfolio showcasing AI, Computer Vision, Full Stack Development, and Machine Learning projects.",

  openGraph: {
    title: "Christian Barsana | AI & Software Engineer",
    description: "Explore my portfolio showcasing AI, Computer Vision, Full Stack Development, and Machine Learning projects.",
    url: "https://christianbarsana.netlify.app/dashboard",
    siteName: "SOFTWARE ENGINEER",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Christian Barsana - AI & Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Christian Barsana | AI & Software Engineer",
    description: "Explore my portfolio showcasing AI, Computer Vision, Full Stack Development, and Machine Learning projects.",
    images: [ogImageUrl],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >

      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toast.Provider>
            {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
            <Toaster />
          </Toast.Provider>
        </ThemeProvider>
      </body>

    </html>
  );
}
