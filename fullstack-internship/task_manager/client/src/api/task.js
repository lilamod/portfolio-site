import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/task',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const getTask = () => {
  return API.get('/get').then(res => res.data);
};

export const createTask = (data) => {
  return API.post('/create', data).then(res => res.data);
};

export const deleteTask = (id) => {
  return API.delete(`/delete/${id}`).then(res => res.data);
};


export const updateTask = (id) =>{
    return API.put(`/update/${id}`)
}