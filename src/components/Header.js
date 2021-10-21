const Header = ({ currentUser }) => {
  return (
    <header>
      <h1>React Weather App</h1>
      <p>
        {currentUser ? `Welcome ${currentUser.email}` : "Login or Register."}
      </p>
    </header>
  );
};

export default Header;
