import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import CourseNavigation from "./Navigation";
import { Link } from "react-router-dom";
import "./Modules/index.css";
import { HiMiniBars3 } from "react-icons/hi2";
import Modules from "./Modules";
import Quizzes from "./Quizzes";
import Home from "./Home";
import Assignments from "./Assignments";
import NavigationDropdown from "./NavigationDropdown";
import CourseNavigationDropdown from "./CourseNavigationDropdown";
import QuizDetails from "./Quizzes/Details";
import QuizDetailsEditor from "./Quizzes/DetailsEditor";
import Preview from "./Quizzes/preview";
import QuizEditor from "./Quizzes/QuizEditor";
import QuestionEditor from "./Quizzes/QuestionEditor";

function Courses() {
  const { courseId } = useParams();
  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  const courseNum = course?.number ?? "";
  const { pathname } = useLocation();
  const path = pathname.split("/").pop()?.replace("%20", " ") ?? "";

  return (
    <div className="wd-modules container">
      <div className="header">
        <br />
        <HiMiniBars3 className="hamburger d-none d-lg-inline" />
        <NavigationDropdown />
        <Link to={"Home"}> {courseNum}</Link> &gt; {path}
        <div className="float-end">
          <button className="btn btn-light">
            <i className="fas fa-binoculars pe-1"></i> Student View
          </button>
          <CourseNavigationDropdown />
        </div>
        <hr />
      </div>
      <div className="d-flex" style={{ display: "inline-block" }}>
        <CourseNavigation courseNum={courseNum} />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Zoom Meetings" element={<h1>Zoom Meetings</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/details/:quizId" element={<QuizDetails />} />
            <Route
              path="Quizzes/editor/:quizId"
              element={<QuizDetailsEditor />}
            />
            <Route path="Quizzes/:quizId" element={<QuizEditor/>} />
            <Route path="Quizzes/Question/:quizId/:questionId" element={<QuestionEditor/>} />
            <Route path="Quizzes/preview/:quizId" element={<Preview />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="People" element={<h1>People</h1>} />
            <Route path="Panopto Video" element={<h1>Panopto Video</h1>} />
            <Route path="Discussions" element={<h1>Discussions</h1>} />
            <Route path="Announcements" element={<h1>Announcements</h1>} />
            <Route path="Pages" element={<h1>Pages</h1>} />
            <Route path="Files" element={<h1>Files</h1>} />
            <Route path="Rubrics" element={<h1>Rubrics</h1>} />
            <Route path="Outcomes" element={<h1>Outcomes</h1>} />
            <Route path="Collaborations" element={<h1>Collaborations</h1>} />
            <Route path="Syllabus" element={<h1>Syllabus</h1>} />
            <Route path="Settings" element={<h1>Settings</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;