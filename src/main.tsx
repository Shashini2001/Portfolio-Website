import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// StrictMode is not used here: in development it runs every effect twice, which
// leaves a duplicate GSAP pin-spacer around the "My Work" section and makes the
// sections below it (Tech stack, Contact) overlap the work cards.
createRoot(document.getElementById("root")!).render(<App />);
