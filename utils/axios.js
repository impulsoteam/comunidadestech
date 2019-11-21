import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
});

export const setHeader = ({ token }) => {
  api.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
