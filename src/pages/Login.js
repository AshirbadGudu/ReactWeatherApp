const Login = ({ onSubmit, email, password, setEmail, setPassword }) => {
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="login_form">
        <legend>Login Here</legend>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <button type="submit" className="app-btn">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
