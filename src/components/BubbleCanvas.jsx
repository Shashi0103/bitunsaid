import { useEffect, useRef } from "react";

function BubbleCanvas({
  posts,
  trendingIds = [],
  newIds = [],
  onBubbleClick,
  paused,
}) {
  const canvasRef = useRef(null);
  const bubblesRef = useRef(new Map());
  const hoverIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMove = (e) => {
      const { x, y } = getMousePos(e);
      let hovering = false;

      bubblesRef.current.forEach((b) => {
        const dx = x - b.x;
        const dy = y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= b.radius) {
          hoverIdRef.current = b.id;
          hovering = true;
        }
      });

      if (!hovering) hoverIdRef.current = null;

      // ✅ Cursor logic
      canvas.style.cursor = hovering ? "pointer" : "default";
    };

    const handleClick = (e) => {
      if (paused) return;

      const { x, y } = getMousePos(e);

      bubblesRef.current.forEach((b) => {
        const dx = x - b.x;
        const dy = y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= b.radius) onBubbleClick(b.id);
      });
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((b) => {
        if (!paused) {
          b.x += b.vx;
          b.y += b.vy;

          if (b.x - b.radius <= 0) {
            b.x = b.radius;
            b.vx = Math.abs(b.vx);
          }
          if (b.x + b.radius >= canvas.width) {
            b.x = canvas.width - b.radius;
            b.vx = -Math.abs(b.vx);
          }
          if (b.y - b.radius <= 0) {
            b.y = b.radius;
            b.vy = Math.abs(b.vy);
          }
          if (b.y + b.radius >= canvas.height) {
            b.y = canvas.height - b.radius;
            b.vy = -Math.abs(b.vy);
          }

          const drift = 0.0006;
          b.vx += (Math.random() - 0.5) * drift;
          b.vy += (Math.random() - 0.5) * drift;

          const maxSpeed = 0.22;
          b.vx = Math.max(-maxSpeed, Math.min(maxSpeed, b.vx));
          b.vy = Math.max(-maxSpeed, Math.min(maxSpeed, b.vy));
        }

        const isTrending = trendingIds.includes(b.id);
        const isNew = newIds.includes(b.id);
        const isHover = hoverIdRef.current === b.id;

        const drawRadius =
          b.radius +
          (isTrending ? 6 : 0) +
          (isHover ? 4 : 0);

        if (isTrending) {
          ctx.shadowColor = "rgba(255,180,0,0.6)";
          ctx.shadowBlur = 22;
        } else if (isHover) {
          ctx.shadowColor = "rgba(255,255,255,0.6)";
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#000";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.text, b.x, b.y - 6);

        const reactions = Object.entries(b.reactions || {})
          .filter(([, arr]) => arr.length > 0)
          .slice(0, 2);

        if (reactions.length > 0) {
          ctx.font = "12px sans-serif";
          let offsetX = -((reactions.length - 1) * 18) / 2;

          reactions.forEach(([emoji, arr]) => {
            ctx.fillText(
              `${emoji} ${arr.length}`,
              b.x + offsetX,
              b.y + 14
            );
            offsetX += 36;
          });
        }

        if (isNew) {
          const pulse = 3 + Math.sin(Date.now() / 300) * 2;
          ctx.beginPath();
          ctx.arc(
            b.x + drawRadius - 6,
            b.y - drawRadius + 6,
            pulse,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "red";
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [paused, onBubbleClick, trendingIds, newIds]);

  useEffect(() => {
    posts.forEach((post) => {
      if (!bubblesRef.current.has(post.id)) {
        bubblesRef.current.set(post.id, {
          id: post.id,
          text: post.previewText.slice(0, 22),
          reactions: post.reactions || {},
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: 52,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        });
      } else {
        bubblesRef.current.get(post.id).reactions =
          post.reactions || {};
      }
    });

    bubblesRef.current.forEach((_, id) => {
      if (!posts.find((p) => p.id === id)) {
        bubblesRef.current.delete(id);
      }
    });
  }, [posts]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10"
    />
  );
}

export default BubbleCanvas;
