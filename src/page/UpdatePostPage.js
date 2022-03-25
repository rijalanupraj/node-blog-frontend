// External Import
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JoditEditor from 'jodit-react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Navigate, useParams } from 'react-router-dom';

// Internal Import
import { updatePost, getPostBySlug } from '../redux/actions/postActions';

function UpdatePostPage() {
  const { slug } = useParams();
  const Auth = useSelector(state => state.Auth);
  const Post = useSelector(state => state.Post);
  const editor = useRef(null);
  const [content, setContent] = useState(Post.post.content);
  const [title, setTitle] = useState(Post.post.title);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const config = {
    readonly: false,
    placeholder: 'Write Content here',
    askBeforePasteHTML: false
  };

  useEffect(() => {
    dispatch(getPostBySlug(slug));
  }, [slug]);

  useEffect(() => {
    setContent(Post.post.content);
    setTitle(Post.post.title);
  }, [Post.post]);

  // This function will be triggered when the file field change
  const imageChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    } else {
      removeSelectedImage();
    }
  };

  const removeSelectedImage = () => {
    const imageFile = document.querySelector(`input[type='file']`);
    imageFile.value = '';
    setSelectedImage();
  };

  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    const imageFile = document.querySelector(`input[type='file']`);
    if (selectedImage && imageFile.files) {
      for (let i = 0; i < imageFile.files.length; i++) {
        formData.append('image', imageFile.files[i]);
      }
    }
    formData.append('title', title);
    formData.append('content', content);
    dispatch(updatePost(Post.post._id, formData));
  };

  if (Object.keys(Post.post).length === 0 || Post.loading || Auth.loading) {
    return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
        <div className='spinner-grow text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (!Auth.isAuthenticated) {
    return <Navigate to='/auth' />;
  }

  if (!Post.post) {
    return <Navigate to='/' />;
  }

  if (Post.post.author._id !== Auth.user._id) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-0 h4'>Update Post</h1>
      </div>
      <main className='mt-4 mb-5'>
        <div className='container'>
          <div className='row'>
            <div className='mx-auto col-md-8 mb-4'>
              <form onSubmit={e => handleSubmit(e)}>
                <div className='form-outline'>
                  <MDBInput
                    label='Title'
                    id='input-title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className='mt-3'>
                  <label htmlFor='formFileLg' className='form-label'>
                    Upload An Image
                  </label>
                  <input
                    className='form-control form-control-lg'
                    id='formFileLg'
                    type='file'
                    accept='image/png , image/jpeg, image/jpg'
                    onChange={e => imageChange(e)}
                  />
                  {selectedImage ? (
                    <div className='my-5 text-center'>
                      <img
                        className='img-fluid img-thumbnail'
                        src={URL.createObjectURL(selectedImage)}
                        alt='Thumb'
                      />
                      <span className='btn btn-info mt-2' onClick={removeSelectedImage}>
                        Remove This Image
                      </span>
                    </div>
                  ) : (
                    <img
                      className='img-fluid img-thumbnail'
                      src={Post.post.image.url}
                      alt='Thumb'
                    />
                  )}
                </div>
                <div className='mt-3'>
                  <JoditEditor
                    id='description'
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
                <div className='text-center mt-5'>
                  <button className='btn btn-primary'>Update Post</button>
                  {Post.loading && (
                    <div className='text-center'>
                      <div class='spinner-grow' role='status'>
                        <span class='visually-hidden'>Loading...</span>
                      </div>
                      <p className='text-muted'>This may take a while.</p>
                    </div>
                  )}
                  <section className='mt-1'>
                    {Post.error.msg !== null && <p classNameName='text-danger'>{Post.error.msg}</p>}
                    {Object.keys(Post.updatedPost).length > 1 && (
                      <>
                        <p className='text-success'>Post Updated Successfully.</p>
                        <Navigate to={`/post/${Post.updatedPost.slug}`} />
                      </>
                    )}
                  </section>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UpdatePostPage;
