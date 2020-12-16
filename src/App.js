import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const API_KEY = "df82f4bd92424e1aa29150115201612";
const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`;
const URL = `${BASE_URL}&q=`;
function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();

    if (localStorage.getItem(loginEmail)) {
      const user = JSON.parse(localStorage.getItem(loginEmail));
      if (user.password === loginPassword) {
        alert("Welcome Back");
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        alert("Please User Correct Password");
      }
      setCurrentUser(user);
    } else {
      alert("User Not Registered");
    }

    setLoginEmail("");
    setLoginPassword("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (localStorage.getItem(registerEmail)) {
      alert("User Already Registered");
    } else {
      const timestamp = new Date().toLocaleString();
      const userData = {
        email: registerEmail,
        password: registerPassword,
        timestamp,
      };
      localStorage.setItem(registerEmail, JSON.stringify(userData));
      sessionStorage.setItem("user", JSON.stringify(userData));
      alert("Welcome");
      setCurrentUser(userData);
    }

    setRegisterEmail("");
    setRegisterPassword("");
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("user")));

    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetch(`${URL}${lat},${lon}`).then((response) => {
        response.json().then((data) => {
          setWeatherData(data);
        });
      });
    }
  }, [lat, lon]);
  console.log(weatherData);
  return (
    <div className="App">
      <main className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {currentUser ? `Welcome ${currentUser.email}` : "Login or Register."}
        </p>

        <section className="App-Container">
          {!currentUser ? (
            <>
              <form onSubmit={(e) => handleLogin(e)} className="login_form">
                <legend>Login Here</legend>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <button type="submit" className="app-btn">
                  Login
                </button>
              </form>
              <form
                onSubmit={(e) => handleRegister(e)}
                className="register_form"
              >
                <legend>Register Here</legend>
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <input
                  type="password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <button type="submit" className="app-btn">
                  Register
                </button>
              </form>
            </>
          ) : (
            <div>
              <p>
                Location: {weatherData?.location.name},{" "}
                {weatherData?.location.region}, {weatherData?.location.country}
              </p>
              <h4>Last Updated: {weatherData?.current.last_updated}</h4>
              <h4>Local Time: {weatherData?.location.localtime}</h4>
              <h6>
                In C: {weatherData?.current.temp_c} <br />
                In F: {weatherData?.current.temp_f} <br />
                Humidity: {weatherData?.current.humidity} <br />
              </h6>

              <button
                className="app-btn"
                onClick={() => {
                  sessionStorage.clear();
                  setCurrentUser(null);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
