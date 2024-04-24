import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";
import {
  FaCheckCircle,
  FaEdit,
  FaPencilAlt,
  FaTimesCircle,
} from "react-icons/fa";

const QuizDetails = () => {
  const [quiz, setQuiz] = useState<any>({});
  const { quizId, courseId } = useParams();

  const navigate = useNavigate();
  const gotoEdit = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/editor/${quizId}`);
  };

  const gotoPreview = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/preview/${quizId}`);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await client.getQuizById(quizId!);
      setQuiz(quiz);
    };
    getQuiz();
  }, []);

  const togglePublish = async () => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    // Refetch quiz data to update state
    const updatedQuiz = await client.getQuizById(quizId!);
    setQuiz(updatedQuiz);
  };

  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        {quiz.published ? (
          <button className="btn btn-danger" onClick={togglePublish}>
            <FaTimesCircle className="me-3 mb-1" />
            Unpublish
          </button>
        ) : (
          <button className="btn btn-success" onClick={togglePublish}>
            {" "}
            <FaCheckCircle className="me-3 mb-1" />
            Publish
          </button>
        )}

        <button
          className="btn btn-light color-lightgray"
          onClick={() => gotoPreview()}
        >
          {" "}
          Preview{" "}
        </button>
        <button
          className="btn btn-light color-lightgray"
          onClick={() => gotoEdit()}
        >
          <FaPencilAlt className="me-3 mb-1" />
          Edit
        </button>
      </div>
      <hr />
      <div
        style={{ fontSize: "35px", fontWeight: "550", marginBottom: "10px" }}
      >
        {quiz.title}
      </div>
      <table style={{ alignItems: "left", marginBottom: "30px" }}>
        <tbody>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Quiz Type:
            </td>
            <td style={{ textAlign: "left" }}>{quiz.quizType}</td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Points:
            </td>
            <td style={{ textAlign: "left" }}>{quiz.points}</td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Assignment Group:
            </td>
            <td style={{ textAlign: "left" }}>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Shuffle Answers:
            </td>
            <td style={{ textAlign: "left" }}>
              {quiz.shuffleAnswers}
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Time Limit:
            </td>
            <td style={{ textAlign: "left" }}>{quiz.timeLimit} minutes</td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Multiple Attempts:
            </td>
            <td style={{ textAlign: "left" }}>
              {quiz.multipleAttempts}
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Show Correct Answers:
            </td>
            <td style={{ textAlign: "left" }}>
              {quiz.showCorrectAnswers}
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Access Code:
            </td>
            <td style={{ textAlign: "left" }}>{quiz.accessCode}</td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              One Question at a Time:
            </td>
            <td style={{ textAlign: "left" }}>
              {quiz.oneQuestionAtATime}
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Webcam Required:
            </td>
            <td style={{ textAlign: "left" }}>
              {quiz.webcamRequired}
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Lock Questions after Answering:
            </td>
            <td style={{ textAlign: "left" }}>
              {quiz.lockQuestionsAfterAnswering}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid lightgray" }}>Due</th>
            <th style={{ borderBottom: "1px solid lightgray" }}>
              Available from
            </th>
            <th style={{ borderBottom: "1px solid lightgray" }}>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                borderBottom: "1px solid lightgray",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              {new Date(quiz.dueDate).toDateString() +
                " at " +
                new Date(quiz.dueDate).toLocaleTimeString()}
            </td>
            <td
              style={{
                borderBottom: "1px solid lightgray",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              {new Date(quiz.availableDate).toDateString() +
                " at " +
                new Date(quiz.availableDate).toLocaleTimeString()}
            </td>
            <td
              style={{
                borderBottom: "1px solid lightgray",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              {new Date(quiz.untilDate).toDateString() +
                " at " +
                new Date(quiz.untilDate).toLocaleTimeString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuizDetails;
