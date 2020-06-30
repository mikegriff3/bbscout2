import React from "react";
import Search from "./Search";
import axios from "axios";
import Pic from "./image3.png";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      showLinks: false,
    };
    this.getResults = this.getResults.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  handleNavClick() {
    this.setState({ showLinks: true });
  }

  getResults() {
    axios
      .all([
        axios.get("/api/teams/getLeagueStats"),
        axios.get("/api/teams/getAllNbaPlayers"),
        axios.get("/api/teams/getgLeagueStats"),
        axios.get("/api/teams/getAllgPlayers"),
        axios.get("/api/teams/getAllCollegePlayers"),
      ])
      .then(
        axios.spread((teams, players, gteams, gplayers, cplayers) => {
          for (let i = 0; i < teams.data.length; i++) {
            teams.data[i].name = teams.data[i].Name;
            delete teams.data[i].Name;
            teams.data[i].picture = teams.data[i].Logo;
            delete teams.data[i].Logo;
            var tag = `team/${teams.data[i].id}`;
            teams.data[i].tag = tag;
          }
          for (let i = 0; i < players.data.length; i++) {
            var tag = `player/${players.data[i].id}`;
            players.data[i].tag = tag;
          }
          for (let i = 0; i < gteams.data.length; i++) {
            gteams.data[i].name = gteams.data[i].Name;
            delete gteams.data[i].Name;
            gteams.data[i].picture = gteams.data[i].Logo;
            delete gteams.data[i].Logo;
            var tag = `gleague-team/${gteams.data[i].id}`;
            gteams.data[i].tag = tag;
          }
          for (let i = 0; i < gplayers.data.length; i++) {
            var tag = `gleague-player/${gplayers.data[i].id}`;
            gplayers.data[i].tag = tag;
          }
          for (let i = 0; i < cplayers.data.length; i++) {
            var tag = `college-player/${cplayers.data[i].id}`;
            cplayers.data[i].tag = tag;
          }
          var results = teams.data.concat(
            players.data,
            gteams.data,
            gplayers.data,
            cplayers.data
          );
          //console.log(results);
          this.setState({ results: results });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  renderSearch() {
    if (this.state.results.length > 0) {
      return <Search suggestions={this.state.results} />;
    } else {
      return <div />;
    }
  }

  render() {
    let displayProp;
    let backColor = "rgba(0,0,0,0.7)";
    if (this.state.showLinks) {
      displayProp = "flex";
    } else {
      displayProp = "none";
    }
    if (this.props.page === "home") {
      backColor = "rgba(0,0,0,1)";
    }
    return (
      <header className="navigation" style={{ backgroundColor: backColor }}>
        <div className="navigation__title">
          <a href={`/home`} style={{ textDecoration: "none" }}>
            <div style={{ display: "inline-block" }}>
              <img
                className="img-responsive"
                src={Pic}
                style={{ width: "33px", display: "inline-block" }}
              />
            </div>
            <span style={{ paddingLeft: "10px" }}>PRODIGY</span>
          </a>
          {/*<img
            src="https://ui-ex.com/images/basketball-transparent-vector-2.png"
            alt="bbscout logo"
            className="navigation__logo"
            style={{ color: "red" }}
    />*/}
        </div>
        {this.renderSearch()}
        {/*<Search suggestions={this.state.results} />*/}

        <nav className="navigation__menu" onClick={this.handleNavClick}>
          <input
            type="checkbox"
            className="navigation__checkbox"
            id="navi-toggle"
          />

          <label for="navi-toggle" className="navigation__button">
            <span className="navigation__icon">&nbsp;</span>
          </label>

          <div className="navigation__background">&nbsp;</div>

          <nav className="navigation__nav">
            <ul className="navigation__list" style={{ display: displayProp }}>
              <li className="navigation__item">
                <a href="/nba-scouting" className="navigation__link">
                  <span>01</span>NBA Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="/college-scouting" className="navigation__link">
                  <span>02</span>College Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="/gleague-scouting" className="navigation__link">
                  <span>03</span>G-League Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="/inter-scouting" className="navigation__link">
                  <span>04</span>International Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="/about" className="navigation__link">
                  <span>05</span>About bb scout
                </a>
              </li>
            </ul>
          </nav>
        </nav>
      </header>
    );
  }
}
