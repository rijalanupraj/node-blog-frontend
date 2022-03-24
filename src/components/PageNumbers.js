import React from 'react';

function PageNumbers() {
  return (
    <nav class='my-4' aria-label='...'>
      <ul class='pagination pagination-circle justify-content-center'>
        <li class='page-item'>
          <a class='page-link' href='/' tabindex='-1' aria-disabled='true'>
            Previous
          </a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='/'>
            1
          </a>
        </li>
        <li class='page-item active' aria-current='page'>
          <a class='page-link' href='/'>
            2 <span class='sr-only'>(current)</span>
          </a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='/'>
            3
          </a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='/'>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNumbers;
