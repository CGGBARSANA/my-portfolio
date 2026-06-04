import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard() {
  return (
    <div className="w-full  flex flex-col pb-4 pr-2" >
    <Card  >
      
      {/* Image Section */}
      <div>
        <Image
          src="https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067" // replace with your image path
          alt="Green Market Capstone Project"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>

      {/* Header */}
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-semibold">
          Green Market – Capstone Project
        </CardTitle>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Full Stack</Badge>
          <Badge variant="secondary">Mobile</Badge>
          <Badge variant="secondary">Web</Badge>
          <Badge variant="secondary">Firebase</Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          Full Stack mobile and web developer using Dart, Flutter, Firebase, and Android Studio.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            Designed the project using Figma and developed it using Dart with Flutter framework and Android Studio.
          </li>
          <li>
            Integrated a real-time chat system using Firebase.
          </li>
        </ul>
      </CardContent>
    </Card>
    </div>
  );
}