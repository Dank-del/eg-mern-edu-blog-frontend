import { useEffect, useState } from 'react';
import useCookies from 'react-cookie/cjs/useCookies';

export default function Profile() {
  const [cookies] = useCookies(['user']);
  const [UserData, setUserData] = useState(null);
  const [itemlist, setItemList] = useState([]);
  useEffect(() => {
    fetch('https://edu-blog-api.sayan.org.in/api/accounts/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${cookies['token']}`,
      },
    })
      .then((data) => data.json())
      .then((jsn) => {
        if (jsn.username) {
          delete jsn.password;
          delete jsn._id;
          delete jsn.__v;
          delete jsn.admin;
          delete jsn.posts;
          // console.log(jsn);
          setUserData(jsn);
        }
      })
      .catch((err) => (window.location.href = '/login'));
  }, []);

  useEffect(() => {
    for (const property in UserData) {
      setItemList((itemlist) => [
        ...itemlist,
        <div>
          <dt>{property}</dt>
          <dd>- {UserData[property]}</dd>
        </div>,
      ]);
      console.log(`${property}: ${UserData[property]}`);
    }
  }, [UserData]);

  return (
    <div>
      <div
        style={{
          alignItems: 'center',
          margin: '30px',
        }}
        className="prose lg:prose-xl"
      >
        <h1
          style={{
            fontFamily: "'Noto Sans', sans-serif",
          }}
        >
          Profile
        </h1>
        <dl>{itemlist}</dl>
      </div>
    </div>
  );
}
