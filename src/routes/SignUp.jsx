import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    if (data.masterKey === '') {
      delete data.masterKey;
    }
    fetch('https://edu-blog-api.sayan.org.in/api/accounts/signup', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((d) => {
        console.log(d);
      });
    console.log(JSON.stringify(data));
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const onAdminCheckboxChange = () => {
    setIsAdmin(!isAdmin);
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
          Sign up
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
              <span className="label-text">Your Name</span>
            </label>
            <label className="input-group">
              <span>Name</span>
              <input
                {...register('name', { required: true, maxLength: 40 })}
                style={{
                  width: '100%',
                }}
                type="text"
                placeholder="John Doe"
                className="input input-bordered"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                {...register('email', { required: true })}
                style={{
                  width: '100%',
                }}
                type="text"
                placeholder="info@site.com"
                className="input input-bordered"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your Username</span>
            </label>
            <label className="input-group">
              <span>@</span>
              <input
                {...register('username', { required: true, maxLength: 20 })}
                style={{
                  width: '100%',
                }}
                type="text"
                placeholder="username"
                className="input input-bordered"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <label className="input-group">
              <span>+91</span>
              <input
                {...register('phone', { required: true, maxLength: 10 })}
                style={{
                  width: '100%',
                }}
                type="number"
                placeholder="2222222222"
                className="input input-bordered"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <label className="input-group">
              <span>Password</span>
              <input
                {...register('password', { required: true })}
                style={{
                  width: '100%',
                }}
                type="password"
                placeholder="your password here"
                className="input input-bordered"
              />
            </label>
          </div>
          {isAdmin && (
            <div>
              <label className="label">
                <span className="label-text">Master Key</span>
              </label>
              <label className="input-group">
                {/* <span>Master Key</span> */}
                <input
                  {...register('masterKey', { required: isAdmin })}
                  style={{
                    width: '100%',
                  }}
                  type="password"
                  placeholder="Enter Master Key"
                  className="input input-bordered"
                />
              </label>
            </div>
          )}
          <div>
            <label className="label cursor-pointer">
              <span className="label-text">Register as admin user</span>
              <input
                type="checkbox"
                onChange={onAdminCheckboxChange}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
          {errors.email && <p role="alert">{errors.mail?.message}</p>}
          <button
            style={{
              marginTop: '15px',
              marginBottom: '20px',
            }}
            className="btn"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
