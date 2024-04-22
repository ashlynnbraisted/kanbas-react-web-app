import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";

const QuizDetails = () => {
  const [quiz, setQuiz] = useState<any>({});
  const { quizId, courseId } = useParams();

  const navigate = useNavigate();
  const gotoEdit = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/editor/${quizId}`);
  };

  const gotoPreview = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/preview/${quizId}`);
  }

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await client.getQuizById(quizId!);
      setQuiz(quiz);
    };
    getQuiz();
  }, []);

  const togglePublish = async () => {
    if (quiz.published) {
      await client.unpublishQuiz(quizId!);
    } else {
      await client.publishQuiz(quizId!);
    }
    // Refetch quiz data to update state
    const updatedQuiz = await client.getQuizById(quizId!);
    setQuiz(updatedQuiz);
  };

  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-light color-lightgray"
          onClick={togglePublish}
        >
          {" "}
          {quiz.published ? "Unpublish" : "Publish"}{" "}
        </button>
        <button className="btn btn-light color-lightgray" onClick={() => gotoPreview()}> Preview </button>
        <button
          className="btn btn-light color-lightgray"
          onClick={() => gotoEdit()}
        >
          {" "}
          Edit{" "}
        </button>
      </div>
      <h1>Quiz Details</h1>
      <p>Quiz Type: {quiz.quizType}</p>
      <p>points: {quiz.points}</p>
      <p>Assignment Group: {quiz.assignmentGroup}</p>
      <p>Shuffle answers: {quiz.shuffleAnswers}</p>
      <p>Time Limit: {quiz.timeLimit} minutes</p>
      <p>Multiple attemps: {quiz.multipleAttempts}</p>
      <p>Show correct answers: {quiz.showCorrectAnswers}</p>
      <p>Access Code: {quiz.accessCode}</p>
      <p>One Question at a Time: {quiz.oneQuestionAtATime}</p>
      <p>Webcam required: {quiz.webcamRequired}</p>
      <p>Lock Questions after answering: {quiz.lockQuestionsAfterAnswering}</p>
      <p>Due Date: {quiz.dueDate}</p>
      <p>Available Date: {quiz.availableDate}</p>
      <p>until Date: {quiz.untilDate}</p>
    </div>
  );
};

export default QuizDetails;
