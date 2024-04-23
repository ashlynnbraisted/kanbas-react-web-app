import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAllQuizByQuizId } from "./client";
import { useEffect, useState } from "react";
import * as client from "./client";



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
        console.log("questionId", questionId)
    };

    return (
        <div>
            <div>
                {questions.map((question: any, index: number) => (
                <div key={index}>
                    <div>
                    <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/${question._id}`}>
                <button className="btn btn-light" onClick={() => handleUpdateQuestion(question._id)}> Update</button> </Link>
                        <button className="btn btn-light" onClick={() => handleRemoveQuestion(index)}> Delete </button>
                    </div> 
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{question.title}</div>
                        <div>{question.points}</div>
                    </div>
                    <div>
                        <div>{question.question}</div>
                    </div>
                    <div>
                        <ul>
                            <li>{question.answer}</li>
                            {question.options.map((option: string, optionIndex: number) => (
                                <li key={optionIndex}>{option}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                ))}
            </div>
            <div>
                <Link
                    to={`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/0`}>
                <FontAwesomeIcon icon={faPlus} /> New Question </Link>
                <button className="btn btn-light"> <FontAwesomeIcon icon={faPlus} /> New Question Group </button>
                <button className="btn btn-light"> <FontAwesomeIcon icon={faMagnifyingGlass} /> Find Questions </button>
            </div>
            <hr/>
            <div>
                <input type="checkbox"/> Notify users that this quiz has changed
                <button className="btn btn-light" onClick={() => cancel()}> Cancel </button>
                <button className="btn btn-light" onClick={() => saveAndPublish()}> Save & Publish</button>
                <button className="btn btn-light" onClick={() => save()}> Save </button>
            </div>
            <hr/>
        </div>
    );
}

export default QuestionEditor;