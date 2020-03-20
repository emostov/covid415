import axios from 'axios';

export default {
  parseDestination: (origin, destination) => {
    const ori = [origin[1], origin[0]]
    const finalOri = ori.join('')
    const dest = [destination[1], destination[0]]
    const finalDest = dest.join('')
    const data = { finalOri, finalDest };
    return axios.post('/api/google/distancematrix', data)
      .then((res) => console.log(res))
  },
}

