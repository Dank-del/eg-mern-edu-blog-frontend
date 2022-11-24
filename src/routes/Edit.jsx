import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

export default function Edit() {
  const [ApiResp, setApiResp] = useState();
  const [cookies, setCookie] = useCookies(['user']);
  const [imageBase64, setImageBase64] = useState('');
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`https://edu-blog-api.sayan.org.in/api/blogs/${id}`)
      .then((data) => data.json())
      .then((jsn) => {
        setPost(jsn);
        setImageBase64(jsn.image);
      });
  }, []);
  // const [UserData, setUserData] = useState(null);

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      // Typescript users: use following line
      // reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  const handleImageChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      try {
        const uploadedImageBase64 = await convertFileToBase64(
          e.target.files[0]
        );
        setImageBase64(uploadedImageBase64);
        // console.log(uploadedImageBase64);
        //do something with above data string
      } catch (err) {
        //handle error
        console.log(err);
      }
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    // data.user_id = UserData._id;
    if (imageBase64 === '') {
      alert('Provide image');
      return;
    }
    data.image = imageBase64;
    fetch(`https://edu-blog-api.sayan.org.in/api/blogs/edit/${id}`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${cookies['token']}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d) => {
        // if (d.ok) {
        //   setCookie('token', d.token, {
        //     path: '/',
        //   });
        // }
        // console.log(d);
        setApiResp(d.message);
        window.location.href = '/';
      })
      .catch((e) => setApiResp(e));
    // console.log(JSON.stringify(data));
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
          Edit Post
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
                defaultValue={post && post.title}
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
                defaultValue={post && post.content}
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
                onChange={handleImageChange}
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
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
