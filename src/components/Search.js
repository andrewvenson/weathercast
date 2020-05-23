import React from "react";
import firebase from "../Firebase";

const Search = (props) => {
  const db = firebase.firestore();

  let historyRef = db.collection("history").doc("history");
  let forecastRef = db.collection("forecast").doc("forecast");
  let selectedRef = db.collection("selected").doc("selected");

  return (
    <>
      <div style={{ padding: "5px 10px 0px 10px" }}>
        <input
          type="text"
          value={props.cityinput.city}
          placeholder="Search for a City..."
          onChange={(e) => {
            // set value of input to what's in state
            props.setcityinput({ ...props.cityinput, city: e.target.value });
          }}
          onKeyUp={(e) => {
            var city = e.target.value;

            var api = "6d9344c39a56808725e4fa26d9748658";
            if (e.keyCode === 13) {
              // Get 5 day forecast
              fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  const date = new Date();
                  let month = date.getMonth() + 1;
                  const day = date.getDate();
                  const year = date.getFullYear();
                  let fullDate;
                  if (month.toString().length === 1) {
                    month = `0${month}`;
                  }
                  fullDate = `${year}-${month}-${day}`;

                  let castObj = {};
                  if (data.list !== undefined) {
                    data.list.forEach((data, index) => {
                      // get date
                      if (fullDate !== data.dt_txt.substring(0, 10)) {
                        let iterDate = data.dt_txt.substring(0, 10);
                        let iterTime = data.dt_txt.substring(
                          11,
                          data.dt_txt.length
                        );

                        if (iterDate in castObj) {
                          const dateArr = castObj[iterDate].concat({
                            [iterTime]: [
                              `${Math.round(
                                (data.main.temp - 273.15) * 1.8 + 32
                              )} °F`,
                              `${data.main.humidity}%`,
                              data.weather[0].main,
                            ],
                          });
                          castObj[iterDate] = dateArr;
                        } else {
                          castObj[iterDate] = [
                            {
                              [iterTime]: [
                                `${Math.round(
                                  (data.main.temp - 273.15) * 1.8 + 32
                                )} °F`,
                                `${data.main.humidity}%`,
                                data.weather[0].main,
                              ],
                            },
                          ];
                        }
                      }
                    });

                    // set 5 day forecast to state
                    forecastRef.set(castObj);
                    props.setfivedaycast(castObj);
                  }
                });

              // get current weather forecast
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
              )
                .then((response) => {
                  return response.json();
                })
                .then((weathercalldata) => {
                  let weatherCall = weathercalldata;
                  fetch(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherCall.coord.lat}&lon=${weatherCall.coord.lon}&appid=${api}`
                  )
                    .then((response) => {
                      return response.json();
                    })
                    .then((onecalldata) => {
                      // create weather object from open weather data
                      const weatherObj = {
                        city: city,
                        temp: `${Math.round(
                          (weatherCall.main.temp - 273.15) * 1.8 + 32
                        )} °F`,
                        humidity: `${weatherCall.main.humidity}%`,
                        windspeed: `${weatherCall.wind.speed} MPH`,
                        uvindex: onecalldata.current.uvi,
                        main: weatherCall.weather[0].main,
                      };
                      // concat city history state with new weather obj
                      const cityarray = props.cityhistory.concat([weatherObj]);
                      // set city history to new concatenated city history
                      props.setcityhistory(cityarray);
                      historyRef.set(Object.assign({}, cityarray));
                      // set selected city state
                      props.setselectedcity({
                        ...props.selectedcity,
                        city: city,
                        temp: `${Math.round(
                          (weatherCall.main.temp - 273.15) * 1.8 + 32
                        )} °F`,
                        humidity: `${weatherCall.main.humidity}%`,
                        windspeed: `${weatherCall.wind.speed} MPH`,
                        uvindex: onecalldata.current.uvi,
                        main: weatherCall.weather[0].main,
                      });

                      selectedRef.set({
                        city: city,
                        temp: `${Math.round(
                          (weatherCall.main.temp - 273.15) * 1.8 + 32
                        )} °F`,
                        humidity: `${weatherCall.main.humidity}%`,
                        windspeed: `${weatherCall.wind.speed} MPH`,
                        uvindex: onecalldata.current.uvi,
                        main: weatherCall.weather[0].main,
                      });
                      // clear input
                      props.setcityinput({ ...props.cityinput, city: "" });
                    })

                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
          style={{
            width: "100%",
            borderRadius: "5px",
            border: "1px solid lightgray",
            height: "35px",
            paddingLeft: "5px",
          }}
        />
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid lightgray",
            overflow: "hidden",
          }}
        >
          {props.cityhistory.map((city, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightgray",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "white",
                  paddingLeft: "10px",
                  height: "45px",
                  cursor: "pointer",
                }}
                className="historyDiv"
                onClick={() => {
                  // set selected city state
                  props.setselectedcity({
                    ...props.selectedcity,
                    city: city.city,
                    temp: city.temp,
                    humidity: city.humidity,
                    windspeed: city.windspeed,
                    uvindex: city.uvindex,
                    main: city.main,
                  });

                  selectedRef.set({
                    city: city.city,
                    temp: city.temp,
                    humidity: city.humidity,
                    windspeed: city.windspeed,
                    uvindex: city.uvindex,
                    main: city.main,
                  });

                  // get five day forecast
                  var api = "6d9344c39a56808725e4fa26d9748658";
                  fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city.city}&appid=${api}`
                  )
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      const date = new Date();
                      let month = date.getMonth() + 1;
                      const day = date.getDate();
                      const year = date.getFullYear();
                      let fullDate;
                      if (month.toString().length === 1) {
                        month = `0${month}`;
                      }
                      fullDate = `${year}-${month}-${day}`;

                      let castObj = {};
                      if (data.list !== undefined) {
                        data.list.forEach((data, index) => {
                          // get date
                          if (fullDate !== data.dt_txt.substring(0, 10)) {
                            let iterDate = data.dt_txt.substring(0, 10);
                            let iterTime = data.dt_txt.substring(
                              11,
                              data.dt_txt.length
                            );

                            if (iterDate in castObj) {
                              const dateArr = castObj[iterDate].concat({
                                [iterTime]: [
                                  `${Math.round(
                                    (data.main.temp - 273.15) * 1.8 + 32
                                  )} °F`,
                                  `${data.main.humidity}%`,
                                  data.weather[0].main,
                                ],
                              });
                              castObj[iterDate] = dateArr;
                            } else {
                              castObj[iterDate] = [
                                {
                                  [iterTime]: [
                                    `${Math.round(
                                      (data.main.temp - 273.15) * 1.8 + 32
                                    )} °F`,
                                    `${data.main.humidity}%`,
                                    data.weather[0].main,
                                  ],
                                },
                              ];
                            }
                          }
                        });

                        // set 5 day forecast to state
                        props.setfivedaycast(castObj);
                        forecastRef.set(castObj);
                      }
                    });
                }}
              >
                <p>{city.city}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
