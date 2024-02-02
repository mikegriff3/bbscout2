import React from "react";
import Pic from "./image3.png";
import Pic2 from "./HP2.jpg";
import Sample from "./prodSample2.png";
import Sample2 from "./FA_Pic.png";
import Sample3 from "./chartPic.png";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backImage = "";
    return (
      <div className="container-fluid">
        <div className="row header">
          <div className="header-pic">
            <img className="img-responsive" src={Pic2} />
          </div>
          <div
            className="text2"
            style={{
              color: "white",
            }}
          >
            <h1>SCOUT</h1>
            <h2>MODERN SPORTS ANALYTICS.</h2>
          </div>
        </div>
        <div
          className="hr-box"
          style={{ backgroundColor: "rgb(0,0,0)", padding: "0 80px" }}
        >
          <hr
            style={{
              borderBottom: "1px solid #eee",
              borderTop: "0px",
              margin: "0",
              paddingTop: "50px",
            }}
          />
        </div>
        <div
          className="row"
          style={{
            backgroundColor: "rgb(0,0,0)",
            padding: "80px 80px 0px 80px",
          }}
        >
          <div
            className="playfair"
            style={{ color: "white", letterSpacing: "3px", fontSize: "18px" }}
          >
            HOW IT WORKS
          </div>
          <div className="col-md-6">
            <div
              className="how-works"
              style={{
                color: "white",
                paddingTop: "40px",
              }}
            >
              Scout is a basketball analytics application that visualizes stats
              and ratings for NBA, College, G-League, and International teams
              and players. Our rating system is based on a 20-80 scale and uses
              a player's per 36 minute stats. This allows a user to quickly
              discern the impact of a player's stats as well as a player's
              potential. The rating system also provides more context than
              traditional stats by giving immediate ranking vs. the top and
              bottom of the league and allows a user to see ratings relative to
              other players of the same position. Using uniquely designed graphs
              and visuals that leverage multiple data visualization techniques,
              Scout provides the simplest and most innovative ways to scout
              multiple levels of the game. <br />
              <br />
              While stats aren't everything, knowing the ins and outs of a
              player or team's performance can be the edge that seperates
              winning and losing. Use the search bar or the navigation menu to
              start scouting.
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="how-works-pic"
              style={{ padding: "80px 50px 40px" }}
            >
              <img className="img-responsive" src={Sample} />
            </div>
          </div>
        </div>
        <div
          className="hr-box"
          style={{ backgroundColor: "rgb(0,0,0)", padding: "0 80px" }}
        >
          <hr
            style={{
              borderBottom: "1px solid #eee",
              borderTop: "0px",
              margin: "0",
              paddingTop: "80px",
            }}
          />
        </div>
        <div
          className="row"
          style={{
            backgroundColor: "rgb(0,0,0)",
          }}
        >
          <div
            className="playfair"
            style={{
              color: "white",
              letterSpacing: "3px",
              fontSize: "18px",
              float: "right",
              padding: "80px 80px 40px 0px",
            }}
          >
            MORE THAN STATS
          </div>
        </div>
        <div
          className="row mts"
          style={{
            backgroundColor: "rgb(0,0,0)",
            padding: "0px 80px 0px 80px",
            //display: "flex",
            alignItems: "center",
          }}
        >
          <div className="col-md-6 col-xs-12">
            <div className="mts-pic">
              <img className="img-responsive" src={Sample2} />
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div
              className="mts-text"
              style={{
                color: "white",
              }}
            >
              Scout does more than stats. The application is a full front office
              suite designed to aid in multiple aspects of running a successful
              organization. These tools include team salaries, player contracts,
              player finder, free agent tracker, trade finder, and more. Scout
              is designed to be an all-in-one solution, streamlining daily tasks
              performed by a front office.
            </div>
          </div>
        </div>
        <div
          className="hr-box"
          style={{ backgroundColor: "rgb(0,0,0)", padding: "0 80px" }}
        >
          <hr
            style={{
              borderBottom: "1px solid #eee",
              borderTop: "0px",
              margin: "0",
              paddingTop: "80px",
            }}
          />
        </div>
        <div
          className="row"
          style={{
            backgroundColor: "rgb(0,0,0)",
            padding: "80px 80px 40px 80px",
          }}
        >
          <div
            className="playfair"
            style={{ color: "white", letterSpacing: "3px", fontSize: "18px" }}
          >
            CUSTOMIZABLE
          </div>
        </div>
        <div
          className="row cust"
          style={{
            backgroundColor: "rgb(0,0,0)",
            padding: "0px 80px",
            //display: "flex",
            alignItems: "center",
          }}
        >
          <div className="col-md-6">
            <div
              className="cust-text"
              style={{
                color: "white",
              }}
            >
              Every organization has their own needs, preferences, and
              philosophies which is why Prodigy is fully customizable. Teams can
              decide what impacts a player or team's rating so that their
              philosophy is always at the forefront of the decision making
              process. A range of filters and customizable options are also
              available on every player and team graph to help users discover
              exactly what they need, as quickly as possible.
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ padding: "0px 50px" }}>
              <img
                className="img-responsive"
                src={Sample3}
                style={{ padding: "0px 40px" }}
              />
            </div>
          </div>
        </div>
        <div
          className="hr-box"
          style={{ backgroundColor: "rgb(0,0,0)", padding: "0 80px" }}
        >
          <hr
            style={{
              borderBottom: "1px solid #eee",
              borderTop: "0px",
              margin: "0",
              paddingTop: "80px",
            }}
          />
        </div>
      </div>
    );
  }
}
