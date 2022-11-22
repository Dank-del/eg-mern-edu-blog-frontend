import { useEffect, useState } from 'react';
import getPoster from '../helpers/getPoster';

export default function Card({ image, title, user_id, post_id }) {
  const [User, setUser] = useState(null);
  useEffect(() => {
    getPoster(user_id).then((data) => setUser(data));
  }, []);

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
        <div className="card-actions justify-end">
          <a href={`/blogs/${post_id}`}>
            <button className="btn btn-outline btn-warning">Open</button>
          </a>
        </div>
      </div>
    </div>
  );
}
