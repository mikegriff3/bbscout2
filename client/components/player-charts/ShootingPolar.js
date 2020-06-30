import React from "react";

export default class ShootingPolar extends React.Component {
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
    var highDrPts = 9.5;
    var highDrPct = 0.6;
    var highCatchPts = 8.5;
    var highCatchPct = 0.6;
    var highPullPts = 9.5;
    var highPullPct = 0.5;
    var highPaintPct = 0.8;
    var highPostPct = 0.6;
    var highElbowPct = 0.65;

    var drPts = this.getGrade(
      highDrPts,
      (this.state.player.drPts / this.props.min) * 36,
      0
    );
    var drPct = this.getGrade(highDrPct, this.state.player.drPct, 0.33);
    var catchPts = this.getGrade(
      highCatchPts,
      (this.state.player.catchPts / this.props.min) * 36,
      0
    );
    var catchPct = this.getGrade(
      highCatchPct,
      this.state.player.catchPct,
      0.22
    );
    var pullPts = this.getGrade(
      highPullPts,
      (this.state.player.pullPts / this.props.min) * 36,
      0
    );
    var pullPct = this.getGrade(highPullPct, this.state.player.pullPct, 0.22);
    var paintPct = this.getGrade(
      highPaintPct,
      this.state.player.paintPct,
      0.33
    );
    var postPct = this.getGrade(highPostPct, this.state.player.postPct, 0.37);
    var elbowPct = this.getGrade(highElbowPct, this.state.player.elbowPct, 0.4);
    this.setState(
      {
        drPts: drPts,
        drPct: drPct,
        catchPts: catchPts,
        catchPct: catchPct,
        pullPts: pullPts,
        pullPct: pullPct,
        paintPct: paintPct,
        postPct: postPct,
        elbowPct: elbowPct,
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
    var chart = Highcharts.chart("container-column-shooting", {
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
        tickInterval: 36,
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
          pointInterval: 40,
          dataLabels: {
            useHTML: true,
            enabled: true,
            allowOverlap: true,
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
              y: this.state.drPts.Grade - 6,
              temp: this.state.drPts.Grade,
              color: this.state.drPts.Color,
              borderColor: this.state.drPts.ColorStroke,
              borderWidth: 3,
              name: "Drive Pts",
              stat: this.state.player.drPts,
              per36: ((this.state.player.drPts / this.props.min) * 36).toFixed(
                1
              ),
            },
            {
              y: this.state.drPct.Grade - 6,
              temp: this.state.drPct.Grade,
              color: this.state.drPct.Color,
              borderColor: this.state.drPct.ColorStroke,
              borderWidth: 3,
              name: "Drive FG%",
              stat: (this.state.player.drPct * 100).toFixed(1),
            },
            {
              y: this.state.catchPts.Grade - 6,
              temp: this.state.catchPts.Grade,
              color: this.state.catchPts.Color,
              borderColor: this.state.catchPts.ColorStroke,
              borderWidth: 3,
              name: "Catch/Shoot Pts",
              stat: this.state.player.catchPts,
              per36: (
                (this.state.player.catchPts / this.props.min) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.catchPct.Grade - 6,
              temp: this.state.catchPct.Grade,
              color: this.state.catchPct.Color,
              borderColor: this.state.catchPct.ColorStroke,
              borderWidth: 3,
              name: "Catch/Shoot FG%",
              stat: (this.state.player.catchPct * 100).toFixed(1),
            },
            {
              y: this.state.pullPts.Grade - 6,
              temp: this.state.pullPts.Grade,
              color: this.state.pullPts.Color,
              borderColor: this.state.pullPts.ColorStroke,
              borderWidth: 3,
              name: "Pull Up Pts",
              stat: this.state.player.pullPts,
              per36: (
                (this.state.player.pullPts / this.props.min) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.pullPct.Grade - 6,
              temp: this.state.pullPct.Grade,
              color: this.state.pullPct.Color,
              borderColor: this.state.pullPct.ColorStroke,
              borderWidth: 3,
              name: "Pull Up FG%",
              stat: (this.state.player.pullPct * 100).toFixed(1),
            },
            {
              y: this.state.paintPct.Grade - 6,
              temp: this.state.paintPct.Grade,
              color: this.state.paintPct.Color,
              borderColor: this.state.paintPct.ColorStroke,
              borderWidth: 3,
              name: "Paint FG%",
              stat: (this.state.player.paintPct * 100).toFixed(1),
            },
            {
              y: this.state.postPct.Grade - 6,
              temp: this.state.postPct.Grade,
              color: this.state.postPct.Color,
              borderColor: this.state.postPct.ColorStroke,
              borderWidth: 3,
              name: "Post FG%",
              stat: (this.state.player.postPct * 100).toFixed(1),
            },
            {
              y: this.state.elbowPct.Grade - 6,
              temp: this.state.elbowPct.Grade,
              color: this.state.elbowPct.Color,
              borderColor: this.state.elbowPct.ColorStroke,
              borderWidth: 3,
              name: "Elbow FG%",
              stat: (this.state.player.elbowPct * 100).toFixed(1),
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
          id="container-column-shooting"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
