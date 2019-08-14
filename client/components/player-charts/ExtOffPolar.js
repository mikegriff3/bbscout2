import React from "react";

export default class ExtOffPolar extends React.Component {
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
    var highAstPct = 43.0;
    var highOrbPct = 14.5;
    var highFg = 0.62;
    var highTovPct = -5.0;
    var highFtr = 0.63;
    var highThreePar = 0.8;
    var highTsPct = 0.65;
    var highUsgPct = 33.0;
    var highObpm = 7.5;
    var highOws = 7.0;

    var astPct = this.getGrade(highAstPct, this.state.player.astPct, 4.0);
    var orbPct = this.getGrade(highOrbPct, this.state.player.orbPct, 0.5);
    var fg = this.getGrade(highFg, this.state.player.efgPct, 0.35);
    var tovPct = this.getGrade(
      highTovPct,
      this.state.player.tovPct * -1,
      -23.0
    );
    var ftr = this.getGrade(highFtr, this.state.player.ftr, 0.08);
    var threePAr = this.getGrade(highThreePar, this.state.player.threePAr, 0);
    var tsPct = this.getGrade(highTsPct, this.state.player.tsPct, 0.42);
    var usgPct = this.getGrade(highUsgPct, this.state.player.usgPct, 10);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -4.5);
    var ows = this.getGrade(highOws, this.state.player.ows, -1.0);
    this.setState(
      {
        astPct: astPct,
        orbPct: orbPct,
        tovPct: tovPct,
        fg: fg,
        ftr: ftr,
        threePAr: threePAr,
        tsPct: tsPct,
        usgPct: usgPct,
        obpm: obpm,
        ows: ows
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
    var chart = Highcharts.chart("container-column-ext-off", {
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`,
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
          pointInterval: 36,
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
              y: this.state.astPct.Grade,
              color: this.state.astPct.Color,
              borderColor: this.state.astPct.ColorStroke,
              borderWidth: 3,
              name: "Ast%",
              stat: this.state.player.astPct
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              borderColor: this.state.tovPct.ColorStroke,
              borderWidth: 3,
              name: "Tov%",
              stat: this.state.player.tovPct
            },
            {
              y: this.state.orbPct.Grade,
              color: this.state.orbPct.Color,
              borderColor: this.state.orbPct.ColorStroke,
              borderWidth: 3,
              name: "Orb%",
              stat: this.state.player.orbPct
            },
            {
              y: this.state.fg.Grade,
              color: this.state.fg.Color,
              borderColor: this.state.fg.ColorStroke,
              borderWidth: 3,
              name: "eFG%",
              stat: this.state.player.efgPct
            },
            {
              y: this.state.tsPct.Grade,
              color: this.state.tsPct.Color,
              borderColor: this.state.tsPct.ColorStroke,
              borderWidth: 3,
              name: "TS%",
              stat: this.state.player.tsPct
            },
            {
              y: this.state.ftr.Grade,
              color: this.state.ftr.Color,
              borderColor: this.state.ftr.ColorStroke,
              borderWidth: 3,
              name: "FTr",
              stat: this.state.player.ftr
            },
            {
              y: this.state.threePAr.Grade,
              color: this.state.threePAr.Color,
              borderColor: this.state.threePAr.ColorStroke,
              borderWidth: 3,
              name: "3PAr",
              stat: this.state.player.threePAr
            },
            {
              y: this.state.obpm.Grade,
              color: this.state.obpm.Color,
              borderColor: this.state.obpm.ColorStroke,
              borderWidth: 3,
              name: "OBPM",
              stat: this.state.player.obpm
            },
            {
              y: this.state.ows.Grade,
              color: this.state.ows.Color,
              borderColor: this.state.ows.ColorStroke,
              borderWidth: 3,
              name: "OWS",
              stat: this.state.player.ows
            },
            {
              y: this.state.usgPct.Grade,
              color: this.state.usgPct.Color,
              borderColor: this.state.usgPct.ColorStroke,
              borderWidth: 3,
              name: "USG%",
              stat: this.state.player.usgPct
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
          id="container-column-ext-off"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
