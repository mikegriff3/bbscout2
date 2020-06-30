import React from "react";
import NavBar from "../NavBar";
import GTeamInfo from "./GTeamInfo";
import Footer from "../Footer";

export default class TeamPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <GTeamInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
