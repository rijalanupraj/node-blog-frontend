// External Import
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal Import
import { fetchUserProfileByUsername, fetchUserPublicPost } from '../redux/actions/profileActions';
import { followUser, unFollowUser } from '../redux/actions/authActions';
import NoProfilePic from '../assets/noProfilePic.jpg';
import BlogList from '../components/BlogList';

function ProfilePage() {
  const { username } = useParams();
  const Profile = useSelector(state => state.Profile);
  const Auth = useSelector(state => state.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfileByUsername(username));
    dispatch(fetchUserPublicPost(username));
  }, [username]);

  const handleFollow = () => {
    dispatch(followUser(Profile.profile._id));
  };

  const handleUnFollow = () => {
    dispatch(unFollowUser(Profile.profile._id));
  };

  if (Object.keys(Profile.profile).length === 0) {
    return (
      <div className='spinner-grow text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='card mb-4'>
              <div className='card-body text-center'>
                <img
                  src={
                    Profile.profile.profilePhoto.hasPhoto
                      ? Profile.profile.profilePhoto.url
                      : NoProfilePic
                  }
                  height='150'
                  width='150'
                  alt='avatar'
                  className='rounded-circle'
                />
                <h5 className='my-3'>{Profile.profile.username}</h5>
                <p className='text-muted mb-1'>Blogger</p>
                <p className='text-muted mb-4'></p>
                <div className='d-flex justify-content-center mb-2'>
                  {Auth.isAuthenticated &&
                    Auth.user.username !== Profile.profile.username &&
                    (Auth.user.followings.includes(Profile.profile._id) ? (
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => handleUnFollow()}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => handleFollow()}
                      >
                        Follow
                      </button>
                    ))}
                  {!Auth.isAuthenticated && (
                    <Link to='/auth' className='btn btn-primary'>
                      Follow
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className='card mb-4 mb-lg-0'>
              <div className='card-body p-0'>
                <ul className='list-group list-group-flush rounded-3'>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fas fa-globe fa-lg text-warning'></i>
                    <p className='mb-0'>https://mdbootstrap.com</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-github fa-lg' style={{ color: '#333333' }}></i>
                    <p className='mb-0'>mdbootstrap</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-twitter fa-lg' style={{ color: '#55acee' }}></i>
                    <p className='mb-0'>@mdbootstrap</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-instagram fa-lg' style={{ color: '#ac2bac' }}></i>
                    <p className='mb-0'>mdbootstrap</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-facebook-f fa-lg' style={{ color: '#3b5998' }}></i>
                    <p className='mb-0'>mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='card mb-4'>
              <div className='card-body'>
                {Profile.posts.length > 0 ? <BlogList posts={Profile.posts} /> : <p>No Posts</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
