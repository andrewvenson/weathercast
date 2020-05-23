import React, { useState, useEffect } from "react";
import Cloudy from "../svg/cloudy.svg";
import Day from "../svg/day.svg";
import Rainy2 from "../svg/rainy-2.svg";
import Rainy7 from "../svg/rainy-7.svg";
import Snowy5 from "../svg/snowy-5.svg";
import Thunder from "../svg/thunder.svg";

const WeatherDataContainer = (props) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const [svgstate, setSvgState] = useState(null);

  const snow = "Snow";
  const rain = "Rain";
  const drizzle = "Drizzle";
  const thunderStorm = "Thunderstorm";
  const clear = "Clear";

  useEffect(() => {
    setSvgState(props.selectedcity.main);
  });

  const weatherDescriptions = {
    Rain: Rainy7,
    Drizzle: Rainy2,
    Thunderstorm: Thunder,
    Cloudy: Cloudy,
    Snow: Snowy5,
    Clear: Day,
  };

  let color;
  // uv index colors based off uv index scale | epa https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html
  if (props.selectedcity.uvindex < 3) {
    color = "green";
  } else if (
    props.selectedcity.uvindex >= 3 &&
    props.selectedcity.uvindex < 6
  ) {
    color = "yellow";
  } else if (
    props.selectedcity.uvindex >= 6 &&
    props.selectedcity.uvindex < 8
  ) {
    color = "orange";
  } else if (
    props.selectedcity.uvindex >= 8 &&
    props.selectedcity.uvindex < 11
  ) {
    color = "red";
  } else if (props.selectedcity.uvindex >= 11) {
    color = "purple";
  }

  const uvindex = {
    backgroundColor: color,
    borderRadius: "3px",
    padding: "3px",
  };

  return (
    <div
      className="weatherDataContainer"
      style={{
        display: "grid",
        gridTemplateRows: "20% 20% 20% 20% 20%",
        border: "1px solid lightgray",
        borderRadius: "5px",
        height: "100%",
        padding: "10px 15px 0px 15px",
      }}
    >
      <div>
        {props.selectedcity.city === "" ? (
          <h3>
            <span style={{ color: "lightgray" }}>
              ({month}/{day}/{year})
            </span>
          </h3>
        ) : (
          <h3>
            {props.selectedcity.city}{" "}
            <span style={{ color: "lightgray" }}>
              ({month}/{day}/{year})
            </span>
            <span>
              <img
                src={
                  svgstate === thunderStorm
                    ? weatherDescriptions.Thunderstorm
                    : svgstate === drizzle
                    ? weatherDescriptions.Drizzle
                    : svgstate === clear
                    ? weatherDescriptions.Clear
                    : svgstate === rain
                    ? weatherDescriptions.Rain
                    : svgstate === snow
                    ? weatherDescriptions.Snow
                    : weatherDescriptions.Cloudy
                }
                alt="cloudy day"
                style={{ width: "65px" }}
              />
            </span>
          </h3>
        )}
      </div>

      <div>
        <h6>
          {props.selectedcity.temp !== "" && `Temp: ${props.selectedcity.temp}`}
        </h6>
      </div>
      <div>
        <h6>
          {props.selectedcity.humidity !== "" &&
            `Humidity: ${props.selectedcity.humidity}`}
        </h6>
      </div>
      <div>
        <h6>
          {props.selectedcity.windspeed !== "" &&
            `Wind Speed: ${props.selectedcity.windspeed}`}
        </h6>
      </div>
      <div>
        <h6>
          {props.selectedcity.uvindex !== "" && (
            <>
              <span>UV Index: </span>
              <span style={uvindex}>{props.selectedcity.uvindex}</span>
            </>
          )}
        </h6>
      </div>
    </div>
  );
};

export default WeatherDataContainer;
