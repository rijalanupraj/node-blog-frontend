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
      <div id='intro' class='p-5 text-center bg-light'>
        <h1 class='mb-3 h2'>Lean and Explore</h1>
        <p class='mb-3'>Discover stories, thinking, and expertise from writers on any topic.</p>
        <Link class='btn btn-primary m-2' to='/auth' role='button'>
          Get Started
        </Link>
      </div>
      {/* Jumbotron Ends */}
      <main class='my-5'>
        <div class='container'>
          <FeaturedBlog />
          <BlogList />
        </div>
      </main>
    </>
  );
};

export default HomePage;
