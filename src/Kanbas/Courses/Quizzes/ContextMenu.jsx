import React, { useState, useRef, useEffect } from "react";
import * as client from "./client";
import { useNavigate } from "react-router-dom";

const ContextMenu = (props) => {
  const { xPos, yPos, quizId, quiz_Id, courseId } = props;

  const navigate = useNavigate();

  const gotoEdit = () => {
    console.log("Hi");
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
    <div style={{ position: "absolute", left: `${xPos}px`, top: `${yPos}px` }}>
      <button onClick={() => gotoEdit()}>Edit</button>
      <br />
      <button onClick={deleteQuiz}>Delete</button>
      <br />
      <button onClick={publishQuiz}>Publish</button>
    </div>
  );
};

export default ContextMenu;
