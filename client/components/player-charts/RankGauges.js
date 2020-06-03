import React from "react";

export default class RankGauges extends React.Component {
  constructor() {
    super();
    this.state = {
      gauge1: "pts",
      gauge2: "trb",
      gauge3: "ast",
      showMenuOne: false,
      showMenuTwo: false,
      showMenuThree: false
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerRank = this.getPlayerRank.bind(this);
    this.selectG1 = this.selectG1.bind(this);
    this.selectG2 = this.selectG2.bind(this);
    this.selectG3 = this.selectG3.bind(this);
    this.renderMenuOne = this.renderMenuOne.bind(this);
    this.renderMenuTwo = this.renderMenuTwo.bind(this);
    this.renderMenuThree = this.renderMenuThree.bind(this);
    this.handleMenuClickOne = this.handleMenuClickOne.bind(this);
    this.handleMenuClickTwo = this.handleMenuClickTwo.bind(this);
    this.handleMenuClickThree = this.handleMenuClickThree.bind(this);
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

  renderMenuOne() {
    if (this.state.renderMenuOne) {
      return (
        <div className="gauge-menu">
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            pts
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            ast
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            tov
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            astPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            tovPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            usgPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            ftr
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            fgm
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            fga
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            fgPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            threePt
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            threePtAtt
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            twoPt
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            twoPtAtt
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            twoPtPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            threePtPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            ft
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            fta
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            freeThrowPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            efgPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            tsPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            threePAr
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            trb
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            orb
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            drb
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            orbPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            drbPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            trbPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            stl
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            blk
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            stlPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            blkPct
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            mpg
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            pf
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            per
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            ows
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            dws
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            bpm
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            ws
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            obpm
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            dbpm
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            wsFortyEight
          </div>
          <div onClick={e => this.selectG1(e)} className="gauge-menu-item">
            vorp
          </div>
        </div>
      );
    }
  }

  renderMenuTwo() {
    if (this.state.renderMenuTwo) {
      return (
        <div className="gauge-menu">
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            pts
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            ast
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            tov
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            astPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            tovPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            usgPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            ftr
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            fgm
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            fga
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            fgPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            threePt
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            threePtAtt
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            twoPt
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            twoPtAtt
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            twoPtPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            threePtPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            ft
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            fta
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            freeThrowPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            efgPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            tsPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            threePAr
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            trb
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            orb
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            drb
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            orbPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            drbPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            trbPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            stl
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            blk
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            stlPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            blkPct
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            mpg
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            pf
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            per
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            ows
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            dws
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            bpm
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            ws
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            obpm
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            dbpm
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            wsFortyEight
          </div>
          <div onClick={e => this.selectG2(e)} className="gauge-menu-item">
            vorp
          </div>
        </div>
      );
    }
  }

  renderMenuThree() {
    if (this.state.renderMenuThree) {
      return (
        <div className="gauge-menu">
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            pts
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            ast
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            tov
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            astPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            tovPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            usgPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            ftr
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            fgm
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            fga
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            fgPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            threePt
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            threePtAtt
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            twoPt
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            twoPtAtt
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            twoPtPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            threePtPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            ft
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            fta
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            freeThrowPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            efgPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            tsPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            threePAr
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            trb
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            orb
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            drb
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            orbPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            drbPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            trbPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            stl
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            blk
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            stlPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            blkPct
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            mpg
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            pf
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            per
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            ows
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            dws
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            bpm
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            ws
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            obpm
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            dbpm
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            wsFortyEight
          </div>
          <div onClick={e => this.selectG3(e)} className="gauge-menu-item">
            vorp
          </div>
        </div>
      );
    }
  }

  handleMenuClickOne() {
    this.setState({
      renderMenuOne: !this.state.renderMenuOne,
      renderMenuTwo: false,
      renderMenuThree: false
    });
  }

  handleMenuClickTwo() {
    this.setState({
      renderMenuTwo: !this.state.renderMenuTwo,
      renderMenuOne: false,
      renderMenuThree: false
    });
  }

  handleMenuClickThree() {
    this.setState({
      renderMenuThree: !this.state.renderMenuThree,
      renderMenuTwo: false,
      renderMenuOne: false
    });
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
                `">${this.state.gauge1Rank.rank}${this.state.gauge1Rank.suffix}</span><br/>` +
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
                `">${this.state.gauge2Rank.rank}${this.state.gauge2Rank.suffix}</span><br/>` +
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
                `">${this.state.gauge3Rank.rank}${this.state.gauge3Rank.suffix}</span><br/>` +
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
          rank === 61 ||
          rank === 71 ||
          rank === 81 ||
          rank === 91
        ) {
          suffix = "st";
        } else if (
          rank === 2 ||
          rank === 22 ||
          rank === 32 ||
          rank === 42 ||
          rank === 52 ||
          rank === 62 ||
          rank === 72 ||
          rank === 82 ||
          rank === 92
        ) {
          suffix = "nd";
        } else if (
          rank === 3 ||
          rank === 23 ||
          rank === 33 ||
          rank === 43 ||
          rank === 53 ||
          rank === 63 ||
          rank === 73 ||
          rank === 83 ||
          rank === 93
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

  selectG1(eventKey) {
    this.setState({ gauge1: eventKey.target.innerHTML }, () => {
      var gauge1Rank = this.getPlayerRank(this.state.gauge1);
      this.setState({ gauge1Rank: gauge1Rank }, () => {
        this.createChart();
      });
    });
  }

  selectG2(eventKey) {
    this.setState({ gauge2: eventKey.target.innerHTML }, () => {
      var gauge2Rank = this.getPlayerRank(this.state.gauge2);
      this.setState({ gauge2Rank: gauge2Rank }, () => {
        this.createChart();
      });
    });
  }

  selectG3(eventKey) {
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
            Pos. Rankings
          </div>
        </div>
        <div className="gauge" id="gauge1" />
        <div className="gauge-header" onClick={this.handleMenuClickOne}>
          {this.state.gauge1.toUpperCase()}
          {this.renderMenuOne()}
        </div>
        <div className="gauge" id="gauge2" />
        <div className="gauge-header" onClick={this.handleMenuClickTwo}>
          {this.state.gauge2.toUpperCase()}
          {this.renderMenuTwo()}
        </div>
        <div className="gauge" id="gauge3" />
        <div className="gauge-header" onClick={this.handleMenuClickThree}>
          {this.state.gauge3.toUpperCase()}
          {this.renderMenuThree()}
        </div>
      </div>
    );
  }
}
