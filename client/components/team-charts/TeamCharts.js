import React from "react";
import axios from "axios";
import PlayerContracts from "./PlayerContracts";

export default class TeamCharts extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      statOne: "pts",
      statTwo: "mpg",
      position: "All",
      teamPlayers: [],
      pieStat: "pts",
      leaderStat: "pts",
      averageStat: "pts",
      renderPie: false,
      xStat: "mpg",
      yStat: "pts",
      barStat: "pts",
      renderBar: false,
      renderScatterX: false,
      renderScatterY: false,
      schedule: []
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerShare = this.getPlayerShare.bind(this);
    this.getColumnData = this.getColumnData.bind(this);
    this.handlePieClick = this.handlePieClick.bind(this);
    this.renderPieMenu = this.renderPieMenu.bind(this);
    this.selectPieStat = this.selectPieStat.bind(this);
    this.handleScatterClickX = this.handleScatterClickX.bind(this);
    this.handleScatterClickY = this.handleScatterClickY.bind(this);
    this.renderScatterMenuX = this.renderScatterMenuX.bind(this);
    this.selectScatterStatX = this.selectScatterStatX.bind(this);
    this.renderScatterMenuY = this.renderScatterMenuY.bind(this);
    this.selectScatterStatY = this.selectScatterStatY.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.renderBarMenu = this.renderBarMenu.bind(this);
    this.selectBarStat = this.selectBarStat.bind(this);
    this.updateColumnData = this.updateColumnData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    let arr = this.props.schedule.slice();
    let newArr = arr.slice(-10);
    for (let k = 0; k < newArr.length; k++) {
      let dateArr = newArr[k].date.split(" ");
      newArr[k].date = dateArr[1] + " " + dateArr[2];
      if (
        (newArr[k].home === this.props.team.Name &&
          parseInt(newArr[k].homePts) > parseInt(newArr[k].visitorPts)) ||
        (newArr[k].visitor === this.props.team.Name &&
          parseInt(newArr[k].visitorPts) > parseInt(newArr[k].homePts))
      ) {
        newArr[k].result = "W";
        newArr[k].color = "green";
      } else {
        newArr[k].result = "L";
        newArr[k].color = "red";
      }
    }
    if (newArr.length > 0) {
      this.setState({
        schedule: newArr
      });
    }
    var playerData = [];
    var scatterData = [];
    axios
      .get("/api/teams/getPlayerStats", {
        params: {
          team: this.props.team.Name,
          position: this.state.position,
          statOne: this.state.yStat,
          statTwo: this.state.xStat
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
              [playerData[j][this.state.xStat], playerData[j][this.state.yStat]]
            ],
            name: playerData[j].name,
            color: "rgba(102, 252, 241, 0.8)",
            _symbolIndex: 0,
            id: playerData[j].id
          });
        }
        this.setState({ data: scatterData }, () => {
          this.getColumnData(this.state.barStat);
          this.getPlayerShare(this.state.pieStat.toLowerCase());
          //this.createChart();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schedule !== this.props.schedule) {
      let arr2 = this.props.schedule.slice();
      let newArr2 = arr2.slice(-10);
      for (let k = 0; k < newArr2.length; k++) {
        let dateArr = newArr2[k].date.split(" ");
        newArr2[k].date = dateArr[1] + " " + dateArr[2];
        if (
          (newArr2[k].home === this.props.team.Name &&
            parseInt(newArr2[k].homePts) > parseInt(newArr2[k].visitorPts)) ||
          (newArr2[k].visitor === this.props.team.Name &&
            parseInt(newArr2[k].visitorPts) > parseInt(newArr2[k].homePts))
        ) {
          newArr2[k].result = "W";
          newArr2[k].color = "green";
        } else {
          newArr2[k].result = "L";
          newArr2[k].color = "red";
        }
      }
      if (newArr2.length > 0) {
        this.setState({ schedule: newArr2 });
      }
    }
  }

  handleSearch() {
    var playerData = [];
    var scatterData = [];
    axios
      .get("/api/teams/getPlayerStats", {
        params: {
          team: this.props.team.Name,
          position: this.state.position,
          statOne: this.state.yStat,
          statTwo: this.state.xStat
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
                parseFloat(playerData[j][this.state.xStat]),
                parseFloat(playerData[j][this.state.yStat])
              ]
            ],
            name: playerData[j].name,
            color: "rgba(102, 252, 241, 0.8)",
            _symbolIndex: 0,
            id: playerData[j].id
          });
        }
        this.setState({ data: scatterData }, () => {
          //this.getColumnData(this.state.barStat);
          //this.getPlayerShare(this.state.pieStat.toLowerCase());
          this.createChart();
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

  updateColumnData(stat) {
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
      this.createChart();
    });
  }

  handlePieClick() {
    this.setState({ renderPie: !this.state.renderPie });
  }

  selectPieStat(eventKey) {
    this.setState({ pieStat: eventKey.target.innerHTML }, () => {
      this.getPlayerShare(this.state.pieStat);
      //this.createChart();
    });
  }

  renderPieMenu() {
    if (this.state.renderPie) {
      return (
        <div className="pie-menu">
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            pts
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            ast
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            tov
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            fgm
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            fga
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            threePt
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            threePtAtt
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            twoPt
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            twoPtAtt
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            ft
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            fta
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            trb
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            orb
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            drb
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            stl
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            blk
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            mpg
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            pf
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            per
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            ows
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            dws
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            bpm
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            ws
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            obpm
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            dbpm
          </div>
          <div onClick={e => this.selectPieStat(e)} className="pie-menu-item">
            vorp
          </div>
        </div>
      );
    }
  }

  handleBarClick() {
    this.setState({ renderBar: !this.state.renderBar });
  }

  selectBarStat(eventKey) {
    this.setState({ barStat: eventKey.target.innerHTML }, () => {
      this.updateColumnData(this.state.barStat);
      //this.createChart();
    });
  }

  renderBarMenu() {
    if (this.state.renderBar) {
      return (
        <div className="bar-menu">
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            pts
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            ast
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            tov
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            astPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            tovPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            usgPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            ftr
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            fgm
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            fga
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            fgPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            threePt
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            threePtAtt
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            twoPt
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            twoPtAtt
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            twoPtPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            threePtPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            ft
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            fta
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            freeThrowPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            efgPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            tsPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            threePAr
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            trb
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            orb
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            drb
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            orbPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            drbPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            trbPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            stl
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            blk
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            stlPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            blkPct
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            mpg
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            pf
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            per
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            ows
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            dws
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            bpm
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            ws
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            obpm
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            dbpm
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            wsFortyEight
          </div>
          <div onClick={e => this.selectBarStat(e)} className="bar-menu-item">
            vorp
          </div>
        </div>
      );
    }
  }

  handleScatterClickX() {
    this.setState({ renderScatterX: !this.state.renderScatterX });
  }

  selectScatterStatX(eventKey) {
    this.setState({ xStat: eventKey.target.innerHTML }, () => {
      //this.getPlayerShare(this.state.pieStat);
      //this.createChart();
    });
  }

  handleScatterClickY() {
    this.setState({ renderScatterY: !this.state.renderScatterY });
  }

  selectScatterStatY(eventKey) {
    this.setState({ yStat: eventKey.target.innerHTML }, () => {
      //this.getPlayerShare(this.state.pieStat);
      //this.createChart();
    });
  }

  renderScatterMenuX() {
    if (this.state.renderScatterX) {
      return (
        <div className="scatter-menu">
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            pts
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            ast
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            tov
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            astPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            tovPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            usgPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            ftr
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            fgm
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            fga
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            fgPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            threePt
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            threePtAtt
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            twoPt
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            twoPtAtt
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            twoPtPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            threePtPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            ft
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            fta
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            freeThrowPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            efgPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            tsPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            threePAr
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            trb
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            orb
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            drb
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            orbPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            drbPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            trbPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            stl
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            blk
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            stlPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            blkPct
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            mpg
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            pf
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            per
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            ows
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            dws
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            bpm
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            ws
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            obpm
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            dbpm
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            wsFortyEight
          </div>
          <div
            onClick={e => this.selectScatterStatX(e)}
            className="scatter-menu-item"
          >
            vorp
          </div>
        </div>
      );
    }
  }

  renderScatterMenuY() {
    if (this.state.renderScatterY) {
      return (
        <div className="scatter-menu">
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            pts
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            ast
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            tov
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            astPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            tovPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            usgPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            ftr
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            fgm
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            fga
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            fgPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            threePt
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            threePtAtt
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            twoPt
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            twoPtAtt
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            twoPtPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            threePtPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            ft
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            fta
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            freeThrowPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            efgPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            tsPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            threePAr
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            trb
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            orb
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            drb
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            orbPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            drbPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            trbPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            stl
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            blk
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            stlPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            blkPct
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            mpg
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            pf
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            per
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            ows
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            dws
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            bpm
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            ws
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            obpm
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            dbpm
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            wsFortyEight
          </div>
          <div
            onClick={e => this.selectScatterStatY(e)}
            className="scatter-menu-item"
          >
            vorp
          </div>
        </div>
      );
    }
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
          text: `${this.state.xStat}`
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: `${this.state.yStat}`
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
            pointFormat: `{point.x} ${this.state.xStat}, {point.y} ${this.state.yStat}`
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
          colors: [
            "#cfff4d",
            "#bbff00",
            "#a8e600",
            "#96cc00",
            "#83b300",
            "#709900",
            "#5e8000",
            "#4b6600",
            "#384d00",
            "#253300"
          ],
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

    // var barChart = new Highcharts.Chart({
    //   chart: {
    //     renderTo: "bar-container",
    //     type: "column",
    //     options3d: {
    //       enabled: true,
    //       alpha: 0,
    //       beta: 10,
    //       depth: 37,
    //       viewDistance: 25
    //     },
    //     backgroundColor: null
    //   },
    //   title: {
    //     text: `${this.props.team.Name} Stat Averages`
    //   },
    //   subtitle: {
    //     text: ""
    //   },
    //   exporting: { enabled: false },
    //   plotOptions: {
    //     column: {
    //       depth: 25
    //     }
    //   },
    //   series: [
    //     {
    //       name: `${this.state.barStat}`,
    //       color: {
    //         linearGradient: {
    //           x1: 0,
    //           x2: 0,
    //           y1: 0,
    //           y2: 1
    //         },
    //         stops: [[0, "rgba(204, 0, 153, 0.7)"], [1, "rgba(102, 0, 77,0.7)"]]
    //       },
    //       data: this.state.columnData
    //     }
    //   ]
    // });
  }

  checkLoad() {
    if (this.state.schedule.length > 0) {
      let schedule = this.state.schedule;
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "40px",
            padding: "0px 20px"
          }}
        >
          <table
            cellSpacing="0"
            style={{
              width: "100%",
              color: "white",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr className="temp">
                <th className="stat-th">Date</th>
                <th className="stat-th">Away</th>
                <th className="stat-th">Pts</th>
                <th className="stat-th">Home</th>
                <th className="stat-th">Pts</th>
                <th className="stat-th">Result</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(function(game, index) {
                return (
                  <tr className="full-data" style={{ height: "40px" }}>
                    <td>{game["date"]}</td>
                    <td>{game["visitor"]}</td>
                    <td>{game["visitorPts"]}</td>
                    <td>{game["home"]}</td>
                    <td>{game["homePts"]}</td>
                    <td style={{ color: game["color"] }}>{game["result"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div style={{ color: "white" }}>Loading Games...</div>;
    }
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
        <div
          className="row"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "40px 40px 0px 40px"
          }}
        >
          <div
            className="col-sm-6 team-schedule"
            style={{ padding: "0px 40px" }}
          >
            <div className="team__chart-title-container">
              <div style={headerStyle2} className="team__chart-title">
                Previous Games
              </div>
            </div>
            {this.checkLoad()}
          </div>
          <div className="col-sm-6">
            <div className="team__chart-title-container">
              <div style={headerStyle1} className="team__chart-title">
                Player Shares
              </div>
            </div>
            <div
              className="team__pie-chart"
              id="pie-container"
              style={{
                height: "350px",
                paddingTop: "20px"
              }}
            />
            <div className="pie-stat-container">
              <div className="pie-stat" onClick={this.handlePieClick}>
                {this.state.pieStat.toUpperCase()}
                {this.renderPieMenu()}
              </div>
            </div>
          </div>
        </div>
        <div
          className="hr-box"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "0 80px" }}
        >
          <hr
            style={{
              borderBottom: "1px solid #eee",
              borderTop: "0px",
              margin: "0",
              paddingTop: "50px"
            }}
          />
        </div>
        <div
          className="row contract-container"
          style={{
            padding: "60px 80px 0px 80px",
            backgroundColor: "rgba(0,0,0,0.7)"
          }}
        >
          <div style={headerStyle2} className="team__chart-title">
            Team Contracts
          </div>
          <PlayerContracts contracts={this.props.contracts} />
        </div>
        <div
          className="hr-box"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "0 80px" }}
        >
          <hr
            style={{
              borderBottom: "1px solid #eee",
              borderTop: "0px",
              margin: "0",
              paddingTop: "50px"
            }}
          />
        </div>
        <div
          className="team__scatter-chart-container"
          style={{ paddingTop: "40px" }}
        >
          <div
            className="team__chart-title-container"
            style={{ paddingLeft: "80px" }}
          >
            <div style={headerStyle2} className="team__chart-title">
              Player Graph
            </div>
          </div>
          <div style={{ padding: "0px 100px" }}>
            <div
              className="team__scatter-chart"
              id="scatter-container"
              style={{
                height: "500px"
              }}
            />
          </div>
          <div
            className="team-scatter-menu-container"
            style={{ padding: "0px 80px" }}
          >
            <div className="axis-container">
              <div>Y-AXIS:</div>
              <div className="scatter-stat" onClick={this.handleScatterClickY}>
                {this.state.yStat}
                {this.renderScatterMenuY()}
              </div>
            </div>
            <div className="axis-container">
              <div>X-AXIS:</div>
              <div className="scatter-stat" onClick={this.handleScatterClickX}>
                {this.state.xStat}
                {this.renderScatterMenuX()}
              </div>
            </div>
            <div className="scatter-search" onClick={this.handleSearch}>
              SEARCH
            </div>
          </div>
        </div>
        {/*<div className="team__bar-chart-container">
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
          <div className="bar-stat-container">
            <div className="bar-stat" onClick={this.handleBarClick}>
              {this.state.barStat.toUpperCase()}
              {this.renderBarMenu()}
            </div>
          </div>
          </div>*/}
      </div>
    );
  }
}
