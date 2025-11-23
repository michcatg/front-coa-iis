// src/api/httpClient.js
import axios from 'axios'

const httpClient = axios.create({
  timeout: 10000, // 10 segundos máximo por request
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpClient
