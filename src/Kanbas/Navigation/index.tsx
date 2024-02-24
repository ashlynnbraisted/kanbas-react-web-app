import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaBook, FaInbox, FaClock, FaVideo, FaShareSquare, FaQuestionCircle, FaUserCircle, FaCalendarAlt, FaUser } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "Account",   icon: <FaUser className="fs-3" id="acct" />  },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-3" />  },
    { label: "Courses",   icon: <FaBook className="fs-3" />           },
    { label: "Calendar",  icon: <FaCalendarAlt className="fs-3" /> },
    { label: "Inbox",  icon: <FaInbox className="fs-3" /> },
    { label: "History",  icon: <FaClock className="fs-3" /> },
    { label: "Studio",  icon: <FaVideo className="fs-3" /> },
    { label: "Commons",  icon: <FaShareSquare className="fs-3" /> },
    { label: "Help",  icon: <FaQuestionCircle className="fs-3" /> },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
        <li><img src="/images/northeastern_logo.jpg" width="50px"/></li>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;