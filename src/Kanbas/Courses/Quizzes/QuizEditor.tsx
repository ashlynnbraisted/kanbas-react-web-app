import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllQuizByQuizId } from "./client";
import { useEffect, useState } from "react";
import * as client from "./client";
import "./index.css";
import { FaEdit, FaGripVertical, FaRegEdit, FaRegTrashAlt, FaTrash } from "react-icons/fa";


function QuestionEditor() {
    const { courseId, quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState<any>({});

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


    console.log('questions', questions);

    useEffect(() => {
        getAllQuizByQuizId(quizId).then(fetchedQuestions => {
            setQuestions(fetchedQuestions);
        });
    }, [quizId]);

    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, questionIndex) => questionIndex !== index);
        setQuestions(updatedQuestions);
    };

    const handleUpdateQuestion = (questionId: any) => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/${questionId}`);
    };

    return (
        <div>
            <div>
                {questions.map((question: any, index: number) => (
                                <ul className="list-group wd-quiz" key={index}>
                                <li>
                                    <div className="title d-flex justify-content-between">
                                    <div>
                                        <FaGripVertical className="m-2 mt-0 mb-1"/><text>{question.title}</text></div>
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
                        <FaRegEdit onClick={() => handleUpdateQuestion(question._id)}/>
                        <FaRegTrashAlt onClick={() => handleRemoveQuestion(index)}/>
                    </div> 
                    </li>
                </ul>
                ))}
            </div>
            <div style={{marginLeft: 70, marginTop: 10}}>
                <button style={{marginRight: 10}} className="btn btn-light" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/0`)}><FontAwesomeIcon icon={faPlus} /> New Question </button>
                <button style={{marginRight: 10}} className="btn btn-light"> <FontAwesomeIcon icon={faPlus} /> New Question Group </button>
                <button style={{marginRight: 10}} className="btn btn-light"> <FontAwesomeIcon icon={faMagnifyingGlass} /> Find Questions </button>
            </div>
        </div>
    );
}

export default QuestionEditor;