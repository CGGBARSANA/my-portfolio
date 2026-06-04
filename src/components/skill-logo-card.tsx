import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import Image from "next/image";




type ProjectsCardProps = {
    datass: {
        src: string;
    }[];
};

export function SkillLogoCard({ datass }: ProjectsCardProps) {
    return (
        <>
            <CardContent className="grid grid-cols-6 gap-2">
                {datass.map((item, index) => (
                    <div key={index} className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center w-full aspect-square">
                        <Image
                            className="object-contain p-2"
                            src={item.src}
                            alt="Profile Avatar"
                            fill
                        />
                    </div>
                ))}
            </CardContent>
        </>
    );
}