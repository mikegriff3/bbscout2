import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PlayerRatings2 from "./PlayerRatings2";
import PlayerContract from "./PlayerContract";
import PlayerSeasonStats from "./PlayerSeasonStats";
import PlayerCareerStats from "./PlayerCareerStats";
import RankGauges from "./player-charts/RankGauges";
import OffBar from "./player-charts/OffBar";
import DefBar from "./player-charts/DefBar";
import OvrBar from "./player-charts/OvrBar";
import CareerProgression from "./player-charts/CareerProgression";
import PlayerFullStats from "./PlayerFullStats";

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

class PlayerInfo2 extends React.Component {
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
      barSelect: "Offense",
      progStat: "Ovr/Off/Def",
      showProgMenu: false,
      stats: [],
      progMax: 130,
      progMin: 0,
      progTick: 10
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
    this.setBar = this.setBar.bind(this);
    this.getCareerStats = this.getCareerStats.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleProgClick = this.handleProgClick.bind(this);
    this.renderProgMenu = this.renderProgMenu.bind(this);
    this.selectProgStat = this.selectProgStat.bind(this);
  }

  componentDidMount() {
    //this.setState({ stats: [...this.state.stats, this.props.player] });
    this.getPlayer();
  }

  getPlayer() {
    axios
      .get(`/api/teams/getPlayerProfile/${this.state.id}`)
      .then(data => {
        this.setState(
          { player: data.data, stats: [...this.state.stats, data.data] },
          () => {}
        );
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
        this.getCareerStats(data.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCareerStats(name) {
    axios
      .get(`/api/teams/getCareerStats/${name}`)
      .then(data => {
        this.setState({ stats: [...data.data, ...this.state.stats] }); //...this.state.stats
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleProgClick(event) {
    event.preventDefault();
    this.setState({ showProgMenu: !this.state.showProgMenu }, () => {
      console.log("Progmenu: ", this.state.showProgMenu);
    });
  }

  renderProgMenu(event) {
    if (this.state.showProgMenu) {
      return (
        <div className="prog-stat-menu">
          <div
            onClick={e => this.selectProgStat(e, 130, 0, 10)}
            className="prog-stat-option"
          >
            Ovr/Off/Def
          </div>
          <div
            onClick={e => this.selectProgStat(e, 130, 0, 10)}
            className="prog-stat-option"
          >
            Overall
          </div>
          <div
            onClick={e => this.selectProgStat(e, 130, 0, 10)}
            className="prog-stat-option"
          >
            Offense
          </div>
          <div
            onClick={e => this.selectProgStat(e, 130, 0, 10)}
            className="prog-stat-option"
          >
            Defense
          </div>
          <div
            onClick={e => this.selectProgStat(e, 40, 0, 5)}
            className="prog-stat-option"
          >
            pts
          </div>
          <div
            onClick={e => this.selectProgStat(e, 15, 0, 1)}
            className="prog-stat-option"
          >
            ast
          </div>
          <div
            onClick={e => this.selectProgStat(e, 10, 0, 1)}
            className="prog-stat-option"
          >
            tov
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0, 60, 5)}
            className="prog-stat-option"
          >
            astPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0, 20, 2)}
            className="prog-stat-option"
          >
            tovPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 50, 0, 5)}
            className="prog-stat-option"
          >
            usgPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.8, 0, 0.1)}
            className="prog-stat-option"
          >
            ftr
          </div>
          <div
            onClick={e => this.selectProgStat(e, 15, 0, 1)}
            className="prog-stat-option"
          >
            fgm
          </div>
          <div
            onClick={e => this.selectProgStat(e, 30, 0, 5)}
            className="prog-stat-option"
          >
            fga
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.8, 0, 0.1)}
            className="prog-stat-option"
          >
            fgPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 8, 0, 1)}
            className="prog-stat-option"
          >
            threePt
          </div>
          <div
            onClick={e => this.selectProgStat(e, 16, 0, 2)}
            className="prog-stat-option"
          >
            threePtAtt
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.6, 0, 0.05)}
            className="prog-stat-option"
          >
            threePtPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 12, 0, 1)}
            className="prog-stat-option"
          >
            twoPt
          </div>
          <div
            onClick={e => this.selectProgStat(e, 18, 0, 2)}
            className="prog-stat-option"
          >
            twoPtAtt
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.8, 0, 0.1)}
            className="prog-stat-option"
          >
            twoPtPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 12, 0, 1)}
            className="prog-stat-option"
          >
            ft
          </div>
          <div
            onClick={e => this.selectProgStat(e, 14, 0, 2)}
            className="prog-stat-option"
          >
            fta
          </div>
          <div
            onClick={e => this.selectProgStat(e, 1, 0, 0.1)}
            className="prog-stat-option"
          >
            freeThrowPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.8, 0, 0.1)}
            className="prog-stat-option"
          >
            efgPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.8, 0, 0.1)}
            className="prog-stat-option"
          >
            tsPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 0.7, 0, 0.1)}
            className="prog-stat-option"
          >
            threePAr
          </div>
          <div
            onClick={e => this.selectProgStat(e, 16, 0, 2)}
            className="prog-stat-option"
          >
            trb
          </div>
          <div
            onClick={e => this.selectProgStat(e, 10, 0, 1)}
            className="prog-stat-option"
          >
            orb
          </div>
          <div
            onClick={e => this.selectProgStat(e, 14, 0, 2)}
            className="prog-stat-option"
          >
            drb
          </div>
          <div
            onClick={e => this.selectProgStat(e, 16, 0, 2)}
            className="prog-stat-option"
          >
            orbPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 40, 0, 2)}
            className="prog-stat-option"
          >
            drbPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 30, 0, 3)}
            className="prog-stat-option"
          >
            trbPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 3.5, 0, 0.5)}
            className="prog-stat-option"
          >
            stl
          </div>
          <div
            onClick={e => this.selectProgStat(e, 4, 0, 0.5)}
            className="prog-stat-option"
          >
            blk
          </div>
          <div
            onClick={e => this.selectProgStat(e, 4.5, 0, 0.5)}
            className="prog-stat-option"
          >
            stlPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 7, 0, 1)}
            className="prog-stat-option"
          >
            blkPct
          </div>
          <div
            onClick={e => this.selectProgStat(e, 42, 0, 3)}
            className="prog-stat-option"
          >
            mpg
          </div>
          <div
            onClick={e => this.selectProgStat(e, 6, 0, 1)}
            className="prog-stat-option"
          >
            pf
          </div>
          <div
            onClick={e => this.selectProgStat(e, 36, 0, 3)}
            className="prog-stat-option"
          >
            per
          </div>
          <div
            onClick={e => this.selectProgStat(e, 16, 0, 2)}
            className="prog-stat-option"
          >
            ows
          </div>
          <div
            onClick={e => this.selectProgStat(e, 8, 0, 1)}
            className="prog-stat-option"
          >
            dws
          </div>
          <div
            onClick={e => this.selectProgStat(e, 14, 0, 2)}
            className="prog-stat-option"
          >
            bpm
          </div>
          <div
            onClick={e => this.selectProgStat(e, 21, 0, 3)}
            className="prog-stat-option"
          >
            ws
          </div>
          <div
            onClick={e => this.selectProgStat(e, 10, 0, 1)}
            className="prog-stat-option"
          >
            obpm
          </div>
          <div
            onClick={e => this.selectProgStat(e, 6, -5, 1)}
            className="prog-stat-option"
          >
            dbpm
          </div>
          {/*<div
            onClick={e => this.selectProgStat(e, 0.5, -0.5, 0.1)}
            className="prog-stat-option"
          >
            wsFortyEight
      </div>*/}
          <div
            onClick={e => this.selectProgStat(e, 10, -5, 1)}
            className="prog-stat-option"
          >
            vorp
          </div>
        </div>
      );
    }
  }

  selectProgStat(eventKey, progMax, progMin, tickInterval) {
    this.setState({
      progStat: eventKey.target.innerHTML,
      showProgMenu: false,
      progMax: progMax,
      progMin: progMin,
      progTick: tickInterval
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
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Season Stats
          </div>
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Career Stats
          </div>
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Player Ratings
          </div>
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Contract
          </div>
        </div>
      );
    }
  }

  handleMenuClick(event) {
    this.setState({
      selection: event.currentTarget.textContent,
      showMenu: false
    });
  }

  handleClick(event) {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  setBar(event) {
    this.setState({
      barSelect: event.currentTarget.textContent
    });
  }

  renderSelection() {
    if (this.state.selection === "Player Ratings") {
      return (
        <PlayerRatings2
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
      return <PlayerSeasonStats player={this.state.player} />;
    } else if (this.state.selection === "Career Stats") {
      return <PlayerCareerStats seasons={this.state.stats} />;
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
      return <DefBar player={this.state.player} hustle={this.state.hustle} />;
    } else if (this.props.statCat === "Overall") {
      return <OvrBar player={this.state.player} />;
    } else if (this.props.statCat === "Shooting") {
      return (
        <ShootingBar
          catch={this.state.catchShootStats}
          player={this.state.player}
          shooting={this.state.shootingStats}
        />
      );
    } else if (this.props.statCat === "Hustle/Transition") {
      return (
        <HustleBar
          transition={this.state.transition}
          hustle={this.state.hustle}
        />
      );
    }
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
    var headerStyle3 = {
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
        <div className="container-fluid">
          <div
            className="row player-row"
            style={{
              minHeight: "calc(96vh - 4rem)",
              backgroundColor: "rgba(0,0,0,0.7)"
              //display: "flex"
            }}
          >
            <div className="player-card col-sm-4 col-xs-12">
              <div
                className="player-pic-container"
                style={{
                  height: "auto",
                  width: "65%",
                  marginBottom: "4rem"
                }}
              >
                <img
                  src={picture}
                  alt="Player picture"
                  className="img-responsive"
                />
              </div>
              <div className="player-info">
                <div>
                  <span className="player-info-name-text">
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
                      {this.state.player.college || "None"}
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
            <div className="player-stats col-sm-8 col-xs-12">
              <div className="player__menu-container">
                <div
                  style={headerStyle}
                  className="player__menu"
                  onClick={this.handleClick}
                >
                  <div>
                    {this.state.selection}{" "}
                    <span style={{ fontSize: "10px" }}>&#9660;</span>
                  </div>
                </div>
                {this.renderMenu()}
              </div>
              <div
                className="player-graph-row row"
                style={{ paddingTop: "2rem" }}
              >
                <div className="player-charts">{this.renderSelection()}</div>
              </div>
              <div
                className="player-rating-row row"
                style={{
                  marginTop: "3rem",
                  //display: "flex",
                  alignItems: "center",
                  height: "170px"
                }}
              >
                <div
                  className="player-ratings-oversight-container col-sm-5 col-xs-12"
                  style={{
                    paddingBottom: "1.5rem",
                    textTransform: "uppercase",
                    color: "grey",
                    fontSize: "1.4rem",
                    height: "100%"
                  }}
                >
                  <div className="rating-bar">
                    <div style={{ paddingLeft: ".6rem" }}>Overall</div>
                    {this.getOverallRating()}
                  </div>
                  <div className="rating-bar">
                    <div style={{ paddingLeft: ".6rem" }}>Offense</div>
                    {this.getOffenseRating()}
                  </div>
                  <div className="rating-bar">
                    <div style={{ paddingLeft: ".6rem" }}>Defense</div>
                    {this.getDefenseRating()}
                  </div>
                </div>
                <div
                  className="player__stat-overview col-sm-4 col-xs-12"
                  style={{ height: "100%" }}
                >
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
                <div
                  className="col-sm-3 col-xs-12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    height: "100%"
                  }}
                >
                  <div className="team-image-box">
                    <a href={`/team/${this.state.colors.id}`}>
                      <img
                        src={this.state.colors.Logo}
                        className="img-responsive"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hr-box"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "0 80px" }}
          >
            <hr
              style={{
                borderBottom: "1px solid #eee",
                borderTop: "0px",
                margin: "0",
                paddingTop: "50px"
              }}
            />
          </div>
          <div className="row" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
            <div
              className="player-sub-ratings2"
              style={{
                padding: "0px 60px",
                marginTop: "40px"
              }}
            >
              <div className="col-md-4 col-xs-12">
                {this.renderRankGauges()}
              </div>
              <div className="col-md-8 col-xs-12">
                <div className="player__bar-container">
                  <div className="extended-bar-menu">
                    <div className="extended-header">Extended Stats</div>
                    <div
                      className="extended-selector"
                      onClick={e => this.setBar(e)}
                    >
                      Offense
                    </div>
                    <div
                      className="extended-selector"
                      onClick={e => this.setBar(e)}
                    >
                      Defense
                    </div>
                    {/*<div
                  className="extended-selector"
                  onClick={e => this.setBar(e)}
                >
                  Overall
                </div>*/}
                    {/*<div
                      className="extended-selector"
                      onClick={e => this.setBar(e)}
                    >
                      Shooting
                    </div>*/}
                    {/*<div
                  className="extended-selector"
                  onClick={e => this.setBar(e)}
                >
                  Hustle/Transition
                </div>*/}
                  </div>
                  {this.renderBarChart()}
                </div>
              </div>
            </div>
          </div>
          <div
            className="hr-box"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "0 80px" }}
          >
            <hr
              style={{
                borderBottom: "1px solid #eee",
                borderTop: "0px",
                margin: "0",
                paddingTop: "50px"
              }}
            />
          </div>
          <div className="row" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
            <div
              className="player-full-stats"
              style={{
                padding: "0px 60px",
                marginTop: "60px"
              }}
            >
              <div className="player__menu-prog" style={headerStyle3}>
                Player Stats
              </div>
              <PlayerFullStats seasons={this.state.stats} />
            </div>
          </div>
          <div
            className="hr-box"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "0 80px" }}
          >
            <hr
              style={{
                borderBottom: "1px solid #eee",
                borderTop: "0px",
                margin: "0",
                paddingTop: "50px"
              }}
            />
          </div>
          <div className="row">
            <div
              className="player-progression-main"
              style={{ padding: "40px 60px 80px 60px" }}
            >
              <div className="row">
                <div className="player__menu-prog" style={headerStyle3}>
                  Career Progression
                </div>
                <div style={{ paddingRight: "20px", position: "relative" }}>
                  <div style={{ position: "relative", height: "4rem" }}>
                    <div className="btn-cp-stat" onClick={this.handleProgClick}>
                      {this.state.progStat}
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
                    {this.renderProgMenu()}
                  </div>
                </div>
              </div>
              <CareerProgression
                progStat={this.state.progStat}
                seasons={this.state.stats}
                maxScale={this.state.progMax}
                tickInterval={this.state.progTick}
                minScale={this.state.progMin}
              />
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
)(PlayerInfo2);
