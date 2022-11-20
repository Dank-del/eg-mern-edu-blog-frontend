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
            key={post.id}
            image={post.image}
            content={post.content}
            title={post.title}
          />
        ))
    );
  }, [data]);

  return (
    <div>
      <div
        className="grid grid-rows-4 grid-flow-col gap-4"
        style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}
      >
        {cards}
      </div>
    </div>
  );
}

export default Root;
