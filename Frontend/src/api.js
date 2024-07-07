import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => {
  return api.post('login/', { username, password });
};

export const register = (username, email, password) => {
  return api.post('register/', { username, email, password });
};

export const logout = () => {
  return api.post('logout/');
};

export const getUserData = (userId) => {
  return api.get(`users/${userId}/`);
};

export const updateUserProfile = (userId, userData) => {
  return api.put(`users/${userId}/`, userData);
};

export const getElectionData = () => {
  return api.get('elections/');
}

export const getBallotsData = (electionId) => {
  return api.get(`ballots/${electionId}/`);
}

export const getCandidates = (ballotId) => {
  return api.get(`candidates/by-ballot/${ballotId}/`);
}
export const getChoices = (ballotId) => {
  return api.get(`choices/by-ballot/${ballotId}/`);
}

export const createVote = (userId, choiceId) => {
  return api.post(`vote/`, { user_id: userId, choice_id: choiceId});
}