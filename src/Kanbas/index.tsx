import KanbasNavigation from "./Navigation";
import { Navigate, Routes, Route } from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import "./styles.css";



function Kanbas() {
  return (
    <div className="container">
        <div className="d-none d-md-block" style={{ width: "80px" }}>
            <KanbasNavigation />
        </div>
      <div className="p-4">
        <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses" element={<h1>Courses</h1>} />
          <Route path="Courses/:courseId/*" element={<Courses />} />

        </Routes>
      </div>
    </div>
  );
}
export default Kanbas;