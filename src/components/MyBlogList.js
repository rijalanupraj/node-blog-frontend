// Internal Import
import MyBlogCard from './MyBlogCard';

function MyBlogList({ posts }) {
  const renderPosts = () => {
    return posts.map(post => {
      return <MyBlogCard key={post._id} post={post} />;
    });
  };

  return (
    <section>
      <div className='row gx-lg-5'>{renderPosts()}</div>
    </section>
  );
}

export default MyBlogList;
