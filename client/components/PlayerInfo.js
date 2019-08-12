import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PlayerRatings from "./PlayerRatings";
import RankGauges from "./player-charts/RankGauges";
import OffBar from "./player-charts/OffBar";
import DefBar from "./player-charts/DefBar";
import OvrBar from "./player-charts/OvrBar";

const mapStateToProps = state => {
  return {
    players: state.playersReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlayers(players) {
      dispatch({
        type: "ADD_PLAYERS",
        payload: players
      });
    }
  };
};

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [],
      id: this.props.props.match.params.id,
      player: {},
      colors: {},
      contract: {},
      prHandler: {},
      prRollMan: {},
      iso: {},
      hustle: {},
      transition: {},
      selection: "Player Ratings",
      showMenu: false,
      statCat: "Basic",
      barSelect: "Offense"
    };
    this.getPlayer = this.getPlayer.bind(this);
    this.getTeamColors = this.getTeamColors.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.getPostStats = this.getPostStats.bind(this);
    this.getCatchShootStats = this.getCatchShootStats.bind(this);
    this.getSpeedDistanceStats = this.getSpeedDistanceStats.bind(this);
    this.getShootingStats = this.getShootingStats.bind(this);
    this.getPositionStats = this.getPositionStats.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.getContract = this.getContract.bind(this);
    this.getPRHandler = this.getPRHandler.bind(this);
    this.getPRRollMan = this.getPRRollMan.bind(this);
    this.getIso = this.getIso.bind(this);
    this.getHustleStats = this.getHustleStats.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
    this.renderRankGauges = this.renderRankGauges.bind(this);
    this.renderBarChart = this.renderBarChart.bind(this);
  }

  componentDidMount() {
    this.getPlayer();
  }

  getPlayer() {
    axios
      .get(`/api/teams/getPlayerProfile/${this.state.id}`)
      .then(data => {
        this.setState({ player: data.data }, () => {});
        this.getTeamColors(data.data.team);
        this.getPositionStats(data.data.position);
        this.getPostStats(data.data.name);
        this.getCatchShootStats(data.data.name);
        this.getSpeedDistanceStats(data.data.name);
        this.getShootingStats(data.data.name);
        this.getPRHandler(data.data.name);
        this.getPRRollMan(data.data.name);
        this.getIso(data.data.name);
        this.getHustleStats(data.data.name);
        this.getTransition(data.data.name);
        this.getContract(data.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectMenu() {
    this.setState({ showMenu: !this.state.showMenu }, () => {
      console.log(this.state.showMenu);
    });
  }

  selectStatCat(evt, eventKey) {
    this.setState({ statCat: eventKey.target.innerHTML });
  }

  renderMenu() {
    if (this.state.showMenu) {
      return (
        <div className="menu-option">
          {/*<div onClick={this.handleClick}>Season Stats</div>
          <div onClick={this.handleClick}>Career Stats</div>
          <div onClick={this.handleClick}>Player Ratings</div>
          <div onClick={this.handleClick}>Player Projection</div>
          <div onClick={this.handleClick}>Player Comparison</div>
          <div onClick={this.handleClick}>Shot Chart</div>
      <div onClick={this.handleClick}>Contract</div>*/}
        </div>
      );
    }
  }

  handleClick(event) {
    this.setState({
      selection: event.currentTarget.textContent,
      showMenu: !this.state.showMenu
    });
  }

  renderSelection() {
    if (this.state.selection === "Player Ratings") {
      return (
        <PlayerRatings
          player={this.state.player}
          colors={this.state.colors}
          postStats={this.state.postStats}
          catchShootStats={this.state.catchShootStats}
          shootingStats={this.state.shootingStats}
          speedDistanceStats={this.state.speedDistanceStats}
          prHandler={this.state.prHandler}
          prRollMan={this.state.prRollMan}
          iso={this.state.iso}
          transition={this.state.transition}
          hustle={this.state.hustle}
        />
      );
    } else if (this.state.selection === "Contract") {
      return (
        <PlayerContract
          player={this.state.player}
          contract={this.state.contract}
          colors={this.state.colors}
        />
      );
    } else if (this.state.selection === "Season Stats") {
      return (
        <PlayerSeasonStats
          player={this.state.player}
          colors={this.state.colors}
        />
      );
    } else if (this.state.selection === "Career Stats") {
      return <CareerProgression colors={this.state.colors} />;
    }
  }

  getPositionStats(position) {
    axios
      .get("/api/teams/getPositionStats", {
        params: {
          position: position
        }
      })
      .then(data => {
        this.setState({ positionStats: data.data }, () => {
          //console.log(this.state.positionStats);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getContract(name) {
    axios.get(`/api/teams/getPlayerContract/${name}`).then(data => {
      this.setState({ contract: data.data });
    });
  }

  getPRHandler(name) {
    axios.get(`/api/teams/getPRHandler/${name}`).then(data => {
      this.setState({ prHandler: data.data });
    });
  }

  getPRRollMan(name) {
    axios.get(`/api/teams/getPRRollMan/${name}`).then(data => {
      this.setState({ prRollMan: data.data });
    });
  }

  getIso(name) {
    axios.get(`/api/teams/getIso/${name}`).then(data => {
      this.setState({ iso: data.data });
    });
  }

  getTransition(name) {
    axios.get(`/api/teams/getTransition/${name}`).then(data => {
      this.setState({ transition: data.data });
    });
  }

  getPostStats(name) {
    axios.get(`/api/teams/getPostStats/${name}`).then(data => {
      this.setState({ postStats: data.data });
    });
  }

  getHustleStats(name) {
    axios.get(`/api/teams/getHustleStats/${name}`).then(data => {
      this.setState({ hustle: data.data });
    });
  }

  getCatchShootStats(name) {
    axios.get(`/api/teams/getCatchShootStats/${name}`).then(data => {
      this.setState({ catchShootStats: data.data });
    });
  }

  getSpeedDistanceStats(name) {
    axios.get(`/api/teams/getSpeedDistanceStats/${name}`).then(data => {
      this.setState({ speedDistanceStats: data.data });
    });
  }

  getShootingStats(name) {
    axios.get(`/api/teams/getShootingStats/${name}`).then(data => {
      this.setState({ shootingStats: data.data });
    });
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getTeamColors/${team}`)
      .then(data => {
        this.setState({ colors: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOffenseRating() {
    if (this.state.player) {
      var obpm = parseFloat(this.state.player.obpm);
      var ows = parseFloat(this.state.player.ows);
      var offRating = obpm + ows;
      var grade = this.getGrade(13.0, -5.0, offRating);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">80</span>
          </button>
        );
      }
      if (grade.Grade === 75) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">75</span>
          </button>
        );
      }
      if (grade.Grade === 70) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">70</span>
          </button>
        );
      }
      if (grade.Grade === 65) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">65</span>
          </button>
        );
      }
      if (grade.Grade === 60) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">60</span>
          </button>
        );
      }
      if (grade.Grade === 55) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">55</span>
          </button>
        );
      }
      if (grade.Grade === 50) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">50</span>
          </button>
        );
      }
      if (grade.Grade === 45) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">45</span>
          </button>
        );
      }
      if (grade.Grade === 40) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">40</span>
          </button>
        );
      }
      if (grade.Grade === 35) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">35</span>
          </button>
        );
      }
      if (grade.Grade === 30) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">30</span>
          </button>
        );
      }
      if (grade.Grade === 25) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">25</span>
          </button>
        );
      }
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  getDefenseRating() {
    if (this.state.player) {
      var dbpm = parseFloat(this.state.player.dbpm);
      var dws = parseFloat(this.state.player.dws);
      var defRating = dbpm + dws;
      var grade = this.getGrade(6.5, -3.0, defRating);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">80</span>
          </button>
        );
      }
      if (grade.Grade === 75) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">75</span>
          </button>
        );
      }
      if (grade.Grade === 70) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">70</span>
          </button>
        );
      }
      if (grade.Grade === 65) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">65</span>
          </button>
        );
      }
      if (grade.Grade === 60) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">60</span>
          </button>
        );
      }
      if (grade.Grade === 55) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">55</span>
          </button>
        );
      }
      if (grade.Grade === 50) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">50</span>
          </button>
        );
      }
      if (grade.Grade === 45) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">45</span>
          </button>
        );
      }
      if (grade.Grade === 40) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">40</span>
          </button>
        );
      }
      if (grade.Grade === 35) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">35</span>
          </button>
        );
      }
      if (grade.Grade === 30) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">30</span>
          </button>
        );
      }
      if (grade.Grade === 25) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">25</span>
          </button>
        );
      }
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  getOverallRating() {
    if (this.state.player) {
      var per = parseFloat(this.state.player.per) * 0.4;
      var bpm = parseFloat(this.state.player.bpm) * 0.2;
      var ws48 = parseFloat(this.state.player.wsFourtyEight) * 0.1;
      var ws = parseFloat(this.state.player.ws) * 0.1;
      var vorp = parseFloat(this.state.player.vorp) * 0.25;
      var weightedOvr = per + bpm + ws48 + ws + vorp;
      var grade = this.getGrade(14.0, 0, weightedOvr);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">80</span>
          </button>
        );
      }
      if (grade.Grade === 75) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">75</span>
          </button>
        );
      }
      if (grade.Grade === 70) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">70</span>
          </button>
        );
      }
      if (grade.Grade === 65) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">65</span>
          </button>
        );
      }
      if (grade.Grade === 60) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">60</span>
          </button>
        );
      }
      if (grade.Grade === 55) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">55</span>
          </button>
        );
      }
      if (grade.Grade === 50) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">50</span>
          </button>
        );
      }
      if (grade.Grade === 45) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">45</span>
          </button>
        );
      }
      if (grade.Grade === 40) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">40</span>
          </button>
        );
      }
      if (grade.Grade === 35) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">35</span>
          </button>
        );
      }
      if (grade.Grade === 30) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">30</span>
          </button>
        );
      }
      if (grade.Grade === 25) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="player__ratings-oversight-button"
          >
            <span className="player__ratings-rating">25</span>
          </button>
        );
      }
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  renderRankGauges() {
    if (this.state.positionStats && this.state.player) {
      return (
        <RankGauges
          player={this.state.player}
          positionStats={this.state.positionStats}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  renderBarChart() {
    if (this.state.barSelect === "Offense") {
      return <OffBar player={this.state.player} />;
    } else if (this.state.barSelect === "Defense") {
      return <DefBar player={this.state.player} />;
    }
    // } else if (this.props.statCat === "Overall") {
    //   return <PlayerOvrBarRatings player={this.props.player} />;
    // } else if (this.props.statCat === "Catch/Shoot") {
    //   return <PlayerCatchShootBarRatings player={this.props.catchShootStats} />;
    // }
  }

  getGrade(high, min, actual) {
    var playerGrade = {};
    var gradeSlots = 13;
    var adjusted = high - min;
    var gradeScale = adjusted / gradeSlots;

    var eighty = high - gradeScale;
    var sevenFive = eighty - gradeScale;
    var seventy = sevenFive - gradeScale;
    var sixFive = seventy - gradeScale;
    var sixty = sixFive - gradeScale;
    var fiveFive = sixty - gradeScale;
    var fifty = fiveFive - gradeScale;
    var fourFive = fifty - gradeScale;
    var fourty = fourFive - gradeScale;
    var threeFive = fourty - gradeScale;
    var thirty = threeFive - gradeScale;
    var twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade["Grade"] = 80;
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
    } else {
      playerGrade["Grade"] = 20;
    }
    return playerGrade;
  }

  renderPlayer() {
    if (this.state.player) {
      if (this.state.selection === "Player Ratings") {
        return (
          <PlayerRatingsSub
            player={this.state.player}
            colors={this.state.colors}
            positionStats={this.state.positionStats}
            statCat={this.state.statCat}
          />
        );
      }
    } else {
      return null;
    }
  }

  checkLoad() {
    var overallButton = {
      backgroundImage:
        "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
    };
    var headerStyle = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white",
      cursor: "pointer"
    };
    var nameStyle = {
      color: this.state.colors.Color_Main || "red",
      fontFamily: "serif"
    };
    var picture;
    if (this.state.player.picture) {
      picture = this.state.player.picture;
    } else {
      picture =
        "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png";
    }
    if (JSON.stringify(this.state.colors) != "{}") {
      return (
        <div>
          <div className="player">
            <div className="player__card">
              <div className="player__picture-container">
                <img
                  src={picture}
                  alt="Player picture"
                  className="player__picture"
                />
              </div>
              <div className="player__info">
                <div className="player__info-name">
                  <span className="player__info-name-text">
                    {this.state.player.name.toUpperCase()}
                  </span>
                  <span style={{ paddingLeft: "1rem", fontSize: "1.8rem" }}>
                    {this.state.player.position}
                  </span>
                </div>
                <div className="player__info-text">
                  <span className="player__info-stat-title">
                    Height:{" "}
                    <span className="player__info-stat-text">
                      {this.state.player.height}
                    </span>
                  </span>
                  <span
                    style={{ paddingLeft: "1rem" }}
                    className="player__info-stat-title"
                  >
                    Weight:{" "}
                    <span className="player__info-stat-text">
                      {this.state.player.weight}
                    </span>
                  </span>
                </div>
                <div className="player__info-text">
                  <span className="player__info-stat-title">
                    Age:{" "}
                    <span className="player__info-stat-text">
                      {this.state.player.age}
                    </span>
                  </span>
                  <span
                    style={{ paddingLeft: "1rem" }}
                    className="player__info-stat-title"
                  >
                    Exp:{" "}
                    <span className="player__info-stat-text">
                      {this.state.player.experience}
                    </span>
                  </span>
                </div>
                <div className="player__info-text">
                  <span className="player__info-stat-title">
                    Team:{" "}
                    <span className="player__info-stat-text">
                      <a
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        href={`/team/${this.state.colors.id}`}
                      >
                        {this.state.player.team}
                      </a>
                    </span>
                  </span>
                </div>
                <div className="player__info-text">
                  <span className="player__info-stat-title">
                    College:{" "}
                    <span className="player__info-stat-text">
                      {this.state.player.college}
                    </span>
                  </span>
                </div>
                <div className="player__info-text">
                  <span className="player__info-stat-title">
                    Draft:{" "}
                    <span className="player__info-stat-text">
                      {this.state.player.draft || "Unavailable"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="player__stats">
              <div className="player__menu-container">
                <div
                  style={headerStyle}
                  className="player__menu"
                  onClick={this.handleClick}
                >
                  {this.state.selection}
                  {this.renderMenu()}
                </div>
              </div>
              <div className="player__charts">{this.renderSelection()}</div>
              <div className="player__ratings">
                <div className="player__ratings-oversight-container">
                  <div>
                    <div style={{ paddingLeft: ".6rem" }}>Overall</div>
                    {this.getOverallRating()}
                  </div>
                  <div>
                    <div style={{ paddingLeft: ".6rem" }}>Offense</div>
                    {this.getOffenseRating()}
                  </div>
                  <div>
                    <div style={{ paddingLeft: ".6rem" }}>Defense</div>
                    {this.getDefenseRating()}
                  </div>
                </div>
                <div className="player__stat-overview">
                  <div className="stat-box">
                    <span className="stat-title">PPG</span>
                    <span className="stat-text">
                      {this.state.player.pts || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">RPG</span>
                    <span className="stat-text">
                      {this.state.player.trb || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">APG</span>
                    <span className="stat-text">
                      {this.state.player.ast || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">GP</span>
                    <span className="stat-text">
                      {this.state.player.gamesPlayed || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">MPG</span>
                    <span className="stat-text">
                      {this.state.player.mpg || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">PER</span>
                    <span className="stat-text">
                      {this.state.player.per || 0}
                    </span>
                  </div>
                </div>
                <div className="team-image-box">
                  <img src={this.state.colors.Logo} className="team-image" />
                </div>
              </div>
            </div>
          </div>
          <div className="player-sub-ratings">
            {this.renderRankGauges()}
            <div className="player__bar-container">
              <div className="extended-bar-menu">
                <div className="extended-header">Extended Stats</div>
                <div className="extended-selector">Offense</div>
                <div className="extended-selector">Defense</div>
                <div className="extended-selector">Overall</div>
                <div className="extended-selector">Shooting</div>
                <div className="extended-selector">Hustle/Transition</div>
              </div>
              {this.renderBarChart()}
            </div>
          </div>
          {/*<div className="player-progression-main">
            <div className="player-progression-menu">
              <div>Career Progression</div>
              <div>Stat Selection</div>
            </div>
      </div>*/}
        </div>
      );
    } else {
      return (
        <div>
          <img src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif" />
          <div>Loading Player...</div>
        </div>
      );
    }
  }

  render() {
    return <div className="player-container">{this.checkLoad()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerInfo);
