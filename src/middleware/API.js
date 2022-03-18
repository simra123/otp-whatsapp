
import axios from 'axios'

export default axios.create({
    baseURL: `http://localhost:4000`
    // baseURL: `http://3.94.191.228:4000`
    // baseURL: `http://3.94.191.228:4000`
    //baseURL: `https://nanyapp2.herokuapp.com`
})