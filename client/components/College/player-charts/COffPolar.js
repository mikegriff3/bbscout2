import React from "react";

export default class COffPolar extends React.Component {
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
    var highPoints = 22;
    var highAst = 6.5;
    var highReb = 4.2;
    var highTov = -0.5;
    var highFg = 0.63;
    var highFT = 0.94;
    var highThree = 0.45;
    var highTwo = 0.7;

    if (this.state.player.position === "G") {
      highTwo = 0.58;
      highReb = 3.5;
      highFg = 0.54;
    }

    if (this.state.player.position === "F") {
      highAst = 4.0;
    }

    if (this.state.player.position === "C") {
      highAst = 3.0;
      highThree = 0.36;
    }

    var scoring = this.getGrade(
      highPoints,
      (this.state.player.pts / this.state.player.mpg) * 32,
      4
    );
    var ast = this.getGrade(
      highAst,
      (this.state.player.ast / this.state.player.mpg) * 32,
      0
    );
    var orb = this.getGrade(
      highReb,
      (this.state.player.orb / this.state.player.mpg) * 32,
      0
    );
    var tov = this.getGrade(
      highTov,
      ((this.state.player.tov * -1) / this.state.player.mpg) * 32,
      -4.0
    );
    var fg = this.getGrade(highFg, this.state.player.fgPct, 0.32);
    var ft = this.getGrade(highFT, this.state.player.freeThrowPct, 0.42);
    var threePoint = this.getGrade(
      highThree,
      this.state.player.threePtPct,
      0.2
    );
    var twoPoint = this.getGrade(highTwo, this.state.player.twoPtPct, 0.35);
    this.setState(
      {
        scoring: scoring,
        ast: ast,
        orb: orb,
        tov: tov,
        fg: fg,
        ft: ft,
        threePoint: threePoint,
        twoPoint: twoPoint,
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
    var chart = Highcharts.chart("container-column-off", {
      chart: {
        polar: true,
        type: "column",
        backgroundColor: null,
        borderWidth: 0,
        style: {
          fontFamily: "Open Sans Condensed, sans-serif",
        },
      },

      title: {
        text: null,
      },

      exporting: {
        enabled: false,
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
      },

      xAxis: {
        min: 0,
        max: 360,
        tickInterval: 45,
        labels: {
          enabled: false,
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0,
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.temp}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 32: {point.per32}</span>`,
        style: {
          fontSize: "1.6rem",
        },
      },

      yAxis: {
        min: 0,
        max: 60,
        labels: {
          enabled: false,
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0,
      },

      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 45,
          dataLabels: {
            useHTML: true,
            enabled: true,
            format:
              '<span class="wheel-label" style="color: white">{point.name}</span>',
            style: {
              fontSize: "1.6rem",
            },
          },
        },
        column: {
          //pointPadding: 0,
          groupPadding: 0,
          events: {
            legendItemClick: function () {
              return false;
            },
          },
          //borderWidth: 0.25
        },
      },

      legend: {
        enabled: false,
      },

      series: [
        {
          name: "Rating",
          data: [
            {
              y: this.state.ast.Grade - 6,
              temp: this.state.ast.Grade,
              color: this.state.ast.Color,
              borderColor: this.state.ast.ColorStroke,
              borderWidth: 3,
              name: "Ast",
              stat: this.state.player.ast,
              per32: (
                (this.state.player.ast / this.state.player.mpg) *
                32
              ).toFixed(1),
            },
            {
              y: this.state.tov.Grade - 6,
              temp: this.state.tov.Grade,
              color: this.state.tov.Color,
              borderColor: this.state.tov.ColorStroke,
              borderWidth: 3,
              name: "Tov",
              stat: this.state.player.tov,
              per32: (
                (this.state.player.tov / this.state.player.mpg) *
                32
              ).toFixed(1),
            },
            {
              y: this.state.scoring.Grade - 6,
              temp: this.state.scoring.Grade,
              color: this.state.scoring.Color,
              borderColor: this.state.scoring.ColorStroke,
              borderWidth: 3,
              name: "Scoring",
              stat: this.state.player.pts,
              per32: (
                (this.state.player.pts / this.state.player.mpg) *
                32
              ).toFixed(1),
            },
            {
              y: this.state.fg.Grade - 6,
              temp: this.state.fg.Grade,
              color: this.state.fg.Color,
              borderColor: this.state.fg.ColorStroke,
              borderWidth: 3,
              name: "FG%",
              stat: this.state.player.fgPct,
            },
            {
              y: this.state.twoPoint.Grade - 6,
              temp: this.state.twoPoint.Grade,
              color: this.state.twoPoint.Color,
              borderColor: this.state.twoPoint.ColorStroke,
              borderWidth: 3,
              name: "2P%",
              stat: (this.state.player.twoPtPct * 100).toFixed(1),
              // per36: (this.state.player.pts /
              //   this.state.player.mpg *
              //   36
              // ).toFixed(1)
            },
            {
              y: this.state.threePoint.Grade - 6,
              temp: this.state.threePoint.Grade,
              color: this.state.threePoint.Color,
              borderColor: this.state.threePoint.ColorStroke,
              borderWidth: 3,
              name: "3P%",
              stat: (this.state.player.threePtPct * 100).toFixed(1),
              // per36: (this.state.player.pts /
              //   this.state.player.mpg *
              //   36
              // ).toFixed(1)
            },
            {
              y: this.state.ft.Grade - 6,
              temp: this.state.ft.Grade,
              color: this.state.ft.Color,
              borderColor: this.state.ft.ColorStroke,
              borderWidth: 3,
              name: "FT%",
              stat: (this.state.player.freeThrowPct * 100).toFixed(1),
              // per36: (this.state.player.freeThrowPct /
              //   this.state.player.mpg *
              //   36
              // ).toFixed(1)
            },
            {
              y: this.state.orb.Grade - 6,
              temp: this.state.orb.Grade,
              color: this.state.orb.Color,
              borderColor: this.state.orb.ColorStroke,
              borderWidth: 3,
              name: "Orb",
              stat: this.state.player.orb,
              per32: (
                (this.state.player.orb / this.state.player.mpg) *
                32
              ).toFixed(1),
            },
          ],
          pointPlacement: "on",
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <div
          id="container-column-off"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
