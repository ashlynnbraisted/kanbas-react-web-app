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

