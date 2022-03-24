import React from 'react';

function FeaturedBlog() {
  return (
    <section class='border-bottom pb-4 mb-5'>
      <div class='row gx-5'>
        <div class='col-md-6 mb-4'>
          <div
            class='bg-image hover-overlay ripple shadow-2-strong rounded-5'
            data-mdb-ripple-color='light'
          >
            <img src='https://mdbootstrap.com/img/new/slides/080.jpg' class='img-fluid' alt='' />
            <a href='#!'>
              <div class='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </div>
        </div>

        <div class='col-md-6 mb-4'>
          <span class='badge bg-danger px-2 py-1 shadow-1-strong mb-3'>Featured</span>
          <h4>
            <strong>Facilis consequatur eligendi</strong>
          </h4>
          <p class='text-muted'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi
            quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo
            possimus, commodi dignissimos obcaecati illum maiores corporis.
          </p>
          <button type='button' class='btn btn-primary'>
            Read more
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBlog;
