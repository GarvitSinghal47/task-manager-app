import axios from 'axios';

export const restClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const graphqlClient = axios.create({
  baseURL: process.env.REACT_APP_GRAPHQL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
