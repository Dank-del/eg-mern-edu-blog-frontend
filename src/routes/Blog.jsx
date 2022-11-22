import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useCookies } from 'react-cookie';
import getMe from '../helpers/getMe';

export default function Blog() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [cookies] = useCookies(['user']);
  const [user, setUser] = useState(null);

  const onDelete = async () => {
    const doIt = confirm('Are you sure about deleting the post?');
    if (doIt) {
      const res = await fetch(
        `https://edu-blog-api.sayan.org.in/api/blogs/delete/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer: ${cookies['token']}`,
          },
        }
      );
      if (res.status !== 200) {
        const txt = await res.text();
        alert(`Error deleting post: ${txt}`);
      } else {
        alert('Post deleted successfully');
        window.location.href = '/';
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetch(`https://edu-blog-api.sayan.org.in/api/blogs/${id}`)
      .then((data) => data.json())
      .then((jsn) => setPost(jsn));
    getMe(cookies['token']).then((data) => setUser(data));
  }, []);

  return (
    <div>
      {post && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          className="prose lg:prose-xl"
        >
          <img
            style={{
              objectFit: 'contain',
            }}
            src={post.image}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            className="btn-group"
          >
            {user && user._id === post.user_id && (
              <div>
                <button className="btn btn-outline btn-warning">
                  Edit Post
                </button>
                <button
                  onClick={onDelete}
                  className="btn btn-outline btn-error"
                >
                  Delete post permanently
                </button>
              </div>
            )}
          </div>
          <div
            style={{
              margin: '30px',
            }}
          >
            <h1>{post.title}</h1>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
