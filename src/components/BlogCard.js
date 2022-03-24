// External Import
import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  return (
    <div className='col-lg-4 col-md-12 mb-4 mb-lg-0'>
      <div>
        <div
          className='bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4'
          data-mdb-ripple-color='light'
        >
          <img src={post.image.url} className='img-fluid' alt='' />
          <a href='#!'>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>

        <div className='row mb-3'>
          <div className='col-6'>
            <a href='/' className='text-info'>
              <i className='fas fa-plane'></i>
              Travels
            </a>
          </div>

          <div className='col-6 text-end'>
            <u> 15.07.2020</u>
          </div>
        </div>

        <Link to={`post/${post.slug}`} className='text-dark'>
          <h5>{post.title}</h5>

          <p>{post.content.slice(0, 10)}</p>
        </Link>

        <hr />
      </div>
    </div>
  );
}

export default BlogCard;
