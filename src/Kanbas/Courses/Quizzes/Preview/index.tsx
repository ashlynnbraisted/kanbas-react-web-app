import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as client from "../client";


const Preview = () => {
    
    const BASE_API = process.env.REACT_APP_BASE_API_URL;
    const USERS_API = `${BASE_API}/api/users`;
    const QUESTIONS_API = `${BASE_API}/api/questions`;;
    const [quiz, setQuiz] = useState<any>({});
    const { quizId, courseId } = useParams();
    
    const [questions, setQuestions] = useState<any[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const getQuiz = async () => {
        const quiz = await client.getQuizById(quizId!);
        setQuiz(quiz);
      };
      getQuiz();
    }, []);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleEdit = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
    };

    // gets all questions by quiz id 
    useEffect(() => {
        const getQuestions = async () => {
          const questions = await client.getAllQuizByQuizId(quizId!);
          setQuestions(questions);
        };
        getQuestions();
      }, []);

    const [startTime, setStartTime] = useState<Date>(new Date());

    useEffect(() => {
        setStartTime(new Date());
    }, []);


    console.log(questions)
    return (
        <div>
            <h1>Quiz Instructions</h1>
            <p>Started: {startTime.toLocaleString()}</p>

            {questions.length > 0 && (
                <div style={{ border: '1px solid black', margin: '10px', padding: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>{questions[currentQuestionIndex].points} pts</div>

                    <h2>Q{currentQuestionIndex + 1}: {questions[currentQuestionIndex].title}</h2>
                    <p>{questions[currentQuestionIndex].question}</p>
                    {(() => {
                        switch (questions[currentQuestionIndex].questionType) {
                            case 'Multiple Choice':
                                return (
                                    <div>
                                        {questions[currentQuestionIndex].options.map((option: string, optionIndex: number) => (
                                            <div key={optionIndex}>
                                                <input type="radio" id={`question${currentQuestionIndex}option${optionIndex}`} name={`question${currentQuestionIndex}`} value={option} disabled />
                                                <label htmlFor={`question${currentQuestionIndex}option${optionIndex}`}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                );
                            case 'True/False':
                                return (
                                    <div>
                                        <div>
                                            <input type="radio" id={`question${currentQuestionIndex}optionTrue`} name={`question${currentQuestionIndex}`} value="True" disabled />
                                            <label htmlFor={`question${currentQuestionIndex}optionTrue`}>True</label>
                                        </div>
                                        <div>
                                            <input type="radio" id={`question${currentQuestionIndex}optionFalse`} name={`question${currentQuestionIndex}`} value="False" disabled />
                                            <label htmlFor={`question${currentQuestionIndex}optionFalse`}>False</label>
                                        </div>
                                    </div>
                                );
                            case 'Fill in the Blank':
                                    console.log(questions[currentQuestionIndex].answer);
                                    return (
                                        <div>
                                            {questions[currentQuestionIndex].answer.map((answer: string, answerIndex: number) => (
                                                <div key={answerIndex}>
                                                    <input type="text" defaultValue="Type answer here" />
                                                </div>
                                            ))}
                                        </div>
                                    );
                            default:
                                return null;
                        }
                    })()}
                </div>
            )}
            <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
            <button onClick={handleEdit}>Edit</button>

            <div>
            <h2>Questions</h2>
            {questions.map((_, index) => (
                <p key={index} style={{ cursor: 'pointer' }} onClick={() => setCurrentQuestionIndex(index)}>Question {index + 1}</p>
            ))}
        </div>

        </div>
    );
}

export default Preview;