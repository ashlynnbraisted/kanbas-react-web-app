// @ts-nocheck
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { useEffect, useState, useRef } from "react";
import ContextMenu from "./ContextMenu";
import * as client from "./client";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const { courseId } = useParams();

  const buttonRefs = useRef([]);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const navigate = useNavigate();

  // Reference for the entire container where you want click-outside to work
  const containerRef = useRef(null);

  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [quizId, setQuizId] = useState("");
  const [quiz_Id, setQuiz_Id] = useState("");

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, quizzes.length);
  }, [quizzes]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await client.getQuizzesByCourseId(courseId!);
      setQuizzes(quizzes);
    };

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setContextMenuVisible(false);
      }
    };
    fetchQuizzes();

    // Attach the event listener on mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAvailability = (quiz: any) => {
    const { availableDate, untilDate } = quiz;

    // Ensure dates are valid
    const parsedAvailableDate = new Date(availableDate);
    const parsedUntilDate = new Date(untilDate);

    const currentDate = new Date();

    // Compare dates, taking timezones into consideration
    if (currentDate.getTime() < parsedAvailableDate.getTime()) {
      return "Not available until" + parsedAvailableDate;
    } else if (currentDate.getTime() > parsedUntilDate.getTime()) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const getButtonPosition = (index) => {
    const buttonRef = buttonRefs.current[index];
    if (buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      const xPos = rect.x;
      const yPos = rect.y;
      return [xPos, yPos];
    } else {
      console.error("Button ref not found for index:", index); // Handle potential error
    }
  };

  const showMenu = (index, quizId, quiz_Id) => {
    const [x, y] = getButtonPosition(index);

    setXPos(x - 270);
    setYPos(y - 250);
    setQuizId(quizId);
    setQuiz_Id(quiz_Id);
    setContextMenuVisible(true);
  };

  const addQuiz = async () => {
    const newId = await client.addQuiz(courseId);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/details/${newId}`);
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-light color-lightgray" onClick={addQuiz}>
          {" "}
          + Quiz{" "}
        </button>
      </div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> QUIZZES
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {quizzes.length > 0 &&
              quizzes.map((quiz: any, index: number) => (
                <li key={quiz.id} className="list-group-item">
                  {quiz.title} {getAvailability(quiz)}
                  {"Due: " + quiz.untilDate}
                  {quiz.points} {quiz.numberQuestions + " questions"}{" "}
                  {quiz.published ? "OPEN SYMBOL" : "CLOSED SYMBOL"}
                  <button
                    onClick={() => showMenu(index, quiz.id, quiz._id)}
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                  >
                    <FaEllipsisV className="ms-2" />
                  </button>
                </li>
              ))}
            {contextMenuVisible && (
              <div ref={containerRef}>
                <ContextMenu
                  xPos={xPos}
                  yPos={yPos}
                  quizId={quizId}
                  quiz_Id={quiz_Id}
                  courseId={courseId}
                />
              </div>
            )}
          </ul>
        </li>
        {quizzes.length == 0 && <p>Use the + Quiz button to create a quiz!</p>}
      </ul>
    </>
  );
};

export default Quizzes;
