import axios from 'axios';

export const sendSMS = (msgData) => {
    return axios.post('/api/messages', msgData);
};