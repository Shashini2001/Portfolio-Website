import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  const rigRef = useRef<HTMLDivElement>(null);

  // Tilt the PC a little towards the mouse so it feels 3D
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!rigRef.current || clicked) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    rigRef.current.style.setProperty("--ry", `${x * 30}deg`);
    rigRef.current.style.setProperty("--rx", `${-y * 18}deg`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Shashini
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> AI / ML Engineer</span> <span>Software Developer</span>
            <span> AI / ML Engineer</span> <span>Software Developer</span>
          </Marquee>
        </div>
        <div
          className={`pc-scene ${clicked ? "pc-zoom" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="pc-rig" ref={rigRef}>
            <div className="pc-float">
              <div className="pc-monitor">
                <div className="pc-back"></div>
                <div className="pc-bezel">
                  <div className="pc-screen">
                    <div className="pc-glare"></div>
                    <div className={`pc-loading ${loaded ? "pc-done" : ""}`}>
                      <div className="pc-name">Shashini Ruwanthika</div>
                      <div className="pc-percent">
                        {percent}
                        <span>%</span>
                      </div>
                      <div className="pc-bar">
                        <div
                          className="pc-bar-fill"
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        ></div>
                      </div>
                      <div className="pc-status">
                        Loading portfolio<span className="pc-cursor"></span>
                      </div>
                    </div>
                    <div className={`pc-welcome ${loaded ? "pc-done" : ""}`}>
                      Welcome
                    </div>
                  </div>
                </div>
                <div className="pc-chin">
                  <span className="pc-led"></span>
                </div>
              </div>
              <div className="pc-neck"></div>
              <div className="pc-foot"></div>
            </div>
            <div className="pc-shadow"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
