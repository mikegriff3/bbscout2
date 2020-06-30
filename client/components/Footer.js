import React from "react";

export default class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    let backColor = "rgba(0,0,0,0.7)";
    if (this.props.page === "home") {
      backColor = "rgba(0,0,0,1)";
    }
    return (
      <div
        className="row"
        style={{
          backgroundColor: backColor,
          padding: "80px 80px 40px",
          color: "grey",
        }}
      >
        <div className="row" style={{ display: "flex" }}>
          <div className="col-md-3">
            <div className="footer-title playfair">PRODIGY</div>
            <div className="footer-title-sub playfair">
              MODERN SPORTS ANALYTICS.
            </div>
          </div>
          <div className="col-md-2">
            <div className="footer-header playfair">EXPLORE</div>
            <div>Home</div>
            <div>NBA</div>
            <div>College</div>
            <div>G-League</div>
            <div>International</div>
          </div>
          <div className="col-md-3">
            <div className="footer-header playfair">CONTACT</div>
            <div>Michael Griffin</div>
            <div>Software Engineer</div>
            <div>Actively seeking employment</div>
            <div>Email:</div>
            <div>mikegriff951@gmail.com</div>
          </div>
          <div className="col-md-2">
            <div className="footer-header playfair">FOLLOW</div>
            <div>Instagram</div>
            <div>Twitter</div>
            <div>LinkedIn</div>
          </div>
          <div className="col-md-2">
            <div className="footer-header playfair">LEGAL</div>
            <div>Terms</div>
            <div>Privacy</div>
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <div>&copy; 2018 Prodigy. All Rights Reserved.</div>
        </div>
      </div>
    );
  }
}
