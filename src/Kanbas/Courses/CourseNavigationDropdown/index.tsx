import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function CourseNavigationDropdown() {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const links = [ "Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto Video", "Discussions", "Announcements", "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings" ];
    return (
        <>
        <a data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={() => setIsCollapseOpen(!isCollapseOpen)}><FaAngleDown className="d-lg-none"/></a>
        <div className={`collapse ${isCollapseOpen ? 'show' : ''}`} id="collapseExample">
                <div className="wd-navigation-dropdown card card-body">
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                            <Link to={`${link}`}> {link} </Link>
                            </li>
                        ))}
                    </ul>    
                </div>
            </div>
        </>
    )
}
export default CourseNavigationDropdown