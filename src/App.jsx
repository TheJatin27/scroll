import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Initial Intro Animation
    tl.from(".headline span", {
      y: 150,
      skewY: 10,
      opacity: 0,
      stagger: 0.03,
      duration: 1.2,
      ease: "power4.out",
    })
    .from(statsRef.current, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.8");

    // 2. Scroll Animation: Car Driving + Headline Parallax
    gsap.to(carRef.current, {
      x: "120vw", // Drive all the way across
      rotation: 2, // Slight tilt like it's speeding
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Suble parallax for text
    gsap.to(headlineRef.current, {
      y: -100,
      opacity: 0.1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
      }
    });

  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="sticky">
        
        <h1 className="headline" ref={headlineRef}>
          {"ITZFIZZ".split("").map((char, index) => (
            <span key={index}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h1>

        <div className="stats">
          {[
            { val: "58%", label: "Velocity" },
            { val: "27%", label: "Torque" },
            { val: "23%", label: "Aero" },
            { val: "40%", label: "Impact" }
          ].map((item, i) => (
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

        <div className="road">
          <img
            ref={carRef}
            src="../src/assets/car.png" // Using a high-quality placeholder
            alt="car"
            className="car"
          />
        </div>
      </div>
    </section>
  );
}

export default App;