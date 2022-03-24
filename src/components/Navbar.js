// External Import
import React from 'react';

// Internal Import
import NoProfilePic from '../assets/noProfilePic.jpg';

function Navbar() {
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
          <a className='navbar-brand mt-2 mt-lg-0' href='/'>
            My Blog
          </a>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                Title 1
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                Title 2
              </a>
            </li>
          </ul>
        </div>

        <div className='d-flex align-items-center'>
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
                src={NoProfilePic}
                className='rounded-circle'
                height='25'
                alt='profile'
                loading='lazy'
              />
            </a>
            <ul
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='navbarDropdownMenuAvatar'
            >
              <li>
                <a className='dropdown-item' href='/'>
                  My profile
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/'>
                  Settings
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/'>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
