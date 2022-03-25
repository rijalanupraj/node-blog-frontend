// External Import
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Internal Import
import BlogList from '../components/BlogList';
import { getTimelinePosts } from '../redux/actions/postActions';

const TimeLine = () => {
  const Auth = useSelector(state => state.Auth);
  const Post = useSelector(state => state.Post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimelinePosts());
  }, []);

  if (!Auth.isAuthenticated) {
    return <Navigate to='/auth' />;
  }
  return (
    <>
      {/* Jumbotron Starts */}
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-3 h2'>Timeline</h1>
        <p className='mb-3'>Post of the User followed by You are displayed over here</p>
      </div>
      {/* Jumbotron Ends */}
      <main className='my-5'>
        <div className='container'>
          {Post.timelinePosts.length > 0 ? (
            <BlogList posts={Post.timelinePosts} />
          ) : (
            <h2 className='text-center'>No Post Found</h2>
          )}
        </div>
      </main>
    </>
  );
};

export default TimeLine;
