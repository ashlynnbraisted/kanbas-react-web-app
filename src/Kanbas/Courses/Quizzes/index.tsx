import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { useEffect, useState } from "react";
import * as client from "./client";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const { courseId } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await client.getQuizzesByCourseId(courseId!);
      console.log(quizzes);
      setQuizzes(quizzes);
    };
    fetchQuizzes();
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

  //TODO CONTEXT MENU

  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <input placeholder="Search for Quizzes" />
        <button className="btn btn-light color-lightgray"> + Quiz </button>
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
            {quizzes.map((quiz: any) => (
              <li key={quiz.id} className="list-group-item">
                {quiz.title} {getAvailability(quiz)}
                {"Due: " + quiz.untilDate}
                {quiz.points} {quiz.numberQuestions + " questions"}{" "}
                {getAvailability(quiz) === "Available"
                  ? "OPEN SYMBOL"
                  : "CLOSED SYMBOL"}
                <button
                  onClick={() => {
                    console.log("HGIHI");
                  }}
                >
                  <FaEllipsisV className="ms-2" />
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default Quizzes;
