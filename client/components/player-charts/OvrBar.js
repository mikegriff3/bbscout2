import React from "react";

export default class OvrBar extends React.Component {
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
    var highPer = 27.0;
    var highWs = 9.0;
    var highWsFourtyEight = 0.3;
    var highVorp = 5.0;
    var highBpm = 8.0;

    var per = this.getGrade(highPer, this.state.player.per, 5.0);
    var ws = this.getGrade(highWs, this.state.player.ws, -1.0);
    var wsFourtyEight = this.getGrade(
      highWsFourtyEight,
      this.state.player.wsFourtyEight,
      -0.03
    );
    var vorp = this.getGrade(highVorp, this.state.player.vorp, -1.0);
    var bpm = this.getGrade(highBpm, this.state.player.bpm, -7.0);
    this.setState(
      {
        per: per,
        ws: ws,
        wsFourtyEight: wsFourtyEight,
        vorp: vorp,
        bpm: bpm
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
    var chart = Highcharts.chart("container-rating-ovr", {
      chart: {
        type: "bar",
        backgroundColor: null
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        categories: ["PER", "WS", "WS/48", "VORP", "BPM"],
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span>`
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
            { y: 80, color: "transparent" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.per.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "PER",
              stat: this.state.player.per
            },
            {
              y: this.state.ws.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "WS",
              stat: this.state.player.ws
            },
            {
              y: this.state.wsFourtyEight.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "WS/48",
              stat: this.state.player.wsFourtyEight
            },
            {
              y: this.state.vorp.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "VORP",
              stat: this.state.player.vorp
            },
            {
              y: this.state.bpm.Grade,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "rgba(96, 128, 0, 0.8)"],
                  [1, "rgba(243, 243, 21, 0.8)"]
                ]
              },
              name: "BPM",
              stat: this.state.player.bpm
            }
          ]
        }
      ]
    });
  }

  render() {
    return (
      <div
        id="container-rating-ovr"
        style={{
          height: "490px"
        }}
      />
    );
  }
}
