import React from "react";

export default class TeamSeasonStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var stat = this.props.team;
    return (
      <div
        className="row"
        style={{ height: "340px", padding: "0px 40px 0px 20px" }}
      >
        <div
          style={{
            color: "white",
            fontSize: "14px",
            width: "100%",
          }}
        >
          <table
            cellSpacing="0"
            style={{
              width: "100%",
              marginTop: "60px",
            }}
          >
            <thead>
              <tr className="temp">
                <th className="stat-th">W</th>
                <th className="stat-th">L</th>
                <th className="stat-th">FG</th>
                <th className="stat-th">FGA</th>
                <th className="stat-th">FG%</th>
                <th className="stat-th">3P</th>
                <th className="stat-th">3PA</th>
                <th className="stat-th">3P%</th>
                <th className="stat-th">FTM</th>
                <th className="stat-th">FTA</th>
                <th className="stat-th">FT%</th>
                <th className="stat-th">AST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stat["W"]}</td>
                <td>{stat["L"]}</td>
                <td>{stat["FG"]}</td>
                <td>{stat["FGA"]}</td>
                <td>{(stat["FG_PCT"] * 100).toFixed(1)}</td>
                <td>{stat["Three_Pointers"]}</td>
                <td>{stat["Three_Pointers_Att"]}</td>
                <td>{(stat["Three_Pointers_Pct"] * 100).toFixed(1)}</td>
                <td>{stat["FTM"]}</td>
                <td>{stat["FTA"]}</td>
                <td>{(stat["FT_PCT"] * 100).toFixed(1)}</td>
                <td>{stat["AST"]}</td>
              </tr>
            </tbody>
          </table>
          <table cellSpacing="0" style={{ width: "100%", marginTop: "60px" }}>
            <thead>
              <tr className="temp">
                <th className="stat-th">ORB</th>
                <th className="stat-th">DRB</th>
                <th className="stat-th">TRB</th>
                <th className="stat-th">STL</th>
                <th className="stat-th">BLK</th>
                <th className="stat-th">TOV</th>
                <th className="stat-th">PF</th>
                <th className="stat-th">ORB%</th>
                <th className="stat-th">eFG%</th>
                <th className="stat-th">PACE</th>
                <th className="stat-th">PTS</th>
                <th className="stat-th">ORtg</th>
                <th className="stat-th">DRtg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stat["ORB"]}</td>
                <td>{stat["DRB"]}</td>
                <td>{stat["TRB"]}</td>
                <td>{stat["STL"]}</td>
                <td>{stat["BLK"]}</td>
                <td>{stat["TOV"]}</td>
                <td>{stat["PF"]}</td>
                <td>{stat["ORB_PCT"]}</td>
                <td>{stat["OFF_eFG_PCT"]}</td>
                <td>{stat["PACE"]}</td>
                <td>{stat["PTS"]}</td>
                <td>{stat["ORtg"]}</td>
                <td>{stat["DRtg"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
