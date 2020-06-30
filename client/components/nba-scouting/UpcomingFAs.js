import React from "react";
import UpcomingFAListEntry from "./UpcomingFAListEntry";

export default class UpcomingFAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiring: [],
      showFilter: false,
      pg: true,
      sg: true,
      sf: true,
      pf: true,
      c: true,
      mpg1: true,
      mpg2: true,
      mpg3: true,
      mpg4: true,
      mpg5: true,
      exp1: true,
      exp2: true,
      exp3: true,
      exp4: true,
      exp5: true,
      age1: true,
      age2: true,
      age3: true,
      age4: true,
      age5: true,
      type1: true,
      type2: true,
      type3: true,
      type4: true,
      type5: true
    };
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getExpiring = this.getExpiring.bind(this);
    //this.getPlayer = this.getPlayer.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.handlePG = this.handlePG.bind(this);
    this.handleSG = this.handleSG.bind(this);
    this.handleSF = this.handleSF.bind(this);
    this.handlePF = this.handlePF.bind(this);
    this.handleC = this.handleC.bind(this);
    this.handleMPG1 = this.handleMPG1.bind(this);
    this.handleMPG2 = this.handleMPG2.bind(this);
    this.handleMPG3 = this.handleMPG3.bind(this);
    this.handleMPG4 = this.handleMPG4.bind(this);
    this.handleMPG5 = this.handleMPG5.bind(this);
    this.handleEXP1 = this.handleEXP1.bind(this);
    this.handleEXP2 = this.handleEXP2.bind(this);
    this.handleEXP3 = this.handleEXP3.bind(this);
    this.handleEXP4 = this.handleEXP4.bind(this);
    this.handleEXP5 = this.handleEXP5.bind(this);
    this.handleAGE1 = this.handleAGE1.bind(this);
    this.handleAGE2 = this.handleAGE2.bind(this);
    this.handleAGE3 = this.handleAGE3.bind(this);
    this.handleAGE4 = this.handleAGE4.bind(this);
    this.handleAGE5 = this.handleAGE5.bind(this);
    this.handleTYPE1 = this.handleTYPE1.bind(this);
    this.handleTYPE2 = this.handleTYPE2.bind(this);
    this.handleTYPE3 = this.handleTYPE3.bind(this);
    this.handleTYPE4 = this.handleTYPE4.bind(this);
    this.handleTYPE5 = this.handleTYPE5.bind(this);
  }

  componentDidMount() {
    if (this.props.contracts) {
      this.getExpiring();
    }
  }

  getExpiring() {
    var arr = [];
    var contracts = this.props.contracts;
    if (contracts.length > 0) {
      // Loop through contracts
      for (var i = 0; i < contracts.length; i++) {
        // Check if contract is expiring
        if (
          (contracts[i].yearTwo === "" ||
            contracts[i].yearTwoOption === "Player" ||
            contracts[i].yearTwoOption === "Team") &&
          contracts[i].yearOne !== "TBD"
        ) {
          // For every expiring contract create player object with FA type and current salary
          var player = {};
          player.yearTwoOption = contracts[i].yearTwoOption;
          if (
            contracts[i].signedUsing === "1st Round Pick" &&
            contracts[i].yearTwoOption !== "Player" &&
            contracts[i].yearTwoOption !== "Team"
          ) {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Restricted";
          } else if (contracts[i].yearTwoOption === "Player") {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Player Option";
          } else if (contracts[i].yearTwoOption === "Team") {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Team Option";
          } else {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Unrestricted";
          }
          //console.log("FREE AGENT: ", player);
          arr.push(player);
        }
      }
      this.setState({ expiring: arr });
    }
  }

  renderPlayers() {
    if (this.state.expiring.length > 0) {
      return this.state.expiring.map((player, i) => (
        <UpcomingFAListEntry
          player={player}
          key={i}
          unrestricted={this.state.type1}
          restricted={this.state.type2}
          playerOption={this.state.type3}
          teamOption={this.state.type4}
          pg={this.state.pg}
          sg={this.state.sg}
          sf={this.state.sf}
          pf={this.state.pf}
          c={this.state.c}
          mpg1={this.state.mpg1}
          mpg2={this.state.mpg2}
          mpg3={this.state.mpg3}
          mpg4={this.state.mpg4}
          mpg5={this.state.mpg5}
          exp1={this.state.exp1}
          exp2={this.state.exp2}
          exp3={this.state.exp3}
          exp4={this.state.exp4}
          exp5={this.state.exp5}
          age1={this.state.age1}
          age2={this.state.age2}
          age3={this.state.age3}
          age4={this.state.age4}
          age5={this.state.age5}
        />
      ));
    }
  }

  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  handleFilterSubmit() {
    this.getExpiring();
  }

  handlePG(evt) {
    this.setState({ pg: evt.target.checked }, () => {
      console.log(this.state.pg);
    });
  }

  handleSG(evt) {
    this.setState({ sg: evt.target.checked }, () => {
      console.log(this.state.sg);
    });
  }

  handleSF(evt) {
    this.setState({ sf: evt.target.checked }, () => {
      console.log(this.state.sf);
    });
  }

  handlePF(evt) {
    this.setState({ pf: evt.target.checked }, () => {
      console.log(this.state.pf);
    });
  }

  handleC(evt) {
    this.setState({ c: evt.target.checked }, () => {
      console.log(this.state.c);
    });
  }

  handleMPG1(evt) {
    this.setState({ mpg1: evt.target.checked });
  }
  handleMPG2(evt) {
    this.setState({ mpg2: evt.target.checked });
  }
  handleMPG3(evt) {
    this.setState({ mpg3: evt.target.checked });
  }
  handleMPG4(evt) {
    this.setState({ mpg4: evt.target.checked });
  }
  handleMPG5(evt) {
    this.setState({ mpg5: evt.target.checked });
  }

  handleEXP1(evt) {
    this.setState({ exp1: evt.target.checked });
  }
  handleEXP2(evt) {
    this.setState({ exp2: evt.target.checked });
  }
  handleEXP3(evt) {
    this.setState({ exp3: evt.target.checked });
  }
  handleEXP4(evt) {
    this.setState({ exp4: evt.target.checked });
  }
  handleEXP5(evt) {
    this.setState({ exp5: evt.target.checked });
  }

  handleAGE1(evt) {
    this.setState({ age1: evt.target.checked });
  }
  handleAGE2(evt) {
    this.setState({ age2: evt.target.checked });
  }
  handleAGE3(evt) {
    this.setState({ age3: evt.target.checked });
  }
  handleAGE4(evt) {
    this.setState({ age4: evt.target.checked });
  }
  handleAGE5(evt) {
    this.setState({ age5: evt.target.checked });
  }

  handleTYPE1(evt) {
    this.setState({ type1: evt.target.checked });
  }
  handleTYPE2(evt) {
    this.setState({ type2: evt.target.checked });
  }
  handleTYPE3(evt) {
    this.setState({ type3: evt.target.checked });
  }
  handleTYPE4(evt) {
    this.setState({ type4: evt.target.checked });
  }
  handleTYPE5(evt) {
    this.setState({ type5: evt.target.checked });
  }

  renderFilter() {
    if (this.state.showFilter) {
      return (
        <div
          className="row"
          style={{
            display: "flex",
            color: "white",
            margin: "20px 0px",
            justifyContent: "space-evenly",
            padding: "0px 40px"
          }}
        >
          <div className="col-md-offset-1 col-md-2">
            <div
              style={{
                color: "rgba(102, 252, 241, 0.8)",
                textDecoration: "underline"
              }}
            >
              Position
            </div>
            <form style={{ paddingLeft: "10px" }}>
              <input
                type="checkbox"
                checked={this.state.pg}
                onChange={this.handlePG}
                id="pos1"
              ></input>{" "}
              <label for="pos1">Point Guard</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.sg}
                onChange={this.handleSG}
                id="pos2"
              ></input>{" "}
              <label for="pos2">Shooting Guard</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.sf}
                onChange={this.handleSF}
                id="pos3"
              ></input>{" "}
              <label for="pos3">Small Forward</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.pf}
                onChange={this.handlePF}
                id="pos4"
              ></input>{" "}
              <label for="pos4">Power Forward</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.c}
                onChange={this.handleC}
                id="pos5"
              ></input>
              <label for="pos5">Center</label>
            </form>
          </div>
          <div className="col-md-2">
            <div style={{ paddingLeft: "30px" }}>
              <div
                style={{
                  color: "rgba(102, 252, 241, 0.8)",
                  textDecoration: "underline"
                }}
              >
                MPG
              </div>
              <form style={{ paddingLeft: "10px" }}>
                <input
                  type="checkbox"
                  checked={this.state.mpg1}
                  onChange={this.handleMPG1}
                  id="mpg1"
                ></input>{" "}
                <label for="mpg1">&#60; 15</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg2}
                  onChange={this.handleMPG2}
                  id="mpg2"
                ></input>{" "}
                <label for="mpg2">15-20</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg3}
                  onChange={this.handleMPG3}
                  id="mpg3"
                ></input>{" "}
                <label for="mpg3">20-25</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg4}
                  onChange={this.handleMPG4}
                  id="mpg4"
                ></input>{" "}
                <label for="mpg4">25-30</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg5}
                  onChange={this.handleMPG5}
                  id="mpg5"
                ></input>
                <label for="mpg5">30+</label>
              </form>
            </div>
          </div>
          <div className="col-md-2">
            <div
              style={{
                color: "rgba(102, 252, 241, 0.8)",
                textDecoration: "underline"
              }}
            >
              Experience
            </div>
            <form style={{ paddingLeft: "10px" }}>
              <input
                type="checkbox"
                checked={this.state.exp1}
                onChange={this.handleEXP1}
                id="exp1"
              ></input>{" "}
              <label for="exp1">Rookie</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.exp2}
                onChange={this.handleEXP2}
                id="exp2"
              ></input>{" "}
              <label for="exp2">1-3</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.exp3}
                onChange={this.handleEXP3}
                id="exp3"
              ></input>{" "}
              <label for="exp3">4-6</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.exp4}
                onChange={this.handleEXP4}
                id="exp4"
              ></input>{" "}
              <label for="exp4">7-10</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.exp5}
                onChange={this.handleEXP5}
                id="exp5"
              ></input>
              <label for="exp5">10+</label>
            </form>
          </div>
          <div className="col-md-2">
            <div
              style={{
                color: "rgba(102, 252, 241, 0.8)",
                textDecoration: "underline"
              }}
            >
              Age
            </div>
            <form style={{ paddingLeft: "10px" }}>
              <input
                type="checkbox"
                checked={this.state.age1}
                onChange={this.handleAGE1}
                id="age1"
              ></input>{" "}
              <label for="age1">&#60; 21</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.age2}
                onChange={this.handleAGE2}
                id="age2"
              ></input>{" "}
              <label for="age2">21-25</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.age3}
                onChange={this.handleAGE3}
                id="age3"
              ></input>{" "}
              <label for="age3">26-30</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.age4}
                onChange={this.handleAGE4}
                id="age4"
              ></input>{" "}
              <label for="age4">31-35</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.age5}
                onChange={this.handleAGE5}
                id="age5"
              ></input>
              <label for="age5">35+</label>
            </form>
          </div>
          <div className="col-md-2">
            <div
              style={{
                color: "rgba(102, 252, 241, 0.8)",
                textDecoration: "underline"
              }}
            >
              FA Type
            </div>
            <form style={{ paddingLeft: "10px" }}>
              <input
                type="checkbox"
                checked={this.state.type1}
                onChange={this.handleTYPE1}
                id="type1"
              ></input>{" "}
              <label for="type1">Unrestricted</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.type2}
                onChange={this.handleTYPE2}
                id="type2"
              ></input>{" "}
              <label for="type2">Restricted</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.type3}
                onChange={this.handleTYPE3}
                id="type3"
              ></input>
              <label for="type3">Player Option</label>
              <br />
              <input
                type="checkbox"
                checked={this.state.type4}
                onChange={this.handleTYPE4}
                id="type4"
              ></input>
              <label for="type4">Team Option</label>
            </form>
          </div>
        </div>
      );
    }
  }

  // getPlayer(name) {
  //   return axios
  //     .get(`/api/teams/getPlayer/${name}`)
  //     .then(data => {
  //       var player = data.data;
  //       return player;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    var headerStyle = {
      //height: "45px",
      //lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <div
          className="row"
          style={{ paddingTop: "40px", display: "flex", alignItems: "center" }}
        >
          <div className="col-lg-3 col-lg-offset-1 col-md-4">
            <div style={headerStyle}>Upcoming FAs</div>
          </div>
          <div className="col-lg-1 col-lg-offset-6">
            <div
              onClick={this.toggleFilter}
              style={{
                color: "rgba(102, 252, 241, 0.8)",
                textDecoration: "underline",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Filter
            </div>
          </div>
        </div>
        {this.renderFilter()}
        <div className="row" style={{ paddingTop: "15px" }}>
          <div className="col-lg-10 col-lg-offset-1 col-md-12">
            {this.renderPlayers()}
          </div>
        </div>
      </div>
    );
  }
}
