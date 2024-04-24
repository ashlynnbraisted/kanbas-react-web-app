import { faAngleDown, faArrowRight, faBold, faDroplet, faEllipsis, faEllipsisVertical, faHighlighter, faItalic, faPlus, faTrashCan, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createQuestion, findQuestionById, updateQuestion } from "./client";
import { FaAngleDown, FaArrowRight, FaBold, FaEllipsisV, FaEyeDropper, FaGripVertical, FaHighlighter, FaItalic, FaPlus, FaRegKeyboard, FaSuperscript, FaTrash, FaUnderline } from "react-icons/fa";


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
    const navigate = useNavigate();


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
        const newList = [...question.options, ""];
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
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/editor/${quizId}`, { state: { fromQuestionEditor: true }})
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
        <div className="wd-question-editor">
            <div className="d-flex justify-content-between m-2">
                <div className="d-flex gap-2">
                <input 
                    className="form" 
                    type="text" 
                    placeholder="Question Title"
                    value={question.title}
                    onChange={(e) =>
                    setQuestion({ ...question, title: e.target.value})}/>
                <select
                    className="form"
                    style={{ height: "46px" }}
                    value={question.questionType}
                    onChange={(e) =>{e.target.value === 'True/False' ? 
                    setQuestion({ ...question, questionType: e.target.value, answer: ['True'], options: ['False']})
                    : setQuestion({ ...question, questionType: e.target.value, answer: ['Answer'], options: []})} 
                    }>
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Fill in the Blank</option>
                </select>
                </div>
                <div>
                    <text>pts: </text>
                    <input 
                        className="form" 
                        style={{ width: "50px" }}
                        type="text" 
                        value={question.points}
                        onChange={(e) =>
                        setQuestion({ ...question, points: e.target.value})}/>
                </div>
            </div>
            <hr/>
            <div>
            Enter your question and multiple answers, then select the one correct answer.
            <h5 style={{marginTop: 3, fontWeight: "bold"}}>Question:</h5>
        <div style={{ display: "flex", marginTop: 15 }}>
                    <span style={{ display: "inline-block", marginBottom: "10px" }}>
                    <text style={{marginLeft: 20}}>Edit</text>
                    <text style={{marginLeft: 20}}>View</text>
                    <text style={{marginLeft: 20}}>Insert</text>
                    <text style={{marginLeft: 20}}>Format</text>
                    <text style={{marginLeft: 20}}>Tools</text>
                    <text style={{marginLeft: 20}}>Table</text>
                    </span>
                </div>
                <div style={{ display: "flex", marginBottom: "10px"  }}>
                    <span style={{ display: "inline-block" }}>
                    <text style={{marginLeft: 20}}>12pt</text>
                    <FaAngleDown />
                    <text style={{marginLeft: 20}}>Paragraph</text>
                    <FaAngleDown />
                    <text style={{marginLeft: 20, color: "lightgray"}}>|</text>
                    <FaBold style={{marginLeft: 20}}/>
                    <FaItalic style={{marginLeft: 20}}/>
                    <FaUnderline style={{marginLeft: 20}}/>
                    <FaEyeDropper style={{marginLeft: 20}}/>
                    <FaAngleDown/>
                    <FaHighlighter style={{marginLeft: 20}}/>
                    <FaAngleDown/>
                    <FaSuperscript style={{marginLeft: 20}}/>
                    <FaAngleDown/>
                    <text style={{marginLeft: 20, color: "lightgray"}}>|</text>
                    <FaEllipsisV  style={{marginLeft: 20}}/>
                    </span>
                </div>
                <textarea
          value={question.question}
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value})}
          style={{ width: "100%" }}
          className="form"
        ></textarea>
        <div className="d-flex justify-content-between">
          p
        <div className="d-flex justify-content-end gap-3" style={{color: "red"}}>
          <FaRegKeyboard className="mt-1"/>
          <text style={{marginLeft: 5, color: "lightgray"}}>|</text>
          <text style={{marginLeft: 5}}>0 Words</text>
          <text style={{marginLeft: 5, color: "lightgray"}}>|</text>
          <text style={{marginLeft: 5}}>{'</>'}</text>
          <text style={{marginLeft: 5, color: "lightgray"}}>|</text>
          <FaGripVertical className="mt-1"/>
        </div>
        </div>
        </div>
                {question.questionType === "Multiple Choice" && ( 
                 <div>
                    <div style={{fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Answers:</div>
                            <div className="text-success">
                            <FaArrowRight className="mb-1"/> 
                            <text> Correct Answer </text>
                            <input 
                                className="form"
                                type="text" 
                                value={question.answer[0]? question.answer[0]: ""}
                                placeholder="New Answer"
                                onChange={(e) =>
                                setQuestion({ ...question, answer: [e.target.value] })}/> 
                            </div>
                    <div>
                        {question.options
                        .filter((option: any) => !question.answer.includes(option))
                        .map((value: string, index: number) => (
                            <div key={index}>
                                <div>
                                <FaArrowRight className="mb-1"/> 
                                    <text> Possible Answer </text>
                                    <input type="text" 
                                    className="form"
                                    value={`${value}`}
                                    placeholder="New Answer"
                                    onChange={(e) => handleEditPossibleAnswer(index, e.target.value)}/>
                                    <FaTrash className="m-2" onClick={() => handleDeletePossibleAnswer(index)}/>
                                </div>
                                
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
                        <div style={{fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Correct Answer:</div>
                        <select
                            className="form"
                            style={{ marginBottom: 25 }}
                            value={question.answer}
                            onChange={(e) =>{e.target.value === 'True' ? 
                            setQuestion({ ...question, answer: ['True'], options: ['False']})
                            : setQuestion({ ...question, answer: ['False'], options: ['True']})} 
                            }>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                )}
                {question.questionType === "Fill in the Blank" && (
    <div>
               <div style={{fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Answers:</div>
        <div className="text-success">
                            <FaArrowRight className="mb-1"/> 
                            <text> Possible Answer </text>
                            <input 
                                className="form"
                                type="text" 
                                value={question.answer[0]? question.answer[0]: ""}
                                placeholder="New Answer"
                                onChange={(e) =>
                                setQuestion({ ...question, answer: [e.target.value] })}/> 
                            </div>
        <div>
            {question.options
            .filter((option: any) => !question.answer.includes(option))
            .map((value: string, index: number) => (
                <div key={index}>
                    <div className="text-success">
                        <FaArrowRight className="mb-1"/> 
                        <text> Possible Answer </text>
                        <input type="text" 
                        className="form"
                        value={`${value}`}
                        placeholder="New Answer"
                        onChange={(e) => handleEditPossibleAnswer(index, e.target.value)}/>
                        <FaTrash className="m-2" style={{color: "black"}} onClick={() => handleDeletePossibleAnswer(index)}/>
                    </div>
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
            <button className="btn btn-light" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/editor/${quizId}`, { state: { fromQuestionEditor: true }})}> Cancel</button>
                <button className="btn btn-danger" onClick={handleUpdateQuestion}> Update Question</button>
            </div>
        </div>
    )
}

export default QuestionEditor;