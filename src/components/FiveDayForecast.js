import React from "react";
import CloudyDay1 from "../svg/cloudy-day-1.svg";
import CloudyDay2 from "../svg/cloudy-day-2.svg";
import CloudyDay3 from "../svg/cloudy-day-3.svg";
import CloudyNight1 from "../svg/cloudy-night-1.svg";
import CloudyNight2 from "../svg/cloudy-night-2.svg";
import CloudyNight3 from "../svg/cloudy-night-3.svg";
import Cloudy from "../svg/cloudy.svg";
import Day from "../svg/day.svg";
import Rainy1 from "../svg/rainy-1.svg";
import Rainy2 from "../svg/rainy-2.svg";
import Rainy3 from "../svg/rainy-3.svg";
import Rainy4 from "../svg/rainy-4.svg";
import Rainy5 from "../svg/rainy-5.svg";
import Rainy6 from "../svg/rainy-6.svg";
import Rainy7 from "../svg/rainy-7.svg";
import Snowy1 from "../svg/snowy-1.svg";
import Snowy2 from "../svg/snowy-2.svg";
import Snowy3 from "../svg/snowy-3.svg";
import Snowy4 from "../svg/snowy-4.svg";
import Snowy5 from "../svg/snowy-5.svg";
import Snowy6 from "../svg/snowy-6.svg";
import Thunder from "../svg/thunder.svg";

const FiveDayForecast = (props) => {
  const weatherDescriptions = {
    Rain: Rainy7,
    Drizzle: Rainy2,
    Thunderstorm: Thunder,
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
          backgroundColor: "#16DB65",
        }}
      >
        <h4>{props.date}</h4>
        {/* <p>{props.description}</p> */}
        <img src={Thunder} alt="cloudy day" style={{ width: "85px" }} />
        <p>Temp: {props.temp}</p>
        <p>Humidity: {props.humidity}</p>
      </div>
    </div>
  );
};

export default FiveDayForecast;
