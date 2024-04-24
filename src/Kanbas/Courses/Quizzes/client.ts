import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
export const QUESTIONS_API = `${BASE_API}/api/questions`;;

const api = axios.create({
    withCredentials: true
});

export const getAllQuizDetails = async () => {
  const response = await api.get( `${BASE_API}/api/quizDetails` );
  return response.data;
};

export const getQuizzesByCourseId = async (courseId: string) => {
  const response = await api.get( `${BASE_API}/api/quizDetails/${courseId}` );
  return response.data;
}

export const getQuizById = async (quizId: string) => {
  const response = await api.get( `${BASE_API}/api/quizDetails/quiz/${quizId}` );
  const quiz = response.data[0];
  quiz.dueDate = quiz.dueDate.split("T")[0];
  quiz.availableDate = quiz.availableDate.split("T")[0];
  quiz.untilDate = quiz.untilDate.split("T")[0];
  console.log(quiz.availableDate, quiz.dueDate, quiz.untilDate);
  return quiz;
}

export const updateQuiz = async(quiz_id: String, quiz: any) => {
  const response = await api.post(`${BASE_API}/api/quizDetails/${quiz_id}`, quiz);
  return response;
}

export const deleteQuiz = async(quiz_id: String) => {
  const response = await api.delete(`${BASE_API}/api/quizDetails/${quiz_id}`);
  return response;
}

export const publishQuiz = async(quizId: String) => {
  const response = await api.post(`${BASE_API}/api/quizDetails/${quizId}/publish`);
  return response;
}

export const unpublishQuiz = async(quizId: String) => {
  const response = await api.post(`${BASE_API}/api/quizDetails/${quizId}/unpublish`);
  return response;
}

export const addQuiz = async(courseId: String) => {
  const response = await api.post(`${BASE_API}/api/quizDetails/${courseId}/create`);
  return response.data.id;
}

export const createQuestion = async (question : any) => {
    const response = await axios.post(
      `${QUESTIONS_API}`,
      question
    );
    return response.data;
  };
  
  export const updateQuestion = async (question : any) => {
    const response = await axios.
      put(`${QUESTIONS_API}/${question._id}`, question);
  
    return response.data;
  };

  export const findQuestionById = async (questionId : string) => {
    const response = await axios.get(`${QUESTIONS_API}/id/${questionId}`);
    return response.data;
  }
  
  export const getAllQuizByQuizId = async (quizId : any) => {
    const response = await axios.get(`${QUESTIONS_API}/${quizId}`);
    return response.data;
  }