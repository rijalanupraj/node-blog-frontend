import React from 'react';
import { Link } from 'react-router-dom';
import NoProfilePic from '../assets/noProfilePic.jpg';

function FeaturedBlog({ posts }) {
  return (
    <section className='border-bottom pb-4 mb-5'>
      <div className='row gx-5'>
        {posts.length > 0 &&
          posts.map(post => {
            return (
              <div className='col-md-4 mb-4'>
                <div
                  className='bg-image hover-overlay ripple shadow-2-strong rounded-5'
                  data-mdb-ripple-color='light'
                >
                  <img
                    src='https://mdbootstrap.com/img/new/slides/080.jpg'
                    className='img-fluid'
                    alt=''
                  />
                  <a href='#!'>
                    <div
                      className='mask'
                      style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
                    ></div>
                  </a>
                </div>

                <span className='badge bg-danger px-2 py-1 shadow-1-strong mb-3'>Popular</span>
                <Link to={`/post/${post.slug}`}>
                  <h4>
                    <strong className='text-black'>{post.title}</strong>
                  </h4>
                </Link>
                <p className='text-muted'></p>
                <p>
                  <Link to={`/profile/${post.author.username}`} className='text-info'>
                    <img
                      src={
                        post.author.profilePhoto.hasPhoto
                          ? post.author.profilePhoto.url
                          : NoProfilePic
                      }
                      className='rounded-circle border'
                      width='30'
                      height='30'
                      alt=''
                    />
                    {` ${post.author.username}`}
                  </Link>
                </p>
                <Link to={`post/${post.slug}`} type='button' className='btn btn-primary'>
                  Read more
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default FeaturedBlog;
