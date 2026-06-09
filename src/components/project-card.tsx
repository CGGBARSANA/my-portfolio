"use client";

import * as React from "react"
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export type ProjectCardProp = {
  items: ProjectItem[];
};




import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";

export function CarouselDemo({ item }: { item: ProjectItem }) {
  return (
    <Carousel className="h-240px">
      <CarouselContent>
        {item.images?.map((image, index) => (
          <CarouselItem key={index}>
            <div className="">

              <CardContent className="flex items-center justify-center ">
                <Image
                  src={image}
                  alt={image}
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </CardContent>

            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}


export default function ProjectCard({ items }: ProjectCardProp) {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="w-full flex flex-col pb-4 pr-2">
          <Card>
            <CarouselDemo item={item} />

            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold">
                {item.title}
              </CardTitle>

              <div className="flex flex-wrap gap-2">
                {item.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            {/* {item.webhref && (
                <Link className="hover:text-blue" href={item.webhref}>
                  LINK
                </Link>
              )} */}
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                {item.description}
                {item.webhref && (
                  <>
                    {" "}Link:{" "}
                    <Link
                      href={item.webhref}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {item.webhref}
                    </Link>
                  </>
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {item.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}