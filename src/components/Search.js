import React from "react";

const Search = () => {
  return (
    <>
      <div style={{ padding: "5px 10px 0px 10px" }}>
        <input
          type="text"
          placeholder="Search for a City..."
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
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            border: "1px solid lightgray",
            overflow: "hidden",
          }}
        >
          <div
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
          >
            <p>Austin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
