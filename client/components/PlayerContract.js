import React from "react";

export default class PlayerContract extends React.Component {
  constructor() {
    super();
    this.state = {
      yrTwoOption: "None",
      yrThreeOption: "None",
      yrFourOption: "None",
      yrFiveOption: "None",
      yrSixOption: "None"
    };
    this.renderSeasons = this.renderSeasons.bind(this);
    this.convertDollars = this.convertDollars.bind(this);
  }

  componentDidMount() {
    if (this.props.contract.yearTwoOption !== "None") {
      this.setState({ yrTwoOption: this.props.contract.yearTwoOption });
    }
    if (this.props.contract.yearThirdOption !== "None") {
      this.setState({ yrThreeOption: this.props.contract.yearThirdOption });
    }
    if (this.props.contract.yearFourOption !== "None") {
      this.setState({ yrFourOption: this.props.contract.yearFourOption });
    }
    if (this.props.contract.yearFiveOption !== "None") {
      this.setState({ yrFiveOption: this.props.contract.yearFiveOption });
    }
    if (this.props.contract.yearSixOption !== "None") {
      this.setState({ yrSixOption: this.props.contract.yearSixOption });
    }
  }

  convertDollars(value) {
    if (value === "TBD") return "TBD";
    if (value === "") return "-";
    var dollar;
    var arr = value.split("");
    var symbol = arr[0];
    var nums = arr.slice(1, value.length);
    var str = nums.join("");
    var newStr = str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return "$" + newStr;
  }

  renderSeasons() {
    var yrTwoHeader = {
      color: "white"
    };
    var yrThreeHeader = {
      color: "white"
    };
    var yrFourHeader = {
      color: "white"
    };
    var yrFiveHeader = {
      color: "white"
    };
    var yrSixHeader = {
      color: "white"
    };
    if (this.state.yrTwoOption === "Player") {
      yrTwoHeader = { color: "rgba(210, 255, 77, 0.8)" };
    }
    if (this.state.yrTwoOption === "Team") {
      yrTwoHeader = { color: "rgba(102, 252, 241, 0.8)" };
    }
    if (this.state.yrTwoOption === "Early Termination") {
      yrTwoHeader = { color: "rgba(255, 0, 127, 0.8)" };
    }

    if (this.state.yrThreeOption === "Player") {
      yrThreeHeader = { color: "rgba(210, 255, 77, 0.8)" };
    }
    if (this.state.yrThreeOption === "Team") {
      yrThreeHeader = { color: "rgba(102, 252, 241, 0.8)" };
    }
    if (this.state.yrThreeOption === "Early Termination") {
      yrThreeHeader = { color: "rgba(255, 0, 127, 0.8)" };
    }

    if (this.state.yrFourOption === "Player") {
      yrFourHeader = { color: "rgba(210, 255, 77, 0.8)" };
    }
    if (this.state.yrFourOption === "Team") {
      yrFourHeader = { color: "rgba(102, 252, 241, 0.8)" };
    }
    if (this.state.yrFourOption === "Early Termination") {
      yrFourHeader = { color: "rgba(255, 0, 127, 0.8)" };
    }

    if (this.state.yrFiveOption === "Player") {
      yrFiveHeader = { color: "rgba(210, 255, 77, 0.8)" };
    }
    if (this.state.yrFiveOption === "Team") {
      yrFiveHeader = { color: "rgba(102, 252, 241, 0.8)" };
    }
    if (this.state.yrFiveOption === "Early Termination") {
      yrFiveHeader = { color: "rgba(255, 0, 127, 0.8)" };
    }

    if (this.state.yrSixOption === "Player") {
      yrSixHeader = { color: "rgba(210, 255, 77, 0.8)" };
    }
    if (this.state.yrSixOption === "Team") {
      yrSixHeader = { color: "rgba(102, 252, 241, 0.8)" };
    }
    if (this.state.yrSixOption === "Early Termination") {
      yrSixHeader = { color: "rgba(255, 0, 127, 0.8)" };
    }
    return (
      <tbody>
        <tr style={{ color: "white" }}>
          <td>2019-2020</td>
          <td>{this.convertDollars(this.props.contract.yearOne)}</td>
          <td>{this.props.contract.signedUsing}</td>
          <td>{this.convertDollars(this.props.contract.guaranteed)}</td>
        </tr>
        <tr style={{ color: "white" }}>
          <td>2020-2021</td>
          <td style={yrTwoHeader}>
            {this.convertDollars(this.props.contract.yearTwo)}
          </td>
        </tr>
        <tr style={{ color: "white" }}>
          <td>2021-2022</td>
          <td style={yrThreeHeader}>
            {this.convertDollars(this.props.contract.yearThird)}
          </td>
        </tr>
        <tr style={{ color: "white" }}>
          <td>2022-2023</td>
          <td style={yrFourHeader}>
            {this.convertDollars(this.props.contract.yearFour)}
          </td>
        </tr>
        <tr style={{ color: "white" }}>
          <td>2023-2024</td>
          <td style={yrFiveHeader}>
            {this.convertDollars(this.props.contract.yearFive)}
          </td>
        </tr>
        <tr style={{ color: "white" }}>
          <td>2024-2025</td>
          <td style={yrSixHeader}>
            {this.convertDollars(this.props.contract.yearSix)}
          </td>
        </tr>
      </tbody>
    );
  }

  render() {
    return (
      <div className="row" style={{ padding: "0px 30px" }}>
        <div className="row" style={{ marginTop: "20px" }}>
          <div
            style={{
              color: "white",
              fontSize: "18px"
            }}
          >
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Value</th>
                  <th>Signed Using</th>
                  <th>Guaranteed</th>
                </tr>
              </thead>
              {this.renderSeasons()}
            </table>
          </div>
        </div>
        <div
          className="row"
          style={{
            float: "right",
            fontSize: "13px",
            marginTop: "20px",
            marginBottom: "10px"
          }}
        >
          <span style={{ color: "rgba(102, 252, 241, 0.8)" }}>Team Option</span>
          <span
            style={{ color: "rgba(210, 255, 77, 0.8)", paddingLeft: "20px" }}
          >
            Player Option
          </span>
          <span
            style={{ color: "rgba(255, 0, 127, 0.8)", paddingLeft: "20px" }}
          >
            Early Termination
          </span>
        </div>
      </div>
    );
  }
}
