import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as client from "../client";


const Preview = () => {
    const [quiz, setQuiz] = useState<any>({});
    const { quizId, courseId } = useParams();
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const getQuiz = async () => {
        const quiz = await client.getQuizById(quizId!);
        setQuiz(quiz);
      };
      getQuiz();
    }, []);

    return (
        <div>
          <h1>Quiz Preview</h1>
          <h2>{quiz.numberQuestions}</h2>
          <p>Quiz Type: {quiz.quizType}</p>
          <p>points: {quiz.points}</p>
          <p>Assignment Group: {quiz.assignmentGroup}</p>
        </div>
      );

};

export default Preview;