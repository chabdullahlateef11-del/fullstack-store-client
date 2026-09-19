import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setHovering(!!target.closest("button, a, input, textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          width: hovering ? "10px" : "8px",
          height: hovering ? "10px" : "8px",
          background: "#6366f1",
          transform: `translate(${pos.x - (hovering ? 5 : 4)}px, ${pos.y - (hovering ? 5 : 4)}px)`,
        }}
      />
      <div
        className="hidden md:block fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9998] transition-all duration-150 ease-out"
        style={{
          width: hovering ? "44px" : "30px",
          height: hovering ? "44px" : "30px",
          borderColor: hovering ? "#a855f7" : "#818cf8",
          opacity: hovering ? 0.6 : 0.35,
          transform: `translate(${pos.x - (hovering ? 22 : 15)}px, ${pos.y - (hovering ? 22 : 15)}px)`,
        }}
      />
    </>
  );
}