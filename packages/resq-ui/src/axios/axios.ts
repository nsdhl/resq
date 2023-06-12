import axios from "axios";

const resqApi = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdjMWJhZWUwMTY0MTY2Mzg4ZWQwM2UiLCJ1c2VybmFtZSI6Im5pc2NoYWwiLCJsb2NhdGlvbiI6eyJ0eXBlIjoiUG9pbnQiLCJjb29yZGluYXRlcyI6WzI3LjcyOCw4NS4zNTM3XX0sInJvbGUiOlsiYWRtaW4iXSwiaWF0IjoxNjg2NTgxMjk3LCJleHAiOjE2ODY2Njc2OTd9.ooDRSDmI4peiV4LofDg9Cb8EUgQghV0flCgFBKbRbRo'

resqApi.interceptors.request.use(function(req) {
  req.headers.authorization = `Bearer ${token}`
  return req;
})

export { resqApi }; 
