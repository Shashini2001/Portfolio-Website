import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import {
  SiAndroidstudio,
  SiCss,
  SiDocker,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiKeras,
  SiKotlin,
  SiLangchain,
  SiLinux,
  SiMlflow,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpencv,
  SiPhp,
  SiPostman,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiSpringboot,
  SiStreamlit,
  SiTensorflow,
  SiThreedotjs,
  SiVirtualbox,
  SiVercel,
  SiWireshark,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbBrain, TbNetwork, TbRobot, TbSql, TbVectorTriangle } from "react-icons/tb";
import { LuBot, LuDatabase, LuSearch, LuShield, LuWaypoints } from "react-icons/lu";
import { MdOutlineLayers, MdOutlineCode, MdOutlineBuild, MdOutlineStorage } from "react-icons/md";
import "./styles/Skills.css";

type Skill = { name: string; icon: IconType; color: string };
type Category = { id: string; title: string; icon: IconType; skills: Skill[] };

// Skills are taken from the CV, plus Go and Ballerina.
const categories: Category[] = [
  {
    id: "ai",
    title: "AI / Machine Learning",
    icon: TbBrain,
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
      { name: "Keras", icon: SiKeras, color: "#d00000" },
      { name: "MobileNetV2", icon: TbBrain, color: "#c2a4ff" },
      { name: "Computer Vision", icon: SiOpencv, color: "#5c3ee8" },
      { name: "RAG", icon: LuSearch, color: "#fb8dff" },
      { name: "LLM Agents", icon: TbRobot, color: "#8be9d0" },
      { name: "LangChain", icon: SiLangchain, color: "#8be9d0" },
      { name: "ChromaDB", icon: TbVectorTriangle, color: "#ffca28" },
      { name: "MLOps", icon: SiMlflow, color: "#0194e2" },
    ],
  },
  {
    id: "lang",
    title: "Programming Languages",
    icon: MdOutlineCode,
    skills: [
      { name: "Python", icon: SiPython, color: "#ffd43b" },
      { name: "Java", icon: FaJava, color: "#e76f00" },
      { name: "Kotlin", icon: SiKotlin, color: "#7f52ff" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "PHP", icon: SiPhp, color: "#8892bf" },
      { name: "SQL", icon: TbSql, color: "#00b4d8" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: SiCss, color: "#1572b6" },
      { name: "Go", icon: SiGo, color: "#00add8" },
      { name: "Ballerina", icon: LuWaypoints, color: "#3ddc97" },
    ],
  },
  {
    id: "tools",
    title: "Frameworks & Tools",
    icon: MdOutlineBuild,
    skills: [
      { name: "Flask", icon: SiFlask, color: "#ffffff" },
      { name: "Streamlit", icon: SiStreamlit, color: "#ff4b4b" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Node.js", icon: SiNodedotjs, color: "#68a063" },
      { name: "RabbitMQ", icon: SiRabbitmq, color: "#ff6600" },
      { name: "Git / GitHub", icon: SiGit, color: "#f05032" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3ddc84" },
      { name: "Flutter", icon: SiFlutter, color: "#02569b" },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
      { name: "Three.js / R3F", icon: SiThreedotjs, color: "#ffffff" },
    ],
  },
  {
    id: "sec",
    title: "Networking, Security & Systems",
    icon: LuShield,
    skills: [
      { name: "Wireshark", icon: SiWireshark, color: "#4fb3e8" },
      { name: "Cisco Packet Tracer", icon: TbNetwork, color: "#1ba0d7" },
      { name: "Kali Linux", icon: SiKalilinux, color: "#7aa7c7" },
      { name: "Bash Scripting", icon: SiGnubash, color: "#4eaa25" },
      { name: "VirtualBox", icon: SiVirtualbox, color: "#5b9bd5" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "Linux CLI", icon: SiLinux, color: "#fcc624" },
    ],
  },
  {
    id: "data",
    title: "Databases & Deployment",
    icon: MdOutlineStorage,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#13aa52" },
      { name: "MySQL", icon: SiMysql, color: "#4db6d6" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Streamlit Cloud", icon: SiStreamlit, color: "#ff4b4b" },
    ],
  },
];

const allSkills: Skill[] = categories.flatMap((c) => c.skills);

const Skills = () => {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const current = categories.find((c) => c.id === active);
  const list = useMemo(() => {
    const base = current ? current.skills : allSkills;
    const q = query.trim().toLowerCase();
    return q ? base.filter((s) => s.name.toLowerCase().includes(q)) : base;
  }, [current, query]);

  const TitleIcon = current ? current.icon : MdOutlineLayers;

  return (
    <div className="skills-section section-container" id="skills">
      <div className="skills-container">
        <p className="skills-label">Technical expertise</p>
        <h2 className="skills-title">
          My <span>Skills</span> &amp; Technologies
        </h2>
        <p className="skills-sub">
          The technologies and tools I use to build AI and software projects.
        </p>

        <div className="skills-panel">
          <div className="skills-side">
            <p className="skills-side-title">Skill categories</p>
            <button
              className={`skills-cat ${active === "all" ? "active" : ""}`}
              onClick={() => setActive("all")}
              data-cursor="disable"
            >
              <span className="skills-cat-icon">
                <MdOutlineLayers />
              </span>
              <span>
                <b>All Skills</b>
                <small>{allSkills.length} technologies</small>
              </span>
            </button>
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  className={`skills-cat ${active === c.id ? "active" : ""}`}
                  onClick={() => setActive(c.id)}
                  data-cursor="disable"
                >
                  <span className="skills-cat-icon">
                    <Icon />
                  </span>
                  <span>
                    <b>{c.title}</b>
                    <small>{c.skills.length} technologies</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="skills-main">
            <div className="skills-head">
              <span className="skills-cat-icon big">
                <TitleIcon />
              </span>
              <div>
                <h3>{current ? current.title : "All Skills"}</h3>
                <small>{list.length} technologies displayed</small>
              </div>
            </div>

            <label className="skills-search">
              <LuSearch />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search technologies..."
                data-cursor="disable"
              />
            </label>

            <div className="skills-grid">
              {list.map((s) => {
                const Icon = s.icon;
                return (
                  <div className="skill-item" key={s.name} data-cursor="disable">
                    <span className="skill-ring" style={{ ["--skill" as string]: s.color }}>
                      <Icon />
                    </span>
                    <span className="skill-name">{s.name}</span>
                  </div>
                );
              })}
              {list.length === 0 && <p className="skills-empty">No technology found.</p>}
            </div>

            <div className="skills-foot">
              <span>
                <LuBot /> <LuDatabase /> Continuously learning and building.
              </span>
              <a href="#work" data-cursor="disable">
                Explore Projects ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
