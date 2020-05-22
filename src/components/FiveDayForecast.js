import React from "react";

const FiveDayForecast = (props) => {
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
        <p>{props.description}</p>
        <p>Temp: {props.temp}</p>
        <p>Humidity: {props.humidity}</p>
      </div>
    </div>
  );
};

export default FiveDayForecast;
