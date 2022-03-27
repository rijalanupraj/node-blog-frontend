// External Import
import { Link } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';

// Internal Import
import { deletePost } from '../redux/actions/postActions';

function MyBlogCard({ post }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <div className='col-lg-4 col-md-12 mb-4 mb-lg-0'>
      <div>
        <div
          className='bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4'
          data-mdb-ripple-color='light'
        >
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image.url}
              style={{
                height: '200px',
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'top center'
              }}
              alt=''
            />
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </Link>
        </div>

        <div className='row mb-3'>
          <div className='col-6'>
            <span>{post.createdAt && <ReactTimeago date={post.createdAt} />}</span>
          </div>

          <div className='col-6 text-end'>
            <Link to={`/post/${post.slug}/update`}>
              <i
                className='fas fa-pen pe-2 text-info'
                style={{ cursor: 'pointer' }}
                onClick={() => {}}
              ></i>
            </Link>
            <i
              className='fas fa-trash text-danger'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleDelete();
              }}
            ></i>
          </div>
        </div>

        <Link to={`/post/${post.slug}/`} className='text-dark'>
          <h5>{post.title}</h5>
        </Link>

        <hr />
      </div>
    </div>
  );
}

export default MyBlogCard;
