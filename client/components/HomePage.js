import React from "react";
import Pic from "./image3.png";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backImage = "";
    return (
      <div className="container-fluid">
        <div
          className="row"
          style={{
            minHeight: "calc(96vh - 4rem)",
            backgroundColor: "rgb(0,0,0)",
            display: "flex",
            alignItems: "center",
            position: "relative"
          }}
        >
          <div style={{ position: "absolute", right: "2%", top: "5%" }}>
            <img
              className="img-responsive"
              src={Pic}
              style={{ width: "550px" }}
            />
          </div>
          <div
            class="text2"
            style={{
              color: "white",
              //paddingBottom: "40px",
              paddingLeft: "60px"
            }}
          >
            <h1>PRODIGY</h1>
            <h2>THE FUTURE OF ANALYTICS.</h2>
          </div>
        </div>
      </div>
    );
  }
}
