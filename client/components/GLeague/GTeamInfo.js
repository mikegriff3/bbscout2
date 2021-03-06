import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import GTeamCharts from "./team-charts/GTeamCharts";
import GTeamRankings from "./team-charts/GTeamRankings";
import GTeamSeasonStats from "./team-charts/GTeamSeasonStats";
import GTeamRoster from "./team-charts/GTeamRoster";
import GLeagueStandings from "./team-charts/GLeagueStandings";

const mapStateToProps = (state) => {
  return {
    players: state.playersReducer.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayers(players) {
      dispatch({
        type: "ADD_PLAYERS",
        payload: players,
      });
    },
  };
};

class GTeamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [],
      leagueStats: [],
      teamId: this.props.props.match.params.id,
      team: {},
      selection: "Team Rankings",
      showMenu: false,
      schedule: [],
    };
    this.getTeam = this.getTeam.bind(this);
    this.getLeagueStats = this.getLeagueStats.bind(this);
    this.getRoster = this.getRoster.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.getTeamSchedule = this.getTeamSchedule.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    this.getTeam();
    this.getLeagueStats();
  }

  getRoster() {
    var team = this.state.team.Name;
    axios
      .get("/api/teams/getGTeamsPlayers", {
        params: {
          team: team,
        },
      })
      .then((data) => {
        var playersArray = data.data;
        this.props.addPlayers(playersArray);
      })
      .catch("error retrieving players!!!");
  }

  getTeam() {
    axios
      .get(`/api/teams/getGTeamProfile/${this.state.teamId}`)
      .then((data) => {
        this.setState({ team: data.data }, () => {
          this.getRoster();
          //this.getTeamSchedule();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getLeagueStats() {
    axios
      .get("/api/teams/getgLeagueStats")
      .then((data) => {
        this.setState({ leagueStats: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTeamSchedule() {
    var team = this.state.team.Name;
    axios
      .get("/api/teams/getNbaSchedule", {
        params: {
          team: team,
        },
      })
      .then((data) => {
        let arr = data.data.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        this.setState({ schedule: arr });
      })
      .catch("error retrieving players!!!");
  }

  renderSelection() {
    if (this.state.selection === "Team Rankings") {
      return (
        <GTeamRankings
          leagueStats={this.state.leagueStats}
          team={this.state.team.Name}
        />
      );
    } else if (this.state.selection === "Team Roster") {
      return <GTeamRoster players={this.props.players[0]} />;
    } else if (this.state.selection === "Season Stats") {
      return <GTeamSeasonStats team={this.state.team} />;
    } else if (this.state.selection === "Depth Chart") {
      //return <TeamDepthChart />;
    } else if (this.state.selection === "League Standings") {
      return (
        <GLeagueStandings
          team={this.state.team}
          leagueStats={this.state.leagueStats}
        />
      );
    } else if (this.state.selection === "Team Salary") {
      //return <TeamSalary />;
    }
  }

  handleClick() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  handleMenuClick(event) {
    this.setState({
      selection: event.currentTarget.textContent,
      showMenu: false,
    });
  }

  renderMenu() {
    if (this.state.showMenu) {
      return (
        <div className="menu-option">
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Team Roster
          </div>
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Season Stats
          </div>
          {/*<div className="menu-choice" onClick={this.handleMenuClick}>
            Depth Chart
      </div>*/}
          {/*<div className="menu-choice" onClick={this.handleMenuClick}>
            Team Salary
    </div>*/}
          <div className="menu-choice" onClick={this.handleMenuClick}>
            Team Rankings
          </div>
          <div className="menu-choice" onClick={this.handleMenuClick}>
            League Standings
          </div>
        </div>
      );
    }
  }

  getOverallRating() {
    if (this.state.team) {
      var wins = parseFloat(this.state.team.W);
      var winRating = ((100 / 25) * (wins - 33) + 100) * 0.3;
      var ortg = parseFloat(this.state.team.ORtg);
      var orRating = ((100 / 12) * (ortg - 113) + 100) * 0.3;
      var drtg = parseFloat(this.state.team.DRtg) * -1;
      var drRating = ((100 / 13) * (drtg + 101) + 100) * 0.3;
      var weightedOvr = winRating + orRating + drRating;
      var grade = this.getGrade(85, 0, weightedOvr);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  getOffenseRating() {
    if (this.state.team) {
      var ortg = parseFloat(this.state.team.ORtg);
      var orRating = (100 / 12) * (ortg - 113) + 100;
      var grade = this.getGrade(100, 0, orRating);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  getDefenseRating() {
    if (this.state.team) {
      var drtg = parseFloat(this.state.team.DRtg) * -1;
      var drRating = (100 / 13) * (drtg + 101) + 100;
      var grade = this.getGrade(100, 0, drRating);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
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
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
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

  checkLoad() {
    var headerStyle = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white",
      cursor: "pointer",
    };
    if (
      JSON.stringify(this.state.team) != "{}" &&
      this.props.players.length > 0
    ) {
      return (
        <div className="container-fluid">
          <div
            className="row team-row"
            style={{
              minHeight: "calc(96vh - 4rem)",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            <div className="team-card col-sm-4 col-xs-12">
              <div
                className="team-logo-container"
                style={{
                  height: "auto",
                  width: "50%",
                  marginBottom: "4rem",
                }}
              >
                <img
                  src={this.state.team.Logo}
                  alt="Team Logo"
                  className="img-responsive"
                />
              </div>
              <div className="team-info">
                <div>
                  <span className="team-info-name-text">
                    {this.state.team.Name.toUpperCase()}
                  </span>
                </div>
                <div className="team__info-text">
                  <span className="team__info-stat-title">
                    Record:{" "}
                    <span className="team__info-stat-text">
                      {this.state.team.W}-{this.state.team.L}
                    </span>
                  </span>
                </div>
                <div className="team__info-text">
                  <span className="team__info-stat-title">
                    Schedule Strength:{" "}
                    <span className="team__info-stat-text">
                      {/*{this.state.team.SOS}*/}
                    </span>
                  </span>
                </div>
                <div className="team__info-text">
                  <span className="team__info-stat-title">
                    Margin of Victory:{" "}
                    <span className="team__info-stat-text">
                      {/*{this.state.team.MOV}*/}
                    </span>
                  </span>
                </div>
                <div className="team__info-text">
                  <span className="team__info-stat-title">
                    Expected Record:{" "}
                    <span className="team__info-stat-text">
                      {/*{this.state.team.PW}-{this.state.team.PL}*/}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-8 col-xs-12">
              <div className="team__menu-container">
                <div
                  style={headerStyle}
                  className="team__menu"
                  onClick={this.handleClick}
                >
                  <div>
                    {this.state.selection}{" "}
                    <span style={{ fontSize: "10px" }}>&#9660;</span>
                  </div>
                </div>
                {this.renderMenu()}
              </div>
              <div className="row" style={{ paddingTop: "3.5rem" }}>
                <div className="team-charts">{this.renderSelection()}</div>
              </div>
              <div
                className="row"
                style={{
                  marginTop: "3rem",
                  //display: "flex",
                  alignItems: "center",
                  height: "170px",
                }}
              >
                <div
                  className="team-ratings-oversight-container col-sm-5 col-xs-12"
                  style={{
                    paddingBottom: "1.5rem",
                    textTransform: "uppercase",
                    color: "grey",
                    fontSize: "1.4rem",
                    height: "100%",
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
                  className="team__stat-overview col-sm-4 col-xs-12"
                  style={{ height: "100%" }}
                >
                  <div className="stat-box">
                    <span className="stat-title">ORTG</span>
                    <span className="stat-text">
                      {this.state.team.ORtg || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">DRTG</span>
                    <span className="stat-text">
                      {this.state.team.DRtg || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">PPG</span>
                    <span className="stat-text">
                      {this.state.team.PTS || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">APG</span>
                    <span className="stat-text">
                      {this.state.team.AST || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">RPG</span>
                    <span className="stat-text">
                      {this.state.team.TRB || 0}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">PACE</span>
                    <span className="stat-text">
                      {this.state.team.PACE || 0}
                    </span>
                  </div>
                </div>
                <div
                  className="col-sm-3 col-xs-12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    height: "100%",
                  }}
                >
                  <div className="team-image-box">
                    <a href={`/team/${this.state.team.Color_Sec}`}>
                      <img
                        src={this.state.team.Color_Third || ""}
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
                paddingTop: "50px",
              }}
            />
          </div>
          <GTeamCharts
            team={this.state.team}
            players={this.props.players[0]}
            leagueStats={this.state.leagueStats}
            contracts={this.state.contracts}
            schedule={this.state.schedule}
          />
        </div>
      );
    } else {
      return (
        <div
          className="loading-gif"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div>
            <img
              className="gif"
              src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
            />
          </div>
          <div>Loading Team...</div>
        </div>
      );
    }
  }

  render() {
    return <div className="team-container">{this.checkLoad()}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GTeamInfo);
