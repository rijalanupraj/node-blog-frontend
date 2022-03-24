import React from 'react';

function PageNumbers() {
  return (
    <nav className='my-4' aria-label='...'>
      <ul className='pagination pagination-circle justify-content-center'>
        <li className='page-item'>
          <a className='page-link' href='/' tabindex='-1' aria-disabled='true'>
            Previous
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='/'>
            1
          </a>
        </li>
        <li className='page-item active' aria-current='page'>
          <a className='page-link' href='/'>
            2 <span className='sr-only'>(current)</span>
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='/'>
            3
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='/'>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNumbers;
