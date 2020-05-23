import React, { useState, useEffect } from "react";
import firebase from "./Firebase";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import WeatherDataContainer from "./components/WeatherDataContainer";
import FiveDayForecast from "./components/FiveDayForecast";

function App() {
  const db = firebase.firestore();

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

  // firebase refs
  const historyRef = db.collection("history").doc("history");
  const selectedRef = db.collection("selected").doc("selected");
  const forecastRef = db.collection("forecast").doc("forecast");

  useEffect(() => {
    historyRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let historyArray = [];
          for (let x in doc.data()) {
            historyArray.push(doc.data()[x]);
          }
          setCityHistory(historyArray);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    selectedRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setSelectedCity(doc.data());
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    forecastRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          // doc.data() isn't coming back sorted, so here is the sorting
          var data = doc.data();
          let forecastArray = [];

          for (let x in data) {
            forecastArray.push({ [x]: data[x] });
          }
          let sortedCast = forecastArray.sort((c1, c2) => {
            if (
              c1[Object.keys(c1)][0]["date"] < c2[Object.keys(c2)][0]["date"]
            ) {
              return -1;
            } else {
              return 1;
            }
          });

          let castObj = {};

          sortedCast.forEach((date) => {
            castObj[Object.keys(date)] = date[Object.keys(date)];
          });

          setFiveDayCast(castObj);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  }, []);

  // state to hold current time selected
  const [currenttime, setCurrentTime] = useState({
    time: "00:00:00",
    timeslot: 0,
    ampm: "12:00AM",
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
                <span style={{ color: "lightgray" }}>{currenttime.ampm}</span>
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
                  ampm: "12:00AM",
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
                  ampm: "3:00AM",
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
                  ampm: "6:00AM",
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
                  ampm: "9:00AM",
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
                  ampm: "12:00PM",
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
                  ampm: "3:00PM",
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
                  time: "18:00:00",
                  timeslot: 6,
                  ampm: "6:00PM",
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
                  ampm: "9:00PM",
                });
              }}
            >
              9:00PM
            </button>

            <div style={{ display: "flex" }}>
              {Object.keys(fivedaycast).map((cast, index) => {
                // only return data if it time is available
                if (fivedaycast[cast][currenttime.timeslot] !== undefined) {
                  if (
                    fivedaycast[cast][currenttime.timeslot][
                      currenttime.time
                    ] !== undefined
                  ) {
                    return (
                      <FiveDayForecast
                        key={index}
                        date={cast}
                        main={
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
                  } else {
                    // console.log(
                    //   cast,
                    //   fivedaycast[cast][currenttime.timeslot]["03:00:00"]
                    // );
                    // figure out how to display only times available
                    return null;
                  }
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
