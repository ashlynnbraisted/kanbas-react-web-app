import React, { useState, useRef, useEffect } from "react";
import * as client from "./client";
import { useNavigate } from "react-router-dom";

const ContextMenu = (props) => {
  const { xPos, yPos, quizId, quiz_Id, courseId } = props;

  const navigate = useNavigate();

  const gotoEdit = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/details/${quizId}`);
  };

  const deleteQuiz = async () => {
    const response = await client.deleteQuiz(quiz_Id);
    window.location.reload();
  };

  const publishQuiz = async () => {
    const response = await client.publishQuiz(quiz_Id);
    window.location.reload();
  };

  return (
    <div style={{ position: "absolute", left: `${xPos}px`, top: `${yPos}px`}}>
      <button className="btn btn-light" style={{width: '100px'}} onClick={() => gotoEdit()}>Edit</button>
      <br />
      <button className="btn btn-light" style={{width: '100px'}} onClick={deleteQuiz}>Delete</button>
      <br />
      <button className="btn btn-light" style={{width: '100px'}} onClick={publishQuiz}>Publish</button>
    </div>
  );
};

export default ContextMenu;