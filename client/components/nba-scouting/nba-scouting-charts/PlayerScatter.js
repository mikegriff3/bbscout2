import React from "react";
import axios from "axios";

export default class PlayerScatter extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      statOne: "pts",
      statTwo: "mpg",
      position: "All",
      teamPlayers: [],
      showFilter: false,
      players: [],
      pg: true,
      sg: true,
      sf: true,
      pf: true,
      c: true,
      mpg1: true,
      mpg2: true,
      mpg3: true,
      mpg4: true,
      mpg5: true,
      exp1: true,
      exp2: true,
      exp3: true,
      exp4: true,
      exp5: true,
      age1: true,
      age2: true,
      age3: true,
      age4: true,
      age5: true,
      sal1: true,
      sal2: true,
      sal3: true,
      sal4: true,
      sal5: true
    };
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    var playerData = [];
    var scatterData = [];
    if (this.props.players) {
      var data = this.props.players;
      for (var i = 0; i < data.length; i++) {
        if (parseFloat(data[i]["mpg"]) >= 5.0) {
          playerData.push(data[i]);
        }
      }
      this.setState({
        teamPlayers: playerData,
        statOne: this.props.yStat,
        statTwo: this.props.xStat
      });
      for (var j = 0; j < playerData.length; j++) {
        scatterData.push({
          data: [
            [
              parseFloat(playerData[j][this.state.statTwo]),
              parseFloat(playerData[j][this.state.statOne])
            ]
          ],
          name: playerData[j].name,
          color: "rgba(102, 252, 241, 0.7)",
          _symbolIndex: 0,
          id: playerData[j].id
        });
      }
      this.setState(
        {
          data: scatterData,
          statOne: this.props.yStat,
          statTwo: this.props.xStat
        },
        () => {
          this.createChart();
        }
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.xStat !== this.props.xStat ||
      prevProps.yStat !== this.props.yStat ||
      prevProps.players !== this.props.players
    ) {
      console.log("Scatter Props: ", this.props);
      var playerData = [];
      var scatterData = [];
      if (this.props.players) {
        var data = this.props.players;
        for (var i = 0; i < data.length; i++) {
          if (parseFloat(data[i]["mpg"]) >= 5.0) {
            playerData.push(data[i]);
          }
        }
        this.setState(
          {
            teamPlayers: playerData,
            statOne: this.props.yStat,
            statTwo: this.props.xStat
          },
          () => {
            for (var j = 0; j < playerData.length; j++) {
              scatterData.push({
                data: [
                  [
                    parseFloat(playerData[j][this.state.statTwo]),
                    parseFloat(playerData[j][this.state.statOne])
                  ]
                ],
                name: playerData[j].name,
                color: "rgba(102, 252, 241, 0.7)",
                _symbolIndex: 0,
                id: playerData[j].id
              });
            }
          }
        );
        this.setState(
          {
            data: scatterData
            // statOne: this.props.yStat,
            // statTwo: this.props.xStat
          },
          () => {
            this.createChart();
          }
        );
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   var playerData = [];
  //   var scatterData = [];
  //   if (nextProps.players) {
  //     var data = nextProps.players;
  //     for (var i = 0; i < data.length; i++) {
  //       if (parseFloat(data[i]["mpg"]) >= 5.0) {
  //         playerData.push(data[i]);
  //       }
  //     }
  //     this.setState({
  //       teamPlayers: playerData,
  //       statOne: this.props.yStat,
  //       statTwo: this.props.xStat
  //     });
  //     for (var j = 0; j < playerData.length; j++) {
  //       scatterData.push({
  //         data: [
  //           [
  //             parseFloat(playerData[j][this.state.statTwo]),
  //             parseFloat(playerData[j][this.state.statOne])
  //           ]
  //         ],
  //         name: playerData[j].name,
  //         color: "rgba(102, 252, 241, 0.7)",
  //         _symbolIndex: 0,
  //         id: playerData[j].id
  //       });
  //     }
  //     this.setState(
  //       {
  //         data: scatterData,
  //         statOne: this.props.yStat,
  //         statTwo: this.props.xStat
  //       },
  //       () => {
  //         this.createChart();
  //       }
  //     );
  //   }
  // }

  createChart() {
    var chart = Highcharts.chart("containerScatterP", {
      chart: {
        type: "scatter",
        zoomType: "xy",
        backgroundColor: null
      },
      title: {
        text: "Player Stats NBA"
      },
      exporting: { enabled: false },
      subtitle: {
        text: "Players Averaging Over 5 MPG"
      },
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
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: `{point.x} ${this.state.statTwo}, {point.y} ${this.state.statOne}`
          }
        }
      },
      series: this.state.data
    });
  }

  render() {
    return <div className="scout__scatter-chart" id="containerScatterP" />;
  }
}
