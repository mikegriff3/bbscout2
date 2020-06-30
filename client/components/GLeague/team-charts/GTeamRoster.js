import React from "react";

export default class GTeamRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffensiveRating = this.getOffensiveRating.bind(this);
    this.getDefensiveRating = this.getDefensiveRating.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.renderGradeBar = this.renderGradeBar.bind(this);
  }

  componentDidMount() {
    let arr = this.props.players.slice();
    for (let i = 0; i < arr.length; i++) {
      arr[i].ovrGrade = this.getOverallRating(arr[i]);
      arr[i].offGrade = this.getOffensiveRating(arr[i]);
      arr[i].defGrade = this.getDefensiveRating(arr[i]);
    }
    var sorted = arr.sort((a, b) => {
      return parseFloat(b["ovrGrade"]) - parseFloat(a["ovrGrade"]);
    });
    this.setState({ players: sorted });
  }

  getOverallRating(player) {
    var pie = parseFloat(player.plusMinus * 100);
    var pieRating = (100 / 20) * (pie - 20) + 100;
    return this.getGrade(100, 0, pieRating);
  }

  getOffensiveRating(player) {
    var ORtg = parseFloat(player.obpm);
    var offRating = (100 / 38) * (ORtg - 118) + 100;
    return this.getGrade(100, 0, offRating);
  }

  getDefensiveRating(player) {
    var DRtg = parseFloat(player.dbpm) * -1;
    var defRating = (100 / 30) * (DRtg + 90) + 100;
    return this.getGrade(100, 0, defRating);
  }

  getGrade(high, min, actual) {
    let playerGrade;
    let gradeSlots = 13;
    let adjusted = high - min;
    let gradeScale = adjusted / gradeSlots;

    let eighty = high - gradeScale;
    let sevenFive = eighty - gradeScale;
    let seventy = sevenFive - gradeScale;
    let sixFive = seventy - gradeScale;
    let sixty = sixFive - gradeScale;
    let fiveFive = sixty - gradeScale;
    let fifty = fiveFive - gradeScale;
    let fourFive = fifty - gradeScale;
    let fourty = fourFive - gradeScale;
    let threeFive = fourty - gradeScale;
    let thirty = threeFive - gradeScale;
    let twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade = 80;
    } else if (actual >= sevenFive) {
      playerGrade = 75;
    } else if (actual >= seventy) {
      playerGrade = 70;
    } else if (actual >= sixFive) {
      playerGrade = 65;
    } else if (actual >= sixty) {
      playerGrade = 60;
    } else if (actual >= fiveFive) {
      playerGrade = 55;
    } else if (actual >= fifty) {
      playerGrade = 50;
    } else if (actual >= fourFive) {
      playerGrade = 45;
    } else if (actual >= fourty) {
      playerGrade = 40;
    } else if (actual >= threeFive) {
      playerGrade = 35;
    } else if (actual >= thirty) {
      playerGrade = 30;
    } else if (actual >= twoFive) {
      playerGrade = 25;
    } else {
      playerGrade = 20;
    }
    return playerGrade;
  }

  renderGradeBar(grade) {
    if (grade === 80) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">80</span>
        </button>
      );
    }
    if (grade === 75) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">75</span>
        </button>
      );
    }
    if (grade === 70) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">70</span>
        </button>
      );
    }
    if (grade === 65) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">65</span>
        </button>
      );
    }
    if (grade === 60) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">60</span>
        </button>
      );
    }
    if (grade === 55) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">55</span>
        </button>
      );
    }
    if (grade === 50) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">50</span>
        </button>
      );
    }
    if (grade === 45) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">45</span>
        </button>
      );
    }
    if (grade === 40) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">40</span>
        </button>
      );
    }
    if (grade === 35) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">35</span>
        </button>
      );
    }
    if (grade === 30) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">30</span>
        </button>
      );
    }
    if (grade === 25) {
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
          }}
          className="player__ratings-oversight-button"
        >
          <span className="player__ratings-rating">25</span>
        </button>
      );
    }
    return (
      <button
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)",
        }}
        className="player__ratings-oversight-button"
      >
        <span className="player__ratings-rating">20</span>
      </button>
    );
  }

  render() {
    let roster = this.state.players;
    return (
      <div className="row" style={{ height: "340px", overflowY: "auto" }}>
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
              style={{ borderBottom: "2px solid white", paddingBottom: "5px" }}
            >
              <th
                className="stat-th"
                style={{ textAlign: "left", paddingLeft: "20px" }}
              >
                Name
              </th>
              <th
                className="stat-th"
                style={{ width: "20%", marginRight: "40px" }}
              >
                Overall
              </th>
              <th
                className="stat-th"
                style={{ width: "20%", marginRight: "40px" }}
              >
                Offense
              </th>
              <th className="stat-th" style={{ width: "20%" }}>
                Defense
              </th>
            </tr>
          </thead>
          <tbody>
            {roster.map((player) => {
              return (
                <tr>
                  <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                    <a href={`/gleague-player/${player.id}`}>{player.name}</a>
                    <span style={{ paddingLeft: ".5rem", fontSize: "10px" }}>
                      {player.position}
                    </span>
                  </td>
                  <td style={{ marginRight: "40px" }}>
                    {this.renderGradeBar(player.ovrGrade)}
                  </td>
                  <td style={{ marginRight: "40px" }}>
                    {this.renderGradeBar(player.offGrade)}
                  </td>
                  <td>{this.renderGradeBar(player.defGrade)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
