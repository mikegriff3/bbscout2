import React from "react";
import axios from "axios";
import PlayerScatter from "./nba-scouting-charts/PlayerScatter";

export default class NBAScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      playerContracts: [],
      teams: []
    };
    this.getAllNbaPlayers = this.getAllNbaPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getAllContracts = this.getAllContracts.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
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
        this.setState({ playerStats: filtered });
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
            <div className="scout__menu-item">Home</div>
            <div className="scout__menu-item">League Leaders</div>
            <div className="scout__menu-item">Free Agents</div>
          </div>
          <div className="scout">
            <div className="scout__scatter-chart-container">
              <PlayerScatter players={this.state.playerStats} />
            </div>
          </div>
          <div className="player-comp">
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
          </div>
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
