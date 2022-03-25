// External Import
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal Import
import NoProfilePic from '../assets/noProfilePic.jpg';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = () => {
  const Auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-mdb-toggle='collapse'
          data-mdb-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='fas fa-bars'></i>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <Link className='navbar-brand mt-2 mt-lg-0' to='/'>
            My Blog
          </Link>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' to='/posts'>
                Posts
              </Link>
            </li>
            <li className='nav-item'>
              {Auth.isAuthenticated && (
                <Link className='nav-link' to='/create'>
                  Write
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {Auth.isAuthenticated && (
                <Link className='nav-link' to='/timeline'>
                  Timeline
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className='d-flex align-items-center'>
          {!Auth.isAuthenticated && (
            <Link to='/auth' className='btn btn-primary'>
              <i className='fas fa-user'></i> Login
            </Link>
          )}

          {Auth.isAuthenticated && (
            <div className='dropdown'>
              <a
                className='dropdown-toggle d-flex align-items-center hidden-arrow'
                href='/'
                id='navbarDropdownMenuAvatar'
                role='button'
                data-mdb-toggle='dropdown'
                aria-expanded='false'
              >
                <img
                  src={Auth.user.profilePhoto.hasPhoto ? Auth.user.profilePhoto.url : NoProfilePic}
                  className='rounded-circle'
                  width='40'
                  height='40'
                  alt='profile'
                  loading='lazy'
                />
              </a>
              <ul
                className='dropdown-menu dropdown-menu-end'
                aria-labelledby='navbarDropdownMenuAvatar'
              >
                <li>
                  <Link className='dropdown-item' to='/my'>
                    My profile
                  </Link>
                </li>
                <li>
                  <span className='dropdown-item' onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; //
