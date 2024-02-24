import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CourseNavigation({ courseNum }: { courseNum: string }) {
    const links = [ "Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto Video", "Discussions", "Announcements", "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings" ];
      const { pathname } = useLocation();

      return (
        <div className="d-none d-md-block">   
            <ul className="wd-navigation">
                <li className="title">{courseNum}</li>
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
                    <Link to={`${link}`}> {link} </Link>
                    </li>
                ))}
            </ul>
        </div>
      );
}
export default CourseNavigation;