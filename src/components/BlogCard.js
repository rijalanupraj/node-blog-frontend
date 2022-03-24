// External Import
import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard() {
  return (
    <div class='col-lg-4 col-md-12 mb-4 mb-lg-0'>
      <div>
        <div
          class='bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4'
          data-mdb-ripple-color='light'
        >
          <img src='https://mdbootstrap.com/img/new/fluid/city/113.jpg' class='img-fluid' alt='' />
          <a href='#!'>
            <div class='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>

        <div class='row mb-3'>
          <div class='col-6'>
            <a href='/' class='text-info'>
              <i class='fas fa-plane'></i>
              Travels
            </a>
          </div>

          <div class='col-6 text-end'>
            <u> 15.07.2020</u>
          </div>
        </div>

        <a href='/' class='text-dark'>
          <h5>This is title of the news</h5>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iste aliquid. Sed id
            nihil magni, sint vero provident esse numquam perferendis ducimus dicta adipisci iusto
            nam temporibus modi animi laboriosam?
          </p>
        </a>

        <hr />
      </div>
    </div>
  );
}

export default BlogCard;
