import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const QUESTIONS_API = `${BASE_API}/api/questions`;;


const api = axios.create({
    withCredentials: true
});

export const getAllQuizDetails = async () => {
  const response = await api.get( `${BASE_API}/api/quizDetails` );
  return response.data;
};

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
  console.log('data', response.data);
  return response.data;
}

export const getAllQuizByQuizId = async (quizId : any) => {
  const response = await axios.get(`${QUESTIONS_API}/${quizId}`);
  return response.data;
}