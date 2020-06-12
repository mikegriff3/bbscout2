import React from "react";

export default class TeamSeasonStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var stat = this.props.team;
    return (
      <div className="row" style={{ padding: "0px 40px 20px 20px" }}>
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
                <th className="stat-th">W</th>
                <th className="stat-th">L</th>
                <th className="stat-th">FG</th>
                <th className="stat-th">FGA</th>
                <th className="stat-th">FG%</th>
                <th className="stat-th">3P</th>
                <th className="stat-th">3PA</th>
                <th className="stat-th">3P%</th>
                <th className="stat-th">2P</th>
                <th className="stat-th">2PA</th>
                <th className="stat-th">2P%</th>
                <th className="stat-th">FTM</th>
                <th className="stat-th">FTA</th>
                <th className="stat-th">FT%</th>
                <th className="stat-th">ORB</th>
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
                <td>{stat["Two_Pointers"]}</td>
                <td>{stat["Two_Pointers_Att"]}</td>
                <td>{(stat["Two_Pointers_Pct"] * 100).toFixed(1)}</td>
                <td>{stat["FTM"]}</td>
                <td>{stat["FTA"]}</td>
                <td>{(stat["FT_PCT"] * 100).toFixed(1)}</td>
                <td>{stat["ORB"]}</td>
              </tr>
            </tbody>
          </table>
          <table cellSpacing="0" style={{ width: "100%", marginTop: "40px" }}>
            <thead>
              <tr className="temp">
                <th className="stat-th">DRB</th>
                <th className="stat-th">TRB</th>
                <th className="stat-th">AST</th>
                <th className="stat-th">STL</th>
                <th className="stat-th">BLK</th>
                <th className="stat-th">TOV</th>
                <th className="stat-th">PF</th>
                <th className="stat-th">PTS</th>
                <th className="stat-th">PW</th>
                <th className="stat-th">PL</th>
                <th className="stat-th">MOV</th>
                <th className="stat-th">SOS</th>
                <th className="stat-th">SRS</th>
                <th className="stat-th">ORtg</th>
                <th className="stat-th">DRtg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stat["DRB"]}</td>
                <td>{stat["TRB"]}</td>
                <td>{stat["AST"]}</td>
                <td>{stat["STL"]}</td>
                <td>{stat["BLK"]}</td>
                <td>{stat["TOV"]}</td>
                <td>{stat["PF"]}</td>
                <td>{stat["PTS"]}</td>
                <td>{stat["PW"]}</td>
                <td>{stat["PL"]}</td>
                <td>{stat["MOV"]}</td>
                <td>{stat["SOS"]}</td>
                <td>{stat["SRS"]}</td>
                <td>{stat["ORtg"]}</td>
                <td>{stat["DRtg"]}</td>
              </tr>
            </tbody>
          </table>
          <table
            cellSpacing="0"
            style={{ width: "100%", marginTop: "40px", marginBottom: "35px" }}
          >
            <thead>
              <tr className="temp">
                <th className="stat-th">PACE</th>
                <th className="stat-th">FTr</th>
                <th className="stat-th">3PAR</th>
                <th className="stat-th">eFG%</th>
                <th className="stat-th">TOV%</th>
                <th className="stat-th">ORB%</th>
                <th className="stat-th">FT/FGA</th>
                <th className="stat-th">oFG%</th>
                <th className="stat-th">o3P%</th>
                <th className="stat-th">oORB</th>
                <th className="stat-th">oPTS</th>
                <th className="stat-th">oSTL</th>
                <th className="stat-th">oBLK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stat["PACE"]}</td>
                <td>{stat["FTr"]}</td>
                <td>{stat["Three_PAr"]}</td>
                <td>{stat["OFF_eFG_PCT"]}</td>
                <td>{stat["OFF_TOV_PCT"]}</td>
                <td>{stat["ORB_PCT"]}</td>
                <td>{stat["OFF_FT_FGA"]}</td>
                <td>{stat["oFGPCT"]}</td>
                <td>{stat["o3PCT"]}</td>
                <td>{stat["oORB"]}</td>
                <td>{stat["oPTS"]}</td>
                <td>{stat["oSTL"]}</td>
                <td>{stat["oBLK"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
