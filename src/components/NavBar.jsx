import { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function NavBar() {
  const [cookies] = useCookies(['user']);
  const [showNew, setShowNew] = useState(false);
  const [UserData, setUserData] = useState(null);
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
          // console.log(jsn);
          setShowNew(true);
          setUserData(jsn);
        }
      });
  }, []);

  return (
    <Fragment>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/users/signin">Login</a>
              </li>
              <li>
                <a href="/users/signup">Sign Up</a>
              </li>
              <li>
                <a href="/users/profile">Profile</a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <a href="/" className="btn btn-ghost normal-case text-xl">
              mernBlog
            </a>
          </div>
        </div>
        <br />
        <div className="navbar-end">
          <div className="flex-none gap-2">
            {showNew && (
              <button className="btn">Post as @{UserData.username}</button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
