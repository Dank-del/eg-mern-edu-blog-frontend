import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useCookies } from 'react-cookie';
import getMe from '../helpers/getMe';
import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [cookies] = useCookies(['user']);
  const [user, setUser] = useState(null);

  const onDisapprove = async () => {
    const res = await fetch(
      `https://edu-blog-api.sayan.org.in/api/blogs/unapprove/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${cookies['token']}`,
        },
      }
    );

    if (res.status !== 200) {
      const txt = await res.text();
      alert(`Error unapproving post: ${txt}`);
    } else {
      alert('Post unapprove successfully');
      navigate(0);
    }
  };

  const onApprove = async () => {
    const res = await fetch(
      `https://edu-blog-api.sayan.org.in/api/blogs/approve/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${cookies['token']}`,
        },
      }
    );

    if (res.status !== 200) {
      const txt = await res.text();
      alert(`Error approving post: ${txt}`);
    } else {
      alert('Post approved successfully');
      navigate(0);
    }
  };

  const [approvebtn, setApproveBtn] = useState(
    <button
      style={{
        marginRight: '15px',
        borderRadius: '25px',
      }}
      onClick={onApprove}
      className="btn btn-outline btn-success"
    >
      Approve Post
    </button>
  );

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
        window.location.reload();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetch(`https://edu-blog-api.sayan.org.in/api/blogs/${id}`)
      .then((data) => data.json())
      .then((jsn) => {
        setPost(jsn);
        if (jsn.approved) {
          setApproveBtn(
            <button
              style={{
                marginRight: '15px',
                borderRadius: '25px',
              }}
              onClick={onDisapprove}
              className="btn btn-outline btn-danger"
            >
              Unapprove Post
            </button>
          );
        }
      });
    getMe(cookies['token']).then((data) => setUser(data));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
            {user && user.admin && approvebtn}
            {user && user._id === post.user_id && (
              <div>
                <button
                  onClick={() => (window.location.href = `/blogs/edit/${id}`)}
                  className="btn btn-outline btn-warning"
                >
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
