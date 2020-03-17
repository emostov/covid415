import axios from 'axios';

//The backend routes are not for certain
//
export const getTasks = () => {
    return axios.get('/api/tasks')
}

export const createTask = data => {
    return axios.post('/api/tasks', data)
}

export const updateTask = data => {
    return axios.patch(`/api/tasks/${data.id}`, data)
}