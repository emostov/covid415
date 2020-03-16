import axios from 'axios';

//The backend routes are not for certain
//
export const getTasks = () => {
    return axios.get('/api/tasks')
}

export const createTask = data => {
    return axios.post('/api/tasks/', data)
}