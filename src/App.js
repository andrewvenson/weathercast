import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import WeatherDataContainer from "./components/WeatherDataContainer";
import FiveDayForecast from "./components/FiveDayForecast";

function App() {
  // city history state
  const [cityhistory, setCityHistory] = useState([]);
  // state for current city input for clearing out input
  const [cityinput, setCityInput] = useState({ city: "" });
  // state to display current city info
  const [selectedcity, setSelectedCity] = useState({
    city: "",
    temp: "",
    humidity: "",
    windspeed: "",
    uvindex: "",
  });
  // state to hold five day forecast
  const [fivedaycast, setFiveDayCast] = useState({});

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    height: "90vh",
  };

  const weatherGridContainer = {
    display: "grid",
    gridTemplateRows: "50% 50%",
  };

  const weatherInterval = {
    border: "1px solid lightgray",
    borderRadius: "5px",
    margin: "5px",
  };

  return (
    <>
      <Header />
      <div style={gridContainer}>
        <div
          style={{
            border: "1px solid lightgray",
            backgroundColor: "whitesmoke",
            borderBottomRightRadius: "5px",
          }}
        >
          <Search
            cityhistory={cityhistory}
            setcityhistory={setCityHistory}
            cityinput={cityinput}
            setcityinput={setCityInput}
            setselectedcity={setSelectedCity}
            selectedcity={selectedcity}
            fivedaycast={fivedaycast}
            setfivedaycast={setFiveDayCast}
          />
        </div>
        <div style={weatherGridContainer}>
          <div
            style={{
              padding: "10px 10px 10px 10px",
              heigth: "100%",
            }}
          >
            <WeatherDataContainer selectedcity={selectedcity} />
          </div>
          <div
            style={{
              padding: "10px 10px 10px 10px",
              heigth: "100%",
            }}
          >
            <h3>
              5-Day Forecast:{" "}
              {Object.keys(fivedaycast).length !== 0 && (
                <span style={{ color: "lightgray" }}>12:00AM</span>
              )}
            </h3>
            <button className="weatherIntevalButton" style={weatherInterval}>
              12:00AM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              3:00AM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              6:00AM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              9:00AM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              12:00PM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              3:00PM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              6:00PM
            </button>
            <button className="weatherIntevalButton" style={weatherInterval}>
              9:00PM
            </button>

            <div style={{ display: "flex" }}>
              {Object.keys(fivedaycast).map((cast, index) => {
                return (
                  <FiveDayForecast
                    key={index}
                    date={cast}
                    description={fivedaycast[cast][0]["00:00:00"][2]}
                    temp={fivedaycast[cast][0]["00:00:00"][0]}
                    humidity={fivedaycast[cast][0]["00:00:00"][1]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
