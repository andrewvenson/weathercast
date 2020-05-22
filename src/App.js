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

  // state to hold current time selected
  const [currenttime, setCurrentTime] = useState({
    time: "00:00:00",
    timeslot: "0",
  });

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
            paddingTop: "4px",
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
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "00:00:00",
                  timeslot: 0,
                });
              }}
            >
              12:00AM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "03:00:00",
                  timeslot: 1,
                });
              }}
            >
              3:00AM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "06:00:00",
                  timeslot: 2,
                });
              }}
            >
              6:00AM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "09:00:00",
                  timeslot: 3,
                });
              }}
            >
              9:00AM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "12:00:00",
                  timeslot: 4,
                });
              }}
            >
              12:00PM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "15:00:00",
                  timeslot: 5,
                });
              }}
            >
              3:00PM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "19:00:00",
                  timeslot: 6,
                });
              }}
            >
              6:00PM
            </button>
            <button
              className="weatherIntevalButton"
              style={weatherInterval}
              onClick={() => {
                setCurrentTime({
                  ...currenttime,
                  time: "21:00:00",
                  timeslot: 7,
                });
              }}
            >
              9:00PM
            </button>

            <div style={{ display: "flex" }}>
              {Object.keys(fivedaycast).map((cast, index) => {
                // console.log(fivedaycast[cast]);
                return (
                  <FiveDayForecast
                    key={index}
                    date={cast}
                    description={
                      fivedaycast[cast][currenttime.timeslot][
                        currenttime.time
                      ][2]
                    }
                    temp={
                      fivedaycast[cast][currenttime.timeslot][
                        currenttime.time
                      ][0]
                    }
                    humidity={
                      fivedaycast[cast][currenttime.timeslot][
                        currenttime.time
                      ][1]
                    }
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
