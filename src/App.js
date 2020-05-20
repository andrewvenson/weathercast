import React from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    height: "90vh",
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
          <h1>Weathercast</h1>
        </div>
        <div style={{ border: "1px solid lightgray" }}></div>
      </div>
    </>
  );
}

export default App;
