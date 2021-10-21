const Register = ({ onSubmit, email, password, setEmail, setPassword }) => {
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="register_form">
        <legend>Register Now</legend>
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
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
