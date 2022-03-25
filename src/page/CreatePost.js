// External Import
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JoditEditor from 'jodit-react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Navigate } from 'react-router-dom';

// Internal Import
import { createPost } from '../redux/actions/postActions';

function CreatePost() {
  const Post = useSelector(state => state.Post);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const config = {
    readonly: false,
    placeholder: 'Write Content here',
    askBeforePasteHTML: false
  };

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
    if (imageFile.files) {
      for (let i = 0; i < imageFile.files.length; i++) {
        formData.append('image', imageFile.files[i]);
      }
    }
    formData.append('title', title);
    formData.append('content', content);
    dispatch(createPost(formData));
  };

  return (
    <>
      <div id='intro' className='p-5 text-center bg-light'>
        <h1 className='mb-0 h4'>Create Your Own Post</h1>
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
                    required
                  />
                  {selectedImage && (
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
                  <button className='btn btn-primary'>Create Post</button>
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
                    {Object.keys(Post.createdPost).length > 1 && (
                      <>
                        <p className='text-success'>Post Created Successfully.</p>
                        <Navigate to={`/post/${Post.createdPost.slug}`} />
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

export default CreatePost;
