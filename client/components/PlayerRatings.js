import React from "react";
import PolarArea from "./player-charts/PolarArea";
import PolarColumn from "./player-charts/PolarColumn";
// import PlayerPolColOff from "./PlayerPolColOff";
// import PlayerPolColDef from "./PlayerPolColDef";
// import PlayerPolColAdvOff from "./PlayerPolColAdvOff";
// import PlayerPolColOvr from "./PlayerPolColOvr";
// import PlayerPolColPostUp from "./PlayerPolColPostUp";
// import PlayerPolColCatchShoot from "./PlayerPolColCatchShoot";
// import PlayerPolColShooting from "./PlayerPolColShooting";
// import PlayerPolColSD from "./PlayerPolColSD";
// import PlayerPolColPRBH from "./PlayerPolColPRBH";
// import PlayerPolColPRRM from "./PlayerPolColPRRM";
// import PlayerPolColIso from "./PlayerPolColIso";
// import PlayerPolColTransition from "./PlayerPolColTransition";
// import PlayerPolColHustle from "./PlayerPolColHustle";

export default class PlayerRatings extends React.Component {
  constructor() {
    super();
    this.state = {
      statCat: "Basic"
    };
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderPolarCol = this.renderPolarCol.bind(this);
  }

  selectStatCat(evt, eventKey) {
    this.setState({ statCat: eventKey.target.innerHTML });
  }

  renderPolarCol() {
    if (this.state.statCat === "Basic") {
      return <PolarColumn player={this.props.player} />;
      // } else if (this.state.statCat === "Offense") {
      //   return <PlayerPolColOff player={this.props.player} />;
      // } else if (this.state.statCat === "Advanced Offense") {
      //   return <PlayerPolColAdvOff player={this.props.player} />;
      // } else if (this.state.statCat === "Post Ups") {
      //   return (
      //     <PlayerPolColPostUp
      //       player={this.props.postStats}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "Defense") {
      //   return <PlayerPolColDef player={this.props.player} />;
      // } else if (this.state.statCat === "Overall") {
      //   return <PlayerPolColOvr player={this.props.player} />;
      // } else if (this.state.statCat === "Catch/Shoot") {
      //   return (
      //     <PlayerPolColCatchShoot
      //       player={this.props.catchShootStats}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "Shooting Efficiency") {
      //   return (
      //     <PlayerPolColShooting
      //       player={this.props.shootingStats}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "Speed/Distance") {
      //   return <PlayerPolColSD player={this.props.speedDistanceStats} />;
      // } else if (this.state.statCat === "P+R Ball Handler") {
      //   return (
      //     <PlayerPolColPRBH
      //       player={this.props.prHandler}
      //       gp={this.props.player.gamesPlayed}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "P+R Roll Man") {
      //   return (
      //     <PlayerPolColPRRM
      //       player={this.props.prRollMan}
      //       gp={this.props.player.gamesPlayed}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "Isolation") {
      //   return (
      //     <PlayerPolColIso
      //       player={this.props.iso}
      //       gp={this.props.player.gamesPlayed}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "Transition") {
      //   return (
      //     <PlayerPolColTransition
      //       player={this.props.transition}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // } else if (this.state.statCat === "Hustle") {
      //   return (
      //     <PlayerPolColHustle
      //       player={this.props.hustle}
      //       min={this.props.player.mpg}
      //     />
      //   );
      // }
    }
  }

  render() {
    return (
      <div className="player__ratings-container">
        <div className="player__charts-polar-container">
          <div>
            <div>{this.renderPolarCol()}</div>
          </div>
        </div>
        <div>
          <PolarArea player={this.props.player} colors={this.props.colors} />
        </div>
        <div className="player__btn-container">
          <button className="btn__stat-selector">
            <span>BASIC</span>
          </button>
        </div>
      </div>
    );
  }
}
