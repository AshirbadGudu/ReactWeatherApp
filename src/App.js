import Header from "components/Header";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import { useEffect, useState } from "react";

const API_KEY = "df82f4bd92424e1aa29150115201612";
const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;
const URL = `${BASE_URL}&q=`;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const App = () => {
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
    const expiresTime = new Date(
      new Date().setHours(new Date().getHours() + 1)
    );

    const expiresOn = "expires=" + expiresTime.toUTCString();

    if (getCookie("weatherData")) {
      const cookieWeatherData = JSON.parse(getCookie("weatherData"));
      setWeatherData(cookieWeatherData);
    } else {
      if (lat && lon) {
        fetch(`${URL}${lat},${lon}`).then((response) => {
          response.json().then((data) => {
            setWeatherData(data);

            document.cookie =
              "weatherData" + "=" + JSON.stringify(data) + ";" + expiresOn;
          });
        });
      }
    }
  }, [lat, lon]);

  return (
    <div className="App">
      <main className="App-header">
        <Header currentUser={currentUser} />
        <section className="App-Container">
          {!currentUser ? (
            <>
              <Login
                email={loginEmail}
                password={loginPassword}
                setEmail={setLoginEmail}
                setPassword={setLoginPassword}
                onSubmit={handleLogin}
              />
              <Register
                email={registerEmail}
                password={registerPassword}
                setEmail={setRegisterEmail}
                setPassword={setRegisterPassword}
                onSubmit={handleRegister}
              />
            </>
          ) : (
            <Home weatherData={weatherData} setCurrentUser={setCurrentUser} />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
