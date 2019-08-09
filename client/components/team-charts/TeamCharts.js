import React from "react";
import axios from "axios";

export default class TeamCharts extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      statOne: "pts",
      statTwo: "mpg",
      position: "All",
      teamPlayers: [],
      pieStat: "Pts",
      leaderStat: "pts",
      averageStat: "pts"
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerShare = this.getPlayerShare.bind(this);
    this.getColumnData = this.getColumnData.bind(this);
  }

  componentDidMount() {
    var playerData = [];
    var scatterData = [];
    axios
      .get("/api/teams/getPlayerStats", {
        params: {
          team: this.props.team.Name,
          position: this.state.position,
          statOne: this.state.statOne,
          statTwo: this.state.statTwo
        }
      })
      .then(data => {
        var data = data.data;
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (parseInt(data[i]["mpg"]) >= 5) {
            playerData.push(data[i]);
          }
        }
        this.setState({ teamPlayers: playerData });
        for (var j = 0; j < playerData.length; j++) {
          //console.log("J: ", playerData[j].id);
          scatterData.push({
            data: [
              [
                playerData[j][this.state.statTwo],
                playerData[j][this.state.statOne]
              ]
            ],
            name: playerData[j].name,
            color: "rgba(102, 252, 241, 0.8)",
            _symbolIndex: 0,
            id: playerData[j].id
          });
        }
        this.setState({ data: scatterData }, () => {
          this.getColumnData("pts");
          this.getPlayerShare(this.state.pieStat.toLowerCase());
          //this.createChart();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPlayerShare(stat) {
    var total = 0;
    var pieData = [];
    var players = this.state.teamPlayers;
    if (players) {
      players.sort(function(a, b) {
        return b.mpg - a.mpg;
      });
      //console.log("Players: ", players);
      for (var i = 0; i < 10; i++) {
        total += parseFloat(players[i][stat]);
      }
      for (var j = 0; j < 10; j++) {
        var pct = (players[j][stat] / total) * 100;
        var player = [players[j].name, parseFloat(pct.toFixed(1))];
        pieData.push(player);
      }
    }
    this.setState({ pieData: pieData }, () => {
      this.createChart();
    });
  }

  getColumnData(stat) {
    var columnData = [];
    if (this.state.teamPlayers) {
      for (var i = 0; i < this.state.teamPlayers.length; i++) {
        var player = [
          this.state.teamPlayers[i].name,
          parseFloat(this.state.teamPlayers[i][stat])
        ];
        columnData.push(player);
      }
    }
    this.setState({ columnData: columnData }, () => {
      //this.createChart();
    });
  }

  createChart() {
    var chart = Highcharts.chart({
      chart: {
        renderTo: "scatter-container",
        type: "scatter",
        zoomType: "xy",
        backgroundColor: null
      },
      title: {
        text: `Player Stats ${this.props.team.Name}`
      },
      subtitle: {
        text: "Players Averaging Over 5 MPG"
      },
      exporting: { enabled: false },
      xAxis: {
        title: {
          enabled: true,
          text: `${this.state.statTwo}`
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: `${this.state.statOne}`
        }
      },
      legend: {
        enabled: false,
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 100,
        y: 70,
        floating: true,
        backgroundColor:
          (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
          "#FFFFFF",
        borderWidth: 1
      },
      tooltip: {
        useHTML: true,
        style: {
          pointerEvents: "auto"
        }
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: "rgb(100,100,100)"
              }
            }
          },
          cursor: "pointer",
          point: {
            events: {
              click: event => {
                console.log("Event: ", event.point.series.userOptions.id);
                window.location =
                  "/player/" + event.point.series.userOptions.id;
                // this.setState({
                //   name: event.point.series.userOptions.name
                // });
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: `<b>{series.name}</b><br>`,
            pointFormat: `{point.x} ${this.state.statTwo}, {point.y} ${
              this.state.statOne
            }`
          }
        }
      },
      series: this.state.data
    });

    var pieChart = Highcharts.chart({
      chart: {
        renderTo: "pie-container",
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        },
        backgroundColor: null
      },
      title: {
        text: null
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      exporting: { enabled: false },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 35,
          dataLabels: {
            enabled: true,
            format: "{point.name}",
            color: "white"
          }
        }
      },
      series: [
        {
          name: "Team Share",
          data: this.state.pieData
        }
      ]
    });

    var barChart = new Highcharts.Chart({
      chart: {
        renderTo: "bar-container",
        type: "column",
        options3d: {
          enabled: true,
          alpha: 0,
          beta: 10,
          depth: 37,
          viewDistance: 25
        },
        backgroundColor: null
      },
      title: {
        text: `${this.props.team.Name} Stat Averages`
      },
      subtitle: {
        text: ""
      },
      exporting: { enabled: false },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      series: [
        {
          name: `${this.state.averageStat}`,
          color: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1
            },
            stops: [[0, "rgba(204, 0, 153, 0.7)"], [1, "rgba(102, 0, 77,0.7)"]]
          },
          data: this.state.columnData
        }
      ]
    });
  }

  render() {
    var headerStyle1 = {
      backgroundImage:
        "linear-gradient(to right, rgba(210, 255, 77, 0) 0.15%, rgba(210, 255, 77, 0.8) 40%, rgba(210, 255, 77, 0))",
      color: "white",
      cursor: "pointer"
    };
    var headerStyle2 = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white",
      cursor: "pointer"
    };
    var headerStyle3 = {
      backgroundImage:
        "linear-gradient(to right, rgba(204, 0, 153, 0) 0.15%, rgba(204, 0, 153, 0.8) 40%, rgba(204, 0, 153, 0))",
      color: "white",
      cursor: "pointer"
    };
    return (
      <div className="team__chart-section">
        <div className="team__pie-chart-container">
          <div className="team__chart-title-container">
            <div style={headerStyle1} className="team__chart-title">
              Player Shares
            </div>
          </div>
          <div
            className="team__pie-chart"
            id="pie-container"
            style={{
              height: "400px"
            }}
          />
        </div>
        <div className="team__scatter-chart-container">
          <div className="team__chart-title-container">
            <div style={headerStyle2} className="team__chart-title">
              Player Stats
            </div>
          </div>
          <div
            className="team__scatter-chart"
            id="scatter-container"
            style={{
              height: "500px"
            }}
          />
        </div>
        <div className="team__bar-chart-container">
          <div className="team__chart-title-container">
            <div style={headerStyle3} className="team__chart-title">
              Player Comparison
            </div>
          </div>
          <div
            className="team__bar-chart"
            id="bar-container"
            style={{
              height: "500px"
            }}
          />
        </div>
        {/*<div
          id="scatter-container"
          style={{
            height: "400px"
          }}
        />
        <div
          id="bar-container"
          style={{
            height: "400px"
          }}
        />*/}
      </div>
    );
  }
}
