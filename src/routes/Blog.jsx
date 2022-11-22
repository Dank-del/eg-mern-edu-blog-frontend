import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Blog() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://edu-blog-api.sayan.org.in/api/blogs/${id}`)
      .then((data) => data.json())
      .then((jsn) => setPost(jsn));
  }, []);

  return (
    <div>
      {post && (
        <div>
          <img src={post.image} />
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}
