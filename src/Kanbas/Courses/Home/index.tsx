import React from 'react';
import ModuleList from '../Modules/List';
import { FaBan, FaBell, FaBullhorn, FaBullseye, FaCalendarAlt, FaChartBar, FaCheckCircle, FaClock, FaFileImport, FaShareSquare } from 'react-icons/fa';
import { assignments } from '../../Database';
import { useParams } from 'react-router-dom';

function Home() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
      (assignment) => assignment.course === courseId);
    return (
        <div className="d-flex">
            <div className="flex-grow-1"><ModuleList /></div>
            <div className="status me-2 d-none d-lg-block">
                <h5>Course Status</h5>
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <button className="unpublish btn btn-light"><FaBan/> Unpublish</button>
                        <button className="publish btn btn-light"><FaCheckCircle/> Published</button>
                    </div>
                    <br/>
                    <button className="btn btn-light"><FaFileImport/> Import Existing Content</button>
                    <button className="btn btn-light"><FaShareSquare/> Import From Commons</button>
                    <button className="btn btn-light"><FaBullseye/> Choose Home Page</button>
                    <button className="btn btn-light"><FaChartBar/> View Course Stream</button>
                    <button className="btn btn-light"><FaBullhorn/> New Announcement</button>
                    <button className="btn btn-light"><FaChartBar/> New Analytics</button>
                    <button className="btn btn-light"><FaBell/> View Course Notifications</button>
                </div>
                <br/>
                <div className="todo">
                    <h6>To Do</h6>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <FaClock className="red"/>
                        <ul>
                            <li><a href="#"> {assignmentList[0].title}</a> <br />
                                <span className="subtext">100 points - Sep 11</span></li>
                        </ul>
                        <i className="fa fa-close"></i><br/>
                    </div>
                </div>
                <br/>
                <div className="upcoming">
                    <div className="d-flex justify-content-between center">
                        <h6>Coming Up</h6>
                        <a href="#"><i className="fa fa-calendar-alt"></i> View Calendar</a>
                    </div>
                    <hr/>
                    <ul>
                        <li><FaCalendarAlt/><a href="#">Lecture</a> <br />
                            <span className="subtext">CS4550.12631.202410</span><br />
                            <span className="subtext">Sep 7 at 11:45AM</span>
                        </li>
                        <li><FaCalendarAlt/><a href="#">Lecture</a> <br />
                            <span className="subtext">CS4550.12631.202410</span><br />
                            <span className="subtext">Sep 11 at 11:45AM</span>
                        </li>
                        <li><FaCalendarAlt/><a href="#">Lecture</a> <br />
                            <span className="subtext">CS4550.12631.202410</span><br />
                            <span className="subtext">Sep 11 at 6PM</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;