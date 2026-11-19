import "./styles/Career.css";

const entries = [
  {
    role: "BSc (Hons) in Information Technology",
    place: "Sri Lanka, fourth year",
    tag: "NOW",
    text: "Studying Artificial Intelligence, Machine Learning, software engineering and emerging technologies, with hands-on projects in deep learning, full-stack development and mobile apps.",
  },
  {
    role: "Food Freshness & Shelf-Life Prediction",
    place: "Research project, Milestone 2",
    tag: "RESEARCH",
    text: "Multimodal machine learning that combines fruit images with temperature and humidity sensor data to assess freshness and predict shelf life, with MLOps deployment and monitoring.",
  },
  {
    role: "AI / ML Engineer",
    place: "Career goal",
    tag: "GOAL",
    text: "To build intelligent solutions for real-world problems, and keep growing through academic projects, research, practical experiments and independent learning.",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {entries.map((entry) => (
            <div className="career-info-box" key={entry.role}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.place}</h5>
                </div>
                <h3>{entry.tag}</h3>
              </div>
              <p>{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
