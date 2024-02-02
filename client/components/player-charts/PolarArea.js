import React from "react";

export default class PolarArea extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      // var areaColor = "#eee";
      // if (
      //   this.props.colors.Color_Main === "#000" ||
      //   this.props.colors.Color_Main === "#000000"
      // ) {
      //   areaColor = this.props.colors.Color_Sec;
      // } else {
      //   areaColor = this.props.colors.Color_Sec;
      // }
      this.setState({ player: this.props.player, colors: "#eee" }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.name) {
      // var areaColor = "#eee";
      // if (
      //   nextProps.colors.Color_Main === "#000" ||
      //   nextProps.colors.Color_Main === "#000000"
      // ) {
      //   areaColor = nextProps.colors.Color_Sec;
      // } else {
      //   areaColor = nextProps.colors.Color_Sec;
      // }
      this.setState({ player: nextProps.player, colors: "#eee" }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  calculateGrades() {
    var highPoints = 27;
    var highAst = 9.5;
    var highReb = 12;
    var highStl = 2.4;
    var highBlk = 2.4;
    var highFT = 0.94;
    var highThree = 0.46;
    var highTwo = 0.65;

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
      (this.state.player.trb / this.state.player.mpg) * 36,
      1
    );
    var stl = this.getGrade(
      highStl,
      (this.state.player.stl / this.state.player.mpg) * 36,
      0.3
    );
    var blk = this.getGrade(
      highBlk,
      (this.state.player.blk / this.state.player.mpg) * 36,
      0
    );
    var ft = this.getGrade(highFT, this.state.player.freeThrowPct, 0.42);
    var threePoint = this.getGrade(
      highThree,
      this.state.player.threePtPct,
      0.2
    );
    var twoPoint = this.getGrade(highTwo, this.state.player.twoPtPct, 0.25);
    this.setState(
      {
        scoring: scoring,
        ast: ast,
        reb: reb,
        stl: stl,
        blk: blk,
        threePoint: threePoint,
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
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
    } else {
      playerGrade["Grade"] = 20;
    }
    return playerGrade;
  }

  createChart() {
    var chart = Highcharts.chart("container-polar2", {
      chart: {
        polar: true,
        type: "area",
        backgroundColor: null,
        style: {
          fontFamily: "Open Sans Condensed, sans-serif",
          fontSize: "24px",
        },
      },

      title: {
        text: null,
        x: 0,
      },

      exporting: {
        enabled: false,
      },

      pane: {
        size: "80%",
      },

      xAxis: {
        categories: [
          "Scoring",
          "Rebounding",
          "Playmaking",
          "3P%",
          "Blocks",
          "Steals",
        ],
        tickmarkPlacement: "on",
        lineWidth: 0,
        gridLineColor: "grey",
      },

      yAxis: {
        gridLineInterpolation: "polygon",
        lineWidth: 0,
        gridLineColor: "#C0C0C0",
        min: 15,
        max: 80,
        tickInterval: 10,
        labels: {
          enabled: false,
        },
        gridLineColor: "grey",
      },

      tooltip: {
        shared: false,
        pointFormat:
          '<span style="color:"black">{series.name}: <b>{point.y:,.0f}</b><br/>',
      },

      legend: {
        align: "right",
        verticalAlign: "top",
        y: 70,
        layout: "vertical",
        enabled: false,
      },

      series: [
        {
          name: "Player Grade",
          data: [
            this.state.scoring.Grade,
            this.state.reb.Grade,
            this.state.ast.Grade,
            this.state.threePoint.Grade,
            this.state.blk.Grade,
            this.state.stl.Grade,
          ],
          pointPlacement: "on",
          color: `${this.state.colors}`,
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <div id="container-polar2" style={{ height: "30rem" }} />
      </div>
    );
  }
}
