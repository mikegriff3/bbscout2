import React from "react";

export default class PlayerSeasonStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var stat = this.props.player;
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
                <td>{stat["gamesPlayed"]}</td>
                <td>{stat["fgm"]}</td>
                <td>{stat["fga"]}</td>
                <td>{(stat["fgPct"] * 100).toFixed(1)}</td>
                <td>{stat["threePt"]}</td>
                <td>{stat["threePtAtt"]}</td>
                <td>{(stat["threePtPct"] * 100).toFixed(1)}</td>
                <td>{stat["twoPt"]}</td>
                <td>{stat["twoPtAtt"]}</td>
                <td>{(stat["twoPtPct"] * 100).toFixed(1)}</td>
                <td>{stat["ft"]}</td>
                <td>{stat["fta"]}</td>
                <td>{(stat["freeThrowPct"] * 100).toFixed(1)}</td>
                <td>{stat["orb"]}</td>
                <td>{stat["drb"]}</td>
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
                <td>{stat["trb"]}</td>
                <td>{stat["ast"]}</td>
                <td>{stat["stl"]}</td>
                <td>{stat["blk"]}</td>
                <td>{stat["tov"]}</td>
                <td>{stat["pf"]}</td>
                <td>{stat["pts"]}</td>
                <td>{stat["astPct"]}</td>
                <td>{stat["blkPct"]}</td>
                <td>{stat["stlPct"]}</td>
                <td>{stat["drbPct"]}</td>
                <td>{stat["orbPct"]}</td>
                <td>{stat["trbPct"]}</td>
                <td>{stat["efgPct"]}</td>
                <td>{stat["tovPct"]}</td>
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
                <td>{stat["ftr"]}</td>
                <td>{stat["threePAr"]}</td>
                <td>{stat["tsPct"]}</td>
                <td>{stat["usgPct"]}</td>
                <td>{stat["dbpm"]}</td>
                <td>{stat["obpm"]}</td>
                <td>{stat["bpm"]}</td>
                <td>{stat["per"]}</td>
                <td>{stat["vorp"]}</td>
                <td>{stat["dws"]}</td>
                <td>{stat["ows"]}</td>
                <td>{stat["ws"]}</td>
                <td>{stat["wsFourtyEight"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
