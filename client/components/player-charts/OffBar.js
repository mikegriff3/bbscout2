import React from "react";

export default class OffBar extends React.Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      this.setState({ player: this.props.player }, () => {
        this.calculateGrades();
      });
    }
  }

  calculateGrades() {
    var highPoints = 27;
    var highAst = 9.5;
    var highReb = 4.6;
    var highFT = 0.94;
    var highThree = 0.45;
    var highTwo = 0.68;

    var highAstPct = 43.0;
    var highOrbPct = 14.5;
    var highFg = 0.62;
    var highTovPct = -5.0;
    var highUsgPct = 33.0;
    var highObpm = 7.5;
    var highOws = 7.0;

    var scoring = this.getGrade(
      highPoints,
      (this.state.player.pts / this.state.player.mpg) * 36,
      7
    );
    var ast = this.getGrade(
      highAst,
      (this.state.player.ast / this.state.player.mpg) * 36,
      1
    );
    var reb = this.getGrade(
      highReb,
      (this.state.player.orb / this.state.player.mpg) * 36,
      0
    );
    var ft = this.getGrade(highFT, this.state.player.freeThrowPct, 0.42);
    var threePoint = this.getGrade(
      highThree,
      this.state.player.threePtPct,
      0.2
    );
    var twoPoint = this.getGrade(highTwo, this.state.player.twoPtPct, 0.25);

    var astPct = this.getGrade(highAstPct, this.state.player.astPct, 4.0);
    var orbPct = this.getGrade(highOrbPct, this.state.player.orbPct, 0.5);
    var fg = this.getGrade(highFg, this.state.player.efgPct, 0.28);
    var tovPct = this.getGrade(
      highTovPct,
      this.state.player.tovPct * -1,
      -23.0
    );
    var usgPct = this.getGrade(highUsgPct, this.state.player.usgPct, 10);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -4.5);
    var ows = this.getGrade(highOws, this.state.player.ows, -1.0);
    this.setState(
      {
        scoring: scoring,
        ast: ast,
        reb: reb,
        ft: ft,
        threePoint: threePoint,
        twoPoint: twoPoint,
        astPct: astPct,
        orbPct: orbPct,
        tovPct: tovPct,
        fg: fg,
        usgPct: usgPct,
        obpm: obpm,
        ows: ows,
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
      playerGrade["Color"] = "#1abded";
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
      playerGrade["Color"] = "#00a3c4";
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
      playerGrade["Color"] = "#00c7a2";
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
      playerGrade["Color"] = "#56ce00";
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
      playerGrade["Color"] = "#b4d800";
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
      playerGrade["Color"] = "#b3d800";
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
      playerGrade["Color"] = "#ffdc00";
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
      playerGrade["Color"] = "#fac600";
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
      playerGrade["Color"] = "#f0780d";
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
      playerGrade["Color"] = "#f53300";
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
      playerGrade["Color"] = "#da000b";
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
      playerGrade["Color"] = "#da000c";
    } else {
      playerGrade["Grade"] = 20;
      playerGrade["Color"] = "#b8000b";
    }
    return playerGrade;
  }

  createChart() {
    var chart = Highcharts.chart("container-rating-off", {
      chart: {
        type: "bar",
        backgroundColor: null,
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      exporting: {
        enabled: false,
      },
      xAxis: {
        categories: [
          "PTS",
          "ORB",
          "AST",
          "3P%",
          "2P%",
          "FT%",
          "AST%",
          "ORB%",
          "TOV%",
          "eFG%",
          "USG%",
          "OBPM",
          "OWS",
        ],
        title: {
          text: null,
        },
        style: {
          fontSize: "24px",
        },
      },
      yAxis: {
        min: 18,
        max: 80,
        title: {
          text: null,
          align: "high",
        },
        labels: {
          overflow: "justify",
          enabled: false,
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            style: {
              color: "white",
            },
          },
          grouping: false,
        },
        series: {
          borderRadius: 10,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "Possible",
          dataLabels: false,
          data: [
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
            { y: 80, color: "transparent" },
          ],
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.scoring.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              stat: this.state.player.pts,
              per36: (
                (this.state.player.pts / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.reb.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              stat: this.state.player.orb,
              per36: (
                (this.state.player.orb / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.ast.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              stat: this.state.player.ast,
              per36: (
                (this.state.player.ast / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.threePoint.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              stat: this.state.player.threePtPct,
            },
            {
              y: this.state.twoPoint.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              stat: this.state.player.twoPtPct,
            },
            {
              y: this.state.ft.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              stat: this.state.player.freeThrowPct,
            },
            {
              y: this.state.astPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "Ast%",
              stat: this.state.player.astPct,
            },
            {
              y: this.state.orbPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "Orb%",
              stat: this.state.player.orbPct,
            },
            {
              y: this.state.fg.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "eFG%",
              stat: this.state.player.efgPct,
            },
            {
              y: this.state.tovPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "Tov%",
              stat: this.state.player.tovPct,
            },
            {
              y: this.state.usgPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "USG%",
              stat: this.state.player.usgPct,
            },
            {
              y: this.state.obpm.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "OBPM",
              stat: this.state.player.obpm,
            },
            {
              y: this.state.ows.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"],
                ],
              },
              name: "OWS",
              stat: this.state.player.ows,
            },
          ],
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 525,
            },
          },
        ],
      },
    });
  }

  render() {
    return (
      <div style={{ position: "relative", width: "100%", height: "525px" }}>
        <div
          id="container-rating-off"
          style={{
            position: "absolute",
            width: "100%",
            height: "525px",
          }}
        />
      </div>
    );
  }
}
