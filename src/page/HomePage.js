// External Import
import React from 'react';
import { Link } from 'react-router-dom';

// Internal Import
import BlogList from '../components/BlogList';
import FeaturedBlog from '../components/FeaturedBlog';

const HomePage = () => {
  return (
    <>
      {/* Jumbotron Starts */}
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-3 h2'>Lean and Explore</h1>
        <p className='mb-3'>Discover stories, thinking, and expertise from writers on any topic.</p>
        <Link className='btn btn-primary m-2' to='/auth' role='button'>
          Get Started
        </Link>
      </div>
      {/* Jumbotron Ends */}
      <main className='my-5'>
        <div className='container'>
          <FeaturedBlog />
          <BlogList />
        </div>
      </main>
    </>
  );
};

export default HomePage;
