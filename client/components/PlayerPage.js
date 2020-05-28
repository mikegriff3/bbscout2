import React from "react";
import NavBar from "./NavBar";
import PlayerInfo from "./PlayerInfo";
import Footer from "./Footer";
import { Container, Row } from "react-bootstrap";

export default class PlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <PlayerInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
