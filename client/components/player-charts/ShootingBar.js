import React from "react";

export default class ShootingBar extends React.Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      this.setState(
        {
          player: this.props.player,
          catch: this.props.catch,
          shooting: this.props.shooting
        },
        () => {
          this.calculateGrades();
        }
      );
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.player.name) {
  //     this.setState(
  //       {
  //         player: nextProps.player,
  //         catch: nextProps.catch,
  //         shooting: nextProps.shooting
  //       },
  //       () => {
  //         this.calculateGrades();
  //       }
  //     );
  //   }
  // }

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
      (this.state.shooting.drPts / this.state.player.mpg) * 36,
      0
    );
    var drPct = this.getGrade(highDrPct, this.state.shooting.drPct, 0.33);
    var catchPts = this.getGrade(
      highCatchPts,
      (this.state.shooting.catchPts / this.state.player.mpg) * 36,
      0
    );
    var catchPct = this.getGrade(
      highCatchPct,
      this.state.shooting.catchPct,
      0.22
    );
    var pullPts = this.getGrade(
      highPullPts,
      (this.state.shooting.pullPts / this.state.player.mpg) * 36,
      0
    );
    var pullPct = this.getGrade(highPullPct, this.state.shooting.pullPct, 0.22);
    var paintPct = this.getGrade(
      highPaintPct,
      this.state.shooting.paintPct,
      0.33
    );
    var postPct = this.getGrade(highPostPct, this.state.shooting.postPct, 0.37);
    var elbowPct = this.getGrade(
      highElbowPct,
      this.state.shooting.elbowPct,
      0.4
    );
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
        elbowPct: elbowPct
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
    var chart = Highcharts.chart("container-rating-shooting", {
      chart: {
        type: "bar",
        backgroundColor: null
      },
      title: {
        text: null
      },
      exporting: {
        enabled: false
      },
      subtitle: {
        text: null
      },
      xAxis: {
        categories: [
          "DRV",
          "DRV%",
          "C&S",
          "C&S%",
          "PU",
          "PU%",
          "PNT%",
          "PST%",
          "EBW%"
        ],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 18,
        max: 80,
        title: {
          text: null,
          align: "high"
        },
        labels: {
          overflow: "justify",
          enabled: false
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0
      },
      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          grouping: false
        },
        series: {
          borderRadius: 10
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
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
            { y: 80, color: "transparent" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.drPts.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Drive Pts",
              stat: this.state.shooting.drPts
            },
            {
              y: this.state.drPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Drive %",
              stat: this.state.shooting.drPct
            },
            {
              y: this.state.catchPts.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Catch+Shoot Pts",
              stat: this.state.shooting.catchPts,
              per36: (
                (this.state.shooting.catchPts / this.state.player.mpg) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.catchPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Catch+Shoot %",
              stat: this.state.shooting.catchPct
            },
            {
              y: this.state.pullPts.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Pull Up Pts",
              stat: this.state.shooting.pullPts
            },
            {
              y: this.state.pullPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Pull Up %",
              stat: this.state.shooting.pullPct
            },
            {
              y: this.state.paintPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Paint %",
              stat: this.state.shooting.paintPct
            },
            {
              y: this.state.postPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Post %",
              stat: this.state.shooting.postPct
            },
            {
              y: this.state.elbowPct.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "Elbow %",
              stat: this.state.shooting.elbowPct
            }
          ]
        }
      ]
    });
  }

  render() {
    return (
      <div
        id="container-rating-shooting"
        style={{
          height: "490px"
        }}
      />
    );
  }
}
