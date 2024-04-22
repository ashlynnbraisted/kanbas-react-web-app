import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuizDetails } from "./client"; 

function Preview() {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<any | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            const quiz = await getAllQuizDetails();
            setQuiz(quiz);
        };
        fetchQuiz();
    }, []);

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {quiz.questions.map((question: any) => (
                <div key={question._id}>
                    <div>
                        <input type="text" value={question.title} readOnly />
                        <select value={question.questionType} disabled>
                            <option>Multiple Choice</option>
                            <option>True/False</option>
                            <option>Fill In Blanks</option>
                        </select>
                        <input type="text" value={question.points} readOnly />
                    </div>
                    <hr/>
                    <div>
                        <div>Question:</div>
                        <textarea value={question.question} readOnly></textarea>
                    </div>
                    <div>Answers:</div>
                    {question.questionType === "Multiple Choice" && (
                        <div>
                            <div>
                                <div>
                                    Correct Answer  
                                    <input type="text" value={question.answer[0]} readOnly />
                                </div>
                            </div>
                            <div>
                                {question.options
                                .filter((option: any) => !question.answer.includes(option))
                                .map((value: string, index: number) => (
                                    <div key={index}>
                                        <div>
                                            Possible Answer  
                                            <input type="text" value={value} readOnly />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {question.questionType === "True/False" && (
                        <div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="True"
                                        checked={question.answer === 'True'}
                                        readOnly
                                    />
                                    True
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="False"
                                        checked={question.answer === 'False'}
                                        readOnly
                                    />
                                    False
                                </label>
                            </div>
                        </div>
                    )}
                    {question.questionType === "Fill In Blanks" && (
                        <div>
                            {question.answer.map((answer: string, index: number) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={answer}
                                    readOnly
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Preview;