import axios from 'axios';

const API = 'http://localhost:8080/api'; // à adapter selon votre backend

export const registerUser = async (data) => {
  return axios.post(`${API}/auth/register`, data).then((res) => res.data);
};

export const loginUser = async (data) => {
  return axios.post(`${API}/auth/login`, data).then((res) => res.data);
};
