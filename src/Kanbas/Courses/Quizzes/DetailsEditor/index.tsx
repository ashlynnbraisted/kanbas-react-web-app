import { useState, useEffect } from "react";
import DetailsEditor from "./DetailsEditor";
import QuestionEditor from "../QuizEditor";
import { FaBan, FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import * as client from "../client";
import { useLocation } from "react-router-dom";

const QuizDetailsEditor = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("DetailsEditor");

  const [quiz, setQuiz] = useState<any>({});
  const { quizId, courseId } = useParams();

  const handleTabClick = (tab: any, event: any) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await client.getQuizById(quizId!);
      setQuiz(quiz);
    };
    getQuiz();
  }, []);

  useEffect(() => {
    // Check if the navigation condition is met
    const fromQuestionEditor = location.state?.fromQuestionEditor;
    if (fromQuestionEditor) {
      setActiveTab("QuestionsEditor");
    }
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-end gap-3">
        <text>Points: {quiz.points}</text>
        {quiz.published ? (
          <div style={{ color: "gray" }}>
            <FaRegCheckCircle className="mb-1" /> <text>Published</text>
          </div>
        ) : (
          <div>
            <FaBan className="mt-1" /> <text>Not Published</text>
          </div>
        )}
      </div>
      <hr /> {/* Add Bootstrap's container class */}
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
            Details
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
            Questions
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {" "}
        {activeTab === "DetailsEditor" && <DetailsEditor />}
        {activeTab === "QuestionsEditor" && <QuestionEditor />}
      </div>
      <hr />
      <hr />
    </div>
  );
};

export default QuizDetailsEditor;