import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. INITIAL LOAD: Staggered entrance for Headline & Cards
      const introTl = gsap.timeline();
      
      introTl.from(".headline span", {
        y: 80,
        opacity: 0,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
      });

      // 2. SCROLL ANIMATION: Car Movement + Card Reveal
      // This timeline is tied to the scroll progress of the .hero section
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Smooth interpolation
        }
      });

      // Move car from far left to far right
      scrollTl.to(carRef.current, {
        x: "calc(100vw + 600px)",
        ease: "none"
      }, 0);

      // Stagger cards to appear one by one as the car "passes" them
      scrollTl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      }, 0.1); 

    }, heroRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const metrics = [
    { val: "98%", label: "Accuracy" },
    { val: "24/7", label: "Availability" },
    { val: "10x", label: "Performance" },
    { val: "0.2s", label: "Latency" }
  ];

  return (
    <main className="hero" ref={heroRef}>
      <div className="sticky">
        
        {/* Headline */}
        <h1 className="headline">
          {"WELCOME ITZFIZZ".split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h1>

        {/* Stats Section - Full Width */}
        <div className="stats">
          {metrics.map((item, i) => (
            <div
              key={i}
              className="card"
              ref={(el) => (statsRef.current[i] = el)}
            >
              <h2>{item.val}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Road and Driving Element */}
        <div className="road">
          <img
            ref={carRef}
            src="https://pngimg.com/d/porsche_PNG10620.png" 
            alt="racing car"
            className="car"
          />
        </div>

      </div>
    </main>
  );
}

export default App;