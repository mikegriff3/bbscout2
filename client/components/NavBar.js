import React from "react";
import Search from "./Search";
import axios from "axios";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
    this.getResults = this.getResults.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    axios
      .all([
        axios.get("/api/teams/getLeagueStats"),
        axios.get("/api/teams/getAllNbaPlayers")
      ])
      .then(
        axios.spread((teams, players) => {
          //console.log(teams.data);
          //console.log(players.data);
          for (var i = 0; i < teams.data.length; i++) {
            teams.data[i].name = teams.data[i].Name;
            delete teams.data[i].Name;
            teams.data[i].picture = teams.data[i].Logo;
            delete teams.data[i].Logo;
            var tag = `team/${teams.data[i].id}`;
            teams.data[i].tag = tag;
          }
          for (var i = 0; i < players.data.length; i++) {
            var tag = `player/${players.data[i].id}`;
            players.data[i].tag = tag;
          }
          var results = teams.data.concat(players.data);
          console.log(results);
          this.setState({ results: results });
        })
      )
      .catch(err => {
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
    return (
      <header className="navigation">
        <div className="navigation__title">
          BB SCOUT
          {/*<img
            src="https://ui-ex.com/images/basketball-transparent-vector-2.png"
            alt="bbscout logo"
            className="navigation__logo"
            style={{ color: "red" }}
    />*/}
        </div>
        {this.renderSearch()}
        {/*<Search suggestions={this.state.results} />*/}

        <nav className="navigation__menu">
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
            <ul className="navigation__list">
              <li className="navigation__item">
                <a href="/nba-scouting" className="navigation__link">
                  <span>01</span>NBA Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="#" className="navigation__link">
                  <span>02</span>College Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="#" className="navigation__link">
                  <span>03</span>G-League Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="#" className="navigation__link">
                  <span>04</span>International Scouting
                </a>
              </li>
              <li className="navigation__item">
                <a href="#" className="navigation__link">
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
