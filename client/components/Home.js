import React from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Footer from "./Footer";

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar page="home" />
        <HomePage props={this.props} />
        <Footer />
      </div>
    );
  }
}
