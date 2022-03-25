// External Import
import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:8000/api/v1'
  baseURL: 'https://my-node-blog-app.herokuapp.com/api/v1/'
});
