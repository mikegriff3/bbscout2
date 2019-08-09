import React from "react";
import NavBar from "./NavBar";
import TeamInfo from "./TeamInfo";
import Footer from "./Footer";

export default class TeamPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="team-grid">
        <NavBar />
        <TeamInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
