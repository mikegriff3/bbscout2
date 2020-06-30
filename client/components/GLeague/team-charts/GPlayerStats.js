import React from "react";

export default class GPlayerStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var headerStyle2 = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white",
    };
    let array = this.props.players;
    return (
      <div
        className="row"
        style={{
          paddingTop: "40px",
          paddingBottom: "20px",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div
          className="team__chart-title-container"
          style={{ paddingLeft: "80px" }}
        >
          <div style={headerStyle2} className="team__chart-title">
            Player Stats
          </div>
        </div>
        <div
          className="full-stat-table-cont"
          style={{
            paddingLeft: "80px",
            paddingRight: "80px",
            overflowX: "auto",
          }}
        >
          <table
            cellSpacing="0"
            style={{
              width: "100%",
              marginTop: "40px",
              color: "white",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr className="temp">
                <th className="stat-th"></th>
                <th className="stat-th">GP</th>
                <th className="stat-th">MPG</th>
                <th className="stat-th">FG</th>
                <th className="stat-th">FGA</th>
                <th className="stat-th">FG%</th>
                <th className="stat-th">3P</th>
                <th className="stat-th">3PA</th>
                <th className="stat-th">3P%</th>
                <th className="stat-th">FT</th>
                <th className="stat-th">FTA</th>
                <th className="stat-th">FT%</th>
                <th className="stat-th">TOV</th>
                <th className="stat-th">AST</th>
                <th className="stat-th">ORB</th>
                <th className="stat-th">DRB</th>
                <th className="stat-th">PIE</th>
              </tr>
            </thead>
            <tbody>
              {array.map(function (player, index) {
                if (player.gamesPlayed > 0) {
                  return (
                    <tr className="full-data">
                      <td>
                        <a href={`/gleague-player/${player.id}`}>
                          {player["name"]}
                        </a>
                      </td>
                      <td>{player["gamesPlayed"]}</td>
                      <td>{player["mpg"]}</td>
                      <td>{player["fgm"]}</td>
                      <td>{player["fga"]}</td>
                      <td>{player["fgPct"]}</td>
                      <td>{player["threePt"]}</td>
                      <td>{player["threePtAtt"]}</td>
                      <td>{player["threePtPct"]}</td>
                      <td>{player["ft"]}</td>
                      <td>{player["fta"]}</td>
                      <td>{player["freeThrowPct"]}</td>
                      <td>{player["tov"]}</td>
                      <td>{player["ast"]}</td>
                      <td>{player["orb"]}</td>
                      <td>{player["drb"]}</td>
                      <td>{(player["plusMinus"] * 100).toFixed(1)}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
