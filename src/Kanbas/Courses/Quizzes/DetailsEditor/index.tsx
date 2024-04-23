import { useState, useEffect } from "react";
import DetailsEditor from "./DetailsEditor";
import QuestionEditor from "../QuizEditor";

const QuizDetailsEditor = () => {
  const [activeTab, setActiveTab] = useState("DetailsEditor");

  const handleTabClick = (tab: any, event: any) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="container">
      {" "}
      {/* Add Bootstrap's container class */}
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "DetailsEditor" ? "active" : ""
            }`}
            onClick={(event) => handleTabClick("DetailsEditor", event)}
            href="/"
            role="tab"
            data-bs-toggle="tab"
            aria-selected={activeTab === "DetailsEditor"}
          >
            Details Editor
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "QuestionsEditor" ? "active" : ""
            }`}
            onClick={(event) => handleTabClick("QuestionsEditor", event)}
            href="/"
            role="tab"
            data-bs-toggle="tab"
            aria-selected={activeTab === "QuestionsEditor"}
          >
            Questions Editor
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {" "}
        {activeTab === "DetailsEditor" && <DetailsEditor />}
        {activeTab === "QuestionsEditor" && <QuestionEditor />}
      </div>
    </div>
  );
};

export default QuizDetailsEditor;