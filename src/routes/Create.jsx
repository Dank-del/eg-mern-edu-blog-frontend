import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

export default function Create() {
  const [ApiResp, setApiResp] = useState();
  const [, setCookie] = useCookies(['user']);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    fetch('https://edu-blog-api.sayan.org.in/api/blogs/new', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.ok) {
          setCookie('token', d.token, {
            path: '/',
          });
        }
        setApiResp(d.message);
        window.location.href = '/';
      })
      .catch((e) => setApiResp(e));
    console.log(JSON.stringify(data));
  };

  return (
    <div>
      <header>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '50px',
            marginLeft: '15px',
            marginRight: '15px',
          }}
        >
          Create Post
        </h1>
      </header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div>
            <label className="label">
              <span className="label-text">Post title</span>
            </label>
            <label className="input-group">
              <span>Title</span>
              <input
                {...register('title', { required: true })}
                style={{
                  width: '100%',
                }}
                type="text"
                placeholder="Post title here"
                className="input input-bordered"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Post content</span>
            </label>
            <label className="input-group">
              <span>Content</span>
              <textarea
                {...register('content', { required: true })}
                style={{
                  width: '100%',
                  height: '130px',
                }}
                type="text"
                // placeholder="your content here"
                className="input input-bordered"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your image</span>
            </label>
            <div className="input-group">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          {ApiResp && <p>{ApiResp}</p>}
          <button
            style={{
              marginTop: '15px',
              marginBottom: '20px',
            }}
            className="btn"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
