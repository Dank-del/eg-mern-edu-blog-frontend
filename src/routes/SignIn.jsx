import { useForm } from 'react-hook-form';

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    fetch('https://edu-blog-api.sayan.org.in/api/accounts/signin', {
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
          Sign In
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
          <button
            style={{
              marginTop: '15px',
              marginBottom: '20px',
            }}
            className="btn"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
