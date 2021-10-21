const Home = ({ weatherData, setCurrentUser }) => {
  return (
    <>
      <div>
        <p>
          Location: {weatherData?.location.name}, {weatherData?.location.region}
          , {weatherData?.location.country}
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
    </>
  );
};

export default Home;
