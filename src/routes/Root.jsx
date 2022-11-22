import { useState, useEffect } from 'react';
import useSWR from 'swr';
import '../App.css';
import Card from '../components/Card';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Root() {
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
