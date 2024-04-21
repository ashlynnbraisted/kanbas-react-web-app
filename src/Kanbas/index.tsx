import KanbasNavigation from "./Navigation";
import Account from "./Account";
import { Navigate, Routes, Route } from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./Store";
import { Provider } from "react-redux";

const API_BASE = process.env.REACT_APP_API_BASE;
function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const COURSES_API = `${API_BASE}/api/courses`;  ;
  
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "purple.png"
  });
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([ ...courses, response.data ]);
  };

  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  return (
    <Provider store={store}>
      <div className="container">
          <div className="d-none d-md-block" style={{ width: "80px" }}>
              <KanbasNavigation />
          </div>
        <div className="p-4">
          <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={
            <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>
            } />
            <Route path="Courses" element={<h1>Courses</h1>} />
            <Route path="Courses/:courseId/*" element={
              <Courses/>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;