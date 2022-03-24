// External Import
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal Import
import BlogCard from './BlogCard';
import { getAllPosts } from '../redux/actions/postActions';

function BlogList() {
  const Post = useSelector(state => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const renderPosts = () => {
    return Post.posts.map(post => {
      return <BlogCard key={post._id} post={post} />;
    });
  };

  return (
    <section>
      <div className='row gx-lg-5'>{renderPosts()}</div>
    </section>
  );
}

export default BlogList;
