export default function Blog({ title, content, image, user_id }) {
  return (
    <div>
      <img src={image} />
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
