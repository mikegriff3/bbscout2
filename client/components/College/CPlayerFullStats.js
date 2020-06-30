import React from "react";
import { Pointer } from "highcharts";

export default class CPlayerFullStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderAll: false,
      seasonsSorted: false,
      seasons: [],
      showAllStats: false,
    };
    this.renderAllSeasons = this.renderAllSeasons.bind(this);
    this.renderThreeSeasons = this.renderThreeSeasons.bind(this);
    this.handleStatsClick = this.handleStatsClick.bind(this);
  }

  componentDidMount() {
    let seasons = this.props.seasons;
    seasons[seasons.length - 1].year = 2020;
    seasons.sort(function (a, b) {
      return parseFloat(a.year) - parseFloat(b.year);
    });
    this.setState({ seasonsSorted: true, seasons: seasons });
  }

  componentWillReceiveProps(nextProps) {
    let seasons = nextProps.seasons;
    seasons[seasons.length - 1].year = 2020;
    seasons.sort(function (a, b) {
      return parseFloat(a.year) - parseFloat(b.year);
    });
    this.setState({ seasonsSorted: true, seasons: seasons });
  }

  renderAllSeasons() {}

  renderThreeSeasons() {}

  handleStatsClick() {
    this.setState({ showAllStats: !this.state.showAllStats });
  }

  render() {
    let seasons = this.state.seasons;
    let array = this.state.seasons.slice(-3);
    if (this.state.showAllStats) {
      array = this.state.seasons;
    }
    return (
      <div>
        <div
          className="full-stat-table-cont"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
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
                <th className="stat-th">YEAR</th>
                <th className="stat-th">TEAM</th>
                <th className="stat-th">GP</th>
                <th className="stat-th">MPG</th>
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
              {array.map(function (season, index) {
                return (
                  <tr className="full-data">
                    <td>{season["year"]}</td>
                    <td>{season["team"]}</td>
                    <td>{season["gamesPlayed"]}</td>
                    <td>{season["mpg"]}</td>
                    <td>{season["fgm"]}</td>
                    <td>{season["fga"]}</td>
                    <td>{season["fgPct"]}</td>
                    <td>{season["threePt"]}</td>
                    <td>{season["threePtAtt"]}</td>
                    <td>{season["threePtPct"]}</td>
                    <td>{season["twoPt"]}</td>
                    <td>{season["twoPtAtt"]}</td>
                    <td>{season["twoPtPct"]}</td>
                    <td>{season["ft"]}</td>
                    <td>{season["fta"]}</td>
                    <td>{season["freeThrowPct"]}</td>
                    <td>{season["orb"]}</td>
                    <td>{season["drb"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              color: "grey",
              fontSize: "14px",
            }}
          >
            <div style={{ cursor: "pointer" }} onClick={this.handleStatsClick}>
              Show All Seasons
            </div>
          </div>
        </div>
      </div>
    );
  }
}
