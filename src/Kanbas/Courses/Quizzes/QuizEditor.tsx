import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

function QuestionEditor() {
    const { courseId, quizId } = useParams();
    return (
        <div>
            <div>
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/Question/${quizId}`}
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