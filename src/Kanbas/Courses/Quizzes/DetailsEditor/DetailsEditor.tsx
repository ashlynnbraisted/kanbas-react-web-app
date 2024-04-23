import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";
import "../index.css";

const DetailsEditor = () => {
  const [quiz, setQuiz] = useState<any>({});
  const { quizId, courseId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await client.getQuizById(quizId!);
      quiz.dueDate = quiz.dueDate.split("T")[0];
      quiz.availableDate = quiz.availableDate.split("T")[0];
      quiz.untilDate = quiz.untilDate.split("T")[0];
      setQuiz(quiz);
    };
    getQuiz();
  }, []);

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

  const updateQuizField = (field: any, newVal: any) => {
    setQuiz({
      ...quiz,
      [field]: newVal,
    });
  };
  return (
    <div className="wd-details-editor">
      <br/>
        <input
          className="form"
          type="text"
          value={quiz.title}
          onChange={(event) => updateQuizField("title", event.target.value)}
          style={{ width: "50%" }}
        ></input>
        <br/>
        Quiz Instructions:
        <br/>
      <textarea
          value={quiz.description}
          onChange={(event) =>
            updateQuizField("description", event.target.value) 
          }
          style={{ width: "100%" }}
          className="form"
        ></textarea>
        <table style={{alignItems: "left", marginBottom: "30px"}}>
    <tbody>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Quiz Type</td>
        <td style={{ textAlign: "left" }}>
          <select
          className="form"
          value={quiz.quizType}
          onChange={(event) => updateQuizField("quizType", event.target.value)}
        >
          <option
            value={"Graded Quiz"}
            selected={quiz.quizType === "Graded Quiz"}
          >
            Graded Quiz
          </option>
          <option
            value={"Practice Quiz"}
            selected={quiz.quizType === "Practice Quiz"}
          >
            Practice Quiz
          </option>
          <option
            value={"Graded Survey"}
            selected={quiz.quizType === "Graded Survey"}
          >
            Graded Survey
          </option>
          <option
            value={"Ungraded Survey"}
            selected={quiz.quizType === "Ungraded Survey"}
          >
            Ungraded Survey
          </option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Points</td>
        <td style={{ textAlign: "left" }}><input
        className="form"
          type="number"
          value={quiz.points}
          onChange={(event) => updateQuizField("points", event.target.value)}
        /></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Assignment Group</td>
        <td style={{ textAlign: "left" }}>
        <select
        className="form"
          value={quiz.assignmentGroup}
          onChange={(event) =>
            updateQuizField("assignmentGroup", event.target.value)
          }
        >
          <option value={"Quizzes"}>Quizzes</option>
          <option value={"Exams"}>Exams</option>
          <option value={"Assignments"}>Assignments</option>
          <option value={"Project"}>Project</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Shuffle Answers</td>
        <td style={{ textAlign: "left" }}><select
        className="form"
          value={quiz.shuffleAnswers}
          onChange={(event) =>
            updateQuizField("shuffleAnswers", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Time Limit</td>
        <td style={{ textAlign: "left" }}><input
        className="form"
          type="number"
          value={quiz.timeLimit}
          onChange={(event) => updateQuizField("timeLimit", event.target.value)}
        /></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Multiple Attempts</td>
        <td style={{ textAlign: "left" }}><select
        className="form"
          value={quiz.multipleAttempts}
          onChange={(event) =>
            updateQuizField("multipleAttempts", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Show Correct Answers</td>
        <td style={{ textAlign: "left" }}> <select
        className="form"
          value={quiz.showCorrectAnswers}
          onChange={(event) =>
            updateQuizField("showCorrectAnswers", event.target.value)
          }
        >
          <option value={"Immediately"}>Immediately</option>
          <option value={"After all attempts are submitted"}>
            After all attempts are submitted
          </option>
          <option value={"Never"}>Never</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Access Code</td>
        <td style={{ textAlign: "left" }}><input
        className="form"
          type="text"
          value={quiz.accessCode}
          onChange={(event) =>
            updateQuizField("accessCode", event.target.value)
          }
        /></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>One Question at a Time</td>
        <td style={{ textAlign: "left" }}><select
        className="form"
          value={quiz.oneQuestionAtATime}
          onChange={(event) =>
            updateQuizField("oneQuestionAtATime", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Webcam Required</td>
        <td style={{ textAlign: "left" }}><select
        className="form"
          value={quiz.webcamRequired}
          onChange={(event) =>
            updateQuizField("webcamRequired", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Lock Questions after Answering</td>
        <td style={{ textAlign: "left" }}><select
        className="form"
          value={quiz.lockQuestionsAfterAnswering}
          onChange={(event) =>
            updateQuizField("lockQuestionsAfterAnswering", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Due Date</td>
        <td style={{ textAlign: "left" }}><input
        className="form"
          type="date"
          value={quiz.dueDate}
          onChange={(event) => updateQuizField("dueDate", event.target.value)}
        /></td>
      </tr>
      <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Available Date</td>
        <td style={{ textAlign: "left" }}><input
        className="form"
          type="date"
          value={quiz.availableDate}
          onChange={(event) =>
            updateQuizField("availableDate", event.target.value)
          }
        /></td>
              </tr>
        <tr>
        <td style={{ textAlign: "right", paddingRight: "0.5em", fontWeight: "bold" }}>Until Date</td>
        <td style={{ textAlign: "left" }}><input
        className="form"
          type="date"
          value={quiz.untilDate}
          onChange={(event) => updateQuizField("untilDate", event.target.value)}
        /></td>

      </tr>
    </tbody>
  </table>
      
      <hr/>
      <div className="d-flex justify-content-end gap-3">
        <button className="btn btn-light color-lightgray" onClick={() => cancel()}>Cancel</button>
        <button className="btn btn-light color-lightgray" onClick={() => saveAndPublish()}>Save and Publish</button>
        <button className="btn btn-danger" onClick={() => save()}>Save</button>
      </div>
      <hr/>
    </div>
  );
};

export default DetailsEditor;