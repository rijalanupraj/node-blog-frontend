// External Import
import React, { useState, useEffect } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, registerUser } from '../redux/actions/authActions';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const Auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password.length >= 6 && (isLogin || username.length >= 4)) {
      setBtnDisabled(false);

      if (Auth.loading) {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [password, Auth, username]);

  const handleSubmit = e => {
    e.preventDefault();
    isLogin
      ? dispatch(
          userLogin({
            emailOrUsername,
            password
          })
        )
      : dispatch(
          registerUser({
            email,
            username,
            password
          })
        );
  };

  return (
    <section className='vh-100' style={{ backgroundColor: '#eee' }}>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-lg-12 col-xl-11'>
            <div className='card text-black' style={{ borderRadius: '25px' }}>
              <div className='card-body p-md-5'>
                <div className='row justify-content-center'>
                  <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                    <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                      {isLogin ? 'Login' : 'Register'}
                    </p>
                    <p className='text-center'>
                      {Auth.error.msg !== null && (
                        <span className='text-danger'>
                          {Auth.error.msg !== 'Login To See The Content.' && Auth.error.msg}
                        </span>
                      )}
                    </p>
                    <form onSubmit={e => handleSubmit(e)} className='mx-1 mx-md-4'>
                      {!isLogin && (
                        <div className='d-flex flex-row align-items-center mb-4'>
                          <i className='fas fa-envelope fa-lg me-3 fa-fw'></i>
                          <div className='form-outline flex-fill mb-0'>
                            <MDBInput
                              label='Your Email'
                              id='input-email'
                              type='email'
                              onChange={e => setEmail(e.target.value)}
                              value={email}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {isLogin && (
                        <div className='d-flex flex-row align-items-center mb-4'>
                          <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                          <div className='form-outline flex-fill mb-0'>
                            <MDBInput
                              label='Email or Username'
                              id='input-emailorusername'
                              type='text'
                              onChange={e => setEmailOrUsername(e.target.value)}
                              value={emailOrUsername}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {!isLogin && (
                        <div className='d-flex flex-row align-items-center mb-4'>
                          <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                          <div className='form-outline flex-fill mb-0'>
                            <MDBInput
                              label='Your Username'
                              id='input-username'
                              type='text'
                              onChange={e => setUsername(e.target.value)}
                              value={username}
                              required
                            />
                            {!isLogin && (
                              <div className='form-text'>
                                Username must be at least 4 characters
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <i className='fas fa-lock fa-lg me-3 fa-fw'></i>
                        <div className='form-outline flex-fill mb-0'>
                          <MDBInput
                            label='Password'
                            id='input-password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                          />
                          {!isLogin && (
                            <div className='form-text'>Password Must Be At Least 6 Characters</div>
                          )}
                        </div>
                      </div>

                      <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                        <button
                          type='submit'
                          disabled={btnDisabled}
                          className='btn btn-primary btn-lg'
                        >
                          {Auth.loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
                        </button>
                      </div>
                      <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                        {isLogin ? (
                          <span>
                            Don't Have An Account ?{' '}
                            <span
                              className='text-primary'
                              style={{ cursor: 'pointer' }}
                              onClick={() => setIsLogin(false)}
                            >
                              Register
                            </span>
                          </span>
                        ) : (
                          <span>
                            Already Have An Account ?{' '}
                            <span
                              className='text-primary'
                              style={{ cursor: 'pointer' }}
                              onClick={() => setIsLogin(true)}
                            >
                              Login
                            </span>
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                      className='img-fluid'
                      alt='Sample'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
