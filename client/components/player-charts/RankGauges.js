import React from "react";

export default class RankGauges extends React.Component {
  constructor() {
    super();
    this.state = {
      gauge1: "pts",
      gauge2: "trb",
      gauge3: "ast"
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerRank = this.getPlayerRank.bind(this);
    this.selectG1 = this.selectG1.bind(this);
    this.selectG2 = this.selectG2.bind(this);
    this.selectG3 = this.selectG3.bind(this);
  }

  componentDidMount() {
    if (this.props.positionStats) {
      this.setState({ playerCount: this.props.positionStats.length });
      var gauge1Rank = this.getPlayerRank(this.state.gauge1);
      var gauge2Rank = this.getPlayerRank(this.state.gauge2);
      var gauge3Rank = this.getPlayerRank(this.state.gauge3);
      this.setState(
        {
          gauge1Rank: gauge1Rank,
          gauge2Rank: gauge2Rank,
          gauge3Rank: gauge3Rank
        },
        () => {
          this.createChart();
        }
      );
    }
  }

  createChart() {
    var gaugeOptions = {
      chart: {
        type: "solidgauge",
        backgroundColor: null
      },

      title: null,

      pane: {
        center: ["50%", "50%"],
        size: "100%",
        startAngle: 0,
        endAngle: 360,
        background: {
          backgroundColor: "transparent",
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "circle"
        }
      },

      tooltip: {
        enabled: false
      },
      exporting: {
        enabled: false
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, "rgba(102, 252, 241, 0.5)"],
          [0.5, "rgba(102, 252, 241, 0.5)"],
          [0.9, "rgba(102, 252, 241, 0.5)"]
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 0,
        title: {
          y: -20
        },
        labels: {
          enabled: false
        }
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -23,
            borderWidth: 0,
            useHTML: true
          }
        }
      }
    };

    // The speed gauge
    var chartSpeed = Highcharts.chart(
      "gauge1",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: this.state.playerCount,
          title: {
            text: null
          }
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: "PTS",
            data: [this.state.playerCount + 1 - this.state.gauge1Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:18px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white") +
                `">${this.state.gauge1Rank.rank}${
                  this.state.gauge1Rank.suffix
                }</span><br/>` +
                "</div>"
            },
            tooltip: {
              valueSuffix: " km/h"
            }
          }
        ]
      })
    );

    var chartTwo = Highcharts.chart(
      "gauge2",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: this.state.playerCount,
          title: {
            text: null
          }
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: "PTS",
            data: [this.state.playerCount + 1 - this.state.gauge2Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:18px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white") +
                `">${this.state.gauge2Rank.rank}${
                  this.state.gauge2Rank.suffix
                }</span><br/>` +
                "</div>"
            },
            tooltip: {
              valueSuffix: " km/h"
            }
          }
        ]
      })
    );

    var chartThree = Highcharts.chart(
      "gauge3",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: this.state.playerCount,
          title: {
            text: null
          }
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: "PTS",
            data: [this.state.playerCount + 1 - this.state.gauge3Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:18px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white") +
                `">${this.state.gauge3Rank.rank}${
                  this.state.gauge3Rank.suffix
                }</span><br/>` +
                "</div>"
            },
            tooltip: {
              valueSuffix: " km/h"
            }
          }
        ]
      })
    );
  }

  getPlayerRank(stat) {
    var obj = {};
    var rank;
    var suffix;
    var sorted = this.props.positionStats.sort((a, b) => {
      return parseFloat(b[stat]) - parseFloat(a[stat]);
    });
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].name === this.props.player.name) {
        rank = i + 1;
        if (
          rank === 1 ||
          rank === 21 ||
          rank === 31 ||
          rank === 41 ||
          rank === 51 ||
          rank === 61
        ) {
          suffix = "st";
        } else if (
          rank === 2 ||
          rank === 22 ||
          rank === 32 ||
          rank === 42 ||
          rank === 52 ||
          rank === 62
        ) {
          suffix = "nd";
        } else if (
          rank === 3 ||
          rank === 23 ||
          rank === 33 ||
          rank === 43 ||
          rank === 53 ||
          rank === 63
        ) {
          suffix = "rd";
        } else {
          suffix = "th";
        }
      }
    }
    obj["rank"] = rank;
    obj["suffix"] = suffix;
    return obj;
  }

  selectG1(evt, eventKey) {
    this.setState({ gauge1: eventKey.target.innerHTML }, () => {
      var gauge1Rank = this.getPlayerRank(this.state.gauge1);
      this.setState({ gauge1Rank: gauge1Rank }, () => {
        this.createChart();
      });
    });
  }

  selectG2(evt, eventKey) {
    this.setState({ gauge2: eventKey.target.innerHTML }, () => {
      var gauge2Rank = this.getPlayerRank(this.state.gauge2);
      this.setState({ gauge2Rank: gauge2Rank }, () => {
        this.createChart();
      });
    });
  }

  selectG3(evt, eventKey) {
    this.setState({ gauge3: eventKey.target.innerHTML }, () => {
      var gauge3Rank = this.getPlayerRank(this.state.gauge3);
      this.setState({ gauge3Rank: gauge3Rank }, () => {
        this.createChart();
      });
    });
  }

  render() {
    var headerStyle = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white"
    };
    return (
      <div className="rank-gauge-container">
        <div className="player__gauge-container">
          <div style={headerStyle} className="player__gauge-header">
            Position Rankings
          </div>
        </div>
        <div className="gauge" id="gauge1" />
        <div className="gauge-header">PTS</div>
        <div className="gauge" id="gauge2" />
        <div className="gauge-header">AST</div>
        <div className="gauge" id="gauge3" />
        <div className="gauge-header">REB</div>
      </div>
    );
  }
}
