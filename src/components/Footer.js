import React from 'react';

function Footer() {
  return (
    <footer
      className='text-center text-lg-start bg-light text-muted position-absolute w-100 bottom-0'
      style={{ height: '2.5rem' }}
    >
      <section className='text-center border-bottom'>
        <div className=''>
          <a href='##' className='me-4 text-reset'>
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='##' className='me-4 text-reset'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='##' className='me-4 text-reset'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='##' className='me-4 text-reset'>
            <i className='fab fa-linkedin'></i>
          </a>
          <a href='https://github.com/rijalanupraj' className='me-4 text-reset'>
            <i className='fab fa-github'></i>
          </a>
        </div>
      </section>

      <div className='text-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © Developed By
        <a className='text-reset fw-bold' href='https://github.com/rijalanupraj'>
          {' '}
          Anup Raj Rijal
        </a>
      </div>
    </footer>
  );
}

export default Footer;
