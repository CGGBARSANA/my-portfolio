"use client";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Enemy     = { id: number; fx: number; fy: number };
type Bullet    = { id: number; fx: number; fy: number };
type Explosion = { id: number; fx: number; fy: number };
type GameState = "idle" | "playing" | "over";

type Star = { x: number; y: number; r: number; speed: number; opacity: number };

const SHIP_HALF_PX = 11;
const NUM_STARS = 120;

export function GameCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const starsRef     = useRef<Star[]>([]);
  const rafRef       = useRef<number>(0);

  const [arenaSize, setArenaSize] = useState({ w: 0, h: 0 });
  const arenaSizeRef = useRef({ w: 0, h: 0 });

  const [shipFx, setShipFx] = useState(0.5);
  const shipFxRef = useRef(0.5);

  const [enemies,    setEnemies]    = useState<Enemy[]>([]);
  const [bullets,    setBullets]    = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [score,      setScore]      = useState(0);
  const [gameState,  setGameState]  = useState<GameState>("idle");

  const enemyId  = useRef(0);
  const bulletId = useRef(0);
  const expId    = useRef(0);

  const gameStateRef = useRef(gameState);
  const bulletsRef   = useRef(bullets);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { bulletsRef.current   = bullets;   }, [bullets]);

  const isPlaying = gameState === "playing";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        arenaSizeRef.current = { w: width, h: height };
        setArenaSize({ w: width, h: height });

        if (canvasRef.current) {
          canvasRef.current.width  = width;
          canvasRef.current.height = height;
        }

        starsRef.current = Array.from({ length: NUM_STARS }, () => ({
          x:       Math.random() * width,
          y:       Math.random() * height,
          r:       Math.random() * 1.4 + 0.3,
          speed:   Math.random() * 0.6 + 0.2,
          opacity: Math.random() * 0.6 + 0.3,
        }));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) { rafRef.current = requestAnimationFrame(tick); return; }

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const s of starsRef.current) {
        s.y += s.speed;
        if (s.y > height) { s.y = 0; s.x = Math.random() * width; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || gameStateRef.current !== "playing") return;
      const rect = containerRef.current.getBoundingClientRect();
      const { w } = arenaSizeRef.current;
      if (w === 0) return;
      const minFx = SHIP_HALF_PX / w;
      const maxFx = 1 - SHIP_HALF_PX / w;
      const fx = Math.max(minFx, Math.min(maxFx, (e.clientX - rect.left) / w));
      setShipFx(fx);
      shipFxRef.current = fx;
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const { h } = arenaSizeRef.current;
      setEnemies((prev) => [
        ...prev,
        { id: enemyId.current++, fx: Math.random() * 0.93, fy: h > 0 ? -22 / h : -0.03 },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // ── Auto shoot ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const { h } = arenaSizeRef.current;
      if (h === 0) return;
      setBullets((prev) => [
        ...prev,
        { id: bulletId.current++, fx: shipFxRef.current, fy: 1 - 48 / h },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // ── Game loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const { w, h } = arenaSizeRef.current;
      if (w === 0 || h === 0) return;

      const bulletStep = 8 / h;
      const enemyStep  = 2.5 / h;
      const eW = 40 / w, eH = 22 / h;
      const bW =  3 / w, bH = 12 / h;

      setBullets((prev) => {
        const moved = prev
          .map((b) => ({ ...b, fy: b.fy - bulletStep }))
          .filter((b) => b.fy > -12 / h);
        bulletsRef.current = moved;
        return moved;
      });

      setEnemies((prevEnemies) => {
        const moved = prevEnemies.map((e) => ({ ...e, fy: e.fy + enemyStep }));
        const currentBullets = bulletsRef.current;

        const hitEnemyIds  = new Set<number>();
        const hitBulletIds = new Set<number>();
        const newExplosions: Explosion[] = [];

        for (const b of currentBullets) {
          for (const e of moved) {
            if (hitEnemyIds.has(e.id) || hitBulletIds.has(b.id)) continue;
            if (
              b.fx < e.fx + eW && b.fx + bW > e.fx &&
              b.fy < e.fy + eH && b.fy + bH > e.fy
            ) {
              hitEnemyIds.add(e.id);
              hitBulletIds.add(b.id);
              newExplosions.push({ id: expId.current++, fx: e.fx + eW / 2, fy: e.fy + eH / 2 });
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

        const survivors = moved
          .filter((e) => !hitEnemyIds.has(e.id))
          .filter((e) => e.fy < 1 + 22 / h);

        const sx        = shipFxRef.current;
        const shipMinFx = sx - SHIP_HALF_PX / w;
        const shipMaxFx = sx + SHIP_HALF_PX / w;
        const shipTopFy = 1 - 36 / h;

        const shipHit = survivors.some(
          (e) =>
            e.fy + eH > shipTopFy &&
            e.fy      < 1 - 12 / h &&
            e.fx + eW > shipMinFx &&
            e.fx      < shipMaxFx
        );
        if (shipHit) setGameState("over");

        return survivors;
      });
    }, 0);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // ── Restart ────────────────────────────────────────────────────────────────
  const start = useCallback(() => {
    setEnemies([]);
    setBullets([]);
    setExplosions([]);
    setScore(0);
    setShipFx(0.5);
    shipFxRef.current = 0.5;
    setGameState("playing");
  }, []);

  const { w, h } = arenaSize;

  return (
    <Card className="w-full h-full flex flex-col bg-black/80">
      <CardContent className="flex-1 min-h-0 p-3">
        <div
          ref={containerRef}
          className="relative w-full h-full rounded-xl overflow-hidden bg-[#060612]"
        >
          {/* ── Stars canvas (bottom layer) ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          {/* Score */}
          {isPlaying && (
            <div className="absolute top-2 left-2 text-xl text-slate-400 z-10">
              Score: {score}
            </div>
          )}

          {/* Ship */}
          {gameState !== "idle" && w > 0 && (
            <div
              className="absolute"
              style={{
                left: shipFx * w - SHIP_HALF_PX,
                bottom: 12,
                width: 22,
                height: 24,
                background: "#60a5fa",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                zIndex: 5,
              }}
            />
          )}

          {/* Bullets */}
          {w > 0 && bullets.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-sm"
              style={{
                left: b.fx * w,
                top:  b.fy * h,
                width: 3,
                height: 12,
                background: "#fde047",
                boxShadow: "0 0 4px #fde047",
                zIndex: 5,
              }}
            />
          ))}

          {/* Enemies */}
          {w > 0 && enemies.map((e) => (
<NextImage
  key={e.id}
  src="https://png.pngtree.com/recommend-works/png-clipart/20240621/ourmid/pngtree-asteroid-stone-big-png-image_12814136.png"
  alt="asteroid"
  width={50}
  height={50}
  className="absolute"
  style={{
    left: e.fx * w,
    top: e.fy * h,
    width: 50,
    height: 50,
    zIndex: 5,
  }}
/>
          ))}

          {/* Explosions */}
          {w > 0 && explosions.map((ex) => (
            <div
              key={ex.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ex.fx * w - 14,
                top:  ex.fy * h - 14,
                width: 28,
                height: 28,
                animation: "boom 0.4s ease-out forwards",
                zIndex: 6,
              }}
            />
          ))}

          {/* Start screen */}
          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white gap-3 z-20">
              <p className="text-xl font-medium text-center px-4">Bored of seeing my portfolio? Start a game!</p>
              <p className="text-xs text-slate-400">Move mouse to fly · auto-fire enabled</p>
              <button
                onClick={start}
                className="mt-1 px-6 py-2 text-sm font-medium border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/15 transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {/* Game Over */}
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
            <div className="absolute top-2 right-2 text-[15px] text-slate-500 z-10">
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