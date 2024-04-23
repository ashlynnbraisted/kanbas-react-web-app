import { faAngleDown, faArrowRight, faBold, faDroplet, faEllipsis, faEllipsisVertical, faHighlighter, faItalic, faPlus, faTrashCan, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createQuestion, findQuestionById, updateQuestion } from "./client";
import { FaPlus, FaTrash } from "react-icons/fa";


function QuestionEditor() {
    const { courseId, quizId, questionId } = useParams();

    const initialQuestionState = {
        _id: "1",
        quizId: `${quizId}`,
        questionType: "Multiple Choice",
        title: "Question Title",
        points: 1,
        question: "Enter Question Text Here",
        answer: ["Answer"],
        options: [],
    }
    
    const [question, setQuestion] = useState<any | null>(initialQuestionState);
    const [edit, setEdit] = useState("New Question");


    useEffect(() => {
        if (questionId !== undefined && questionId !== "0") {
            const fetchQuestion = async () => {
                const result = await findQuestionById(questionId);
                setQuestion(result);
                setEdit("Edit Question");
                console.log("result", result);
                console.log("edit", edit);
            };
            fetchQuestion();
        }
    }, []);

    console.log("question", question);

    const handleAddPossibleAnswer = () => {
        const newList = [...question.options, "New Answer"];
        setQuestion({ ...question, options: newList });
    };

    const handleDeletePossibleAnswer = (index: number) => {
        setAnswers(answers.filter((_, answerIndex) => answerIndex !== index));
        console.log("delete", index);
        const updatedOptions = [...question.options];
        updatedOptions.splice(index, 1);
        setQuestion({ ...question, options: updatedOptions });
    };

    const handleEditPossibleAnswer = (index: number, possibleAnswer: String) => {
        console.log("edit", index);
        const updatedOptions = [...question.options];
        updatedOptions[index] = possibleAnswer;
        setQuestion({ ...question, options: updatedOptions });    
    }

    const handleUpdateQuestion = () => {
        if (edit === "Edit Question") {
            updateQuestion(question);
        }
        else {
            createQuestion(question);
        }
    };

    const [answers, setAnswers] = useState(['']);

    const handleAddAnswer = () => {
      setAnswers([...answers, '']);
    };

    const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
      };



    return (
        <div>
            <div>
                <input type="text" value={`${question.title}`} onChange={(e) =>
                    setQuestion({ ...question, title: e.target.value})}/>
                <select
                    value={`${question.questionType}`}
                    onChange={(e) =>{e.target.value === 'True/False' ? 
                    setQuestion({ ...question, questionType: e.target.value, answer: ['True'], options: ['False']})
                    : setQuestion({ ...question, questionType: e.target.value, answer: ['Answer'], options: []})} 
                    }>
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Fill in the Blank</option>
                </select>
                <input type="text"value={`${question.points}`} onChange={(e) =>
                    setQuestion({ ...question, points: e.target.value})}/>
            </div>
            <hr/>
            <div>
                <div>Enter your question and multiple answers, then select the one correct answer.</div>
                <div>Question:</div>
                <div style={{ display: "flex" }}>
                    <span style={{ display: "inline-block", marginBottom: "10px" }}>
                    Edit View Insert Format Tools Table
                    </span>
                </div>
                <div style={{ display: "flex" }}>
                    <span style={{ display: "inline-block" }}>
                    12pt
                    <FontAwesomeIcon icon={faAngleDown} />
                    Paragraph
                    <FontAwesomeIcon icon={faAngleDown} />
                    |
                    <FontAwesomeIcon icon={faItalic} />
                    <FontAwesomeIcon icon={faBold} />
                    <FontAwesomeIcon icon={faUnderline} />
                    <FontAwesomeIcon icon={faDroplet} />
                    <FontAwesomeIcon icon={faAngleDown} />
                    <FontAwesomeIcon icon={faHighlighter} />
                    <FontAwesomeIcon icon={faAngleDown} />
                    |
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    </span>
                </div>
                <textarea value={`${question.question}`} onChange={(e) =>
                    setQuestion({ ...question, question: e.target.value})}></textarea>
            </div>
            <div>Answers:</div>
                {question.questionType === "Multiple Choice" && ( 
                 <div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faArrowRight}/> Correct Answer  
                            <input type="text" value={`${question.answer[0]}`} onChange={(e) =>
                                setQuestion({ ...question, answer: [e.target.value] })}/>
                        </div>
                        <button
                            className="green-outline"
                            style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </div>
                    <div>
                        {question.options
                        .filter((option: any) => !question.answer.includes(option))
                        .map((value: string, index: number) => (
                            <div key={index}>
                                <div>
                                    <FontAwesomeIcon icon={faArrowRight}/> Possible Answer  
                                    <input type="text" value={`${value}`}
                                    onChange={(e) => handleEditPossibleAnswer(index, e.target.value)}/>
                                    <button
                                    onClick={() => handleDeletePossibleAnswer(index)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                                <button
                                    className="red-outline"
                                    style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                        </div>))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                            style={{
                            color: "red",
                            border: "none",
                            background: "none",
                            padding: "0",
                            }}
                            onClick={handleAddPossibleAnswer}>
                            <FontAwesomeIcon icon={faPlus}/> Add Another Answer
                        </button>
                    </div>
                </div>)}
                {question.questionType === "True/False" && ( 
                    <div>
                        <div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="True"
                                        checked={question.answer[0] === 'True'}
                                        onChange={(e) => setQuestion({ ...question, answer: e.target.value, options: ['False'] })}
                                    />
                                    True
                                </label>
                            </div>
                            <div>
                                <button
                                    className="green-outline"
                                    style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="False"
                                        checked={question.answer[0] === 'False'}
                                        onChange={(e) => setQuestion({ ...question, answer: e.target.value, options: ['True']})}
                                    />
                                    False
                                </label>
                            </div>
                            <div>
                                <button
                                    className="green-outline"
                                    style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {question.questionType === "Fill in the Blank" && (
    <div>
        <div>
            <div>
                <FontAwesomeIcon icon={faArrowRight}/> Correct Answer  
                <input type="text" value={`${question.answer[0]}`} onChange={(e) =>
                    setQuestion({ ...question, answer: [e.target.value] })}/>
            </div>
            <button
                className="green-outline"
                style={{ marginTop: "20px", marginBottom: "20px" }}>
                <FontAwesomeIcon icon={faEllipsis} />
            </button>
        </div>
        <div>
            {question.options
            .filter((option: any) => !question.answer.includes(option))
            .map((value: string, index: number) => (
                <div key={index}>
                    <div>
                        <FontAwesomeIcon icon={faArrowRight}/> Possible Answer  
                        <input type="text" value={`${value}`}
                        onChange={(e) => handleEditPossibleAnswer(index, e.target.value)}/>
                        <button
                        onClick={() => handleDeletePossibleAnswer(index)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                    <button
                        className="red-outline"
                        style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
            </div>))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
                style={{
                color: "red",
                border: "none",
                background: "none",
                padding: "0",
                }}
                onClick={handleAddPossibleAnswer}>
                <FontAwesomeIcon icon={faPlus}/> Add Another Answer
            </button>
        </div>
    </div>
)}
                    <div>
                        <button
                            className="green-outline"
                            style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <button
                            className="red-outline"
                            style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <button
                            className="blue-outline"
                            style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </div>
            <div>
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/editor/${quizId}`}>
                Cancel </Link>
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/editor/${quizId}`}>
                <button className="btn btn-light" onClick={handleUpdateQuestion}> Update Question</button> </Link>
            </div>
        </div>
    )
}

export default QuestionEditor;