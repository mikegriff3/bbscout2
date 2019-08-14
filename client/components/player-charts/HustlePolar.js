import React from "react";

export default class HustlePolar extends React.Component {
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
    var highScreenAst = 6.9;
    var highCharges = 0.68;
    var highLooseRec = 2.1;
    var highDeflections = 4.1;
    var highContestTwo = 15.0;
    var highContestThree = 5.3;
    var highContestShot = 16.0;

    var screenAst = this.getGrade(
      highScreenAst,
      (this.state.player.screenAst / this.props.min) * 36,
      0.1
    );
    var chargesDrawn = this.getGrade(
      highCharges,
      (this.state.player.chargesDrawn / this.props.min) * 36,
      0
    );
    var looseBallRec = this.getGrade(
      highLooseRec,
      (this.state.player.looseBallRec / this.props.min) * 36,
      0.5
    );
    var deflections = this.getGrade(
      highDeflections,
      (this.state.player.deflections / this.props.min) * 36,
      0.5
    );
    var contestedTwo = this.getGrade(
      highContestTwo,
      (this.state.player.contestedTwo / this.props.min) * 36,
      1.0
    );
    var contestedThree = this.getGrade(
      highContestThree,
      (this.state.player.contestedThree / this.props.min) * 36,
      1.5
    );
    var contestedShots = this.getGrade(
      highContestShot,
      (this.state.player.contestedShots / this.props.min) * 36,
      3.5
    );
    this.setState(
      {
        screenAst: screenAst,
        chargesDrawn: chargesDrawn,
        looseBallRec: looseBallRec,
        deflections: deflections,
        contestedTwo: contestedTwo,
        contestedThree: contestedThree,
        contestedShots: contestedShots
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
    var chart = Highcharts.chart("container-hustle", {
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
        tickInterval: 51.4,
        labels: {
          enabled: false
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`,
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
          pointInterval: 51.4,
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
              y: this.state.screenAst.Grade,
              color: this.state.screenAst.Color,
              borderColor: this.state.screenAst.ColorStroke,
              borderWidth: 3,
              name: "Screen Ast",
              stat: this.state.player.screenAst,
              per36: (
                (this.state.player.screenAst / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.chargesDrawn.Grade,
              color: this.state.chargesDrawn.Color,
              borderColor: this.state.chargesDrawn.ColorStroke,
              borderWidth: 3,
              name: "Charges Drawn",
              stat: this.state.player.chargesDrawn,
              per36: (
                (this.state.player.chargesDrawn / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.looseBallRec.Grade,
              color: this.state.looseBallRec.Color,
              borderColor: this.state.looseBallRec.ColorStroke,
              borderWidth: 3,
              name: "Loose Ball",
              stat: this.state.player.looseBallRec,
              per36: (
                (this.state.player.looseBallRec / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.deflections.Grade,
              color: this.state.deflections.Color,
              borderColor: this.state.deflections.ColorStroke,
              borderWidth: 3,
              name: "Deflections",
              stat: this.state.player.deflections,
              per36: (
                (this.state.player.deflections / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.contestedTwo.Grade,
              color: this.state.contestedTwo.Color,
              borderColor: this.state.contestedTwo.ColorStroke,
              borderWidth: 3,
              name: "Cont. 2P",
              stat: this.state.player.contestedTwo,
              per36: (
                (this.state.player.contestedTwo / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.contestedThree.Grade,
              color: this.state.contestedThree.Color,
              borderColor: this.state.contestedThree.ColorStroke,
              borderWidth: 3,
              name: "Cont. 3P",
              stat: this.state.player.contestedThree,
              per36: (
                (this.state.player.contestedThree / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.contestedShots.Grade,
              color: this.state.contestedShots.Color,
              borderColor: this.state.contestedShots.ColorStroke,
              borderWidth: 3,
              name: "Cont. Shot",
              stat: this.state.player.contestedShots,
              per36: (
                (this.state.player.contestedShots / this.props.min) *
                36
              ).toFixed(1)
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
        <div id="container-hustle" style={{ height: "30rem", width: "3" }} />
      </div>
    );
  }
}
