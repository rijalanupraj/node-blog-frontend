// External Import
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Internal Import
import BlogList from '../components/BlogList';
import FeaturedBlog from '../components/FeaturedBlog';
import { getAllPosts } from '../redux/actions/postActions';

const HomePage = () => {
  const Auth = useSelector(state => state.Auth);
  const Post = useSelector(state => state.Post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      {/* Jumbotron Starts */}
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-3 h2'>Lean and Explore</h1>
        <p className='mb-3'>Discover stories, thinking, and expertise from writers on any topic.</p>
        <Link
          className='btn btn-primary m-2'
          to={Auth.isAuthenticated ? '/create' : '/auth'}
          role='button'
        >
          Get Started
        </Link>
      </div>
      {/* Jumbotron Ends */}
      <main className='my-5'>
        <div className='container'>
          <FeaturedBlog />
          <BlogList posts={Post.posts} />
        </div>
      </main>
    </>
  );
};

export default HomePage;
