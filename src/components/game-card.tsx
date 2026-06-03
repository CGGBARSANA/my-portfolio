"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Enemy = {
  id: number;
  x: number;
  y: number;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type Explosion = {
  id: number;
  x: number;
  y: number;
};

type GameState = "idle" | "playing" | "over";

const ARENA_W = 320;
const ARENA_H = 850;
const SHIP_HALF = 11;

export function GameCard() {
  const [shipX, setShipX] = useState(160);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");

  const enemyId = useRef(0);
  const bulletId = useRef(0);
  const expId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);


  const shipXRef = useRef(shipX);
  const gameStateRef = useRef(gameState);
  const bulletsRef = useRef(bullets);

  useEffect(() => { shipXRef.current = shipX; }, [shipX]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { bulletsRef.current = bullets; }, [bullets]);

  const isPlaying = gameState === "playing";


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || gameStateRef.current !== "playing") return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clamped = Math.max(SHIP_HALF, Math.min(ARENA_W - SHIP_HALF, x));
      setShipX(clamped);
      shipXRef.current = clamped;
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setEnemies((prev) => [
        ...prev,
        { id: enemyId.current++, x: Math.random() * (ARENA_W - 22), y: -22 },
      ]);
    }, 260);
    return () => clearInterval(interval);
  }, [isPlaying]);


  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBullets((prev) => [
        ...prev,
        { id: bulletId.current++, x: shipXRef.current - 1.5, y: ARENA_H - 48 },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);


  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBullets((prevBullets) => {
        const moved = prevBullets
          .map((b) => ({ ...b, y: b.y - 8 }))
          .filter((b) => b.y > -12);
        bulletsRef.current = moved;
        return moved;
      });

      setEnemies((prevEnemies) => {
        const movedEnemies = prevEnemies.map((e) => ({ ...e, y: e.y + 2.5 }));
        const currentBullets = bulletsRef.current;

        const hitEnemyIds = new Set<number>();
        const hitBulletIds = new Set<number>();
        const newExplosions: Explosion[] = [];

        for (const b of currentBullets) {
          for (const e of movedEnemies) {
            if (hitEnemyIds.has(e.id) || hitBulletIds.has(b.id)) continue;
            if (
              b.x < e.x + 22 &&
              b.x + 3 > e.x &&
              b.y < e.y + 22 &&
              b.y + 12 > e.y
            ) {
              hitEnemyIds.add(e.id);
              hitBulletIds.add(b.id);
              newExplosions.push({ id: expId.current++, x: e.x + 11, y: e.y + 11 });
            }
          }
        }

        if (hitBulletIds.size > 0) {
          setBullets((prev) => prev.filter((b) => !hitBulletIds.has(b.id)));
          setScore((s) => s + hitEnemyIds.size);
          setExplosions((prev) => [...prev, ...newExplosions]);
          setTimeout(() => {
            const ids = new Set(newExplosions.map((ex) => ex.id));
            setExplosions((prev) => prev.filter((ex) => !ids.has(ex.id)));
          }, 400);
        }

        const survivors = movedEnemies
          .filter((e) => !hitEnemyIds.has(e.id))
          .filter((e) => e.y < ARENA_H + 22);

        const sx = shipXRef.current;
        const shipHit = survivors.some(
          (e) =>
            e.y + 22 > ARENA_H - 36 &&
            e.y < ARENA_H - 12 &&
            Math.abs(e.x + 11 - sx) < 26
        );
        if (shipHit) setGameState("over");

        return survivors;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const start = useCallback(() => {
    setEnemies([]);
    setBullets([]);
    setExplosions([]);
    setScore(0);
    setShipX(160);
    shipXRef.current = 160;
    setGameState("playing");
  }, []);

  return (
    <Card className="w-[380px] mx-auto select-none">
      <CardHeader>
        <CardTitle className="text-center">GAME ZONE</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <div
          ref={containerRef}
          className="relative bg-[#080818] rounded-xl overflow-hidden"
          style={{ width: ARENA_W, height: ARENA_H }}
        >
          {/* Score */}
          {isPlaying && (
            <div className="absolute top-2 left-2 text-xs text-slate-400 z-10">
              Score: {score}
            </div>
          )}

          {/* Ship */}
          {gameState !== "idle" && (
            <div
              className="absolute"
              style={{
                left: shipX - SHIP_HALF,
                bottom: 12,
                width: 22,
                height: 24,
                background: "#60a5fa",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}

          {/* Bullets */}
          {bullets.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-sm"
              style={{
                left: b.x,
                top: b.y,
                width: 3,
                height: 12,
                background: "#fde047",
                boxShadow: "0 0 4px #fde047",
              }}
            />
          ))}

          {/* Enemies */}
          {enemies.map((e) => (
            <div
              key={e.id}
              className="absolute rounded-full"
              style={{
                left: e.x,
                top: e.y,
                width: 22,
                height: 22,
                background: "#ef4444",
              }}
            />
          ))}

          {/* Explosions */}
          {explosions.map((ex) => (
            <div
              key={ex.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ex.x - 14,
                top: ex.y - 14,
                width: 28,
                height: 28,
                animation: "boom 0.4s ease-out forwards",
              }}
            />
          ))}

          {/* Start screen */}
          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white gap-3 z-20">
              <p className="text-xl font-medium">🚀 Space Survival</p>
              <p className="text-xs text-slate-400">Move mouse to fly · auto-fire enabled</p>
              <button
                onClick={start}
                className="mt-1 px-6 py-2 text-sm font-medium border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/15 transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {/* Game Over overlay */}
          {gameState === "over" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 text-white gap-2 z-20">
              <p className="text-lg font-medium">Game Over</p>
              <p className="text-xs text-slate-400">Final score: {score}</p>
              <button
                onClick={start}
                className="mt-2 px-4 py-1.5 text-sm border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors"
              >
                Play again
              </button>
            </div>
          )}

          {/* Hint */}
          {isPlaying && (
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-500">
              Move mouse to fly
            </div>
          )}
        </div>

        <style>{`
          @keyframes boom {
            0%   { transform: scale(0.4); opacity: 1; background: #fef08a; }
            50%  { transform: scale(1.8); opacity: 0.85; background: #f97316; }
            100% { transform: scale(2.6); opacity: 0; background: #ef4444; }
          }
        `}</style>
      </CardContent>
    </Card>
  );
}