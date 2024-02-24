import './App.css';
import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas";
import { HashRouter } from 'react-router-dom';
import {Routes, Route, Navigate} from "react-router";

function App() {
   return (
    <HashRouter>
      <div>
      <Routes>
          <Route path="/"         element={<Navigate to="/Labs"/>}/>
          <Route path="/Labs/*"   element={<Labs/>}/>
          <Route path="/Kanbas/*" element={<Kanbas/>}/>
          <Route path="/hello"    element={<HelloWorld/>}/>
        </Routes>
      </div>
    </HashRouter>
);}


export default App;
