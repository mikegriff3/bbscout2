import React from "react";

export default class GLeagueStandings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      west: [],
      east: [],
    };
  }

  componentDidMount() {
    const east = [
      "Wisconsin Herd",
      "Canton Charge",
      "Maine Red Claws",
      "Lakeland Magic",
      "Grand Rapids Drive",
      "Delaware Blue Coats",
      "Capital City Go-Go",
      "Raptors 905",
      "Fort Wayne Mad Ants",
      "College Park Skyhawks",
      "Long Island Nets",
      "Westchester Knicks",
      "Windy City Bulls",
      "Erie BayHawks",
      "Greensboro Swarm",
    ];

    let teams = this.props.leagueStats;
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].Name === this.props.team.Name) {
        teams[i].standColor = "rgba(102, 252, 241, 0.8)";
      } else {
        teams[i.standColor] = "white";
      }
      teams[i].teamDiff = parseInt(teams[i].W) - parseInt(teams[i].L);
      teams[i].winPct = (
        parseInt(teams[i].W) /
        (parseInt(teams[i].W) + parseInt(teams[i].L))
      ).toFixed(3);
      if (east.includes(teams[i].Name)) {
        teams[i].conference = "East";
      } else {
        teams[i].conference = "West";
      }
    }
    let westArr = teams.filter(function (team) {
      return team.conference === "West";
    });
    let eastArr = teams.filter(function (team) {
      return team.conference === "East";
    });
    let sortedWest = westArr.sort((a, b) => {
      return parseFloat(b["teamDiff"]) - parseFloat(a["teamDiff"]);
    });
    let sortedEast = eastArr.sort((a, b) => {
      return parseFloat(b["teamDiff"]) - parseFloat(a["teamDiff"]);
    });
    for (let j = 0; j < sortedWest.length; j++) {
      if (j == 0) {
        sortedWest[j].gamesBack = "-";
      } else {
        sortedWest[j].gamesBack =
          (sortedWest[0].teamDiff - sortedWest[j].teamDiff) / 2;
      }
    }
    for (let k = 0; k < sortedEast.length; k++) {
      if (k == 0) {
        sortedEast[k].gamesBack = "-";
      } else {
        sortedEast[k].gamesBack =
          (sortedEast[0].teamDiff - sortedEast[k].teamDiff) / 2;
      }
    }
    this.setState({ west: sortedWest, east: sortedEast });
    console.log("WEST: ", sortedWest);
    console.log("EAST: ", sortedEast);
  }

  render() {
    return (
      <div className="row">
        <div
          className="col-sm-6"
          style={{ height: "340px", overflowY: "auto" }}
        >
          <table
            cellSpacing="0"
            style={{
              width: "90%",
              color: "white",
              borderCollapse: "collapse",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid white",
                  paddingBottom: "5px",
                }}
              >
                <th className="stat-th" style={{ textAlign: "left" }}>
                  Western Conference
                </th>
                <th className="stat-th">W</th>
                <th className="stat-th">L</th>
                <th className="stat-th">Pct</th>
                <th className="stat-th">GB</th>
              </tr>
            </thead>
            <tbody>
              {this.state.west.map((team, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "left", color: team.standColor }}>
                      {index + 1}. {team.Name}
                    </td>
                    <td style={{ color: team.standColor }}>{team.W}</td>
                    <td style={{ color: team.standColor }}>{team.L}</td>
                    <td style={{ color: team.standColor }}>{team.winPct}</td>
                    <td style={{ color: team.standColor }}>{team.gamesBack}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="col-sm-6"
          style={{ height: "340px", overflowY: "auto" }}
        >
          <table
            cellSpacing="0"
            style={{
              width: "90%",
              color: "white",
              borderCollapse: "collapse",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid white",
                  paddingBottom: "5px",
                }}
              >
                <th className="stat-th" style={{ textAlign: "left" }}>
                  Eastern Conference
                </th>
                <th className="stat-th">W</th>
                <th className="stat-th">L</th>
                <th className="stat-th">Pct</th>
                <th className="stat-th">GB</th>
              </tr>
            </thead>
            <tbody>
              {this.state.east.map((team, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "left", color: team.standColor }}>
                      {index + 1}. {team.Name}
                    </td>
                    <td style={{ color: team.standColor }}>{team.W}</td>
                    <td style={{ color: team.standColor }}>{team.L}</td>
                    <td style={{ color: team.standColor }}>{team.winPct}</td>
                    <td style={{ color: team.standColor }}>{team.gamesBack}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
