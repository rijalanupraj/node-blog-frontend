// Internal Import
import BlogCard from './BlogCard';

function BlogList({ posts }) {
  const renderPosts = () => {
    return posts.map(post => {
      return <BlogCard key={post._id} post={post} />;
    });
  };

  return (
    <section>
      <div className='row gx-lg-5'>{renderPosts()}</div>
    </section>
  );
}

export default BlogList;
