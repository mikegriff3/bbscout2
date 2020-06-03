import React from "react";

export default class PlayerCareerStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statObj: {
        ast: 0,
        astPct: 0,
        blk: 0,
        blkPct: 0,
        bpm: 0,
        dbpm: 0,
        drb: 0,
        drbPct: 0,
        dws: 0,
        efgPct: 0,
        fgPct: 0,
        fga: 0,
        fgm: 0,
        freeThrowPct: 0,
        ft: 0,
        fta: 0,
        ftr: 0,
        gamesPlayed: 0,
        mpg: 0,
        obpm: 0,
        orb: 0,
        orbPct: 0,
        ows: 0,
        per: 0,
        pf: 0,
        pts: 0,
        stl: 0,
        stlPct: 0,
        threePAr: 0,
        threePt: 0,
        threePtAtt: 0,
        threePtPct: 0,
        tov: 0,
        tovPct: 0,
        trb: 0,
        trbPct: 0,
        tsPct: 0,
        twoPt: 0,
        twoPtAtt: 0,
        twoPtPct: 0,
        usgPct: 0,
        vorp: 0,
        ws: 0,
        wsFourtyEight: 0
      },
      career: {}
    };
  }

  componentDidMount() {
    let seasons = this.props.seasons;
    let numSeasons = seasons.length;
    for (let i = 0; i < seasons.length; i++) {
      for (let stat in seasons[i]) {
        if (this.state.statObj.hasOwnProperty(stat)) {
          this.state.statObj[stat] += parseFloat(seasons[i][stat]);
        }
      }
    }
    for (let stat2 in this.state.statObj) {
      if (
        stat2 == "freeThrowPct" ||
        stat2 == "efgPct" ||
        stat2 == "fgPct" ||
        stat2 == "ftr" ||
        stat2 == "threePtPct" ||
        stat2 == "tsPct" ||
        stat2 == "twoPtPct"
      ) {
        this.state.statObj[stat2] = (
          this.state.statObj[stat2] / numSeasons
        ).toFixed(2);
      } else {
        this.state.statObj[stat2] = (
          this.state.statObj[stat2] / numSeasons
        ).toFixed(1);
      }
    }
    this.setState({ career: this.state.statObj });
  }

  render() {
    let stats = this.state.career;
    return (
      <div className="row" style={{ padding: "0px 40px 0px 20px" }}>
        <div
          style={{
            color: "white",
            fontSize: "14px"
          }}
        >
          <table
            cellSpacing="0"
            style={{
              width: "100%",
              marginTop: "30px"
            }}
          >
            <thead>
              <tr className="temp">
                <th className="stat-th">GP</th>
                <th className="stat-th">FG</th>
                <th className="stat-th">FGA</th>
                <th className="stat-th">FG%</th>
                <th className="stat-th">3P</th>
                <th className="stat-th">3PA</th>
                <th className="stat-th">3P%</th>
                <th className="stat-th">2P</th>
                <th className="stat-th">2PA</th>
                <th className="stat-th">2P%</th>
                <th className="stat-th">FT</th>
                <th className="stat-th">FTA</th>
                <th className="stat-th">FT%</th>
                <th className="stat-th">ORB</th>
                <th className="stat-th">DRB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats["gamesPlayed"]}</td>
                <td>{stats["fgm"]}</td>
                <td>{stats["fga"]}</td>
                <td>{stats["fgPct"]}</td>
                <td>{stats["threePt"]}</td>
                <td>{stats["threePtAtt"]}</td>
                <td>{stats["threePtPct"]}</td>
                <td>{stats["twoPt"]}</td>
                <td>{stats["twoPtAtt"]}</td>
                <td>{stats["twoPtPct"]}</td>
                <td>{stats["ft"]}</td>
                <td>{stats["fta"]}</td>
                <td>{stats["freeThrowPct"]}</td>
                <td>{stats["orb"]}</td>
                <td>{stats["drb"]}</td>
              </tr>
            </tbody>
          </table>
          <table cellSpacing="0" style={{ width: "100%", marginTop: "40px" }}>
            <thead>
              <tr className="temp">
                <th className="stat-th">TRB</th>
                <th className="stat-th">AST</th>
                <th className="stat-th">STL</th>
                <th className="stat-th">BLK</th>
                <th className="stat-th">TOV</th>
                <th className="stat-th">PF</th>
                <th className="stat-th">PTS</th>
                <th className="stat-th">AST%</th>
                <th className="stat-th">BLK%</th>
                <th className="stat-th">STL%</th>
                <th className="stat-th">DRB%</th>
                <th className="stat-th">ORB%</th>
                <th className="stat-th">TRB%</th>
                <th className="stat-th">eFG%</th>
                <th className="stat-th">TOV%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats["trb"]}</td>
                <td>{stats["ast"]}</td>
                <td>{stats["stl"]}</td>
                <td>{stats["blk"]}</td>
                <td>{stats["tov"]}</td>
                <td>{stats["pf"]}</td>
                <td>{stats["pts"]}</td>
                <td>{stats["astPct"]}</td>
                <td>{stats["blkPct"]}</td>
                <td>{stats["stlPct"]}</td>
                <td>{stats["drbPct"]}</td>
                <td>{stats["orbPct"]}</td>
                <td>{stats["trbPct"]}</td>
                <td>{stats["efgPct"]}</td>
                <td>{stats["tovPct"]}</td>
              </tr>
            </tbody>
          </table>
          <table
            cellSpacing="0"
            style={{ width: "100%", marginTop: "40px", marginBottom: "35px" }}
          >
            <thead>
              <tr className="temp">
                <th className="stat-th">FTr</th>
                <th className="stat-th">3PAr</th>
                <th className="stat-th">TS%</th>
                <th className="stat-th">USG%</th>
                <th className="stat-th">DBPM</th>
                <th className="stat-th">OBPM</th>
                <th className="stat-th">BPM</th>
                <th className="stat-th">PER</th>
                <th className="stat-th">VORP</th>
                <th className="stat-th">DWS</th>
                <th className="stat-th">OWS</th>
                <th className="stat-th">WS</th>
                <th className="stat-th">WS/48</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats["ftr"]}</td>
                <td>{stats["threePAr"]}</td>
                <td>{stats["tsPct"]}</td>
                <td>{stats["usgPct"]}</td>
                <td>{stats["dbpm"]}</td>
                <td>{stats["obpm"]}</td>
                <td>{stats["bpm"]}</td>
                <td>{stats["per"]}</td>
                <td>{stats["vorp"]}</td>
                <td>{stats["dws"]}</td>
                <td>{stats["ows"]}</td>
                <td>{stats["ws"]}</td>
                <td>{stats["wsFourtyEight"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
