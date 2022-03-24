import React from 'react';

function FeaturedBlog() {
  return (
    <section className='border-bottom pb-4 mb-5'>
      <div className='row gx-5'>
        <div className='col-md-6 mb-4'>
          <div
            className='bg-image hover-overlay ripple shadow-2-strong rounded-5'
            data-mdb-ripple-color='light'
          >
            <img
              src='https://mdbootstrap.com/img/new/slides/080.jpg'
              className='img-fluid'
              alt=''
            />
            <a href='#!'>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </div>
        </div>

        <div className='col-md-6 mb-4'>
          <span className='badge bg-danger px-2 py-1 shadow-1-strong mb-3'>Featured</span>
          <h4>
            <strong>Facilis consequatur eligendi</strong>
          </h4>
          <p className='text-muted'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi
            quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo
            possimus, commodi dignissimos obcaecati illum maiores corporis.
          </p>
          <button type='button' className='btn btn-primary'>
            Read more
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBlog;
