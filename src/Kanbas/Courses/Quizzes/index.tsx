// @ts-nocheck
import { FaBan, FaCaretDown, FaCheckCircle, FaEllipsisV, FaRocket, FaRocketchat, FaSlash, FaStopCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ContextMenu from "./ContextMenu";
import * as client from "./client";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const { courseId } = useParams();

  const buttonRefs = useRef([]);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const navigate = useNavigate();

  const togglePublish = async (id, published) => {
    if (published) {
      await client.unpublishQuiz(id);
    } else {
      await client.publishQuiz(id);
    }
    window.location.reload();
  };

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
      return <text className="subtitle"> Not available until <span style={{fontWeight: "normal"}}>{parsedAvailableDate.toDateString()}</span></text>;
    } else if (currentDate.getTime() > parsedUntilDate.getTime()) {
      return <text className="subtitle">"Closed"</text>;
    } else {
      return <text className="subtitle">"Available"</text>;
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

    setXPos(x);
    setYPos(y);
    setQuizId(quizId);
    setQuiz_Id(quiz_Id);
    setContextMenuVisible(!contextMenuVisible);
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
      <ul className="list-group wd-quizzes">
        <li>
          <ul className="title">
            <FaCaretDown className="ms-2" />
              Quizzes
          </ul>
          <ul className="list-group">
            {quizzes.length > 0 &&
              quizzes.map((quiz: any, index: number) => (
                <li key={quiz.id} className="list-group-item quiz">
                  <div className="d-flex">
                  <FaRocket className="me-3 mt-3 text-success" size="15"/>
                  <div>
                  <Link className="quiz-title" to={`/Kanbas/Courses/${courseId}/Quizzes/details/${quiz.id}`}>
                  {quiz.title} 
                  </Link>
                  <br/>
                  {getAvailability(quiz)} | 
                  <text className="subtitle"> Due </text><span style={{color: "gray"}}>{new Date(quiz.untilDate).toDateString()} | 
                  {" " + quiz.points} pts | 
                  {" " + quiz.numberQuestions + " questions"}
                  </span>
                  </div>
                  </div>
                  <div className="float-end">
                  {quiz.published ? <FaCheckCircle className="text-success" size="20" onClick={() => togglePublish(quiz._id, quiz.published)}/> : <FaBan size="20" onClick={() => togglePublish(quiz._id, quiz.published)}/>}
                  <span
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    onClick={() => showMenu(index, quiz.id, quiz._id)}
                  >
                    <FaEllipsisV className="ms-2" />
                  </span>
                  </div>
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
        {quizzes.length === 0 && <p>Use the + Quiz button to create a quiz!</p>}
      </ul>
    </>
  );
};

export default Quizzes;