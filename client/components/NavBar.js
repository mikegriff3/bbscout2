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
      .get("/api/teams/getAllNbaPlayers")
      .then(data => {
        //console.log(data.data);
        this.setState({ results: data.data });
      })
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
        <img
          src="../public/images/basketball-logo-vector.jpg"
          alt="bbscout logo"
          className="navigation__logo"
        />
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
