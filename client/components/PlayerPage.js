import React from "react";
import NavBar from "./NavBar";
import PlayerInfo2 from "./PlayerInfo2";
import Footer from "./Footer";

export default class PlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <PlayerInfo2 props={this.props} />
        <Footer />
      </div>
    );
  }
}
