import React from "react";

const WeatherDataContainer = (props) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
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
            ({month}/{day}/{year})
          </h3>
        ) : (
          <h3>
            {props.selectedcity.city} ({month}/{day}/{year})
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
          {props.selectedcity.uvindex !== "" &&
            `UV Index: ${props.selectedcity.uvindex}`}
        </h6>
      </div>
    </div>
  );
};

export default WeatherDataContainer;
