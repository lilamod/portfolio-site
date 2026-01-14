import axios from 'axios';

const BASE = 'http://localhost:3000/api/auth';

export const signup = (data) => {
  return axios.post(`${BASE}/signup`, data)
    .then(res => res.data);
};

export const signin = (data) => {
  return axios.post(`${BASE}/signin`, data)
    .then(res =>res.data);
};
