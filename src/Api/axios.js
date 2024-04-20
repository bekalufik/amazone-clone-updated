// http://127.0.0.1:5001/updated-clone/us-central1/api
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://amazon-api-deploy-u3o5.onrender.com/'
})


export { axiosInstance }


