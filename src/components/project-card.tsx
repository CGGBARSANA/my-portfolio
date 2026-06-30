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
  return (
    <div className="flex flex-col gap-4">
      {/* CAROUSEL (fixed space only) */}
      <Carousel className="w-full ">
        <CarouselContent className="p-1 border-0 rounded-2xl">
          {item.images?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-137.5 w-full overflow-hidden">
                <CardContent className="p-0 h-full w-full flex items-center justify-center bg-background">
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
              <Card className="rounded-2xl">
                <CarouselDemo item={item} />

                <CardHeader className="space-y-2 ">
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

                <CardContent className="space-y-3 text-sm text-muted-foreground rounded-2xl">
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
