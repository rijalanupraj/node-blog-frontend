// External Import
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MDBInput } from 'mdb-react-ui-kit';

// Internal Import
import BlogList from '../components/BlogList';
import { getAllPosts } from '../redux/actions/postActions';

const AllPostPage = () => {
  const Auth = useSelector(state => state.Auth);
  const Post = useSelector(state => state.Post);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const filterPosts = () => {
    return Post.posts.filter(post => {
      return post.title.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  return (
    <>
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-3 h2'>All Posts</h1>
        <Link
          className='btn btn-primary m-2'
          to={Auth.isAuthenticated ? '/create' : '/auth'}
          role='button'
        >
          Write a Post
        </Link>
      </div>
      <main className='my-5'>
        <div className='container'>
          <div class='row justify-content-center'>
            <div className='col-md-4'>
              <div class='form-outline mx-auto mb-4'>
                <MDBInput
                  label='Search'
                  type='search'
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          <BlogList posts={filterPosts()} />
        </div>
      </main>
    </>
  );
};

export default AllPostPage;
