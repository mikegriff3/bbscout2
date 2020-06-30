import React from "react";
import NavBar from "../NavBar";
import CollegeScouting from "./CollegeScouting";
import Footer from "../Footer";

export default class CollegeScoutingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="scouting-grid">
          <NavBar />
          <CollegeScouting props={this.props} />
        </div>
        <Footer />
      </div>
    );
  }
}
