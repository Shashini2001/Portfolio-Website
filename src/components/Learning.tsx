import { useState } from "react";
import { LuAward, LuUsers, LuShieldCheck } from "react-icons/lu";
import "./styles/Learning.css";

// Everything here comes from the CV.
const certificates = [
  { title: "Intro to Deep Learning", by: "Kaggle Learn", date: "November 2026" },
  { title: "Data Visualization", by: "Kaggle Learn", date: "" },
  { title: "Introduction to Cybersecurity", by: "Cisco Networking Academy", date: "February 2025" },
  {
    title: "Python for Beginners",
    by: "University of Moratuwa, Centre for Open & Distance Learning",
    date: "February 2025",
  },
  { title: "Python for Beginners", by: "Simplilearn SkillUP", date: "April 2025" },
  {
    title: "TryHackMe",
    by: "39 hands-on cybersecurity labs completed",
    date: "November 2025 - Present",
  },
];

const activities = [
  { title: "Information Technology Society", by: "Member, Horizon Campus", date: "" },
  {
    title: "Community of Cyber Security in Horizon (C2SH)",
    by: "Member, Horizon Campus",
    date: "",
  },
  { title: "Karate Society of Horizon Campus", by: "Member, Horizon Campus", date: "" },
];

const tabs = [
  { id: "certs", label: "Certificates", icon: LuAward, items: certificates },
  { id: "acts", label: "Activities", icon: LuUsers, items: activities },
];

const Learning = () => {
  const [active, setActive] = useState("certs");
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <div className="learn-section section-container" id="learning">
      <div className="learn-container">
        <p className="learn-label">Learning &amp; community</p>
        <h2 className="learn-title">
          Certificates <span>&amp;</span> Activities
        </h2>

        <div className="learn-stats">
          <div>
            <b>{certificates.length}</b>
            <span>Certificates</span>
          </div>
          <div>
            <b>39</b>
            <span>TryHackMe labs</span>
          </div>
          <div>
            <b>{activities.length}</b>
            <span>Societies</span>
          </div>
        </div>

        <div className="learn-tabs">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className={active === t.id ? "active" : ""}
                onClick={() => setActive(t.id)}
                data-cursor="disable"
              >
                <Icon /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="learn-grid" key={active}>
          {tab.items.map((item) => (
            <div className="learn-card" key={item.title + item.by} data-cursor="disable">
              <span className="learn-card-icon">
                {active === "certs" ? <LuShieldCheck /> : <LuUsers />}
              </span>
              <h4>{item.title}</h4>
              <p>{item.by}</p>
              {item.date && <small>{item.date}</small>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;
