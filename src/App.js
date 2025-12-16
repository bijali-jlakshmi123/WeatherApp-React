import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [city, setcity] = useState("Uzhavoor,India");
  const [Weatherdata, setweatherdata] = useState({
    main: {},
    weather: [{}],
  });
  useEffect(() => {
    async function getdata() {
      const Api_key = process.env.REACT_APP_API_KEY;
      const Api_url = `https://api.openweathermap.org/data/2.5/weather?&appid=${Api_key}&q=${city}&units=metric`;

      try {
        let response = await Axios.get(Api_url);

        setweatherdata(response.data);

        localStorage.setItem("citiesList", JSON.stringify(city, ...city));
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);

  return (
    <div className="home-container">
      <div className="main-container">
        <div className="card">
          <h1>{Weatherdata.name}</h1>
          <h1>{`${Math.round(Weatherdata.main.temp)}`}&deg;C</h1>

          <h1>{Weatherdata.weather[0].main}</h1>
          <h6>{Weatherdata.weather[0].description}</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
