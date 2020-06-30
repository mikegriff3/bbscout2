import React from "react";
import NavBar from "../NavBar";
import NBAScouting from "./NBAScouting";
import Footer from "../Footer";

export default class NBAScoutingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="scouting-grid">
          <NavBar />
          <NBAScouting props={this.props} />
        </div>
        <Footer />
      </div>
    );
  }
}
