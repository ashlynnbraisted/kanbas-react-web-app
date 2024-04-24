import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteQuestion, getAllQuizByQuizId } from "./client";
import { useEffect, useState } from "react";
import * as client from "./client";
import "./index.css";
import {
  FaEdit,
  FaGripVertical,
  FaRegEdit,
  FaRegTrashAlt,
  FaTrash,
} from "react-icons/fa";

function QuestionEditor() {
  const { courseId, quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllQuizByQuizId(quizId).then((fetchedQuestions) => {
      setQuestions(fetchedQuestions);
    });
  }, [quizId]);

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await client.getQuizById(quizId!);
      setQuiz(quiz);
    };
    getQuiz();
  }, []);

  const handleRemoveQuestion = (index: number, question: any) => {
    const updatedQuestions = questions.filter(
      (_, questionIndex) => questionIndex !== index
    );
    deleteQuestion(question)
    setQuestions(updatedQuestions);
  };

  const handleUpdateQuestion = (questionId: any) => {
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/${questionId}`
    );
  };

  const save = () => {
    const response = client.updateQuiz(quiz._id, quiz);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/details/${quizId}`);
  };

  const saveAndPublish = () => {
    /// updateQuizField("published", true);
    const response = client.updateQuiz(quiz._id, { ...quiz, published: true });

    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  const cancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };


  return (
    <div>
      <div>
        {questions.map((question: any, index: number) => (
          <ul className="list-group wd-quiz" key={index}>
            <li>
              <div className="title d-flex justify-content-between">
                <div>
                  <FaGripVertical className="m-2 mt-0 mb-1" />
                  <text>{question.title}</text>
                </div>
                <div className="me-3">{question.points} pts</div>
              </div>
              <div className="question">{question.question}</div>
              <ul className="answers">
                <text>Answer Options:</text>
                <li className="answer">{question.answer}</li>
                {question.options.map((option: string, optionIndex: number) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-end gap-1 me-3 mb-3">
                <FaRegEdit onClick={() => handleUpdateQuestion(question._id)} />
                <FaRegTrashAlt onClick={() => handleRemoveQuestion(index, question)} />
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div style={{ marginLeft: 70, marginTop: 10 }}>
        <button
          style={{ marginRight: 10 }}
          className="btn btn-light"
          onClick={() =>
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/0`)
          }
        >
          <FontAwesomeIcon icon={faPlus} /> New Question{" "}
        </button>
        <button style={{ marginRight: 10 }} className="btn btn-light">
          {" "}
          <FontAwesomeIcon icon={faPlus} /> New Question Group{" "}
        </button>
        <button style={{ marginRight: 10 }} className="btn btn-light">
          {" "}
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Find Questions{" "}
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <span>
          <input type="checkbox" /> Notify users that this quiz has changed
        </span>
        <div className="d-flex justify-content-end gap-3">
          <button
            className="btn btn-light color-lightgray"
            onClick={() => cancel()}
          >
            Cancel
          </button>
          <button
            className="btn btn-light color-lightgray"
            onClick={() => saveAndPublish()}
          >
            Save and Publish
          </button>
          <button className="btn btn-danger" onClick={() => save()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionEditor;
