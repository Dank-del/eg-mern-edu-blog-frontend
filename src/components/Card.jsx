import { useEffect, useReducer, useState } from 'react';
import { useCookies } from 'react-cookie';
import getMe from '../helpers/getMe';
import getPoster from '../helpers/getPoster';

export default function Card({ image, title, user_id, post_id, liked_by }) {
  const [Poster, setPoster] = useState(null);
  //console.log(liked_by);
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['user']);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onLike = async () => {
    const user = await getMe(cookies['token']);
    liked_by.map((id) => {
      if (user._id === id) {
        setLikeBtn(
          <button onClick={onLike} className="btn btn-outline btn-warning">
            Like
          </button>
        );
        fetch(
          `https://edu-blog-api.sayan.org.in/api/blogs/removelike/${post_id}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer: ${cookies['token']}`,
            },
          }
        ).then((res) => {
          forceUpdate();
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
      setLikeBtn(
        <button onClick={onLike} className="btn btn-warning">
          Liked
        </button>
      );
      forceUpdate();
    } else {
      const data = await res.text();
      alert(data);
    }
  };

  useEffect(() => {
    getMe(cookies['token']).then((data) => setUser(data));
    getPoster(user_id).then((data) => setPoster(data));
    getMe(cookies['token']).then((data) => {
      liked_by.map((id) => {
        console.log(user);
        if (id === data._id) {
          setLikeBtn(
            <button onClick={onLike} className="btn btn-warning">
              Liked
            </button>
          );
        }
      });
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
          Posted by {Poster && Poster.name}
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
          {user && likeBtn}
          <a href={`/blogs/${post_id}`}>
            <button className="btn btn-outline btn-warning">Open</button>
          </a>
        </div>
      </div>
    </div>
  );
}
