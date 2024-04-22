import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const getAllQuizDetails = async () => {
  const response = await api.get( `${BASE_API}/api/quizDetails` );
  return response.data;
};

export const getQuizzesByCourseId = async (courseId: string) => {
  console.log(courseId);
  const response = await api.get( `${BASE_API}/api/quizDetails/${courseId}` );
  return response.data;
}

export const getQuizById = async (quizId: string) => {
  const response = await api.get( `${BASE_API}/api/quizDetails/quiz/${quizId}` );
  return response.data[0];
}

export const updateQuiz = async(quiz_id: String, quiz: any) => {
  const response = await api.post(`${BASE_API}/api/quizDetails/${quiz_id}`, quiz);
  return response;
}