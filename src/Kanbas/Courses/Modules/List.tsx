import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="flex-container">
        <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-light color-lightgray"> Collapse All </button>
            <button className="btn btn-light color-lightgray"> View Progress </button>
            <div className="dropdown">
            <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
            >
                <i className="fa fa-check-circle"></i> Publish All
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Publish All</a>
                <a className="dropdown-item" href="#">Publish All Modules and Items</a>
                <a className="dropdown-item" href="#">Publish Modules Only</a>
                <a className="dropdown-item" href="#">Unpublish All</a>
            </div>
        </div>
            <button className="btn btn-danger"> <FaPlus/> Module </button>
            <button className="btn btn-light color-lightgray"> <FaEllipsisV/></button>
        </div>
      <ul className="list-group wd-modules">
        {modulesList.map((module, index) => (
          <li key={index}
            className="list-group-item"
            onClick={() => setSelectedModule(module)}>
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson, index) => (
                  <li className="list-group-item" key={index}>
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ModuleList;