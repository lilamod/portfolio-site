import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/post',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const getPosts = () => {
  return API.get('/get').then(res => res.data);
};

export const createPost = (data) => {
  return API.post('/create', data).then(res => res.data);
};

export const deletePost = (id) => {
  return API.delete(`/delete/${id}`).then(res => res.data);
};


export const updatePost = (id) =>{
    return API.put(`/update/${id}`)
}