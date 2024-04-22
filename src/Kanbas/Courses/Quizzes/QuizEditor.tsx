import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { getAllQuizByQuizId } from "./client";
import { useEffect, useState } from "react";

function QuestionEditor() {
    const { courseId, quizId } = useParams();
    const [questions, setQuestions] = useState([]);
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
                  to={`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}/0`}
                >
                <FontAwesomeIcon icon={faPlus} /> New Question </Link>
                <button className="btn btn-light"> <FontAwesomeIcon icon={faPlus} /> New Question Group </button>
                <button className="btn btn-light"> <FontAwesomeIcon icon={faMagnifyingGlass} /> Find Questions </button>
            </div>
            <hr/>
            <div>
                <input type="checkbox"/> Notify users that this quiz has changed
                <button className="btn btn-light"> Cancel </button>
                <button className="btn btn-light"> Save & Publish</button>
                <button className="btn btn-light"> Save </button>
            </div>
            <hr/>
        </div>
    );
}

export default QuestionEditor;