import React from "react";
import NavBar from "../NavBar";
import CPlayerInfo from "./CPlayerInfo";
import Footer from "../Footer";

export default class CPlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <CPlayerInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
