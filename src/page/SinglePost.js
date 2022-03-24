// External Import
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Internal Import
import { getPostBySlug } from '../redux/actions/postActions';
function SinglePost() {
  const { slug } = useParams();
  const Post = useSelector(state => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostBySlug(slug));
  }, [slug]);
  return <div>{Post.post.content}</div>;
}

export default SinglePost;
