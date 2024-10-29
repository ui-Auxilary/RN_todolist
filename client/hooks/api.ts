import { BASE_URL } from '@/constants/api';
import axios from 'axios';

export const fetchTodos = async () => {
  return await axios.get(`${BASE_URL}/todos`);
};

export const fetchTags = async () => {
  return await axios.get(`${BASE_URL}/todos/tags`);
};
