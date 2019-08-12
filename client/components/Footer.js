import React from "react";

export default class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer">
        <div className="footer__main-links">
          <div>
            <div className="footer__title">BB SCOUT</div>
            <div>
              Bringing the world of basketball analytics to every fan.
              <br />
              <span style={{ color: "white" }}>Know more.</span>
            </div>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <div className="footer__section-title">Explore</div>
            <div>Home</div>
            <div>NBA</div>
            <div>College</div>
            <div>G-League</div>
            <div>International</div>
          </div>
          <div>
            <div className="footer__section-title">Contact</div>
            <div>Michael Griffin</div>
            <div>Software Engineer</div>
            <div>Actively seeking employment</div>
            <div
              style={{
                color: "white",
                marginTop: "2.5rem",
                marginBottom: "1.5rem"
              }}
            >
              Email
            </div>
            <div>mikegriff951@gmail.com</div>
          </div>
          <div>
            <div className="footer__section-title">Follow</div>
            <div>Instagram</div>
            <div>Twitter</div>
            <div>LinkedIn</div>
          </div>
          <div>
            <div className="footer__section-title">Legal</div>
            <div>Terms</div>
            <div>Privacy</div>
          </div>
          <div>
            <div className="footer__next">Next: About</div>
          </div>
        </div>
        <div className="footer__legal">
          <div className="footer__legal-text">
            &copy 2019 BB Scout. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}
