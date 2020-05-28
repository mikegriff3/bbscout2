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
      <Container>
        <Row>
          <NavBar />
        </Row>
        <Row>
          <PlayerInfo props={this.props} />
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    );
  }
}
