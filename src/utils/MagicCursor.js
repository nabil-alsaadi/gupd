import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagicCursor = () => {
  const cursorRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.isMobile) return;

    const body = document.body;
    if (!body.classList.contains("tt-magic-cursor")) return;

    if (window.innerWidth <= 1024) return;

    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
    });

    const cursor = cursorRef.current;
    const ball = ballRef.current;
    if (!cursor || !ball) return;
 
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.15;
    let active = false;

    const ballWidth = 20;
    const ballHeight = 20;
    const ballOpacity = 0.5;
    const ballBorderWidth = 2;

    gsap.set(cursor, {
      opacity: 0,
      visibility: 'hidden'
    });

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      width: ballWidth,
      height: ballHeight,
      borderWidth: ballBorderWidth,
      opacity: ballOpacity,
    });

    const mouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const updatePosition = () => {
      if (!active) {
        pos.x += (mouse.x - pos.x) * ratio;
        pos.y += (mouse.y - pos.y) * ratio;
        gsap.set(ball, { x: pos.x, y: pos.y });
      }
    };

    document.addEventListener("mousemove", mouseMove);
    gsap.ticker.add(updatePosition);

    // ... (rest of the code remains the same)

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      gsap.ticker.remove(updatePosition);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="magic-cursor" ref={cursorRef} style={{ opacity: 0, visibility: 'hidden' }}>
      <div id="ball" ref={ballRef} style={{
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        opacity: 0.5,
        borderWidth: '2px',
        height: '20px',
        width: '20px',
        transform: 'translate(-50%, -50%) translate(0px, 596px)'
      }}></div>
    </div>
  );
};

export default MagicCursor;