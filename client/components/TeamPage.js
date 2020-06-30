import React from "react";
import NavBar from "./NavBar";
import TeamInfo2 from "./TeamInfo2";
import Footer from "./Footer";

export default class TeamPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <TeamInfo2 props={this.props} />
        <Footer />
      </div>
    );
  }
}
