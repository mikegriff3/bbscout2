import React from "react";

export default class TeamRankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ptsRank: "-",
      astRank: "-",
      threeRank: "-",
      paceRank: "-",
      orRank: "-",
      tovRank: "-",
      stlRank: "-",
      blkRank: "-",
      rebRank: "-",
      drRank: "-"
    };
    this.getRanks = this.getRanks.bind(this);
    this.rankStat = this.rankStat.bind(this);
  }

  componentDidMount() {
    this.getRanks(this.props.team);
  }

  componentDidUpdate(prevprops) {
    if (prevprops !== this.props) {
      this.getRanks(this.props.team);
    }
  }

  getRanks(team) {
    let pts = this.rankStat("PTS", team);
    let ast = this.rankStat("AST", team);
    let threes = this.rankStat("Three_Pointers_Pct", team);
    let pace = this.rankStat("PACE", team);
    let ortg = this.rankStat("ORtg", team);
    let tov = this.rankStat("TOV", team);
    let stl = this.rankStat("STL", team);
    let blk = this.rankStat("BLK", team);
    let reb = this.rankStat("TRB", team);
    let drtg = this.rankStat("DRtg", team);

    this.setState({
      ptsRank: pts,
      astRank: ast,
      threeRank: threes,
      paceRank: pace,
      orRank: ortg,
      tovRank: tov,
      stlRank: stl,
      blkRank: blk,
      rebRank: reb,
      drRank: drtg
    });
  }

  rankStat(stat, team) {
    let rank;
    let suffix = "";
    let newArray = [...this.props.leagueStats];
    let sorted = newArray.sort((a, b) => {
      return parseFloat(b[stat]) - parseFloat(a[stat]);
    });
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].Name === team) {
        rank = i + 1;
        break;
      }
    }
    if (stat === "DRtg") {
      rank = 31 - rank;
    }
    if (rank === 1 || rank === 21) {
      suffix = "st";
    } else if (rank === 2 || rank === 22) {
      suffix = "nd";
    } else if (rank === 3 || rank === 23) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
    return rank + suffix;
  }

  render() {
    return (
      <div className="row" style={{ height: "340px" }}>
        <div className="col-sm-6" style={{ height: "100%" }}>
          <div
            style={{
              padding: "0px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
              fontSize: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>PTS</div>
              <div>{this.state.ptsRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>AST</div>
              <div>{this.state.astRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>3P%</div>
              <div>{this.state.threeRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>PACE</div>
              <div>{this.state.paceRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>ORTG</div>
              <div>{this.state.orRank}</div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-6"
          style={{ borderLeft: "2px solid white", height: "100%" }}
        >
          <div
            style={{
              padding: "0px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
              fontSize: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>TOV</div>
              <div>{this.state.tovRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>STL</div>
              <div>{this.state.stlRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>BLK</div>
              <div>{this.state.blkRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>REB</div>
              <div>{this.state.rebRank}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                color: "white"
              }}
            >
              <div>DRTG</div>
              <div>{this.state.drRank}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
