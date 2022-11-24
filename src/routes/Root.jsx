import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import '../App.css';
import Card from '../components/Card';

function Root() {
  const [cookies] = useCookies(['user']);
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer: ${cookies['token']}`,
      },
    }).then((res) => res.json());
  const { data, error } = useSWR(
    'https://edu-blog-api.sayan.org.in/api/blogs',
    fetcher
  );

  // console.log(data);
  const [cards, setCards] = useState(<></>);
  useEffect(() => {
    setCards(
      data &&
        data.map((post) => (
          <Card
            key={post._id}
            image={post.image}
            user_id={post.user_id}
            title={post.title}
            post_id={post._id}
            liked_by={post.liked_by}
          />
        ))
    );
  }, [data]);

  return (
    <div>
      <div
        className="grid grid-cols-4 gap-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px',
          flexWrap: 'wrap',
        }}
      >
        {cards}
      </div>
    </div>
  );
}

export default Root;
