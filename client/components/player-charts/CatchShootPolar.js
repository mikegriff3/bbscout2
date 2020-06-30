import React from "react";

export default class CatchShootPolar extends React.Component {
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
    var highFgPct = 0.5;
    var highFgAtt = 9;
    var highPts = 9;
    var highThreeAtt = 6;
    var highThreePct = 0.46;
    var highEfg = 0.67;

    var fgPct = this.getGrade(highFgPct, this.state.player.fgPct, 0.2);
    var fga = this.getGrade(
      highFgAtt,
      (this.state.player.fga / this.props.min) * 36,
      0
    );
    var pts = this.getGrade(
      highPts,
      (this.state.player.pts / this.props.min) * 36,
      0
    );
    var threeAtt = this.getGrade(
      highThreeAtt,
      (this.state.player.threePtAtt / this.props.min) * 36,
      0
    );
    var threePct = this.getGrade(
      highThreePct,
      this.state.player.threePtPct,
      0.25
    );
    var efg = this.getGrade(highEfg, this.state.player.efgPct, 0.41);
    this.setState(
      {
        fgPct: fgPct,
        fga: fga,
        pts: pts,
        threeAtt: threeAtt,
        threePct: threePct,
        efg: efg,
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
    var chart = Highcharts.chart("container-column-catch", {
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
        tickInterval: 60,
        labels: {
          enabled: false,
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0,
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.temp}</span><br/><span>Stat: {point.stat}</span><br/><span>Per36: {point.per36}</span>`,
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
          pointInterval: 60,
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
              y: this.state.fgPct.Grade - 6,
              temp: this.state.fgPct.Grade,
              color: this.state.fgPct.Color,
              borderColor: this.state.fgPct.ColorStroke,
              borderWidth: 3,
              name: "FG%",
              stat: (this.state.player.fgPct * 100).toFixed(1),
            },
            {
              y: this.state.fga.Grade - 6,
              temp: this.state.fga.Grade,
              color: this.state.fga.Color,
              borderColor: this.state.fga.ColorStroke,
              borderWidth: 3,
              name: "FGA",
              stat: this.state.player.fga,
              per36: ((this.state.player.fga / this.props.min) * 36).toFixed(1),
            },
            {
              y: this.state.pts.Grade - 6,
              temp: this.state.pts.Grade,
              color: this.state.pts.Color,
              borderColor: this.state.pts.ColorStroke,
              borderWidth: 3,
              name: "PTS",
              stat: this.state.player.pts,
              per36: ((this.state.player.pts / this.props.min) * 36).toFixed(1),
            },
            {
              y: this.state.threePct.Grade - 6,
              temp: this.state.threePct.Grade,
              color: this.state.threePct.Color,
              borderColor: this.state.threePct.ColorStroke,
              borderWidth: 3,
              name: "3P%",
              stat: (this.state.player.threePtPct * 100).toFixed(1),
            },
            {
              y: this.state.threeAtt.Grade - 6,
              temp: this.state.threeAtt.Grade,
              color: this.state.threeAtt.Color,
              borderColor: this.state.threeAtt.ColorStroke,
              borderWidth: 3,
              name: "3PA",
              stat: this.state.player.threePtAtt,
              per36: (
                (this.state.player.threePtAtt / this.props.min) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.efg.Grade - 6,
              temp: this.state.efg.Grade,
              color: this.state.efg.Color,
              borderColor: this.state.efg.ColorStroke,
              borderWidth: 3,
              name: "eFG%",
              stat: (this.state.player.efgPct * 100).toFixed(1),
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
          id="container-column-catch"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
