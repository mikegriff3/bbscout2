import React from "react";
import axios from "axios";
import PlayerScatter from "./nba-scouting-charts/PlayerScatter";

export default class NBAScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      original: [],
      playerContracts: [],
      teams: [],
      scatterXStat: "mpg",
      scatterYStat: "pts",
      showXMenu: false,
      showYMenu: false,
      showFilters: false,
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
      menuSelect: "Home"
    };
    this.getAllNbaPlayers = this.getAllNbaPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getAllContracts = this.getAllContracts.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
    this.handleXStatClick = this.handleXStatClick.bind(this);
    this.handleYStatClick = this.handleYStatClick.bind(this);
    this.renderXMenu = this.renderXMenu.bind(this);
    this.renderYMenu = this.renderYMenu.bind(this);
    this.selectXStat = this.selectXStat.bind(this);
    this.selectYStat = this.selectYStat.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
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
    this.filterPlayers = this.filterPlayers.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderScoutType = this.renderScoutType.bind(this);
    this.handleScoutMenuClick = this.handleScoutMenuClick.bind(this);
  }

  componentDidMount() {
    this.getAllNbaPlayers();
    this.getTeams();
    this.getAllContracts();
  }

  getAllContracts() {
    axios
      .get("/api/teams/getPlayerContracts")
      .then(data => {
        this.setState({ playerContracts: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllNbaPlayers() {
    axios
      .get("/api/teams/getAllNbaPlayers")
      .then(data => {
        //console.log(data.data);
        var filtered = data.data.filter(function(player) {
          return parseFloat(player.mpg) > 5;
        });
        //console.log(filtered);
        this.setState({ playerStats: filtered, original: filtered });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeams() {
    axios
      .get("/api/teams/getLeagueStats")
      .then(data => {
        this.setState({ teams: data.data }, () => {
          //console.log(this.state.teams);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderScoutType() {
    var statBox = {
      display: "inline-block",
      padding: "5px 20px",
      border: "1px solid rgba(102, 252, 241, 0.8)",
      color: "rgba(102, 252, 241, 0.7)",
      width: "140px",
      textAlign: "center",
      cursor: "pointer"
    };
    if (this.state.menuSelect === "Home") {
      return (
        <div className="scout">
          <div className="scout__scatter-chart-container">
            <PlayerScatter
              players={this.state.playerStats}
              xStat={this.state.scatterXStat}
              yStat={this.state.scatterYStat}
            />
          </div>
          <div
            className="row"
            style={{
              color: "white",
              paddingBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div className="col-sm-4 col-sm-offset-1">
              <div style={{ display: "inline-block", marginRight: "20px" }}>
                Y-Axis Stat:
              </div>
              <div style={{ positon: "relative", display: "inline-block" }}>
                <div style={statBox} onClick={this.handleYStatClick}>
                  {this.state.scatterYStat}
                  {"  "}
                  <span
                    style={{
                      fontSize: "8px",
                      marginLeft: "5px",
                      marginTop: "3px"
                    }}
                  >
                    &#9660;
                  </span>
                </div>
                {this.renderYMenu()}
              </div>
            </div>
            <div className="col-sm-4">
              <div style={{ display: "inline", marginRight: "20px" }}>
                X-Axis Stat:
              </div>
              <div style={{ positon: "relative", display: "inline-block" }}>
                <div style={statBox} onClick={this.handleXStatClick}>
                  {this.state.scatterXStat}
                  {"  "}
                  <span
                    style={{
                      fontSize: "8px",
                      marginLeft: "5px",
                      marginTop: "3px"
                    }}
                  >
                    &#9660;
                  </span>
                </div>
                {this.renderXMenu()}
              </div>
            </div>
            <div
              className="col-sm-1"
              onClick={this.handleFilterClick}
              style={{ cursor: "pointer" }}
            >
              Filters
            </div>
          </div>
          {this.renderFilters()}
        </div>
      );
    } else if (this.state.menuSelect === "Player Finder") {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            marginTop: "20px"
          }}
        >
          <div className="row">
            <div
              style={{
                color: "white",
                marginTop: "20px",
                marginLeft: "40px",
                fontSize: "20px"
              }}
            >
              Player Finder
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-sm-4">Selection Area</div>
            <div className="col-sm-8">Results Area</div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            marginTop: "20px"
          }}
        >
          Free Agency Here
        </div>
      );
    }
  }

  handleXStatClick(e) {
    //e.preventDefault();
    this.setState({ showXMenu: !this.state.showXMenu });
  }

  handleYStatClick(e) {
    //e.preventDefault();
    this.setState({ showYMenu: !this.state.showYMenu });
  }

  renderXMenu() {
    if (this.state.showXMenu) {
      return (
        <div
          style={{
            position: "absolute",
            top: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            height: "200px",
            overflowY: "auto",
            cursor: "pointer",
            zIndex: "1000"
          }}
        >
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            mpg
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            pts
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ast
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            tov
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            astPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            tovPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            usgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ftr
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fgm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fga
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            twoPt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            twoPtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            twoPtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ft
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fta
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            freeThrowPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            efgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            tsPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePAr
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            trb
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            orb
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            drb
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            orbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            drbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            trbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            stl
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            blk
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            stlPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            blkPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            pf
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            per
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ows
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            dws
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            bpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ws
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            obpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            dbpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            vorp
          </div>
        </div>
      );
    }
  }

  renderYMenu() {
    if (this.state.showYMenu) {
      return (
        <div
          style={{
            position: "absolute",
            top: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            height: "200px",
            overflowY: "auto",
            cursor: "pointer",
            zIndex: "1000"
          }}
        >
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            mpg
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            pts
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ast
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            tov
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            astPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            tovPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            usgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ftr
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fgm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fga
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            twoPt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            twoPtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            twoPtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ft
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fta
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            freeThrowPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            efgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            tsPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePAr
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            trb
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            orb
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            drb
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            orbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            drbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            trbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            stl
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            blk
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            stlPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            blkPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            pf
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            per
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ows
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            dws
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            bpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ws
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            obpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            dbpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            vorp
          </div>
        </div>
      );
    }
  }

  selectXStat(eventKey) {
    this.setState(
      {
        scatterXStat: eventKey.target.innerHTML,
        showXMenu: false
      },
      () => {
        console.log(this.state.scatterXStat);
      }
    );
  }

  selectYStat(eventKey) {
    this.setState(
      {
        scatterYStat: eventKey.target.innerHTML,
        showYMenu: false
      },
      () => {
        console.log(this.state.scatterYStat);
      }
    );
  }

  handleFilterClick() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  renderFilters() {
    if (this.state.showFilters) {
      return (
        <div>
          <div
            className="row"
            style={{ display: "flex", paddingBottom: "40px" }}
          >
            <div className="col-sm-3">
              <div className="filter-title">Position</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.pg}
                  onChange={this.handlePG}
                  id="pos1"
                  name="pos1"
                  value="PG"
                />
                <label for="pos1"> PG</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.sg}
                  onChange={this.handleSG}
                  id="pos2"
                  name="pos2"
                  value="SG"
                />
                <label for="pos2"> SG</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.sf}
                  onChange={this.handleSF}
                  id="pos3"
                  name="pos3"
                  value="SF"
                />
                <label for="pos3"> SF</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.pf}
                  onChange={this.handlePF}
                  id="pos4"
                  name="pos4"
                  value="PF"
                />
                <label for="pos4"> PF</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.c}
                  onChange={this.handleC}
                  id="pos5"
                  name="pos5"
                  value="C"
                />
                <label for="pos5"> C</label>
              </form>
            </div>
            <div className="col-sm-3">
              <div className="filter-title">Minutes Played</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.mpg1}
                  onChange={this.handleMPG1}
                  id="min1"
                  name="min1"
                  value="5-15"
                />
                <label for="min1"> 5-15</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg2}
                  onChange={this.handleMPG2}
                  id="min2"
                  name="min2"
                  value="15-20"
                />
                <label for="min2"> 15-20</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg3}
                  onChange={this.handleMPG3}
                  id="min3"
                  name="min3"
                  value="20-25"
                />
                <label for="min3"> 20-25</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg4}
                  onChange={this.handleMPG4}
                  id="min4"
                  name="min4"
                  value="25-30"
                />
                <label for="min4"> 25-30</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg5}
                  onChange={this.handleMPG5}
                  id="min5"
                  name="min5"
                  value="30+"
                />
                <label for="min5"> 30+</label>
              </form>
            </div>
            <div className="col-sm-3">
              <div className="filter-title">Age</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.age1}
                  onChange={this.handleAGE1}
                  id="age1"
                  name="age1"
                  value="< 21"
                />
                <label for="age1"> &#60; 21</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age2}
                  onChange={this.handleAGE2}
                  id="age2"
                  name="age2"
                  value="21-25"
                />
                <label for="age2"> 21-25</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age3}
                  onChange={this.handleAGE3}
                  id="age3"
                  name="age3"
                  value="26-30"
                />
                <label for="age3"> 26-30</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age4}
                  onChange={this.handleAGE4}
                  id="age4"
                  name="age4"
                  value="31-35"
                />
                <label for="age4"> 31-35</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age5}
                  onChange={this.handleAGE5}
                  id="age5"
                  name="age5"
                  value="35+"
                />
                <label for="age5"> 35+</label>
              </form>
            </div>
            <div className="col-sm-3">
              <div className="filter-title">Experience</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.exp1}
                  onChange={this.handleEXP1}
                  id="exp1"
                  name="exp1"
                  value="< 21"
                />
                <label for="exp1"> Rookie</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp2}
                  onChange={this.handleEXP2}
                  id="exp2"
                  name="exp2"
                  value="21-25"
                />
                <label for="exp2"> 1-3</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp3}
                  onChange={this.handleEXP3}
                  id="exp3"
                  name="exp3"
                  value="26-30"
                />
                <label for="exp3"> 4-6</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp4}
                  onChange={this.handleEXP4}
                  id="exp4"
                  name="exp4"
                  value="31-35"
                />
                <label for="exp4"> 7-10</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp5}
                  onChange={this.handleEXP5}
                  id="exp5"
                  name="exp5"
                  value="35+"
                />
                <label for="exp5"> 10+</label>
              </form>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "40px" }}>
            <div
              className="col-sm-8 col-sm-offset-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                onClick={this.handleRefresh}
                style={{
                  padding: "5px 20px",
                  border: "1px solid rgba(102, 252, 241, 0.8)",
                  color: "rgba(102, 252, 241, 0.7)",
                  width: "200px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
              >
                Refresh
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  handlePG(evt) {
    this.setState({ pg: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleSG(evt) {
    this.setState({ sg: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleSF(evt) {
    this.setState({ sf: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlePF(evt) {
    this.setState({ pf: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleC(evt) {
    this.setState({ c: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleMPG1(evt) {
    this.setState({ mpg1: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleMPG2(evt) {
    this.setState({ mpg2: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleMPG3(evt) {
    this.setState({ mpg3: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleMPG4(evt) {
    this.setState({ mpg4: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleMPG5(evt) {
    this.setState({ mpg5: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleEXP1(evt) {
    this.setState({ exp1: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleEXP2(evt) {
    this.setState({ exp2: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleEXP3(evt) {
    this.setState({ exp3: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleEXP4(evt) {
    this.setState({ exp4: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleEXP5(evt) {
    this.setState({ exp5: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleAGE1(evt) {
    this.setState({ age1: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleAGE2(evt) {
    this.setState({ age2: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleAGE3(evt) {
    this.setState({ age3: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleAGE4(evt) {
    this.setState({ age4: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }
  handleAGE5(evt) {
    this.setState({ age5: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handleScoutMenuClick(evt) {
    this.setState({ menuSelect: evt.target.innerHTML });
  }

  filterPlayers() {
    let playersArr = this.state.playerStats;

    if (!this.state.pg) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "PG";
      });
    }

    if (!this.state.sg) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "SG";
      });
    }

    if (!this.state.sf) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "SF";
      });
    }

    if (!this.state.pf) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "PF";
      });
    }

    if (!this.state.c) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "C";
      });
    }

    if (!this.state.mpg1) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg >= 15.0;
      });
    }
    if (!this.state.mpg2) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 15.0 || player.mpg >= 20.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg3) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 20.0 || player.mpg >= 25.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg4) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 25.0 || player.mpg >= 30.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg5) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg < 30.0;
      });
    }

    if (!this.state.exp1) {
      playersArr = playersArr.filter(function(player) {
        return player.experience !== "R";
      });
    }
    if (!this.state.exp2) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience > 3) {
          return player;
        }
      });
    }
    if (!this.state.exp3) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 4 ||
          player.experience > 6
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp4) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 7 ||
          player.experience > 10
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp5) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience < 11) {
          return player;
        }
      });
    }

    if (!this.state.age1) {
      playersArr = playersArr.filter(function(player) {
        return player.age >= 21;
      });
    }
    if (!this.state.age2) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 21 || player.age > 25.0) {
          return player;
        }
      });
    }
    if (!this.state.age3) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 26 || player.age > 30) {
          return player;
        }
      });
    }
    if (!this.state.age4) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 31 || player.age > 35) {
          return player;
        }
      });
    }
    if (!this.state.age5) {
      playersArr = playersArr.filter(function(player) {
        return player.age < 35;
      });
    }
    this.setState({ playerStats: playersArr }, () => {
      console.log("Filtered: ", this.state.playerStats);
    });
  }

  handleRefresh() {
    this.setState({
      playerStats: this.state.original,
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
      age5: true
    });
  }

  checkLoad() {
    var headerStyle = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white"
    };
    var headerStyle2 = {
      backgroundImage:
        "linear-gradient(to right, rgba(210, 255, 77, 0) 0.15%, rgba(210, 255, 77, 0.8) 40%, rgba(210, 255, 77, 0))",
      color: "white",
      cursor: "pointer"
    };
    if (this.state.playerStats.length > 0) {
      return (
        <div>
          <div className="scout__header-container">
            <div style={headerStyle} className="scout__header">
              NBA Scouting
            </div>
            <div
              className="scout__menu-item"
              onClick={this.handleScoutMenuClick}
            >
              Home
            </div>
            <div
              className="scout__menu-item"
              onClick={this.handleScoutMenuClick}
            >
              Player Finder
            </div>
            <div
              className="scout__menu-item"
              onClick={this.handleScoutMenuClick}
            >
              Free Agents
            </div>
          </div>
          {this.renderScoutType()}
          {/*<div className="player-comp">
            <div style={headerStyle2} className="player-comp__header">
              Player Comparison
            </div>
            <div className="playerOne">
              <div>
                <img
                  className="player-comp__picture"
                  src={
                    "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
                  }
                />
              </div>
              <div className="player-comp__name">PLAYER ONE</div>
              <div className="player-comp__info">
                <span className="player-comp__info-stat">
                  Height: <span className="player-comp__info-text">height</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Weight: <span className="player-comp__info-text">weight</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Age: <span className="player-comp__info-text">age</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Exp: <span className="player-comp__info-text">exp</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Team: <span className="player-comp__info-text">team</span>
                </span>
              </div>
            </div>
            <div className="playerTwo">
              <div>
                <img
                  className="player-comp__picture"
                  src={
                    "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
                  }
                />
              </div>
              <div className="player-comp__name">PLAYER TWO</div>
              <div className="player-comp__info">
                <span className="player-comp__info-stat">
                  Height: <span className="player-comp__info-text">height</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Weight: <span className="player-comp__info-text">weight</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Age: <span className="player-comp__info-text">age</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Exp: <span className="player-comp__info-text">exp</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Team: <span className="player-comp__info-text">team</span>
                </span>
              </div>
            </div>
                </div>*/}
        </div>
      );
    } else {
      return (
        <div className="loading-gif">
          <img
            className="gif"
            src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
          />
          <div className="load-text">Loading Players...</div>
        </div>
      );
    }
  }

  render() {
    return <div className="scouting-container">{this.checkLoad()}</div>;
  }
}
