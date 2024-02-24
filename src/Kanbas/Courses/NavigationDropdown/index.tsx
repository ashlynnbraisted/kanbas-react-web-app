import { useState } from "react";
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaClock, FaVideo, FaShareSquare, FaQuestionCircle, FaWindowClose, FaRegWindowClose, FaCross, FaWindowMinimize } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import "../../Navigation/index.css"


function NavigationDropdown() {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    return (
        <>
    <a data-bs-toggle="collapse"role="button" aria-expanded="false" aria-controls="collapseExample" onClick={() => setIsCollapseOpen(!isCollapseOpen)}><HiMiniBars3 className="hamburger d-lg-none"/></a>
        <div className={`collapse ${isCollapseOpen ? 'show' : ''}`} id="collapseExample">
          <div className="card card-body">
              <ul className="wd-kanbas-navigation-dropdown">
                  <a className="d-lg-none float-end" onClick={() => setIsCollapseOpen(false)} role="button" aria-expanded="false" aria-controls="collapseExample"><FaWindowClose className="fs-2"/></a>
                  <li><a href="/Kanbas/Account/Profile/screen.html"><span><FaUser className="fs-2 user"/></span>Account</a></li>
                  <li><a href="/Kanbas/Dashboard/screen.html"><FaTachometerAlt className="fs-2"/>Dashboard</a></li>
                  <li><a href="/Kanbas/Courses/Home/screen.html"><FaBook className="fs-2"/>Courses</a></li>
                  <li><a href="#"><FaCalendarAlt className="fs-2"/>Calendar</a></li>
                  <li><a href="#"><FaInbox className="fs-2"/>Inbox</a></li>
                  <li><a href="#"><FaClock className="fs-2"/>History</a></li>
                  <li><a href="#"><FaVideo className="fs-2"/>Studio</a></li>
                  <li><a href="#"><FaShareSquare className="fs-2"/>Commons</a></li>
                  <li><a href="#"><FaQuestionCircle className="fs-2"/>Help</a></li>
              </ul>  
          </div>
        </div>
        </>
    );

}
export default NavigationDropdown;