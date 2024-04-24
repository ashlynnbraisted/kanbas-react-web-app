import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as client from "../client";
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaBookmark, FaExclamationCircle, FaPencilAlt, FaRegBookmark, FaRegQuestionCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";


const Preview = () => {
    
    const BASE_API = process.env.REACT_APP_API_BASE;
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
        <div className="wd-preview">
            <text className="title">{quiz.title}</text>
            <div className="previewMsg">
                <FaExclamationCircle className="mb-1 me-2" />
                <text style={{fontSize: 14}}>This is a preview of the published version of the quiz</text>
            </div>
            <text style={{fontSize: 14}}>Started: {startTime.toDateString()} at {startTime.toLocaleTimeString()}</text>
            <br/>
            <text className="title">Quiz Instructions</text>
            <br/>
            <text style={{fontSize: 14}}>{quiz.description}</text>
            <hr/>

            <div className="d-flex justify-content-between">
                <div style={{flexGrow: 1}} className="questionArea">
                    <div className="d-flex gap-3">
                        <FaRegBookmark className="mt-2" size={20}/>
                        <div style={{flexGrow: 1}}>
                        {questions.length > 0 && (
                            <div className="question">
                                <div className="questionTitle d-flex justify-content-between">
                                    <text>Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].title}</text>
                                    <text>{questions[currentQuestionIndex].points} pts</text>
                                </div>
                                <div className="questionContent">
                                    {questions[currentQuestionIndex].question}
                                    {(() => {
                                        switch (questions[currentQuestionIndex].questionType) {
                                            case 'Multiple Choice':
                                                return (
                                                    <div>
                                                        {questions[currentQuestionIndex].options.map((option: string, optionIndex: number) => (
                                                            <div key={optionIndex}>
                                                                <hr/>
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
                                                            <hr/>
                                                            <input type="radio" id={`question${currentQuestionIndex}optionTrue`} name={`question${currentQuestionIndex}`} value="True" disabled />
                                                            <label htmlFor={`question${currentQuestionIndex}optionTrue`}>True</label>
                                                        </div>
                                                        <div>
                                                            <hr/>
                                                            <input type="radio" id={`question${currentQuestionIndex}optionFalse`} name={`question${currentQuestionIndex}`} value="False" disabled />
                                                            <label htmlFor={`question${currentQuestionIndex}optionFalse`}>False</label>
                                                        </div>
                                                    </div>
                                                );
                                            case 'Fill in the Blank':
                                                    console.log(questions[currentQuestionIndex].answer);
                                                    return (
                                                        <div>
                                                            <hr/>
                                                            {questions[currentQuestionIndex].answer.map((answer: string, answerIndex: number) => (
                                                                <div key={answerIndex}>
                                                                    <input className="form" type="text" placeholder="Type answer here" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                            default:
                                                return null;
                                        }
                                    })()}
                                </div>
                            </div>
                        )}  
                                                <div className="d-flex justify-content-between mt-5">
                            <button className="btn btn-light" onClick={handleBack} disabled={currentQuestionIndex === 0}><FaAngleLeft/> Back</button>
                            <button className="btn btn-light" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next <FaAngleRight/> </button>
                        </div>
                        </div>               
                    </div>
                </div>
                <div>
                <h3>Questions</h3>
                
                    {questions.map((_, index) => (
                        <div className="questionListItem">
                        <FaRegQuestionCircle className="mt-1 me-1"/> <text key={index} style={{ cursor: 'pointer' }} onClick={() => setCurrentQuestionIndex(index)}>Question {index + 1}</text>
                        </div>
                    ))}
                
                </div>
            </div>
            <div className="submit d-flex justify-content-end gap-2">
            <text className="text-muted" style={{alignContent: "center"}}>Quiz saved at {new Date().toLocaleTimeString()}</text>
            <button className="btn btn-light">Submit Quiz</button>
            </div>
            <button className="edit btn btn-light" style={{width: '100%'}} onClick={handleEdit}><FaPencilAlt className="m-2 mt-0 mb-0"/>Keep Editing This Quiz </button>
            
        </div>
    );
}

export default Preview;