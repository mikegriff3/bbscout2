import React from "react";
import axios from "axios";
import PlayerScatter from "./nba-scouting-charts/PlayerScatter";
import UpcomingFAs from "./UpcomingFAs";

export default class NBAScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      original: [],
      pfArr: [],
      playerContracts: [],
      teams: [],
      scatterXStat: "mpg",
      scatterYStat: "pts",
      showXMenu: false,
      showYMenu: false,
      showFilters: false,
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
      menuSelect: "Home",
      pfPG: true,
      pfSG: true,
      pfSF: true,
      pfPF: true,
      pfC: true,
      pfMPG1: true,
      pfMPG2: true,
      pfMPG3: true,
      pfMPG4: true,
      pfMPG5: true,
      pfEXP1: true,
      pfEXP2: true,
      pfEXP3: true,
      pfEXP4: true,
      pfEXP5: true,
      pfAGE1: true,
      pfAGE2: true,
      pfAGE3: true,
      pfAGE4: true,
      pfAGE5: true,
      ovrOU: "-",
      offOU: "-",
      defOU: "-",
      offg1OU: "-",
      offg2OU: "-",
      offg3OU: "-",
      defg1OU: "-",
      defg2OU: "-",
      defg3OU: "-",
      ovrGrade: 0,
      offGrade: 0,
      defGrade: 0,
      oGrade1: 0,
      oGrade2: 0,
      oGrade3: 0,
      dGrade1: 0,
      dGrade2: 0,
      dGrade3: 0,
      oStat1: "",
      oStat2: "",
      oStat3: "",
      dStat1: "",
      dStat2: "",
      dStat3: ""
    };
    this.getAllNbaPlayers = this.getAllNbaPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getAllContracts = this.getAllContracts.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
    this.handleXStatClick = this.handleXStatClick.bind(this);
    this.handleYStatClick = this.handleYStatClick.bind(this);
    this.renderXMenu = this.renderXMenu.bind(this);
    this.renderYMenu = this.renderYMenu.bind(this);
    this.selectXStat = this.selectXStat.bind(this);
    this.selectYStat = this.selectYStat.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handlePG = this.handlePG.bind(this);
    this.handleSG = this.handleSG.bind(this);
    this.handleSF = this.handleSF.bind(this);
    this.handlePF = this.handlePF.bind(this);
    this.handleC = this.handleC.bind(this);
    this.handleMPG1 = this.handleMPG1.bind(this);
    this.handleMPG2 = this.handleMPG2.bind(this);
    this.handleMPG3 = this.handleMPG3.bind(this);
    this.handleMPG4 = this.handleMPG4.bind(this);
    this.handleMPG5 = this.handleMPG5.bind(this);
    this.handleEXP1 = this.handleEXP1.bind(this);
    this.handleEXP2 = this.handleEXP2.bind(this);
    this.handleEXP3 = this.handleEXP3.bind(this);
    this.handleEXP4 = this.handleEXP4.bind(this);
    this.handleEXP5 = this.handleEXP5.bind(this);
    this.handleAGE1 = this.handleAGE1.bind(this);
    this.handleAGE2 = this.handleAGE2.bind(this);
    this.handleAGE3 = this.handleAGE3.bind(this);
    this.handleAGE4 = this.handleAGE4.bind(this);
    this.handleAGE5 = this.handleAGE5.bind(this);
    this.handlepfPG = this.handlepfPG.bind(this);
    this.handlepfSG = this.handlepfSG.bind(this);
    this.handlepfSF = this.handlepfSF.bind(this);
    this.handlepfPF = this.handlepfPF.bind(this);
    this.handlepfC = this.handlepfC.bind(this);
    this.handlepfMPG1 = this.handlepfMPG1.bind(this);
    this.handlepfMPG2 = this.handlepfMPG2.bind(this);
    this.handlepfMPG3 = this.handlepfMPG3.bind(this);
    this.handlepfMPG4 = this.handlepfMPG4.bind(this);
    this.handlepfMPG5 = this.handlepfMPG5.bind(this);
    this.handlepfEXP1 = this.handlepfEXP1.bind(this);
    this.handlepfEXP2 = this.handlepfEXP2.bind(this);
    this.handlepfEXP3 = this.handlepfEXP3.bind(this);
    this.handlepfEXP4 = this.handlepfEXP4.bind(this);
    this.handlepfEXP5 = this.handlepfEXP5.bind(this);
    this.handlepfAGE1 = this.handlepfAGE1.bind(this);
    this.handlepfAGE2 = this.handlepfAGE2.bind(this);
    this.handlepfAGE3 = this.handlepfAGE3.bind(this);
    this.handlepfAGE4 = this.handlepfAGE4.bind(this);
    this.handlepfAGE5 = this.handlepfAGE5.bind(this);
    this.filterPlayers = this.filterPlayers.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderScoutType = this.renderScoutType.bind(this);
    this.handleScoutMenuClick = this.handleScoutMenuClick.bind(this);
    this.renderFoundPlayers = this.renderFoundPlayers.bind(this);
    this.handlepfSubmit = this.handlepfSubmit.bind(this);
    this.handleOvrOU = this.handleOvrOU.bind(this);
    this.handleOffOU = this.handleOffOU.bind(this);
    this.handleDefOU = this.handleDefOU.bind(this);
    this.handleOvrGrade = this.handleOvrGrade.bind(this);
    this.handleOffGrade = this.handleOffGrade.bind(this);
    this.handleDefGrade = this.handleDefGrade.bind(this);
    this.handleoStat1 = this.handleoStat1.bind(this);
    this.handleoStat2 = this.handleoStat2.bind(this);
    this.handleoStat3 = this.handleoStat3.bind(this);
    this.handleoffg1OU = this.handleoffg1OU.bind(this);
    this.handleoffg2OU = this.handleoffg2OU.bind(this);
    this.handleoffg3OU = this.handleoffg3OU.bind(this);
    this.handleoGrade1 = this.handleoGrade1.bind(this);
    this.handleoGrade2 = this.handleoGrade2.bind(this);
    this.handleoGrade3 = this.handleoGrade3.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffensiveRating = this.getOffensiveRating.bind(this);
    this.getDefensiveRating = this.getDefensiveRating.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.filterpfPlayers = this.filterpfPlayers.bind(this);
    this.handledStat1 = this.handledStat1.bind(this);
    this.handledStat2 = this.handledStat2.bind(this);
    this.handledStat3 = this.handledStat3.bind(this);
    this.handledefg1OU = this.handledefg1OU.bind(this);
    this.handledefg2OU = this.handledefg2OU.bind(this);
    this.handledefg3OU = this.handledefg3OU.bind(this);
    this.handledGrade1 = this.handledGrade1.bind(this);
    this.handledGrade2 = this.handledGrade2.bind(this);
    this.handledGrade3 = this.handledGrade3.bind(this);
    this.calculateOffGrades = this.calculateOffGrades.bind(this);
    this.calculateDefGrades = this.calculateDefGrades.bind(this);
  }

  componentDidMount() {
    this.getAllNbaPlayers();
    this.getTeams();
    this.getAllContracts();
  }

  getAllContracts() {
    axios
      .get("/api/teams/getPlayerContracts")
      .then(data => {
        this.setState({ playerContracts: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllNbaPlayers() {
    axios
      .get("/api/teams/getAllNbaPlayers")
      .then(data => {
        //console.log(data.data);
        var filtered = data.data.filter(function(player) {
          return parseFloat(player.mpg) > 5;
        });
        //console.log(filtered);
        this.setState({ playerStats: filtered, original: filtered });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeams() {
    axios
      .get("/api/teams/getLeagueStats")
      .then(data => {
        this.setState({ teams: data.data }, () => {
          //console.log(this.state.teams);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGrade(high, min, actual) {
    let playerGrade;
    let gradeSlots = 13;
    let adjusted = high - min;
    let gradeScale = adjusted / gradeSlots;

    let eighty = high - gradeScale;
    let sevenFive = eighty - gradeScale;
    let seventy = sevenFive - gradeScale;
    let sixFive = seventy - gradeScale;
    let sixty = sixFive - gradeScale;
    let fiveFive = sixty - gradeScale;
    let fifty = fiveFive - gradeScale;
    let fourFive = fifty - gradeScale;
    let fourty = fourFive - gradeScale;
    let threeFive = fourty - gradeScale;
    let thirty = threeFive - gradeScale;
    let twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade = 80;
    } else if (actual >= sevenFive) {
      playerGrade = 75;
    } else if (actual >= seventy) {
      playerGrade = 70;
    } else if (actual >= sixFive) {
      playerGrade = 65;
    } else if (actual >= sixty) {
      playerGrade = 60;
    } else if (actual >= fiveFive) {
      playerGrade = 55;
    } else if (actual >= fifty) {
      playerGrade = 50;
    } else if (actual >= fourFive) {
      playerGrade = 45;
    } else if (actual >= fourty) {
      playerGrade = 40;
    } else if (actual >= threeFive) {
      playerGrade = 35;
    } else if (actual >= thirty) {
      playerGrade = 30;
    } else if (actual >= twoFive) {
      playerGrade = 25;
    } else {
      playerGrade = 20;
    }
    return playerGrade;
  }

  getOverallRating(player) {
    let per = parseFloat(player.per) * 0.4;
    let bpm = parseFloat(player.bpm) * 0.2;
    let ws48 = parseFloat(player.wsFourtyEight) * 0.1;
    let ws = parseFloat(player.ws) * 0.1;
    let vorp = parseFloat(player.vorp) * 0.25;
    let weightedOvr = per + bpm + ws48 + ws + vorp;
    return this.getGrade(14.0, 0, weightedOvr);
  }

  getOffensiveRating(player) {
    var obpm = parseFloat(player.obpm);
    var ows = parseFloat(player.ows);
    var offRating = obpm + ows;
    return this.getGrade(13.0, -5.0, offRating);
  }

  getDefensiveRating(player) {
    var dbpm = parseFloat(player.dbpm);
    var dws = parseFloat(player.dws);
    var defRating = dbpm + dws;
    return this.getGrade(6.5, -3.0, defRating);
  }

  getDefStatGrades(player) {}

  calculateOffGrades(player) {
    let grades = {};
    let highPoints = 27;
    let highAst = 8.0;
    let highReb = 14;
    let highFT = 0.94;
    let highThree = 0.46;
    let highTwo = 0.65;
    let highTov = -0.5;
    let highOrb = 4.6;
    let highFgPct = 0.62;
    let highObpm = 7.0;
    let highPer = 27.0;
    let highOws = 7.0;
    let highVorp = 5.0;
    let highWs = 9.0;
    let highBpm = 8.0;

    if (player.position === "PG" || player.position === "SG") {
      //highBlk = 1.2;
      highTwo = 0.58;
      highReb = 8.5;
      highAst = 9.5;
    }
    if (player.position === "SF") {
      //highBlk = 1.5;
      highTwo = 0.58;
      highReb = 10;
    }

    grades.pts = this.getGrade(highPoints, 7, (player.pts / player.mpg) * 36);
    grades.ast = this.getGrade(highAst, 1, (player.ast / player.mpg) * 36);
    grades.reb = this.getGrade(highReb, 1, (player.trb / player.mpg) * 36);
    grades.ftPct = this.getGrade(highFT, 0.42, player.freeThrowPct);
    grades.threePointPct = this.getGrade(highThree, 0.2, player.threePtPct);
    grades.per = this.getGrade(highPer, 5.0, player.per);
    grades.ws = this.getGrade(highWs, -1.0, player.ws);
    grades.vorp = this.getGrade(highVorp, -1.0, player.vorp);
    grades.bpm = this.getGrade(highBpm, -7.0, player.bpm);
    grades.ows = this.getGrade(highOws, -2.0, player.ows);
    grades.obpm = this.getGrade(highObpm, -6.0, player.obpm);
    grades.orb = this.getGrade(highOrb, 0, (player.orb / player.mpg) * 36);
    grades.tov = this.getGrade(
      highTov,
      -5.0,
      ((player.tov * -1) / player.mpg) * 36
    );
    grades.fgPct = this.getGrade(highFgPct, 0.4, player.efgPct);

    grades.twoPoint = this.getGrade(highTwo, 0.25, player.twoPtPct);

    if (
      player.position === "PG" ||
      player.position === "SG" ||
      player.position === "SF"
    ) {
      grades.twoPoint = this.getGrade(highTwo, 0.37, player.twoPtPct);
    }

    return grades;
  }

  calculateDefGrades(player) {
    let grades = {};
    let highBlkPct = 6.5;
    let highStlPct = 3.0;
    let highDrbPct = 36.0;
    let highDbpm = 4.0;
    let highDws = 3.3;
    let highDrb = 11.0;
    let highReb = 14.0;
    let highStl = 2.4;
    let highBlk = 2.4;
    let highPf = 0;

    if (player.position === "PG" || player.position === "SG") {
      highBlk = 1.2;
      highReb = 8.5;
    }
    if (player.position === "SF") {
      highBlk = 1.5;
      highReb = 10;
    }

    grades.reb = this.getGrade(highReb, 1, (player.trb / player.mpg) * 36);
    grades.blkPct = this.getGrade(highBlkPct, 0, player.blkPct);
    grades.stlPct = this.getGrade(highStlPct, 0, player.stlPct);
    grades.drbPct = this.getGrade(highDrbPct, 5, player.drbPct);
    grades.dws = this.getGrade(highDws, 0, player.dws);
    grades.drb = this.getGrade(highDrb, 1, (player.drb / player.mpg) * 36);
    grades.stl = this.getGrade(highStl, 0, (player.stl / player.mpg) * 36);
    grades.blk = this.getGrade(highBlk, 0, (player.blk / player.mpg) * 36);
    grades.dbpm = this.getGrade(highDbpm, -4, player.dbpm);
    grades.pf = this.getGrade(highPf, -6.0, (player.pf / player.mpg) * 36 * -1);

    return grades;
  }

  renderFoundPlayers() {
    if (this.state.pfArr.length === 0) {
      return (
        <div>
          <div>No Players Found</div>
        </div>
      );
    } else {
      return this.state.pfArr.map((player, index) => (
        <div className="row" style={{ display: "flex", marginBottom: "20px" }}>
          <div
            className="col-sm-3"
            key={index}
            style={{ color: "white", fontSize: "14px" }}
          >
            <a href={`/player/${player.id}`}>{player.name}</a>
            <span style={{ paddingLeft: ".5rem", fontSize: "10px" }}>
              {player.position}
            </span>
          </div>
          <div
            className="col-sm-3"
            key={index}
            style={{ color: "white", fontSize: "14px", paddingLeft: "15px" }}
          >
            {player.team}
          </div>
          <div
            className="col-sm-2"
            style={{ color: "white", textAlign: "center" }}
          >
            {player.ovrGrade}
          </div>
          <div
            className="col-sm-2"
            style={{ color: "white", textAlign: "center" }}
          >
            {player.offGrade}
          </div>
          <div
            className="col-sm-2"
            style={{ color: "white", textAlign: "center" }}
          >
            {player.defGrade}
          </div>
        </div>
      ));
    }
  }

  handlepfSubmit() {
    let arr = [...this.state.original];
    for (let i = 0; i < arr.length; i++) {
      arr[i].ovrGrade = this.getOverallRating(arr[i]);
      arr[i].offGrade = this.getOffensiveRating(arr[i]);
      arr[i].defGrade = this.getDefensiveRating(arr[i]);
      arr[i].offStatGrades = this.calculateOffGrades(arr[i]);
      arr[i].defStatGrades = this.calculateDefGrades(arr[i]);
    }
    this.filterpfPlayers(arr, this.state);
  }

  filterpfPlayers(players, state) {
    if (this.state.ovrOU === "gte") {
      players = players.filter(function(player) {
        return player.ovrGrade >= state.ovrGrade;
      });
    }
    if (this.state.ovrOU === "lte") {
      players = players.filter(function(player) {
        return player.ovrGrade <= state.ovrGrade;
      });
    }
    if (this.state.offOU === "gte") {
      players = players.filter(function(player) {
        return player.offGrade >= state.offGrade;
      });
    }
    if (this.state.offOU === "lte") {
      players = players.filter(function(player) {
        return player.offGrade <= state.offGrade;
      });
    }
    if (this.state.defOU === "gte") {
      players = players.filter(function(player) {
        return player.defGrade >= state.defGrade;
      });
    }
    if (this.state.defOU === "lte") {
      players = players.filter(function(player) {
        return player.defGrade <= state.defGrade;
      });
    }
    /////////////////////////////////////////////////
    /////        OFFENSIVE STATS       //////////////
    /////////////////////////////////////////////////
    if (this.state.oStat1 === "pts") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.pts >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.pts <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "pts") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.pts >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.pts <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "pts") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.pts >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.pts <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "ast") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ast >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ast <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "ast") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ast >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ast <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "ast") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ast >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ast <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "trb") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.reb >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.reb <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "trb") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.reb >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.reb <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "trb") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.reb >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.reb <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "orb") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.orb >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.orb <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "orb") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.orb >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.orb <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "orb") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.orb >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.orb <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "freeThrowPct") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ftPct >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ftPct <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "freeThrowPct") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ftPct >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ftPct <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "freeThrowPct") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ftPct >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ftPct <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "threePtPct") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.threePointPct >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.threePointPct <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "threePtPct") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.threePointPct >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.threePointPct <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "threePtPct") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.threePointPct >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.threePointPct <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "twoPtPct") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.twoPoint >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.twoPoint <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "twoPtPct") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.twoPoint >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.twoPoint <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "twoPtPct") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.twoPoint >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.twoPoint <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "fgPct") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.fgPct >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.fgPct <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "fgPct") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.fgPct >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.fgPct <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "fgPct") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.fgPct >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.fgPct <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "tov") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.tov >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.tov <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "tov") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.tov >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.tov <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "tov") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.tov >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.tov <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "obpm") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.obpm >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.obpm <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "obpm") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.obpm >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.obpm <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "obpm") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.obpm >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.obpm <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "per") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.per >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.per <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "per") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.per >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.per <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "per") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.per >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.per <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "ows") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ows >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ows <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "ows") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ows >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ows <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "ows") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ows >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ows <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "ws") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ws >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ws <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "ws") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ws >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ws <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "ws") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.ws >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.ws <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "vorp") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.vorp >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.vorp <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "vorp") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.vorp >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.vorp <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "vorp") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.vorp >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.vorp <= state.oGrade3;
        });
      }
    }
    if (this.state.oStat1 === "bpm") {
      if (this.state.offg1OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.bpm >= state.oGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.bpm <= state.oGrade1;
        });
      }
    }
    if (this.state.oStat2 === "bpm") {
      if (this.state.offg2OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.bpm >= state.oGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.bpm <= state.oGrade2;
        });
      }
    }
    if (this.state.oStat3 === "bpm") {
      if (this.state.offg3OU === "gte") {
        players = players.filter(function(player) {
          return player.offStatGrades.bpm >= state.oGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.offStatGrades.bpm <= state.oGrade3;
        });
      }
    }
    if (this.state.dStat1 === "stl") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.stl >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.stl <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "stl") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.stl >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.stl <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "stl") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.stl >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.stl <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "blk") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.blk >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.blk <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "blk") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.blk >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.blk <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "blk") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.blk >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.blk <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "trb") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.reb >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.reb <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "trb") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.reb >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.reb <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "trb") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.reb >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.reb <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "drb") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.drb >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.drb <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "drb") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.drb >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.drb <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "drb") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.drb >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.drb <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "drbPct") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.drbPct >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.drbPct <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "drbPct") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.drbPct >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.drbPct <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "drbPct") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.drbPct >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.drbPct <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "blkPct") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.blkPct >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.blkPct <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "blkPct") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.blkPct >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.blkPct <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "blkPct") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.blkPct >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.blkPct <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "stlPct") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.stlPct >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.stlPct <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "stlPct") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.stlPct >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.stlPct <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "stlPct") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.stlPct >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.stlPct <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "pf") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.pf >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.pf <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "pf") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.pf >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.pf <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "pf") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.pf >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.pf <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "dbpm") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.dbpm >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.dbpm <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "dbpm") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.dbpm >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.dbpm <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "dbpm") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.dbpm >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.dbpm <= state.dGrade3;
        });
      }
    }
    if (this.state.dStat1 === "dws") {
      if (this.state.defg1OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.dws >= state.dGrade1;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.dws <= state.dGrade1;
        });
      }
    }
    if (this.state.dStat2 === "dws") {
      if (this.state.defg2OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.dws >= state.dGrade2;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.dws <= state.dGrade2;
        });
      }
    }
    if (this.state.dStat3 === "dws") {
      if (this.state.defg3OU === "gte") {
        players = players.filter(function(player) {
          return player.defStatGrades.dws >= state.dGrade3;
        });
      } else {
        players = players.filter(function(player) {
          return player.defStatGrades.dws <= state.dGrade3;
        });
      }
    }
    //////////////// Filters ////////////////////////
    if (!this.state.pfPG) {
      players = players.filter(function(player) {
        return player.position !== "PG";
      });
    }

    if (!this.state.pfSG) {
      players = players.filter(function(player) {
        return player.position !== "SG";
      });
    }

    if (!this.state.pfSF) {
      players = players.filter(function(player) {
        return player.position !== "SF";
      });
    }

    if (!this.state.pfPF) {
      players = players.filter(function(player) {
        return player.position !== "PF";
      });
    }

    if (!this.state.pfC) {
      players = players.filter(function(player) {
        return player.position !== "C";
      });
    }

    if (!this.state.pfMPG1) {
      players = players.filter(function(player) {
        return player.mpg >= 15.0;
      });
    }
    if (!this.state.pfMPG2) {
      players = players.filter(function(player) {
        if (player.mpg < 15.0 || player.mpg >= 20.0) {
          return player;
        }
      });
    }
    if (!this.state.pfMPG3) {
      players = players.filter(function(player) {
        if (player.mpg < 20.0 || player.mpg >= 25.0) {
          return player;
        }
      });
    }
    if (!this.state.pfMPG4) {
      players = players.filter(function(player) {
        if (player.mpg < 25.0 || player.mpg >= 30.0) {
          return player;
        }
      });
    }
    if (!this.state.pfMPG5) {
      players = players.filter(function(player) {
        return player.mpg < 30.0;
      });
    }

    if (!this.state.pfEXP1) {
      players = players.filter(function(player) {
        return player.experience !== "R";
      });
    }
    if (!this.state.pfEXP2) {
      players = players.filter(function(player) {
        if (player.experience === "R" || player.experience > 3) {
          return player;
        }
      });
    }
    if (!this.state.pfEXP3) {
      players = players.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 4 ||
          player.experience > 6
        ) {
          return player;
        }
      });
    }
    if (!this.state.pfEXP4) {
      players = players.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 7 ||
          player.experience > 10
        ) {
          return player;
        }
      });
    }
    if (!this.state.pfEXP5) {
      players = players.filter(function(player) {
        if (player.experience === "R" || player.experience < 11) {
          return player;
        }
      });
    }

    if (!this.state.pfAGE1) {
      players = players.filter(function(player) {
        return player.age >= 21;
      });
    }
    if (!this.state.pfAGE2) {
      players = players.filter(function(player) {
        if (player.age < 21 || player.age > 25.0) {
          return player;
        }
      });
    }
    if (!this.state.pfAGE3) {
      players = players.filter(function(player) {
        if (player.age < 26 || player.age > 30) {
          return player;
        }
      });
    }
    if (!this.state.pfAGE4) {
      players = players.filter(function(player) {
        if (player.age < 31 || player.age > 35) {
          return player;
        }
      });
    }
    if (!this.state.pfAGE5) {
      players = players.filter(function(player) {
        return player.age < 35;
      });
    }
    console.log("Filtered ARR: ", players);
    this.setState({ pfArr: players });
  }

  handleOvrOU(evt) {
    this.setState({ ovrOU: evt.target.value });
  }

  handleOffOU(evt) {
    this.setState({ offOU: evt.target.value });
  }

  handleDefOU(evt) {
    this.setState({ defOU: evt.target.value });
  }

  handleOvrGrade(evt) {
    if (evt.target.value !== "-") {
      this.setState({ ovrGrade: parseInt(evt.target.value) }, () => {
        console.log(this.state.ovrGrade);
      });
    } else {
      this.setState({ ovrGrade: evt.target.value });
    }
  }

  handleOffGrade(evt) {
    if (evt.target.value !== "-") {
      this.setState({ offGrade: parseInt(evt.target.value) });
    } else {
      this.setState({ offGrade: evt.target.value });
    }
  }

  handleDefGrade(evt) {
    if (evt.target.value !== "-") {
      this.setState({ defGrade: parseInt(evt.target.value) });
    } else {
      this.setState({ defGrade: evt.target.value });
    }
  }

  handleoStat1(evt) {
    this.setState({ oStat1: evt.target.value });
  }

  handleoStat2(evt) {
    this.setState({ oStat2: evt.target.value });
  }

  handleoStat3(evt) {
    this.setState({ oStat3: evt.target.value });
  }

  handledStat1(evt) {
    this.setState({ dStat1: evt.target.value });
  }

  handledStat2(evt) {
    this.setState({ dStat2: evt.target.value });
  }

  handledStat3(evt) {
    this.setState({ dStat3: evt.target.value });
  }

  handleoffg1OU(evt) {
    this.setState({ offg1OU: evt.target.value });
  }

  handleoffg2OU(evt) {
    this.setState({ offg2OU: evt.target.value });
  }

  handleoffg3OU(evt) {
    this.setState({ offg3OU: evt.target.value });
  }

  handledefg1OU(evt) {
    this.setState({ defg1OU: evt.target.value });
  }

  handledefg2OU(evt) {
    this.setState({ defg2OU: evt.target.value });
  }

  handledefg3OU(evt) {
    this.setState({ defg3OU: evt.target.value });
  }

  handleoGrade1(evt) {
    this.setState({ oGrade1: evt.target.value });
  }

  handleoGrade2(evt) {
    this.setState({ oGrade2: evt.target.value });
  }

  handleoGrade3(evt) {
    this.setState({ oGrade3: evt.target.value });
  }

  handledGrade1(evt) {
    this.setState({ dGrade1: evt.target.value });
  }

  handledGrade2(evt) {
    this.setState({ dGrade2: evt.target.value });
  }

  handledGrade3(evt) {
    this.setState({ dGrade3: evt.target.value });
  }

  renderScoutType() {
    var statBox = {
      display: "inline-block",
      padding: "5px 20px",
      border: "1px solid rgba(102, 252, 241, 0.8)",
      color: "rgba(102, 252, 241, 0.7)",
      width: "140px",
      textAlign: "center",
      cursor: "pointer"
    };
    let pfth = {
      color: "grey",
      textDecoration: "underline",
      fontSize: "14px"
    };
    if (this.state.menuSelect === "Home") {
      return (
        <div className="scout">
          <div className="scout__scatter-chart-container">
            <PlayerScatter
              players={this.state.playerStats}
              xStat={this.state.scatterXStat}
              yStat={this.state.scatterYStat}
            />
          </div>
          <div
            className="row"
            style={{
              color: "white",
              paddingBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div className="col-sm-4 col-sm-offset-1">
              <div style={{ display: "inline-block", marginRight: "20px" }}>
                Y-Axis Stat:
              </div>
              <div style={{ positon: "relative", display: "inline-block" }}>
                <div style={statBox} onClick={this.handleYStatClick}>
                  {this.state.scatterYStat}
                  {"  "}
                  <span
                    style={{
                      fontSize: "8px",
                      marginLeft: "5px",
                      marginTop: "3px"
                    }}
                  >
                    &#9660;
                  </span>
                </div>
                {this.renderYMenu()}
              </div>
            </div>
            <div className="col-sm-4">
              <div style={{ display: "inline", marginRight: "20px" }}>
                X-Axis Stat:
              </div>
              <div style={{ positon: "relative", display: "inline-block" }}>
                <div style={statBox} onClick={this.handleXStatClick}>
                  {this.state.scatterXStat}
                  {"  "}
                  <span
                    style={{
                      fontSize: "8px",
                      marginLeft: "5px",
                      marginTop: "3px"
                    }}
                  >
                    &#9660;
                  </span>
                </div>
                {this.renderXMenu()}
              </div>
            </div>
            <div
              className="col-sm-1"
              onClick={this.handleFilterClick}
              style={{ cursor: "pointer" }}
            >
              Filters
            </div>
          </div>
          {this.renderFilters()}
        </div>
      );
    } else if (this.state.menuSelect === "Player Finder") {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            marginTop: "20px"
          }}
        >
          <div className="row">
            <div
              style={{
                color: "white",
                marginTop: "20px",
                paddingBottom: "10px",
                paddingLeft: "40px",
                fontSize: "20px",
                borderBottom: "2px solid grey"
              }}
            >
              Player Finder
            </div>
          </div>
          <div className="row">
            <div
              className="col-sm-4"
              style={{
                color: "grey",
                paddingLeft: "40px",
                paddingTop: "20px",
                paddingRight: "20px",
                borderRight: "1px solid grey"
              }}
            >
              <div style={{ textDecoration: "underline" }}>Overall Grades</div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <label for="overall">Overall:</label>
                  <select
                    name="overall"
                    id="overall"
                    style={{ marginLeft: "29px" }}
                    onChange={this.handleOvrOU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="gradeOvr"
                    id="gradeOvr"
                    onChange={this.handleOvrGrade}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <label for="offense">Offense:</label>
                  <select
                    name="offense"
                    id="offense"
                    style={{ marginLeft: "24px" }}
                    onChange={this.handleOffOU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="grade"
                    id="grade"
                    onChange={this.handleOffGrade}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <label for="defense">Defense:</label>
                  <select
                    name="defense"
                    id="defense"
                    style={{ marginLeft: "20px" }}
                    onChange={this.handleDefOU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="grade"
                    id="grade"
                    onChange={this.handleDefGrade}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div style={{ textDecoration: "underline", marginTop: "10px" }}>
                Offensive Grades
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <select name="stat" id="stat" onChange={this.handleoStat1}>
                    <option value="-">-</option>
                    <option value="pts">Scoring</option>
                    <option value="ast">Assist</option>
                    <option value="trb">Rebounding</option>
                    <option value="orb">Off Reb</option>
                    <option value="freeThrowPct">Free Throws</option>
                    <option value="threePtPct">3P%</option>
                    <option value="twoPtPct">2P%</option>
                    <option value="fgPct">FG%</option>
                    <option value="tov">Turnovers</option>
                    <option value="obpm">OBPM</option>
                    <option value="per">PER</option>
                    <option value="ows">OWS</option>
                    <option value="ws">Win Shares</option>
                    <option value="vorp">VORP</option>
                    <option value="bpm">BPM</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="stat-ou"
                    id="stat-ou"
                    onChange={this.handleoffg1OU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="ograde1"
                    id="ograde1"
                    onChange={this.handleoGrade1}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <select name="stat" id="stat" onChange={this.handleoStat2}>
                    <option value="-">-</option>
                    <option value="pts">Scoring</option>
                    <option value="ast">Assist</option>
                    <option value="trb">Rebounding</option>
                    <option value="orb">Off Reb</option>
                    <option value="freeThrowPct">Free Throws</option>
                    <option value="threePtPct">3P%</option>
                    <option value="twoPtPct">2P%</option>
                    <option value="fgPct">FG%</option>
                    <option value="tov">Turnovers</option>
                    <option value="obpm">OBPM</option>
                    <option value="per">PER</option>
                    <option value="ows">OWS</option>
                    <option value="ws">Win Shares</option>
                    <option value="vorp">VORP</option>
                    <option value="bpm">BPM</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="stat-ou"
                    id="stat-ou"
                    onChange={this.handleoffg2OU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="ograde1"
                    id="ograde1"
                    onChange={this.handleoGrade2}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <select name="stat" id="stat" onChange={this.handleoStat3}>
                    <option value="-">-</option>
                    <option value="pts">Scoring</option>
                    <option value="ast">Assist</option>
                    <option value="trb">Rebounding</option>
                    <option value="orb">Off Reb</option>
                    <option value="freeThrowPct">Free Throws</option>
                    <option value="threePtPct">3P%</option>
                    <option value="twoPtPct">2P%</option>
                    <option value="fgPct">FG%</option>
                    <option value="tov">Turnovers</option>
                    <option value="obpm">OBPM</option>
                    <option value="per">PER</option>
                    <option value="ows">OWS</option>
                    <option value="ws">Win Shares</option>
                    <option value="vorp">VORP</option>
                    <option value="bpm">BPM</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="stat-ou"
                    id="stat-ou"
                    onChange={this.handleoffg3OU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="ograde1"
                    id="ograde1"
                    onChange={this.handleoGrade3}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div style={{ textDecoration: "underline", marginTop: "20px" }}>
                Defensive Grades
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <select name="stat" id="stat" onChange={this.handledStat1}>
                    <option value="-">-</option>
                    <option value="stl">Steals</option>
                    <option value="blk">Blocks</option>
                    <option value="trb">Rebounding</option>
                    <option value="drb">Def Reb</option>
                    <option value="drbPct">Drb%</option>
                    <option value="blkPct">Blk%</option>
                    <option value="stlPct">Stl%</option>
                    <option value="pf">Fouls</option>
                    <option value="dbpm">DBPM</option>
                    <option value="dws">DWS</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="stat-ou"
                    id="stat-ou"
                    onChange={this.handledefg1OU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="ograde1"
                    id="ograde1"
                    onChange={this.handledGrade1}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <select name="stat" id="stat" onChange={this.handledStat2}>
                    <option value="-">-</option>
                    <option value="stl">Steals</option>
                    <option value="blk">Blocks</option>
                    <option value="trb">Rebounding</option>
                    <option value="drb">Def Reb</option>
                    <option value="drbPct">Drb%</option>
                    <option value="blkPct">Blk%</option>
                    <option value="stlPct">Stl%</option>
                    <option value="pf">Fouls</option>
                    <option value="dbpm">DBPM</option>
                    <option value="dws">DWS</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="stat-ou"
                    id="stat-ou"
                    onChange={this.handledefg2OU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="ograde1"
                    id="ograde1"
                    onChange={this.handledGrade2}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div>
                <form className="pf-form" style={{ display: "inline-block" }}>
                  <select name="stat" id="stat" onChange={this.handledStat3}>
                    <option value="-">-</option>
                    <option value="stl">Steals</option>
                    <option value="blk">Blocks</option>
                    <option value="trb">Rebounding</option>
                    <option value="drb">Def Reb</option>
                    <option value="drbPct">Drb%</option>
                    <option value="blkPct">Blk%</option>
                    <option value="stlPct">Stl%</option>
                    <option value="pf">Fouls</option>
                    <option value="dbpm">DBPM</option>
                    <option value="dws">DWS</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="stat-ou"
                    id="stat-ou"
                    onChange={this.handledefg3OU}
                  >
                    <option value="-">-</option>
                    <option value="gte">&ge;</option>
                    <option value="lte">&le;</option>
                  </select>
                </form>
                <form
                  className="pf-form"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                >
                  <select
                    name="ograde1"
                    id="ograde1"
                    onChange={this.handledGrade3}
                  >
                    <option value="-">-</option>
                    <option value="80">80</option>
                    <option value="75">75</option>
                    <option value="70">70</option>
                    <option value="65">65</option>
                    <option value="60">60</option>
                    <option value="55">55</option>
                    <option value="50">50</option>
                    <option value="45">45</option>
                    <option value="40">40</option>
                    <option value="35">35</option>
                    <option value="30">30</option>
                    <option value="25">25</option>
                    <option value="20">20</option>
                  </select>
                </form>
              </div>
              <div style={{ textDecoration: "underline", marginTop: "20px" }}>
                Filters
              </div>
              <div className="row" style={{ display: "flex" }}>
                <div className="col-sm-3">
                  <div className="filter-title-pf">Position</div>
                  <form className="filter-form-pf">
                    <input
                      type="checkbox"
                      checked={this.state.pfPG}
                      onChange={this.handlepfPG}
                      id="pos1"
                      name="pos1"
                      value="PG"
                    />
                    <label for="pos1"> PG</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfSG}
                      onChange={this.handlepfSG}
                      id="pos2"
                      name="pos2"
                      value="SG"
                    />
                    <label for="pos2"> SG</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfSF}
                      onChange={this.handlepfSF}
                      id="pos3"
                      name="pos3"
                      value="SF"
                    />
                    <label for="pos3"> SF</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfPF}
                      onChange={this.handlepfPF}
                      id="pos4"
                      name="pos4"
                      value="PF"
                    />
                    <label for="pos4"> PF</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfC}
                      onChange={this.handlepfC}
                      id="pos5"
                      name="pos5"
                      value="C"
                    />
                    <label for="pos5"> C</label>
                  </form>
                </div>
                <div className="col-sm-3">
                  <div className="filter-title-pf">Mpg</div>
                  <form className="filter-form-pf">
                    <input
                      type="checkbox"
                      checked={this.state.pfMPG1}
                      onChange={this.handlepfMPG1}
                      id="min1"
                      name="min1"
                      value="5-15"
                    />
                    <label for="min1"> 5-15</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfMPG2}
                      onChange={this.handlepfMPG2}
                      id="min2"
                      name="min2"
                      value="15-20"
                    />
                    <label for="min2"> 15-20</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfMPG3}
                      onChange={this.handlepfMPG3}
                      id="min3"
                      name="min3"
                      value="20-25"
                    />
                    <label for="min3"> 20-25</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfMPG4}
                      onChange={this.handlepfMPG4}
                      id="min4"
                      name="min4"
                      value="25-30"
                    />
                    <label for="min4"> 25-30</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfMPG5}
                      onChange={this.handlepfMPG5}
                      id="min5"
                      name="min5"
                      value="30+"
                    />
                    <label for="min5"> 30+</label>
                  </form>
                </div>
                <div className="col-sm-3">
                  <div className="filter-title-pf">Age</div>
                  <form className="filter-form-pf">
                    <input
                      type="checkbox"
                      checked={this.state.pfAGE1}
                      onChange={this.handlepfAGE1}
                      id="age1"
                      name="age1"
                      value="< 21"
                    />
                    <label for="age1"> &#60; 21</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfAGE2}
                      onChange={this.handlepfAGE2}
                      id="age2"
                      name="age2"
                      value="21-25"
                    />
                    <label for="age2"> 21-25</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfAGE3}
                      onChange={this.handlepfAGE3}
                      id="age3"
                      name="age3"
                      value="26-30"
                    />
                    <label for="age3"> 26-30</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfAGE4}
                      onChange={this.handlepfAGE4}
                      id="age4"
                      name="age4"
                      value="31-35"
                    />
                    <label for="age4"> 31-35</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfAGE5}
                      onChange={this.handlepfAGE5}
                      id="age5"
                      name="age5"
                      value="35+"
                    />
                    <label for="age5"> 35+</label>
                  </form>
                </div>
                <div className="col-sm-3">
                  <div className="filter-title-pf">Experience</div>
                  <form className="filter-form-pf">
                    <input
                      type="checkbox"
                      checked={this.state.pfEXP1}
                      onChange={this.handlepfEXP1}
                      id="exp1"
                      name="exp1"
                      value="< 21"
                    />
                    <label for="exp1"> Rookie</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfEXP2}
                      onChange={this.handlepfEXP2}
                      id="exp2"
                      name="exp2"
                      value="21-25"
                    />
                    <label for="exp2"> 1-3</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfEXP3}
                      onChange={this.handlepfEXP3}
                      id="exp3"
                      name="exp3"
                      value="26-30"
                    />
                    <label for="exp3"> 4-6</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfEXP4}
                      onChange={this.handlepfEXP4}
                      id="exp4"
                      name="exp4"
                      value="31-35"
                    />
                    <label for="exp4"> 7-10</label>
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.pfEXP5}
                      onChange={this.handlepfEXP5}
                      id="exp5"
                      name="exp5"
                      value="35+"
                    />
                    <label for="exp5"> 10+</label>
                  </form>
                </div>
              </div>
              <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                <div onClick={this.handlepfSubmit} style={statBox}>
                  Submit
                </div>
              </div>
            </div>
            <div
              className="col-sm-8"
              style={{
                color: "grey",
                paddingLeft: "40px",
                paddingTop: "20px",
                paddingRight: "20px"
              }}
            >
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-sm-3">
                  <div style={pfth}>Name</div>
                </div>
                <div className="col-sm-3" style={{ paddingLeft: "15px" }}>
                  <div style={pfth}>Team</div>
                </div>
                <div className="col-sm-2" style={{ textAlign: "center" }}>
                  <div style={pfth}>Overall</div>
                </div>
                <div className="col-sm-2" style={{ textAlign: "center" }}>
                  <div style={pfth}>Offense</div>
                </div>
                <div className="col-sm-2" style={{ textAlign: "center" }}>
                  <div style={pfth}>Defense</div>
                </div>
              </div>
              {this.renderFoundPlayers()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            marginTop: "20px"
          }}
        >
          <UpcomingFAs contracts={this.state.playerContracts} />
        </div>
      );
    }
  }

  handleXStatClick(e) {
    //e.preventDefault();
    this.setState({ showXMenu: !this.state.showXMenu });
  }

  handleYStatClick(e) {
    //e.preventDefault();
    this.setState({ showYMenu: !this.state.showYMenu });
  }

  renderXMenu() {
    if (this.state.showXMenu) {
      return (
        <div
          style={{
            position: "absolute",
            top: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            height: "200px",
            overflowY: "auto",
            cursor: "pointer",
            zIndex: "1000"
          }}
        >
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            mpg
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            pts
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ast
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            tov
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            astPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            tovPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            usgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ftr
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fgm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fga
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            twoPt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            twoPtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            twoPtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ft
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            fta
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            freeThrowPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            efgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            tsPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            threePAr
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            trb
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            orb
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            drb
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            orbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            drbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            trbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            stl
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            blk
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            stlPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            blkPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            pf
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            per
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ows
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            dws
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            bpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            ws
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            obpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            dbpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectXStat}>
            vorp
          </div>
        </div>
      );
    }
  }

  renderYMenu() {
    if (this.state.showYMenu) {
      return (
        <div
          style={{
            position: "absolute",
            top: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            height: "200px",
            overflowY: "auto",
            cursor: "pointer",
            zIndex: "1000"
          }}
        >
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            mpg
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            pts
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ast
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            tov
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            astPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            tovPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            usgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ftr
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fgm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fga
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            twoPt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            twoPtAtt
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            twoPtPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ft
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            fta
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            freeThrowPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            efgPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            tsPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            threePAr
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            trb
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            orb
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            drb
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            orbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            drbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            trbPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            stl
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            blk
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            stlPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            blkPct
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            pf
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            per
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ows
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            dws
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            bpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            ws
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            obpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            dbpm
          </div>
          <div className="scatter-stat-option" onClick={this.selectYStat}>
            vorp
          </div>
        </div>
      );
    }
  }

  selectXStat(eventKey) {
    this.setState(
      {
        scatterXStat: eventKey.target.innerHTML,
        showXMenu: false
      },
      () => {
        console.log(this.state.scatterXStat);
      }
    );
  }

  selectYStat(eventKey) {
    this.setState(
      {
        scatterYStat: eventKey.target.innerHTML,
        showYMenu: false
      },
      () => {
        console.log(this.state.scatterYStat);
      }
    );
  }

  handleFilterClick() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  renderFilters() {
    if (this.state.showFilters) {
      return (
        <div>
          <div
            className="row"
            style={{ display: "flex", paddingBottom: "40px" }}
          >
            <div className="col-sm-3">
              <div className="filter-title">Position</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.pg}
                  onChange={this.handlePG}
                  id="pos1"
                  name="pos1"
                  value="PG"
                />
                <label for="pos1"> PG</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.sg}
                  onChange={this.handleSG}
                  id="pos2"
                  name="pos2"
                  value="SG"
                />
                <label for="pos2"> SG</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.sf}
                  onChange={this.handleSF}
                  id="pos3"
                  name="pos3"
                  value="SF"
                />
                <label for="pos3"> SF</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.pf}
                  onChange={this.handlePF}
                  id="pos4"
                  name="pos4"
                  value="PF"
                />
                <label for="pos4"> PF</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.c}
                  onChange={this.handleC}
                  id="pos5"
                  name="pos5"
                  value="C"
                />
                <label for="pos5"> C</label>
              </form>
            </div>
            <div className="col-sm-3">
              <div className="filter-title">Minutes Played</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.mpg1}
                  onChange={this.handleMPG1}
                  id="min1"
                  name="min1"
                  value="5-15"
                />
                <label for="min1"> 5-15</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg2}
                  onChange={this.handleMPG2}
                  id="min2"
                  name="min2"
                  value="15-20"
                />
                <label for="min2"> 15-20</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg3}
                  onChange={this.handleMPG3}
                  id="min3"
                  name="min3"
                  value="20-25"
                />
                <label for="min3"> 20-25</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg4}
                  onChange={this.handleMPG4}
                  id="min4"
                  name="min4"
                  value="25-30"
                />
                <label for="min4"> 25-30</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.mpg5}
                  onChange={this.handleMPG5}
                  id="min5"
                  name="min5"
                  value="30+"
                />
                <label for="min5"> 30+</label>
              </form>
            </div>
            <div className="col-sm-3">
              <div className="filter-title">Age</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.age1}
                  onChange={this.handleAGE1}
                  id="age1"
                  name="age1"
                  value="< 21"
                />
                <label for="age1"> &#60; 21</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age2}
                  onChange={this.handleAGE2}
                  id="age2"
                  name="age2"
                  value="21-25"
                />
                <label for="age2"> 21-25</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age3}
                  onChange={this.handleAGE3}
                  id="age3"
                  name="age3"
                  value="26-30"
                />
                <label for="age3"> 26-30</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age4}
                  onChange={this.handleAGE4}
                  id="age4"
                  name="age4"
                  value="31-35"
                />
                <label for="age4"> 31-35</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.age5}
                  onChange={this.handleAGE5}
                  id="age5"
                  name="age5"
                  value="35+"
                />
                <label for="age5"> 35+</label>
              </form>
            </div>
            <div className="col-sm-3">
              <div className="filter-title">Experience</div>
              <form className="filter-form">
                <input
                  type="checkbox"
                  checked={this.state.exp1}
                  onChange={this.handleEXP1}
                  id="exp1"
                  name="exp1"
                  value="< 21"
                />
                <label for="exp1"> Rookie</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp2}
                  onChange={this.handleEXP2}
                  id="exp2"
                  name="exp2"
                  value="21-25"
                />
                <label for="exp2"> 1-3</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp3}
                  onChange={this.handleEXP3}
                  id="exp3"
                  name="exp3"
                  value="26-30"
                />
                <label for="exp3"> 4-6</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp4}
                  onChange={this.handleEXP4}
                  id="exp4"
                  name="exp4"
                  value="31-35"
                />
                <label for="exp4"> 7-10</label>
                <br />
                <input
                  type="checkbox"
                  checked={this.state.exp5}
                  onChange={this.handleEXP5}
                  id="exp5"
                  name="exp5"
                  value="35+"
                />
                <label for="exp5"> 10+</label>
              </form>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "40px" }}>
            <div
              className="col-sm-8 col-sm-offset-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                onClick={this.handleRefresh}
                style={{
                  padding: "5px 20px",
                  border: "1px solid rgba(102, 252, 241, 0.8)",
                  color: "rgba(102, 252, 241, 0.7)",
                  width: "200px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
              >
                Refresh
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  handlePG(evt) {
    this.setState({ pg: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfPG(evt) {
    this.setState({ pfPG: evt.target.checked });
  }

  handleSG(evt) {
    this.setState({ sg: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfSG(evt) {
    this.setState({ pfSG: evt.target.checked });
  }

  handleSF(evt) {
    this.setState({ sf: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfSF(evt) {
    this.setState({ pfSF: evt.target.checked });
  }

  handlePF(evt) {
    this.setState({ pf: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfPF(evt) {
    this.setState({ pfPF: evt.target.checked });
  }

  handleC(evt) {
    this.setState({ c: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfC(evt) {
    this.setState({ pfC: evt.target.checked });
  }

  handleMPG1(evt) {
    this.setState({ mpg1: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfMPG1(evt) {
    this.setState({ pfMPG1: evt.target.checked });
  }

  handleMPG2(evt) {
    this.setState({ mpg2: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfMPG2(evt) {
    this.setState({ pfMPG2: evt.target.checked });
  }

  handleMPG3(evt) {
    this.setState({ mpg3: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfMPG3(evt) {
    this.setState({ pfMPG3: evt.target.checked });
  }

  handleMPG4(evt) {
    this.setState({ mpg4: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfMPG4(evt) {
    this.setState({ pfMPG4: evt.target.checked });
  }

  handleMPG5(evt) {
    this.setState({ mpg5: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfMPG5(evt) {
    this.setState({ pfMPG5: evt.target.checked });
  }

  handleEXP1(evt) {
    this.setState({ exp1: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfEXP1(evt) {
    this.setState({ pfEXP1: evt.target.checked });
  }

  handleEXP2(evt) {
    this.setState({ exp2: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfEXP2(evt) {
    this.setState({ pfEXP2: evt.target.checked });
  }

  handleEXP3(evt) {
    this.setState({ exp3: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfEXP3(evt) {
    this.setState({ pfEXP3: evt.target.checked });
  }

  handleEXP4(evt) {
    this.setState({ exp4: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfEXP4(evt) {
    this.setState({ pfEXP4: evt.target.checked });
  }

  handleEXP5(evt) {
    this.setState({ exp5: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfEXP5(evt) {
    this.setState({ pfEXP5: evt.target.checked });
  }

  handleAGE1(evt) {
    this.setState({ age1: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfAGE1(evt) {
    this.setState({ pfAGE1: evt.target.checked });
  }

  handleAGE2(evt) {
    this.setState({ age2: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfAGE2(evt) {
    this.setState({ pfAGE2: evt.target.checked });
  }

  handleAGE3(evt) {
    this.setState({ age3: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfAGE3(evt) {
    this.setState({ pfAGE3: evt.target.checked });
  }

  handleAGE4(evt) {
    this.setState({ age4: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfAGE4(evt) {
    this.setState({ pfAGE4: evt.target.checked });
  }

  handleAGE5(evt) {
    this.setState({ age5: evt.target.checked }, () => {
      this.filterPlayers();
    });
  }

  handlepfAGE5(evt) {
    this.setState({ pfAGE5: evt.target.checked });
  }

  handleScoutMenuClick(evt) {
    this.setState({ menuSelect: evt.target.innerHTML });
  }

  filterPlayers() {
    let playersArr = this.state.playerStats;

    if (!this.state.pg) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "PG";
      });
    }

    if (!this.state.sg) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "SG";
      });
    }

    if (!this.state.sf) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "SF";
      });
    }

    if (!this.state.pf) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "PF";
      });
    }

    if (!this.state.c) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "C";
      });
    }

    if (!this.state.mpg1) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg >= 15.0;
      });
    }
    if (!this.state.mpg2) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 15.0 || player.mpg >= 20.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg3) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 20.0 || player.mpg >= 25.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg4) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 25.0 || player.mpg >= 30.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg5) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg < 30.0;
      });
    }

    if (!this.state.exp1) {
      playersArr = playersArr.filter(function(player) {
        return player.experience !== "R";
      });
    }
    if (!this.state.exp2) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience > 3) {
          return player;
        }
      });
    }
    if (!this.state.exp3) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 4 ||
          player.experience > 6
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp4) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 7 ||
          player.experience > 10
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp5) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience < 11) {
          return player;
        }
      });
    }

    if (!this.state.age1) {
      playersArr = playersArr.filter(function(player) {
        return player.age >= 21;
      });
    }
    if (!this.state.age2) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 21 || player.age > 25.0) {
          return player;
        }
      });
    }
    if (!this.state.age3) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 26 || player.age > 30) {
          return player;
        }
      });
    }
    if (!this.state.age4) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 31 || player.age > 35) {
          return player;
        }
      });
    }
    if (!this.state.age5) {
      playersArr = playersArr.filter(function(player) {
        return player.age < 35;
      });
    }
    this.setState({ playerStats: playersArr }, () => {
      console.log("Filtered: ", this.state.playerStats);
    });
  }

  handleRefresh() {
    this.setState({
      playerStats: this.state.original,
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
      age5: true
    });
  }

  checkLoad() {
    var headerStyle = {
      backgroundImage:
        "linear-gradient(to right, rgba(102, 252, 241, 0) 0.15%, rgba(102, 252, 241, 0.8) 40%, rgba(102, 252, 241, 0))",
      color: "white"
    };
    var headerStyle2 = {
      backgroundImage:
        "linear-gradient(to right, rgba(210, 255, 77, 0) 0.15%, rgba(210, 255, 77, 0.8) 40%, rgba(210, 255, 77, 0))",
      color: "white",
      cursor: "pointer"
    };
    if (this.state.playerStats.length > 0) {
      return (
        <div>
          <div className="scout__header-container">
            <div style={headerStyle} className="scout__header">
              NBA Scouting
            </div>
            <div
              className="scout__menu-item"
              onClick={this.handleScoutMenuClick}
            >
              Home
            </div>
            <div
              className="scout__menu-item"
              onClick={this.handleScoutMenuClick}
            >
              Player Finder
            </div>
            <div
              className="scout__menu-item"
              onClick={this.handleScoutMenuClick}
            >
              Free Agents
            </div>
          </div>
          {this.renderScoutType()}
          {/*<div className="player-comp">
            <div style={headerStyle2} className="player-comp__header">
              Player Comparison
            </div>
            <div className="playerOne">
              <div>
                <img
                  className="player-comp__picture"
                  src={
                    "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
                  }
                />
              </div>
              <div className="player-comp__name">PLAYER ONE</div>
              <div className="player-comp__info">
                <span className="player-comp__info-stat">
                  Height: <span className="player-comp__info-text">height</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Weight: <span className="player-comp__info-text">weight</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Age: <span className="player-comp__info-text">age</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Exp: <span className="player-comp__info-text">exp</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Team: <span className="player-comp__info-text">team</span>
                </span>
              </div>
            </div>
            <div className="playerTwo">
              <div>
                <img
                  className="player-comp__picture"
                  src={
                    "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
                  }
                />
              </div>
              <div className="player-comp__name">PLAYER TWO</div>
              <div className="player-comp__info">
                <span className="player-comp__info-stat">
                  Height: <span className="player-comp__info-text">height</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Weight: <span className="player-comp__info-text">weight</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Age: <span className="player-comp__info-text">age</span>
                </span>
                <span
                  style={{ paddingLeft: "1rem" }}
                  className="player-comp__info-stat"
                >
                  Exp: <span className="player-comp__info-text">exp</span>
                </span>
              </div>
              <div className="player-comp__info-text">
                <span className="player-comp__info-stat">
                  Team: <span className="player-comp__info-text">team</span>
                </span>
              </div>
            </div>
                </div>*/}
        </div>
      );
    } else {
      return (
        <div className="loading-gif">
          <img
            className="gif"
            src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
          />
          <div className="load-text">Loading Players...</div>
        </div>
      );
    }
  }

  render() {
    return <div className="scouting-container">{this.checkLoad()}</div>;
  }
}
