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

  // Get Most Commented Post
  const mostCommentedPost = Post.posts.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });

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
          <span
            className='badge bg-danger px-2 py-1 shadow-1-strong mb-3'
            style={{ fontSize: '30px' }}
          >
            Popular
          </span>
          <BlogList posts={mostCommentedPost.slice(0, 6)} />
          <p className='my-5' />
          <span
            className='badge bg-danger px-2 py-1 shadow-1-strong mb-3'
            style={{ fontSize: '30px' }}
          >
            New
          </span>
          <BlogList posts={Post.posts.slice(0, 6)} />
        </div>
      </main>
    </>
  );
};

export default HomePage;
