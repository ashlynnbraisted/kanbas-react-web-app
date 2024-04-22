import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";

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
    <div>
      <h1>Quiz Details Editor</h1>
      <p>
        Quiz Title{" "}
        <input
          type="text"
          value={quiz.title}
          onChange={(event) => updateQuizField("title", event.target.value)}
        ></input>
      </p>
      <p>
        Description{" "}
        <textarea
          value={quiz.description}
          onChange={(event) =>
            updateQuizField("description", event.target.value)
          }
        ></textarea>
      </p>
      <p>
        Quiz Type{" "}
        <select
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
        </select>
      </p>
      <p>
        Points{" "}
        <input
          type="number"
          value={quiz.points}
          onChange={(event) => updateQuizField("points", event.target.value)}
        />
      </p>
      <p>
        Assignment Group{" "}
        <select
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
      </p>
      <p>
        Shuffle Answers{" "}
        <select
          value={quiz.shuffleAnswers}
          onChange={(event) =>
            updateQuizField("shuffleAnswers", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select>
      </p>
      <p>
        Time Limit {"(Minutes):"}
        <input
          type="number"
          value={quiz.timeLimit}
          onChange={(event) => updateQuizField("timeLimit", event.target.value)}
        />
      </p>
      <p>
        Multiple Attempts{" "}
        <select
          value={quiz.multipleAttempts}
          onChange={(event) =>
            updateQuizField("multipleAttempts", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select>
      </p>
      <p>
        Show Correct Answers{" "}
        <select
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
      </p>
      <p>
        Acces Code{" "}
        <input
          type="text"
          value={quiz.accessCode}
          onChange={(event) =>
            updateQuizField("accessCode", event.target.value)
          }
        />
      </p>
      <p>
        One question at a time{" "}
        <select
          value={quiz.oneQuestionAtATime}
          onChange={(event) =>
            updateQuizField("oneQuestionAtATime", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select>
      </p>
      <p>
        Webcam Required{" "}
        <select
          value={quiz.webcamRequired}
          onChange={(event) =>
            updateQuizField("webcamRequired", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select>
      </p>
      <p>
        Lock Questions After Answering{" "}
        <select
          value={quiz.lockQuestionsAfterAnswering}
          onChange={(event) =>
            updateQuizField("lockQuestionsAfterAnswering", event.target.value)
          }
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select>
      </p>
      <p>
        Due Date{" "}
        <input
          type="date"
          value={quiz.dueDate}
          onChange={(event) => updateQuizField("dueDate", event.target.value)}
        />
      </p>
      <p>
        Available Date{" "}
        <input
          type="date"
          value={quiz.availableDate}
          onChange={(event) =>
            updateQuizField("availableDate", event.target.value)
          }
        />
      </p>
      <p>
        Until Date{" "}
        <input
          type="date"
          value={quiz.untilDate}
          onChange={(event) => updateQuizField("untilDate", event.target.value)}
        />
      </p>
      <div>
        <button onClick={() => save()}>Save</button>
        <button onClick={() => saveAndPublish()}>Save and Publish</button>
        <button onClick={() => cancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default DetailsEditor;