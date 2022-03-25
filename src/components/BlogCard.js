// External Import
import React from 'react';
import { Link } from 'react-router-dom';
import ReactTimeago from 'react-timeago';

// Internal Import
import NoProfilePic from '../assets/noProfilePic.jpg';

function BlogCard({ post }) {
  return (
    <div className='col-lg-4 col-md-12 mb-4 mb-lg-0'>
      <div>
        <div
          className='bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4'
          data-mdb-ripple-color='light'
        >
          <Link to={`/post/${post.slug}`}>
            <img src={post.image.url} className='img-fluid ' alt='' />
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </Link>
        </div>

        <div className='row mb-3'>
          <div className='col-6'>
            <Link to={`/profile/${post.author.username}`} className='text-info'>
              <img
                src={
                  post.author.profilePhoto.hasPhoto ? post.author.profilePhoto.url : NoProfilePic
                }
                className='rounded-circle border'
                width='30'
                height='30'
                alt=''
              />
              {` ${post.author.username}`}
            </Link>
          </div>

          <div className='col-6 text-end'>
            <span>{post.createdAt && <ReactTimeago date={post.createdAt} />}</span>
          </div>
        </div>

        <Link to={`/post/${post.slug}/`} className='text-dark'>
          <h5>{post.title}</h5>
        </Link>

        <hr />
      </div>
    </div>
  );
}

export default BlogCard;
