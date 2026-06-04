import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import Image from "next/image";
export function ProfileAvatarCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [eyesVisible, setEyesVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setEyesVisible(true);
        }, 5000);

        return () => clearTimeout(t);
    }, []);
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const getEyeOffset = (rect: DOMRect | undefined) => {
        if (!rect) return { x: 0, y: 0 };

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mouse.x - cx;
        const dy = mouse.y - cy;

        const max = 3;

        return {
            x: Math.max(-max, Math.min(max, dx * 0.02)),
            y: Math.max(-max, Math.min(max, dy * 0.02)),
        };
    };
    const rect = containerRef.current?.getBoundingClientRect();
    const offset = getEyeOffset(rect);
    return (
        <CardContent className="flex flex-col items-center p-4 ">
            <div ref={containerRef} className="relative w-[200px] h-[200px]">

                <Image
                    className="h-full w-full rounded-full object-cover"
                    src="https://media.licdn.com/dms/image/v2/D5635AQGdJ8DHwdi6tg/profile-framedphoto-shrink_800_800/B56Z6CYqzbKkAY-/0/1780303965790?e=1781064000&v=beta&t=jaZa9s1G4Tk6iuoukUxn3S7yiuGhdEBfcmwi1Z2zGBQ"
                    alt="Profile Avatar"
                    width={800}
                    height={800}
                />
                <div className="flex flex-col justify-center alignment-center pt-5">
                    <h5 className="text-lg font-semibold text-center">CHRISTIAN GEROME G. BARSANA</h5>
                    <p className="text-sm text-gray-500 text-center">Software Engineer</p>
                </div>
                {/* FOR FUTURE UPDATE CHANGING OF TEXT CONNECTED TO DATABASE */}
                {/* <div className="absolute top-0 left-40  h-12 w-fit bg-gray-700/50 rounded-xl px-4 flex items-center">
                    <CardDescription className="text-sm text-white/50 whitespace-nowrap">
                        Hi, Welcome to my Portfolio!, It is still being developed so please bear with me. I am currently looking for a job as a Software Engineer, if you are interested please contact me.
                    </CardDescription>
                </div> */}


{/* 

                {eyesVisible && (
                    <div className="absolute inset-0 flex pt-20 justify-center pointer-events-none">
                        <div className="flex gap-6">
                            <div className="w-4 h-3 bg-white rounded-full relative overflow-hidden">
                                <div
                                    className="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2"
                                    style={{
                                        transform: `translate(${offset.x}px, ${offset.y}px) translate(-50%, -50%)`,
                                    }}
                                />
                            </div>
                            <div className="w-4 h-3 bg-white rounded-full relative overflow-hidden">
                                <div
                                    className="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2"
                                    style={{
                                        transform: `translate(${offset.x}px, ${offset.y}px) translate(-50%, -50%)`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )} */}


            </div>

        </CardContent>
    );
}