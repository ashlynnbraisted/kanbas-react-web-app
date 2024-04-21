import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";

const DetailsEditor = () => {
  const [quiz, setQuiz] = useState<any>({});
  const { quizId, courseId } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await client.getQuizById(quizId!);
      setQuiz(quiz);
    };
    getQuiz();
  }, []);

  return (
    <div>
      <h1>Quiz Details Editor</h1>
      <h1>{quiz.title}</h1>
    </div>
  );
};

export default DetailsEditor;
