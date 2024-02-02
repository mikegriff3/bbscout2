import React from "react";
import PolarArea from "./player-charts/PolarArea";
import PolarColumn from "./player-charts/PolarColumn";
import CatchShootPolar from "./player-charts/CatchShootPolar";
import DefPolar from "./player-charts/DefPolar";
import ExtOffPolar from "./player-charts/ExtOffPolar";
import HustlePolar from "./player-charts/HustlePolar";
import IsolationPolar from "./player-charts/IsolationPolar";
import OffPolar from "./player-charts/OffPolar";
import OvrPolar from "./player-charts/OvrPolar";
import PostUpPolar from "./player-charts/PostUpPolar";
import PRBHPolar from "./player-charts/PRBHPolar";
import PRRMPolar from "./player-charts/PRRMPolar";
import ShootingPolar from "./player-charts/ShootingPolar";
import SpeedDistancePolar from "./player-charts/SpeedDistancePolar";
import TransitionPolar from "./player-charts/TransitionPolar";

export default class PlayerRatings2 extends React.Component {
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
            Shooting
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Extended Offense
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            P+R Ball Handler
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            P+R Roll Man
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Isolation
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Post Up
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Catch and Shoot
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Transition
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Hustle
          </div>
          <div
            style={itemStyle}
            classname="stat-menu-item"
            onClick={(e) => this.selectStatCat(e)}
          >
            Speed + Distance
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
      return <PolarColumn player={this.props.player} />;
    } else if (this.state.statCat === "Offense") {
      return <OffPolar player={this.props.player} />;
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
      return <DefPolar player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      return <OvrPolar player={this.props.player} />;
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
            <PolarArea player={this.props.player} />
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
