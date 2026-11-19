import { MdFileDownload } from "react-icons/md";
import "./styles/CvSection.css";

// Put your CV in the `public` folder with exactly this name.
const CV_FILE = "/Shashini_Ruwanthika_CV.pdf";

const CvSection = () => {
  return (
    <div className="cv-section section-container" id="cv">
      <div className="cv-container">
        <p className="cv-label">Resume</p>
        <h3 className="cv-title">
          Want the <span>full story?</span>
        </h3>
        <p className="cv-text">
          Education, skills and projects in one page.
        </p>
        <a
          className="cv-button"
          href={CV_FILE}
          download="Shashini_Ruwanthika_CV.pdf"
          data-cursor="disable"
        >
          <span className="cv-button-icon">
            <MdFileDownload />
          </span>
          <span className="cv-button-text">Download my CV</span>
        </a>
      </div>
    </div>
  );
};

export default CvSection;
