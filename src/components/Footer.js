import React from 'react';

function Footer() {
  return (
    <footer
      className='text-center text-lg-start bg-light text-muted position-absolute w-100 bottom-0'
      style={{ height: '2.5rem' }}
    >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-linkedin'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-github'></i>
          </a>
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>My Blog
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Title</h6>
              <p>
                <a href='/' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='/' className='text-reset'>
                  React
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/' className='text-reset'>
                  Something
                </a>
              </p>
              <p>
                <a href='/' className='text-reset'>
                  Something
                </a>
              </p>
            </div>
            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fas fa-home me-3'></i> Something
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i>
                Something
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
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
