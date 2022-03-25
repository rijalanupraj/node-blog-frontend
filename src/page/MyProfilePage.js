// External Import
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal Import
import NoProfilePic from '../assets/noProfilePic.jpg';
import BlogList from '../components/BlogList';
import MyBlogList from '../components/MyBlogList';
import { getMyPosts } from '../redux/actions/postActions';

function MyProfilePage() {
  const Auth = useSelector(state => state.Auth);
  const Post = useSelector(state => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPosts());
  }, []);

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='card mb-4'>
              <div className='card-body text-center'>
                <img
                  src={Auth.user.profilePhoto.hasPhoto ? Auth.user.profilePhoto.url : NoProfilePic}
                  height='150'
                  width='150'
                  alt='avatar'
                  className='rounded-circle'
                />
                <h5 className='my-3'>{Auth.user.username}</h5>
                <p className='text-muted mb-1'>Blogger</p>
                <p className='text-muted mb-4'></p>
                <div className='d-flex justify-content-center mb-2'></div>
              </div>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='card mb-4'>
              <div className='card-body'>
                <MyBlogList posts={Post.myPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfilePage;
