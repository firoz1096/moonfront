import  { useEffect, useState, useRef } from "react";

import counterbg from '../assets/images/counter-bg.jpg';

const Counter = ({ end, duration, title, bgImage, showPlus }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current; // ✅ copy ref to a local variable

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTimestamp = null;

    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div className="col-md-4 text-center" ref={counterRef}>
      <div
        className="p-5 shadow-sm border rounded d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "5px solid #fff",
          color: "#000",
          position: "relative",
        }}
      >
        {/* White overlay */}
        <div
            className="rounded"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.9)",
            zIndex: 1,
            margin:"10px",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="fw-bold fs-1">
            {count}
            {showPlus ? "+" : ""}
          </h1>
          <p className="mb-0 fs-4">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-5 bg-light"> 
    <div className="container">
      <h2 className="text-center mb-4">7 Years of Following The Dream</h2>
      <div className="row justify-content-center">
        <Counter
          end={12}
          duration={2000}
          title="International Awards"
          bgImage={counterbg}
        />
        <Counter
          end={500}
          duration={2500}
          title="Happy Travelers"
          bgImage={counterbg}
          showPlus={true}
        />
        <Counter
          end={42}
          duration={2000}
          title="Team Members"
         bgImage={counterbg}
        />
      </div>
    </div>
    </section>
  );
}
