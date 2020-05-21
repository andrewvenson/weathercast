import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import WeatherDataContainer from "./components/WeatherDataContainer";

function App() {
  const [cityhistory, setCityHistory] = useState([]);
  const [cityinput, setCityInput] = useState({ city: "" });
  const [selectedcity, setSelectedCity] = useState({
    city: "",
    temp: "",
    humidity: "",
    windspeed: "",
    uvindex: "",
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
            <h3>5-Day Forecast:</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
