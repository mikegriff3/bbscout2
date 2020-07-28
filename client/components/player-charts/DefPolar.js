import React from "react";

export default class DefPolar extends React.Component {
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
    var highBlkPct = 6.5;
    var highStlPct = 3.0;
    var highDrbPct = 36.0;
    var highDbpm = 4.0;
    var highDws = 3.3;
    var highDrb = 11.0;
    var highStl = 2.4;
    var highBlk = 2.4;
    var highPf = 0;

    if (
      this.state.player.position === "PG" ||
      this.state.player.position === "SG"
    ) {
      highBlk = 1.2;
    }
    if (this.state.player.position === "SF") {
      highBlk = 1.5;
    }

    var blkPct = this.getGrade(highBlkPct, this.state.player.blkPct, 0);
    var stlPct = this.getGrade(highStlPct, this.state.player.stlPct, 0);
    var drbPct = this.getGrade(highDrbPct, this.state.player.drbPct, 5);
    var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var drb = this.getGrade(
      highDrb,
      (this.state.player.drb / this.state.player.mpg) * 36,
      1
    );
    var stl = this.getGrade(
      highStl,
      (this.state.player.stl / this.state.player.mpg) * 36,
      0
    );
    var blk = this.getGrade(
      highBlk,
      (this.state.player.blk / this.state.player.mpg) * 36,
      0
    );
    var dbpm = this.getGrade(highDbpm, this.state.player.dbpm, -4);
    var pf = this.getGrade(
      highPf,
      (this.state.player.pf / this.state.player.mpg) * 36 * -1,
      -6.0
    );
    this.setState(
      {
        blkPct: blkPct,
        stlPct: stlPct,
        drbPct: drbPct,
        drb: drb,
        stl: stl,
        blk: blk,
        dbpm: dbpm,
        dws: dws,
        pf: pf,
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
    var chart = Highcharts.chart("container-column-def", {
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
        tickInterval: 45,
        labels: {
          enabled: false,
        },
        gridLineColor: "grey",
        minorGridLineWidth: 0,
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.temp}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`,
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
              y: this.state.blkPct.Grade - 6,
              temp: this.state.blkPct.Grade,
              color: this.state.blkPct.Color,
              borderColor: this.state.blkPct.ColorStroke,
              borderWidth: 3,
              name: "Blk%",
              stat: this.state.player.blkPct,
            },
            {
              y: this.state.stlPct.Grade - 6,
              temp: this.state.stlPct.Grade,
              color: this.state.stlPct.Color,
              borderColor: this.state.stlPct.ColorStroke,
              borderWidth: 3,
              name: "Stl%",
              stat: this.state.player.stlPct,
            },
            {
              y: this.state.drbPct.Grade - 6,
              temp: this.state.drbPct.Grade,
              color: this.state.drbPct.Color,
              borderColor: this.state.drbPct.ColorStroke,
              borderWidth: 3,
              name: "Drb%",
              stat: this.state.player.drbPct,
            },
            {
              y: this.state.drb.Grade - 6,
              temp: this.state.drb.Grade,
              color: this.state.drb.Color,
              borderColor: this.state.drb.ColorStroke,
              borderWidth: 3,
              name: "Drb",
              stat: this.state.player.drb,
              per36: (
                (this.state.player.drb / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.stl.Grade - 6,
              temp: this.state.stl.Grade,
              color: this.state.stl.Color,
              borderColor: this.state.stl.ColorStroke,
              borderWidth: 3,
              name: "Stl",
              stat: this.state.player.stl,
              per36: (
                (this.state.player.stl / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.blk.Grade - 6,
              temp: this.state.blk.Grade,
              color: this.state.blk.Color,
              borderColor: this.state.blk.ColorStroke,
              borderWidth: 3,
              name: "Blk",
              stat: this.state.player.blk,
              per36: (
                (this.state.player.blk / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.pf.Grade - 6,
              temp: this.state.pf.Grade,
              color: this.state.pf.Color,
              borderColor: this.state.pf.ColorStroke,
              borderWidth: 3,
              name: "Pf",
              stat: this.state.player.pf,
              per36: (
                (this.state.player.pf / this.state.player.mpg) *
                36
              ).toFixed(1),
            },
            {
              y: this.state.dbpm.Grade - 6,
              temp: this.state.dbpm.Grade,
              color: this.state.dbpm.Color,
              borderColor: this.state.dbpm.ColorStroke,
              borderWidth: 3,
              name: "DBPM",
              stat: this.state.player.dbpm,
            },
            {
              y: this.state.dws.Grade - 6,
              temp: this.state.dws.Grade,
              color: this.state.dws.Color,
              borderColor: this.state.dws.ColorStroke,
              borderWidth: 3,
              name: "DWS",
              stat: this.state.player.dws,
            },
          ],
          pointPlacement: "on",
        },
      ],
    });
  }

  render() {
    return (
      <div style={{ position: "relative", width: "100%", height: "525px" }}>
        <div
          id="container-column-def"
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
