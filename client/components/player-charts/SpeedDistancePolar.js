import React from "react";

export default class SpeedDistancePolar extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      this.setState({ player: this.props.player }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.name) {
      this.setState({ player: nextProps.player }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  calculateGrades() {
    var highDistMiles = 2.6;
    var highDistMilesO = 1.45;
    var highDistMilesD = 1.21;
    var highSpeed = 4.9;
    var highSpeedO = 5.6;
    var highSpeedD = 4.7;

    var distMiles = this.getGrade(
      highDistMiles,
      this.state.player.distMiles,
      0.2
    );
    var distMilesO = this.getGrade(
      highDistMilesO,
      this.state.player.distMilesOff,
      0.1
    );
    var distMilesD = this.getGrade(
      highDistMilesD,
      this.state.player.distMilesDef,
      0.1
    );
    var speed = this.getGrade(highSpeed, this.state.player.avgSpeed, 3.6);
    var speedO = this.getGrade(highSpeedO, this.state.player.avgSpeedOff, 3.7);
    var speedD = this.getGrade(highSpeedD, this.state.player.avgSpeedDef, 3.2);
    this.setState(
      {
        distMiles: distMiles,
        distMilesO: distMilesO,
        distMilesD: distMilesD,
        speed: speed,
        speedO: speedO,
        speedD: speedD
      },
      () => {
        this.createChart();
      }
    );
  }

  getGrade(high, actual, min) {
    var playerGrade = {};
    var gradeSlots = 13;
    var adjusted = high - min;
    var gradeScale = adjusted / gradeSlots;

    var eighty = high - gradeScale;
    var sevenFive = eighty - gradeScale;
    var seventy = sevenFive - gradeScale;
    var sixFive = seventy - gradeScale;
    var sixty = sixFive - gradeScale;
    var fiveFive = sixty - gradeScale;
    var fifty = fiveFive - gradeScale;
    var fourFive = fifty - gradeScale;
    var fourty = fourFive - gradeScale;
    var threeFive = fourty - gradeScale;
    var thirty = threeFive - gradeScale;
    var twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade["Grade"] = 80;
      playerGrade["Color"] = "rgba(102, 252, 241, 0.5)";
      playerGrade["ColorStroke"] = "rgba(102, 252, 241,1)";
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
      playerGrade["Color"] = "rgba(80, 251, 240, 0.5)";
      playerGrade["ColorStroke"] = "rgba(80, 251, 240,1)";
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
      playerGrade["Color"] = "rgba(55, 251, 238, 0.5)";
      playerGrade["ColorStroke"] = "rgba(55, 251, 238,1)";
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
      playerGrade["Color"] = "rgba(30, 250, 236, 0.5)";
      playerGrade["ColorStroke"] = "rgba(30, 250, 236,1)";
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
      playerGrade["Color"] = "rgba(5, 250, 234, 0.5)";
      playerGrade["ColorStroke"] = "rgba(5, 250, 234,1)";
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
      playerGrade["Color"] = "rgba(5, 225, 210, 0.5)";
      playerGrade["ColorStroke"] = "rgba(5, 225, 210,1)";
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
      playerGrade["Color"] = "rgba(4, 200, 187, 0.5)";
      playerGrade["ColorStroke"] = "rgba(4, 200, 187,1)";
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
      playerGrade["Color"] = "rgba(4, 175, 164, 0.5)";
      playerGrade["ColorStroke"] = "rgba(4, 175, 164,1)";
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
      playerGrade["Color"] = "rgba(3, 150, 140, 0.5)";
      playerGrade["ColorStroke"] = "rgba(3, 150, 140,1)";
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
      playerGrade["Color"] = "rgba(3, 125, 117, 0.5)";
      playerGrade["ColorStroke"] = "rgba(3, 125, 117,1)";
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
      playerGrade["Color"] = "rgba(3, 99, 93, 0.5)";
      playerGrade["ColorStroke"] = "rgba(3, 99, 93,1)";
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
      playerGrade["Color"] = "rgba(2, 74, 69, 0.5)";
      playerGrade["ColorStroke"] = "rgba(2, 74, 69,1)";
    } else {
      playerGrade["Grade"] = 20;
      playerGrade["Color"] = "rgba(1, 50, 46, 0.5)";
      playerGrade["ColorStroke"] = "rgba(1, 50, 46,1)";
    }
    return playerGrade;
  }

  createChart() {
    var chart = Highcharts.chart("container-column-speed", {
      chart: {
        polar: true,
        type: "column",
        backgroundColor: null,
        borderWidth: 0,
        style: {
          fontFamily: "Open Sans Condensed, sans-serif"
        }
      },

      title: {
        text: null
      },

      exporting: {
        enabled: false
      },

      pane: {
        startAngle: 0,
        endAngle: 360
      },

      xAxis: {
        min: 0,
        max: 360,
        tickInterval: 60,
        labels: {
          enabled: false
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span>`,
        style: {
          fontSize: "1.6rem"
        }
      },

      yAxis: {
        min: 0,
        max: 60,
        labels: {
          enabled: false
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0
      },

      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 60,
          dataLabels: {
            useHTML: true,
            enabled: true,
            format:
              '<span class="wheel-label" style="color: white">{point.name}</span>',
            style: {
              fontSize: "1.6rem"
            }
          }
        },
        column: {
          pointPadding: 0,
          groupPadding: 0,
          events: {
            legendItemClick: function() {
              return false;
            }
          }
          //borderWidth: 0.25
        }
      },

      legend: {
        enabled: false
      },

      series: [
        {
          name: "Rating",
          data: [
            {
              y: this.state.distMiles.Grade,
              color: this.state.distMiles.Color,
              borderColor: this.state.distMiles.ColorStroke,
              borderWidth: 3,
              name: "Dist. Miles",
              stat: this.state.player.distMiles
            },
            {
              y: this.state.distMilesO.Grade,
              color: this.state.distMilesO.Color,
              borderColor: this.state.distMilesO.ColorStroke,
              borderWidth: 3,
              name: "Off. Miles",
              stat: this.state.player.distMilesOff
            },
            {
              y: this.state.distMilesD.Grade,
              color: this.state.distMilesD.Color,
              borderColor: this.state.distMilesD.ColorStroke,
              borderWidth: 3,
              name: "Def. Miles",
              stat: this.state.player.distMilesDef
            },
            {
              y: this.state.speed.Grade,
              color: this.state.speed.Color,
              borderColor: this.state.speed.ColorStroke,
              borderWidth: 3,
              name: "Avg Speed",
              stat: this.state.player.avgSpeed
            },
            {
              y: this.state.speedO.Grade,
              color: this.state.speedO.Color,
              borderColor: this.state.speedO.ColorStroke,
              borderWidth: 3,
              name: "Off. Speed",
              stat: this.state.player.avgSpeedOff
            },
            {
              y: this.state.speedD.Grade,
              color: this.state.speedD.Color,
              borderColor: this.state.speedD.ColorStroke,
              borderWidth: 3,
              name: "Def. Speed",
              stat: this.state.player.avgSpeedDef
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          id="container-column-speed"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
