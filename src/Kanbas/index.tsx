import KanbasNavigation from "./Navigation";
import { Navigate, Routes, Route } from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import "./styles.css";
import { useState } from "react";
import dbCourses from "./Database/courses.json";
import store from "./Store";
import { Provider } from "react-redux";


function Kanbas() {
  const [courses, setCourses] = useState(dbCourses);
  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "purple.png"
  });
  const addNewCourse = () => {
    const newCourse = { ...course,
                        _id: new Date().getTime().toString() };
    setCourses([...courses, { ...course, ...newCourse }]);
  };
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
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
            <Route path="Account" element={<h1>Account</h1>} />
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
              <Courses courses={courses} />} />

          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;