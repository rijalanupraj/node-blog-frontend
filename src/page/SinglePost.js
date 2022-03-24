// External Import
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MDBTextArea } from 'mdb-react-ui-kit';

// Internal Import
import { getPostBySlug } from '../redux/actions/postActions';
import { addComment } from '../redux/actions/commentActions';
import NoProfilePhoto from '../assets/noProfilePic.jpg';

function SinglePost() {
  const { slug } = useParams();
  const [commentText, setCommentText] = useState('');
  const Post = useSelector(state => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostBySlug(slug));
  }, [slug]);

  const handleCommentSubmit = e => {
    e.preventDefault();
    dispatch(addComment(commentText, Post.post._id));
  };

  if (Object.keys(Post.post).length === 0) {
    return (
      <div class='spinner-grow text-primary' role='status'>
        <span class='visually-hidden'>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div id='intro' class='p-5 text-center bg-light'>
        <h1 class='mb-0 h4'>{Post.post.title}</h1>
      </div>
      <main class='mt-4 mb-5'>
        <div class='container'>
          <div class='row'>
            <div class='mx-auto col-md-8 mb-4'>
              <section class='border-bottom mb-4'>
                <img
                  src={Post.post.image.url}
                  class='img-fluid shadow-2-strong rounded-5 mb-4'
                  alt=''
                />

                <div class='row align-items-center mb-4'>
                  <div class='col-lg-6 text-center text-lg-start mb-3 m-lg-0'>
                    <img
                      src={
                        Post.post.author.profilePhoto.hasPhoto
                          ? Post.post.author.profilePhoto.url
                          : NoProfilePhoto
                      }
                      class='rounded-5 shadow-1-strong me-2'
                      height='35'
                      alt=''
                      loading='lazy'
                    />
                    <span>
                      {' '}
                      Published <u>{new Date(Post.post.createdAt).toDateString()}</u> by
                    </span>
                    <a href='/' class='text-dark'>
                      {` ${Post.post.author.username}`}
                    </a>
                  </div>

                  <div class='col-lg-6 text-center text-lg-end'>
                    <button
                      type='button'
                      class='btn btn-primary px-3 me-1'
                      style={{ backgroundColor: '#3b5998' }}
                    >
                      <i class='fab fa-facebook-f'></i>
                    </button>
                    <button
                      type='button'
                      class='btn btn-primary px-3 me-1'
                      style={{ backgroundColor: '#55acee' }}
                    >
                      <i class='fab fa-twitter'></i>
                    </button>
                    <button
                      type='button'
                      class='btn btn-primary px-3 me-1'
                      style={{ backgroundColor: '#0082ca' }}
                    >
                      <i class='fab fa-linkedin'></i>
                    </button>
                    <button type='button' class='btn btn-primary px-3 me-1'>
                      <i class='fas fa-comments'></i>
                    </button>
                  </div>
                </div>
              </section>

              <section>{Post.post.content}</section>

              <section class='text-center border-top border-bottom py-4 mb-4'>
                <p>
                  <strong>Share with your friends:</strong>
                </p>

                <button
                  type='button'
                  class='btn btn-primary me-1'
                  style={{ backgroundColor: '#3b5998' }}
                >
                  <i class='fab fa-facebook-f'></i>
                </button>
                <button
                  type='button'
                  class='btn btn-primary me-1'
                  style={{ backgroundColor: '#55acee' }}
                >
                  <i class='fab fa-twitter'></i>
                </button>
                <button
                  type='button'
                  class='btn btn-primary me-1'
                  style={{ backgroundColor: '#0082ca' }}
                >
                  <i class='fab fa-linkedin'></i>
                </button>
                <button type='button' class='btn btn-primary me-1'>
                  <i class='fas fa-comments me-2'></i>Add comment
                </button>
              </section>

              <section class='border-bottom mb-4 pb-4'>
                <div class='row'>
                  <div class='col-3'>
                    <img
                      src={
                        Post.post.author.profilePhoto.hasPhoto
                          ? Post.post.author.profilePhoto.url
                          : NoProfilePhoto
                      }
                      class='img-fluid shadow-1-strong rounded-5'
                      alt=''
                    />
                  </div>

                  <div class='col-9'>
                    <p class='mb-2'>
                      <strong>{Post.post.author.username}</strong>
                    </p>
                    <a href='/' class='text-dark'>
                      <i class='fab fa-facebook-f me-1'></i>
                    </a>
                    <a href='/' class='text-dark'>
                      <i class='fab fa-twitter me-1'></i>
                    </a>
                    <a href='/' class='text-dark'>
                      <i class='fab fa-linkedin me-1'></i>
                    </a>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio est ab
                      iure inventore dolorum consectetur? Molestiae aperiam atque quasi consequatur
                      aut? Repellendus alias dolor ad nam, soluta distinctio quis accusantium!
                    </p>
                  </div>
                </div>
              </section>

              <section class='border-bottom mb-3'>
                <p class='text-center'>
                  <strong>Comments: {Post.post.comments.length}</strong>
                </p>

                {Post.post.comments.map(comment => {
                  return (
                    <div class='row mb-4'>
                      <div class='col-2'>
                        <img
                          src='https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg'
                          class='img-fluid shadow-1-strong rounded-5'
                          alt=''
                        />
                      </div>

                      <div class='col-10'>
                        <p class='mb-2'>
                          <strong>Marta Dolores</strong>
                        </p>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  );
                })}
              </section>

              <section>
                <p class='text-center'>
                  <strong>Leave a reply</strong>
                </p>

                <form onSubmit={e => handleCommentSubmit(e)}>
                  <div class='form-outline mb-4'>
                    <MDBTextArea
                      label='Your Comment'
                      id='textAreaExample'
                      rows={2}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                    />
                  </div>

                  <button type='submit' class='btn btn-primary btn-block mb-4'>
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
