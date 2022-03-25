// External Import
import React, { useEffect } from 'react';

const PostDescription = ({ Post }) => {
  useEffect(() => {
    const description = document.querySelector('.description');
    if (description) {
      description.innerHTML = Post.content;
      let images = document.querySelectorAll('.description img');
      if (images) {
        images.forEach(item => {
          item.style.width = '100%';
        });
      }
    }
  }, [Post]);

  return <p className='description'></p>;
};

// Export
export default PostDescription;
