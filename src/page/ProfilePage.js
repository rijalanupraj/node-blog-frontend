// External Import
import React, { useEffect } from 'react';
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
