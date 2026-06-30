"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ProjectCardProp = {
  items: ProjectItem[];
};

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ProjectItem } from "@/const/project";
import { ScrollArea } from "./ui/scroll-area";

export function CarouselDemo({ item }: { item: ProjectItem }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      {/* CAROUSEL (fixed space only) */}
<<<<<<< Updated upstream
      <Carousel className="w-full ">
        <CarouselContent className="p-1 border-0">
=======
      <Carousel className="w-full " setApi={setApi}>
        <CarouselContent className="p-1 border-0 rounded-2xl">
>>>>>>> Stashed changes
          {item.images?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-137.5 w-full overflow-hidden ">
                <CardContent className="p-0 h-full w-full flex items-center justify-center bg-black">
                  <Image
                    src={image}
                    alt={image}
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Hint: dot indicators showing it's a carousel */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === current
                  ? "w-4 bg-foreground"
                  : "w-1.5 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ items }: ProjectCardProp) {
  return (
    <>
      <div className="w-full h-full flex flex-col ">
        <ScrollArea className="flex-1 min-h-0">
          {items.map((item, index) => (
            <div key={index} className="w-full flex flex-col pb-2 ">
              <Card>
                <CarouselDemo item={item} />

                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-semibold">
                    {item.title}
                  </CardTitle>
                  {item.webhref && (
                    <>
                      <Link
                        href={item.webhref}
                        className="hover:text-blue-500 transition-colors"
                      >
                        {item.webhref}
                      </Link>
                    </>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {item.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{item.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}
