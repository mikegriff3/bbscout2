import React from "react";
import GPolarArea from "./player-charts/GPolarArea";
import GPolarColumn from "./player-charts/GPolarColumn";
import GDefPolar from "./player-charts/GDefPolar";
import GOffPolar from "./player-charts/GOffPolar";
import GOvrPolar from "./player-charts/GOvrPolar";

export default class GPlayerRatings extends React.Component {
  constructor() {
    super();
    this.state = {
      statCat: "Basic",
      showStatMenu: false,
    };
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderPolarCol = this.renderPolarCol.bind(this);
    this.renderStatMenu = this.renderStatMenu.bind(this);
    this.setStatMenu = this.setStatMenu.bind(this);
  }

  selectStatCat(e) {
    //console.log(e.target.innerHTML);
    this.setState({ statCat: e.target.innerHTML, showStatMenu: false });
  }

  setStatMenu() {
    this.setState({
      showStatMenu: !this.state.showStatMenu,
    });
  }

  renderStatMenu() {
    var itemStyle = {
      height: "4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    };
    if (this.state.showStatMenu) {
      return (
        <div className="stat-menu-container">
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Basic
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Offense
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Defense
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Overall
          </div>
        </div>
      );
    }
  }

  renderPolarCol() {
    if (this.state.statCat === "Basic") {
      return <GPolarColumn player={this.props.player} />;
    } else if (this.state.statCat === "Offense") {
      return <GOffPolar player={this.props.player} />;
    } else if (this.state.statCat === "Extended Offense") {
      return <ExtOffPolar player={this.props.player} />;
    } else if (this.state.statCat === "Post Up") {
      if (this.props.postStats) {
        return (
          <PostUpPolar
            player={this.props.postStats}
            min={this.props.player.mpg}
          />
        );
      }
      return (
        <div className="no-stats-found">
          No available stats for this player.
        </div>
      );
    } else if (this.state.statCat === "Defense") {
      return <GDefPolar player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      return <GOvrPolar player={this.props.player} />;
    } else if (this.state.statCat === "Catch and Shoot") {
      return (
        <CatchShootPolar
          player={this.props.catchShootStats}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Shooting") {
      return (
        <ShootingPolar
          player={this.props.shootingStats}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Speed + Distance") {
      return <SpeedDistancePolar player={this.props.speedDistanceStats} />;
    } else if (this.state.statCat === "P+R Ball Handler") {
      if (this.props.prHandler) {
        return (
          <PRBHPolar
            player={this.props.prHandler}
            gp={this.props.player.gamesPlayed}
            min={this.props.player.mpg}
          />
        );
      }
      return (
        <div className="no-stats-found">
          No available stats for this player.
        </div>
      );
    } else if (this.state.statCat === "P+R Roll Man") {
      if (this.props.prRollMan) {
        return (
          <PRRMPolar
            player={this.props.prRollMan}
            gp={this.props.player.gamesPlayed}
            min={this.props.player.mpg}
          />
        );
      }
      return (
        <div className="no-stats-found">
          No available stats for this player.
        </div>
      );
    } else if (this.state.statCat === "Isolation") {
      if (this.props.iso) {
        return (
          <IsolationPolar
            player={this.props.iso}
            gp={this.props.player.gamesPlayed}
            min={this.props.player.mpg}
          />
        );
      }
      return (
        <div className="no-stats-found">
          No available stats for this player.
        </div>
      );
    } else if (this.state.statCat === "Transition") {
      return (
        <TransitionPolar
          player={this.props.transition}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Hustle") {
      return (
        <HustlePolar player={this.props.hustle} min={this.props.player.mpg} />
      );
    }
  }

  render() {
    return (
      <div className="player-ratings-container">
        <div className="row">
          <div className="player__charts-polar-container col-md-6 col-xs-12">
            <div>
              <div>{this.renderPolarCol()}</div>
            </div>
          </div>
          <div className="polar-area-container col-md-6 col-xs-12">
            <GPolarArea player={this.props.player} colors={this.props.colors} />
          </div>
        </div>
        <div className="row">
          <div className="player__btn-container">
            <button className="btn__stat-selector" onClick={this.setStatMenu}>
              <div>
                {this.state.statCat.toUpperCase()}
                {"  "}
                <span style={{ fontSize: "10px" }}>&#9660;</span>
              </div>
            </button>
            {this.renderStatMenu()}
          </div>
        </div>
      </div>
    );
  }
}
