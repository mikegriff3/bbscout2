import React from "react";

export default class IsolationPolar extends React.Component {
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
    var highFreq = 28.0;
    var highPPP = 1.25;
    var highPts = 7.0;
    var highEfg = 57.0;
    var highScoreFreq = 55.0;
    var highToFreq = -1.0;
    var highFtFreq = 24.0;
    var highFga = 7.0;

    var freq = this.getGrade(highFreq, this.state.player.freq, 5.0);
    var ppp = this.getGrade(highPPP, this.state.player.ppp, 0.3);
    var pts = this.getGrade(
      highPts,
      (this.state.player.pts / this.props.gp / this.props.min) * 36,
      0.3
    );
    var efg = this.getGrade(highEfg, this.state.player.efg, 24.0);
    var scoreFreq = this.getGrade(
      highScoreFreq,
      this.state.player.scoreFreq,
      24.0
    );
    var toFreq = this.getGrade(
      highToFreq,
      this.state.player.toFreq * -1,
      -36.0
    );
    var ftFreq = this.getGrade(highFtFreq, this.state.player.ftFreq, 0);
    var fga = this.getGrade(
      highFga,
      (this.state.player.fga / this.props.min) * 36,
      0.3
    );
    this.setState(
      {
        freq: freq,
        ppp: ppp,
        pts: pts,
        efg: efg,
        scoreFreq: scoreFreq,
        toFreq: toFreq,
        ftFreq: toFreq,
        fga: fga
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
    var chart = Highcharts.chart("container-column-iso", {
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
          pointInterval: 45,
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
              y: this.state.freq.Grade,
              color: this.state.freq.Color,
              borderColor: this.state.freq.ColorStroke,
              borderWidth: 3,
              name: "Freq%",
              stat: this.state.player.freq
            },
            {
              y: this.state.ppp.Grade,
              color: this.state.ppp.Color,
              borderColor: this.state.ppp.ColorStroke,
              borderWidth: 3,
              name: "PPP",
              stat: this.state.player.ppp
            },
            {
              y: this.state.pts.Grade,
              color: this.state.pts.Color,
              borderColor: this.state.pts.ColorStroke,
              borderWidth: 3,
              name: "PTS",
              stat: (this.state.player.pts / this.props.gp).toFixed(1),
              per36: (
                (this.state.player.pts / this.props.gp / this.props.min) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.efg.Grade,
              color: this.state.efg.Color,
              borderColor: this.state.efg.ColorStroke,
              borderWidth: 3,
              name: "eFG%",
              stat: this.state.player.efg
            },
            {
              y: this.state.scoreFreq.Grade,
              color: this.state.scoreFreq.Color,
              borderColor: this.state.scoreFreq.ColorStroke,
              borderWidth: 3,
              name: "Score Freq.",
              stat: this.state.player.scoreFreq
            },
            {
              y: this.state.toFreq.Grade,
              color: this.state.toFreq.Color,
              borderColor: this.state.toFreq.ColorStroke,
              borderWidth: 3,
              name: "TOV Freq.",
              stat: this.state.player.toFreq
            },
            {
              y: this.state.ftFreq.Grade,
              color: this.state.ftFreq.Color,
              borderColor: this.state.ftFreq.ColorStroke,
              borderWidth: 3,
              name: "FT Freq.",
              stat: this.state.player.ftFreq
            },
            {
              y: this.state.fga.Grade,
              color: this.state.fga.Color,
              borderColor: this.state.fga.ColorStroke,
              borderWidth: 3,
              name: "FGA",
              stat: this.state.player.fga,
              per36: ((this.state.player.fga / this.props.min) * 36).toFixed(1)
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
          id="container-column-iso"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
