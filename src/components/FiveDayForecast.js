import React from "react";
import Cloudy from "../svg/cloudy.svg";
import Day from "../svg/day.svg";
import Rainy2 from "../svg/rainy-2.svg";
import Rainy7 from "../svg/rainy-7.svg";
import Snowy5 from "../svg/snowy-5.svg";
import Thunder from "../svg/thunder.svg";

const FiveDayForecast = (props) => {
  const atmosphere = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
  ];
  const snow = "Snow";
  const rain = "Rain";
  const drizzle = "Drizzle";
  const thunderStorm = "Thunderstorm";
  const clear = "Clear";

  const weatherDescriptions = {
    Rain: Rainy7,
    Drizzle: Rainy2,
    Thunderstorm: Thunder,
    Cloudy: Cloudy,
    Snow: Snowy5,
    Clear: Day,
  };

  return (
    <div>
      <div
        className="castDiv"
        style={{
          width: "200px",
          height: "200px",
          margin: "5px",
          border: "1px solid lightgray",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
          boxShadow: "2px 5px 8px lightgray",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "#058c42",
        }}
      >
        <h4>{props.date}</h4>
        {/* {console.log(props.main, thunderStorm)} */}
        <img
          src={
            props.main === thunderStorm
              ? weatherDescriptions.Thunderstorm
              : props.main === drizzle
              ? weatherDescriptions.Drizzle
              : props.main === clear
              ? weatherDescriptions.Clear
              : props.main === rain
              ? weatherDescriptions.Rain
              : props.main === snow
              ? weatherDescriptions.Snow
              : weatherDescriptions.Cloudy
          }
          alt="cloudy day"
          style={{ width: "85px" }}
        />
        <p>Temp: {props.temp}</p>
        <p>Humidity: {props.humidity}</p>
      </div>
    </div>
  );
};

export default FiveDayForecast;
