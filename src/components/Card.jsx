import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import getPoster from '../helpers/getPoster';

export default function Card({ image, title, user_id, post_id, liked_by }) {
  const [User, setUser] = useState(null);
  console.log(liked_by);
  const [cookies] = useCookies(['user']);

  const onLike = async () => {
    liked_by.map((id) => {
      if (User._id === id) {
        fetch(
          `https://edu-blog-api.sayan.org.in/api/blogs/removelike/${post_id}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer: ${cookies['token']}`,
            },
          }
        ).then((res) => {
          if (res.status === 200) {
            setLikeBtn(
              <button onClick={onLike} className="btn btn-outline btn-warning">
                Like
              </button>
            );
          }
        });
      }
    });
    const res = await fetch(
      `https://edu-blog-api.sayan.org.in/api/blogs/like/${post_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${cookies['token']}`,
        },
      }
    );
    if (res.status === 200) {
      setLikeBtn(<button className="btn btn-warning">Liked</button>);
    } else {
      const data = await res.text();
      alert(data);
    }
  };

  useEffect(() => {
    getPoster(user_id).then((data) => setUser(data));
    liked_by.map((id) => {
      if (id === user_id) {
        setLikeBtn(<button className="btn btn-warning">Liked</button>);
      }
    });
  }, []);

  const [likeBtn, setLikeBtn] = useState(
    <button onClick={onLike} className="btn btn-outline btn-warning">
      Like
    </button>
  );

  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img
          src={image}
          alt="post image"
          css={{ transform: 'scale(1.5)', backgrondSize: 'cover' }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p
          style={{
            fontSize: '14px',
          }}
        >
          Posted by {User && User.name}
        </p>
        <div className="grid grid-flow-col auto-cols-max card-actions justify-end">
          {/* <span
            onClick={() => console.log('like')}
            style={{
              marginTop: '12px',
              marginRight: '12px',
              scale: '2',
              fontVariationSettings: {
                FILL: 1,
              },
            }}
            class="material-symbols-outlined"
          >
            thumb_up
          </span> */}
          {User && likeBtn}
          <a href={`/blogs/${post_id}`}>
            <button className="btn btn-outline btn-warning">Open</button>
          </a>
        </div>
      </div>
    </div>
  );
}
