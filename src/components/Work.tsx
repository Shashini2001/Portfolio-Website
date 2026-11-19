import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "DermaMatch AI",
    category: "AI / Machine Learning",
    description: "Skin analysis and foundation shade recommendation from a face photo.",
    tools: "Python, TensorFlow, Keras, MobileNetV2, OpenCV, Flask, Vercel",
    link: "https://github.com/Shashini2001/DermaMatch-AI",
    image: "/images/projects/01.svg",
  },
  {
    name: "Food Freshness & Shelf-Life",
    category: "Research Project / MLOps",
    description: "Multimodal fruit freshness assessment using images and sensor data.",
    tools: "Python, MobileNetV3-Small, EfficientNet-Lite0, MLOps",
    link: "https://github.com/Shashini2001/fruit-freshness-mlops",
    image: "/images/projects/02.svg",
  },
  {
    name: "Ella Go",
    category: "Agentic AI / RAG Assistant",
    description: "A router agent and an answer agent that give context-aware answers with retrieval-augmented generation.",
    tools: "Python, Streamlit, LangChain, LangGraph, ChromaDB, Groq, Llama 3.1",
    link: "https://github.com/Shashini2001/ella-tourism-assistant",
    image: "/images/projects/03.svg",
  },
  {
    name: "LankaGo",
    category: "Mobile Application",
    description: "Bus tracking and booking concept for Sri Lanka, in Sinhala, Tamil and English.",
    tools: "Kotlin, Android Studio, Firebase, Google Maps API, Figma",
    link: "https://github.com/Shashini2001/lankago-app",
    image: "/images/projects/04.svg",
  },
  {
    name: "BookNest",
    category: "Full-Stack Development",
    description: "Book management app with separate frontend and backend services.",
    tools: "Java, Spring Boot, React, MongoDB, RabbitMQ, Docker",
    link: "https://github.com/Shashini2001/booknest-microservices",
    image: "/images/projects/05.svg",
  },
  {
    name: "Local Service Finder",
    category: "Web Development / DevOps",
    description: "A simple search interface to discover local service providers.",
    tools: "HTML, CSS, JavaScript, Docker, GitHub Actions, Vercel",
    link: "https://github.com/Shashini2001",
    image: "/images/projects/06.svg",
  },
  {
    name: "CareLink",
    category: "Web Application",
    description: "Healthcare service management and communication between users and providers.",
    tools: "PHP, MySQL, HTML, CSS, JavaScript",
    link: "https://github.com/Shashini2001",
    image: "/images/projects/07.svg",
  },
  {
    name: "ShareMeal",
    category: "Microservices Architecture",
    description: "Food sharing platform built from independent services that talk through APIs.",
    tools: "Java 21, Spring Boot 3, MongoDB, Spring Cloud Gateway, Eureka, JWT, Docker Compose",
    link: "https://github.com/Shashini2001",
    image: "/images/projects/08.svg",
  },
  {
    name: "3D Sign Language AI",
    category: "AI Research / 3D (in development)",
    description: "Concept that turns text or voice into animated sign language with a 3D avatar.",
    tools: "Python, Blender, Three.js, JavaScript",
    link: "https://github.com/Shashini2001",
    image: "/images/projects/09.svg",
  },
  {
    name: "A Walk Through the Forest",
    category: "Creative Development",
    description: "An interactive 3D portfolio experience set in a forest.",
    tools: "Three.js, Vite, WebGL, Custom Shaders, Mixamo, Vercel",
    link: "https://github.com/Shashini2001",
    image: "/images/projects/10.svg",
  },
];

const Work = () => {
  useGSAP(() => {
    // How far the cards have to slide to the left. Re-measured on every refresh,
    // so images, fonts and window resizes can never leave a wrong scroll length.
    const getTranslateX = () => {
      const boxes = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!boxes.length || !container) return 0;
      const rectLeft = container.getBoundingClientRect().left;
      const rect = boxes[0].getBoundingClientRect();
      const parentWidth = boxes[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(boxes[0]).padding) / 2;
      return Math.max(0, rect.width * boxes.length - (rectLeft + parentWidth) + padding);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });
    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    // layout can still change after the first paint (fonts, images)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p>{project.description}</p>
                <h4 style={{ marginTop: 14 }}>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
