import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [cityhistory, setCityHistory] = useState([]);
  const [cityinput, setCityInput] = useState({ city: "" });

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
          }}
        >
          <Search
            cityhistory={cityhistory}
            setcityhistory={setCityHistory}
            cityinput={cityinput}
            setcityinput={setCityInput}
          />
        </div>
        <div style={weatherGridContainer}>
          <div style={{ border: "1px solid lightgray" }}>
            <h3>City</h3>
          </div>
          <div style={{ border: "1px solid lightgray" }}>
            <h3>5-Day Forecast</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
