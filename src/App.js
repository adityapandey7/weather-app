import { useEffect, useState } from "react";
function App() {
  const [search, setSearch] = useState("ranchi");
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState();

  const APIKey = "95d473479180ef33a7bdfb3a8cdf9cc9";
  const Url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${APIKey}`;

  async function getWeatherData() {
    try {
      const res = await fetch(Url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWeatherInfo = {
        temp,
        humidity,
        pressure,
        main,
        name,
        speed,
        country,
        sunset,
      };

      setWeather(myWeatherInfo);
      setSearch("");
    } catch (error) {
      console.log("something is wrong");
    }
  }

  let sec = weather.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  useEffect(() => {
    if (weather.main) {
      switch (weather.main) {
        case "Clouds":
          setIcon("wi-day-cloudy");
          break;
        case "Haze":
          setIcon("wi-day-haze");
          break;
        case "Rain":
          setIcon("wi-day-rain");
          break;
        case "Sunny":
          setIcon("wi-day-sunny");
          break;

        default:
          setIcon("wi-day-sunny");
          break;
      }
    }
  }, [weather.main]);

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="container">
      <i className={`wi ${icon}`} id="icon"></i>
      <div className="inside-container">
        <h1>Your City Weather</h1>
        {/* search box */}
        <form className="search">
          <input
            type="text"
            placeholder="Enter your city"
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="search-btn" type="button" onClick={getWeatherData}>
            Search
          </button>
        </form>
        {/* show case data */}
        <div className="weather-info">
          <div className="main-info">
            <div className="temperature">
              <span>{weather.temp}&deg;</span>
            </div>

            <div className="description">
              <div className="weatherCondition">{weather.main}</div>
              <div className="place">
                {" "}
                {weather.name}, {weather.country}
              </div>
            </div>

            <div className="date">{new Date().toLocaleString()}</div>
          </div>

          {/* Extra data */}

          <div className="extra-temp">
            <div className="two-sided-section">
              <p>
                <i className={`wi wi-sunset`}></i>
              </p>
              <p className="extra-info-left-side">
                {timeStr} PM <br /> Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-left-side">
                {weather.humidity} <br /> Humidity
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-left-side">
                {weather.speed} <br /> Speed
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-barometer"}></i>
              </p>
              <p className="extra-info-left-side">
                {weather.pressure} <br /> Pressure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
