// External Import
import React from 'react';

// Internal Import
import BlogCard from './BlogCard';

function BlogList() {
  return (
    <section>
      <div class='row gx-lg-5'>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
}

export default BlogList;
