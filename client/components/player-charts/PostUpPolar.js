import React from "react";

export default class PostUpPolar extends React.Component {
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
    var highAst = 0.2;
    var highFg = 0.55;
    var highFt = 0.9;
    var highPass = 0.5;
    var highPf = 0.1;
    var highPostUps = 12.0;
    var highPts = 8.0;
    var highPtsPct = 0.7;
    var highTov = -0.03;

    var ast = this.getGrade(highAst, this.state.player.astPct, 0.02);
    var fg = this.getGrade(highFg, this.state.player.fgPct, 0.26);
    var ft = this.getGrade(highFt, this.state.player.ftPct, 0.5);
    var pass = this.getGrade(highPass, this.state.player.passPct, 0.1);
    var pf = this.getGrade(highPf, this.state.player.pfPct, 0);
    var postUps = this.getGrade(
      highPostUps,
      (this.state.player.postUps / this.props.min) * 36,
      0
    );
    var pts = this.getGrade(
      highPts,
      (this.state.player.pts / this.props.min) * 36,
      0
    );
    var ptsPct = this.getGrade(highPtsPct, this.state.player.ptsPct, 0);
    var tovPct = this.getGrade(highTov, this.state.player.tovPct * -1, -0.11);
    this.setState(
      {
        ast: ast,
        fg: fg,
        ft: ft,
        pass: pass,
        pf: pf,
        postUps: postUps,
        pts: pts,
        ptsPct: ptsPct,
        tovPct: tovPct
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
    var chart = Highcharts.chart("container-column-post", {
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
        tickInterval: 45,
        labels: {
          enabled: false
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span><br/><span>Per36: {point.per36}</span>`,
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
          pointInterval: 40,
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
              y: this.state.ast.Grade,
              color: this.state.ast.Color,
              borderColor: this.state.ast.ColorStroke,
              borderWidth: 3,
              name: "Ast%",
              stat: this.state.player.astPct
            },
            {
              y: this.state.fg.Grade,
              color: this.state.fg.Color,
              borderColor: this.state.fg.ColorStroke,
              borderWidth: 3,
              name: "FG%",
              stat: this.state.player.fgPct
            },
            {
              y: this.state.ft.Grade,
              color: this.state.ft.Color,
              borderColor: this.state.ft.ColorStroke,
              borderWidth: 3,
              name: "FT%",
              stat: this.state.player.ftPct
            },
            {
              y: this.state.pass.Grade,
              color: this.state.pass.Color,
              borderColor: this.state.pass.ColorStroke,
              borderWidth: 3,
              name: "Pass%",
              stat: this.state.player.passPct
            },
            {
              y: this.state.pf.Grade,
              color: this.state.pf.Color,
              borderColor: this.state.pf.ColorStroke,
              borderWidth: 3,
              name: "PF%",
              stat: (this.state.player.pfPct * 100).toFixed(1)
            },
            {
              y: this.state.postUps.Grade,
              color: this.state.postUps.Color,
              borderColor: this.state.postUps.ColorStroke,
              borderWidth: 3,
              name: "Post Ups",
              stat: this.state.player.postUps,
              per36: (
                (this.state.player.postUps / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.ptsPct.Grade,
              color: this.state.ptsPct.Color,
              borderColor: this.state.ptsPct.ColorStroke,
              borderWidth: 3,
              name: "Pts%",
              stat: (this.state.player.ptsPct * 100).toFixed(1)
            },
            {
              y: this.state.pts.Grade,
              color: this.state.pts.Color,
              borderColor: this.state.pts.ColorStroke,
              borderWidth: 3,
              name: "Pts",
              stat: this.state.player.pts,
              per36: ((this.state.player.pts / this.props.min) * 36).toFixed(1)
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              borderColor: this.state.tovPct.ColorStroke,
              borderWidth: 3,
              name: "Tov%",
              stat: (this.state.player.tovPct * 100).toFixed(1)
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
          id="container-column-post"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
