import React from "react";
import NavBar from "../NavBar";
import GLeagueScouting from "./GLeagueScouting";
import Footer from "../Footer";

export default class GLeagueScoutingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="scouting-grid">
          <NavBar />
          <GLeagueScouting props={this.props} />
        </div>
        <Footer />
      </div>
    );
  }
}
