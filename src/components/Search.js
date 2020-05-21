import React from "react";

const Search = (props) => {
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

            let api = "6d9344c39a56808725e4fa26d9748658";
            if (e.keyCode === 13) {
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
                      };
                      // concat city history state with new weather obj
                      const cityarray = props.cityhistory.concat([weatherObj]);
                      // set city history to new concatenated city history
                      props.setcityhistory(cityarray);
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
            // console.log(city);
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
