// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Thay đổi URL này theo backend của bạn
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
