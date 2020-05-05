import axios from 'axios';

export const getTasks = () => {
    return axios.get('/api/tasks')
}

export const createTask = data => {
    return axios.post('/api/tasks', data)
}

export const updateTask = data => {
    return axios.patch(`/api/tasks/${data._id}`, data)
}