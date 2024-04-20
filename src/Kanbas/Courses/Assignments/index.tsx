import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { useState } from "react";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <input placeholder="Search for Assignments" />
        <button className="btn btn-light color-lightgray"> + Group </button>
        <button className="btn btn-light color-lightgray">
          {" "}
          + Assignment{" "}
        </button>
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <i className="fa fa-check-circle"></i> Edit Assignment Dates
          </button>
          <div
            className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            <a className="dropdown-item" href="#">
              Edit Assignment Dates
            </a>
          </div>
        </div>
      </div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;
