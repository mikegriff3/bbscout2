import React from "react";

export default class OvrPolar extends React.Component {
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
    var highPer = 27.0;
    var highWs = 9.0;
    var highWsFourtyEight = 0.3;
    var highDbpm = 5.5;
    var highDws = 2.5;
    var highVorp = 5.0;
    var highBpm = 8.0;
    var highOws = 7.0;
    var highObpm = 7.0;

    var per = this.getGrade(highPer, this.state.player.per, 5.0);
    var ws = this.getGrade(highWs, this.state.player.ws, -1.0);
    var wsFourtyEight = this.getGrade(
      highWsFourtyEight,
      this.state.player.wsFourtyEight,
      -0.03
    );
    var dbpm = this.getGrade(highDbpm, this.state.player.dbpm, -4);
    var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var vorp = this.getGrade(highVorp, this.state.player.vorp, -1.0);
    var bpm = this.getGrade(highBpm, this.state.player.bpm, -7.0);
    var ows = this.getGrade(highOws, this.state.player.ows, -2.0);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -6.0);
    this.setState(
      {
        per: per,
        ws: ws,
        wsFourtyEight: wsFourtyEight,
        vorp: vorp,
        bpm: bpm,
        ows: ows,
        dws: dws,
        obpm: obpm,
        dbpm: dbpm
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
    var chart = Highcharts.chart("container-column-ovr", {
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span>`,
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
              y: this.state.per.Grade,
              color: this.state.per.Color,
              borderColor: this.state.per.ColorStroke,
              borderWidth: 3,
              name: "PER",
              stat: this.state.player.per
            },
            {
              y: this.state.ws.Grade,
              color: this.state.ws.Color,
              borderColor: this.state.ws.ColorStroke,
              borderWidth: 3,
              name: "WS",
              stat: this.state.player.ws
            },
            {
              y: this.state.wsFourtyEight.Grade,
              color: this.state.wsFourtyEight.Color,
              borderColor: this.state.wsFourtyEight.ColorStroke,
              borderWidth: 3,
              name: "WS/48",
              stat: this.state.player.wsFourtyEight
            },
            {
              y: this.state.vorp.Grade,
              color: this.state.vorp.Color,
              borderColor: this.state.vorp.ColorStroke,
              borderWidth: 3,
              name: "VORP",
              stat: this.state.player.vorp
            },
            {
              y: this.state.bpm.Grade,
              color: this.state.bpm.Color,
              borderColor: this.state.bpm.ColorStroke,
              borderWidth: 3,
              name: "BPM",
              stat: this.state.player.bpm
            },
            {
              y: this.state.dws.Grade,
              color: this.state.dws.Color,
              borderColor: this.state.dws.ColorStroke,
              borderWidth: 3,
              name: "DWS",
              stat: this.state.player.dws
            },
            {
              y: this.state.dbpm.Grade,
              color: this.state.dbpm.Color,
              borderColor: this.state.dbpm.ColorStroke,
              borderWidth: 3,
              name: "DBPM",
              stat: this.state.player.dbpm
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
          id="container-column-ovr"
          style={{ height: "30rem", width: "3" }}
        />
      </div>
    );
  }
}
