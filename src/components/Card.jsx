import { parseText } from '../helpers.js';
export default function Card({ image, title, content }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={image} alt="post image" css={{transform: "scale(1.5)", backgrondSize: "cover"}}/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{parseText(content, 48)}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline btn-warning">Open</button>
        </div>
      </div>
    </div>
  );
}
