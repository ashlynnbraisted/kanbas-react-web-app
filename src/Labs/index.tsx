import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import Nav from "../nav";
import Assignment3 from "./a3";
import Assignment4 from "./a4";
import { Provider } from "react-redux";
import store from "./Store";
import Assignment5 from "./a5";


function Labs() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
        <h1>Labs</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="a3"/>}/>
          <Route path="/a3/*" element={<Assignment3 />} />
          <Route path="/a4/*" element={<Assignment4 />} />
          <Route path="/a5/*" element={<Assignment5 />} />
        </Routes>
      </div>
      </Provider>
      
    );
  }
  export default Labs;