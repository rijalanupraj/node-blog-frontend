// External Import
import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api/v1'
      : 'https://my-node-blog-app.herokuapp.com/api/v1'
});
