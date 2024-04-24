import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";
import "../index.css";
import {
  FaAngleDown,
  FaBold,
  FaEllipsisV,
  FaEyeDropper,
  FaGripVertical,
  FaHighlighter,
  FaItalic,
  FaKeyboard,
  FaLine,
  FaRegKeyboard,
  FaSpeakerDeck,
  FaSuperscript,
  FaUnderline,
  FaWater,
} from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";

const DetailsEditor = (props: any) => {
  const { updateQuizField, quiz } = props;

  // useEffect(() => {
  //   const updateDates = () => {
  //     if (quiz.dueDate) {
  //       if (quiz.dueDate.includes("T")) {
  //         quiz.dueDate = quiz.dueDate.split("T")[0];
  //       }
  //     }
  //     if (quiz.availableDate) {
  //       if (quiz.availableDate.includes("T")) {
  //         quiz.availableDate = quiz.availableDate.split("T")[0];
  //       }
  //     }
  //     if (quiz.untilDate) {
  //       if (quiz.untilDate.includes("T")) {
  //         quiz.untilDate = quiz.untilDate.split("T")[0];
  //       }
  //     }
  //   };
  //   updateDates();
  //   console.log(quiz.dueDate, quiz.availableDate, quiz.untilDate);
  // }, []);

  // console.log(quiz);

  return (
    <div className="wd-details-editor">
      <br />
      <input
        className="form"
        type="text"
        value={quiz.title}
        onChange={(event) => updateQuizField("title", event.target.value)}
        style={{ width: "50%" }}
      ></input>
      <br />
      Quiz Instructions:
      <div style={{ display: "flex", marginTop: 15 }}>
        <span style={{ display: "inline-block", marginBottom: "10px" }}>
          <text style={{ marginLeft: 20 }}>Edit</text>
          <text style={{ marginLeft: 20 }}>View</text>
          <text style={{ marginLeft: 20 }}>Insert</text>
          <text style={{ marginLeft: 20 }}>Format</text>
          <text style={{ marginLeft: 20 }}>Tools</text>
          <text style={{ marginLeft: 20 }}>Table</text>
        </span>
      </div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <span style={{ display: "inline-block" }}>
          <text style={{ marginLeft: 20 }}>12pt</text>
          <FaAngleDown />
          <text style={{ marginLeft: 20 }}>Paragraph</text>
          <FaAngleDown />
          <text style={{ marginLeft: 20, color: "lightgray" }}>|</text>
          <FaBold style={{ marginLeft: 20 }} />
          <FaItalic style={{ marginLeft: 20 }} />
          <FaUnderline style={{ marginLeft: 20 }} />
          <FaEyeDropper style={{ marginLeft: 20 }} />
          <FaAngleDown />
          <FaHighlighter style={{ marginLeft: 20 }} />
          <FaAngleDown />
          <FaSuperscript style={{ marginLeft: 20 }} />
          <FaAngleDown />
          <text style={{ marginLeft: 20, color: "lightgray" }}>|</text>
          <FaEllipsisV style={{ marginLeft: 20 }} />
        </span>
      </div>
      <textarea
        value={quiz.description}
        onChange={(event) => updateQuizField("description", event.target.value)}
        style={{ width: "100%" }}
        className="form"
      ></textarea>
      <div className="d-flex justify-content-between">
        p
        <div
          className="d-flex justify-content-end gap-3"
          style={{ color: "red" }}
        >
          <FaRegKeyboard className="mt-1" />
          <text style={{ marginLeft: 5, color: "lightgray" }}>|</text>
          <text style={{ marginLeft: 5 }}>0 Words</text>
          <text style={{ marginLeft: 5, color: "lightgray" }}>|</text>
          <text style={{ marginLeft: 5 }}>{"</>"}</text>
          <text style={{ marginLeft: 5, color: "lightgray" }}>|</text>
          <FaGripVertical className="mt-1" />
        </div>
      </div>
      <table
        style={{ alignItems: "left", marginBottom: "30px", marginTop: "20px" }}
      >
        <tbody>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "0.5em",
                fontWeight: "bold",
              }}
            >
              Quiz Type
            </td>
            <td style={{ textAlign: "left" }}>
              <select
                className="form"
                value={quiz.quizType}
                onChange={(event) =>
                  updateQuizField("quizType", event.target.value)
                }
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
              </select>
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
              Points
            </td>
            <td style={{ textAlign: "left" }}>
              <input
                className="form"
                type="number"
                value={quiz.points}
                onChange={(event) =>
                  updateQuizField("points", event.target.value)
                }
              />
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
              Assignment Group
            </td>
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
              </select>
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
              Shuffle Answers
            </td>
            <td style={{ textAlign: "left" }}>
              <select
                className="form"
                value={quiz.shuffleAnswers}
                onChange={(event) =>
                  updateQuizField("shuffleAnswers", event.target.value)
                }
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
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
              Time Limit
            </td>
            <td style={{ textAlign: "left" }}>
              <input
                className="form"
                type="number"
                value={quiz.timeLimit}
                onChange={(event) =>
                  updateQuizField("timeLimit", event.target.value)
                }
              />
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
              Multiple Attempts
            </td>
            <td style={{ textAlign: "left" }}>
              <select
                className="form"
                value={quiz.multipleAttempts}
                onChange={(event) =>
                  updateQuizField("multipleAttempts", event.target.value)
                }
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
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
              Show Correct Answers
            </td>
            <td style={{ textAlign: "left" }}>
              {" "}
              <select
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
              </select>
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
              Access Code
            </td>
            <td style={{ textAlign: "left" }}>
              <input
                className="form"
                type="text"
                value={quiz.accessCode}
                onChange={(event) =>
                  updateQuizField("accessCode", event.target.value)
                }
              />
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
              One Question at a Time
            </td>
            <td style={{ textAlign: "left" }}>
              <select
                className="form"
                value={quiz.oneQuestionAtATime}
                onChange={(event) =>
                  updateQuizField("oneQuestionAtATime", event.target.value)
                }
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
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
              Webcam Required
            </td>
            <td style={{ textAlign: "left" }}>
              <select
                className="form"
                value={quiz.webcamRequired}
                onChange={(event) =>
                  updateQuizField("webcamRequired", event.target.value)
                }
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
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
              Lock Questions after Answering
            </td>
            <td style={{ textAlign: "left" }}>
              <select
                className="form"
                value={quiz.lockQuestionsAfterAnswering}
                onChange={(event) =>
                  updateQuizField(
                    "lockQuestionsAfterAnswering",
                    event.target.value
                  )
                }
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
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
              Due Date
            </td>
            <td style={{ textAlign: "left" }}>
              <input
                className="form"
                type="date"
                value={quiz.dueDate}
                onChange={(event) =>
                  updateQuizField("dueDate", event.target.value)
                }
              />
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
              Available Date
            </td>
            <td style={{ textAlign: "left" }}>
              <input
                className="form"
                type="date"
                value={quiz.availableDate}
                onChange={(event) =>
                  updateQuizField("availableDate", event.target.value)
                }
              />
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
              Until Date
            </td>
            <td style={{ textAlign: "left" }}>
              <input
                className="form"
                type="date"
                value={quiz.untilDate}
                onChange={(event) =>
                  updateQuizField("untilDate", event.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default DetailsEditor;
