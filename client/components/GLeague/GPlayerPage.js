import React from "react";
import NavBar from "../NavBar";
import GPlayerInfo from "./GPlayerInfo";
import Footer from "../Footer";

export default class GPlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <GPlayerInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
