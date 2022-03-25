// External Import
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MDBTextArea } from 'mdb-react-ui-kit';
import ReactTimeago from 'react-timeago';
import { Link } from 'react-router-dom';

// Internal Import
import { getPostBySlug } from '../redux/actions/postActions';
import { addComment, updateComment, deleteComment } from '../redux/actions/commentActions';
import NoProfilePhoto from '../assets/noProfilePic.jpg';
import PostDescription from '../components/PostDescription';

function SinglePost() {
  const { slug } = useParams();
  const [commentText, setCommentText] = useState('');
  const Post = useSelector(state => state.Post);
  const Auth = useSelector(state => state.Auth);
  const [isCommentEdit, setIsCommentEdit] = useState({
    isEdit: false,
    commentId: null,
    commentText: null
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostBySlug(slug));
  }, [slug]);

  const handleCommentSubmit = e => {
    e.preventDefault();
    dispatch(addComment(Post.post._id, commentText));
    setCommentText('');
  };

  const editComment = commentId => {
    dispatch(updateComment(commentId, isCommentEdit.commentText));
    setIsCommentEdit({
      isEdit: false,
      commentId: null,
      commentText: null
    });
  };
  const removeComment = commentId => {
    dispatch(deleteComment(Post.post._id, commentId));
  };

  if (Object.keys(Post.post).length === 0) {
    return (
      <div className='spinner-grow text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-0 h4'>{Post.post.title}</h1>
      </div>
      <main className='mt-4 mb-5'>
        <div className='container'>
          <div className='row'>
            <div className='mx-auto col-md-8 mb-4'>
              <section className='border-bottom mb-4'>
                <img
                  src={Post.post.image.url}
                  className='img-fluid shadow-2-strong rounded-5 mb-4'
                  alt=''
                />

                <div className='row align-items-center mb-4'>
                  <div className='col-lg-6 text-center text-lg-start mb-3 m-lg-0'>
                    <img
                      src={
                        Post.post.author.profilePhoto.hasPhoto
                          ? Post.post.author.profilePhoto.url
                          : NoProfilePhoto
                      }
                      className='rounded-5 shadow-1-strong me-2'
                      height='35'
                      alt=''
                      loading='lazy'
                    />

                    <Link to='/' className='text-dark'>
                      {` ${Post.post.author.username}`}
                    </Link>
                  </div>

                  <div className='col-lg-6 text-center text-lg-end'>
                    <span>
                      {' '}
                      {Post.post.createdAt && <ReactTimeago date={Post.post.createdAt} />}
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <PostDescription Post={Post.post} />
              </section>
              <hr />

              <section className='border-bottom mb-4 pb-4'>
                <div className='row'>
                  <div className='col-3'>
                    <img
                      src={
                        Post.post.author.profilePhoto.hasPhoto
                          ? Post.post.author.profilePhoto.url
                          : NoProfilePhoto
                      }
                      className='img-fluid shadow-1-strong rounded-5'
                      alt=''
                    />
                  </div>

                  <div className='col-9'>
                    <p className='mb-2'>
                      <strong>{Post.post.author.username}</strong>
                    </p>
                    <a href='/' className='text-dark'>
                      <i className='fab fa-facebook-f me-1'></i>
                    </a>
                    <a href='/' className='text-dark'>
                      <i className='fab fa-twitter me-1'></i>
                    </a>
                    <a href='/' className='text-dark'>
                      <i className='fab fa-linkedin me-1'></i>
                    </a>
                    <p>User Bio</p>
                  </div>
                </div>
              </section>

              <section className='border-bottom mb-3'>
                <p className='text-center'>
                  <strong>Comments: {Post.post.comments.length}</strong>
                </p>

                {Post.post.comments.map(comment => {
                  return (
                    <div key={comment._id} className='row mb-4'>
                      <div className='col-2'>
                        <img
                          src={
                            comment.author.profilePhoto.hasPhoto
                              ? comment.author.profilePhoto.url
                              : NoProfilePhoto
                          }
                          className='img-fluid shadow-1-strong rounded-5'
                          alt=''
                        />
                      </div>

                      <div className='col-10 position-relative'>
                        {Auth.isAuthenticated && comment.author._id === Auth.user._id && (
                          <div class='position-absolute top-0 end-0'>
                            <i
                              className='fas fa-pen pe-2 text-info'
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setIsCommentEdit({
                                  isCommentEdit: true,
                                  commentId: comment._id,
                                  commentText: comment.text
                                });
                              }}
                            ></i>
                            <i
                              className='fas fa-trash text-danger'
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                removeComment(comment._id);
                              }}
                            ></i>
                          </div>
                        )}
                        <p className='mb-2'>
                          <strong>{comment.author.username}</strong>
                        </p>
                        <span className='text-muted small'>
                          {comment.updatedAt && <ReactTimeago date={comment.updatedAt} />}
                        </span>
                        {isCommentEdit.commentId === comment._id ? (
                          <form onSubmit={e => e.preventDefault()}>
                            <div className='form-outline mb-4'>
                              <MDBTextArea
                                label='Your Comment'
                                id='textAreaExample'
                                rows={2}
                                value={isCommentEdit.commentText}
                                onChange={e =>
                                  setIsCommentEdit({
                                    ...isCommentEdit,
                                    commentText: e.target.value
                                  })
                                }
                              />
                            </div>
                            <div className='row justify-content-evenly'>
                              <button
                                type='submit'
                                className='col-4 btn btn-primary mb-4'
                                onClick={() => editComment(comment._id)}
                              >
                                Update
                              </button>
                              <button
                                className='col-4 btn btn-info mb-4'
                                onClick={() =>
                                  setIsCommentEdit({
                                    isCommentEdit: false,
                                    commentId: '',
                                    commentText: ''
                                  })
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <p>{comment.text}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </section>

              <section>
                <p className='text-center'>
                  <strong>Leave a reply</strong>
                </p>

                <form onSubmit={e => handleCommentSubmit(e)}>
                  <div className='form-outline mb-4'>
                    <MDBTextArea
                      label='Your Comment'
                      id='textAreaExample'
                      rows={2}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                    />
                  </div>

                  <button type='submit' className='btn btn-primary btn-block mb-4'>
                    Publish
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SinglePost;
