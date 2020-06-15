import React from "react";
import axios from "axios";

export default class UpcomingFAListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      team: {}
    };
    this.getPlayer = this.getPlayer.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.convertDollars = this.convertDollars.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    this.getPlayer();
  }

  convertDollars(value) {
    if (value === "TBD") return "TBD";
    if (value === "") return "-";
    var dollar;
    var arr = value.split("");
    var symbol = arr[0];
    var nums = arr.slice(1, value.length);
    var str = nums.join("");
    var newStr = str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return "$" + newStr;
  }

  getOverallRating() {
    if (this.state.player) {
      var per = parseFloat(this.state.player.per) * 0.4;
      var bpm = parseFloat(this.state.player.bpm) * 0.2;
      var ws48 = parseFloat(this.state.player.wsFourtyEight) * 0.1;
      var ws = parseFloat(this.state.player.ws) * 0.1;
      var vorp = parseFloat(this.state.player.vorp) * 0.25;
      var weightedOvr = per + bpm + ws48 + ws + vorp;
      var grade = this.getGrade(14.0, 0, weightedOvr);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">80</span>
          </button>
        );
      }
      if (grade.Grade === 75) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">75</span>
          </button>
        );
      }
      if (grade.Grade === 70) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">70</span>
          </button>
        );
      }
      if (grade.Grade === 65) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">65</span>
          </button>
        );
      }
      if (grade.Grade === 60) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">60</span>
          </button>
        );
      }
      if (grade.Grade === 55) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">55</span>
          </button>
        );
      }
      if (grade.Grade === 50) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">50</span>
          </button>
        );
      }
      if (grade.Grade === 45) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">45</span>
          </button>
        );
      }
      if (grade.Grade === 40) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">40</span>
          </button>
        );
      }
      if (grade.Grade === 35) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">35</span>
          </button>
        );
      }
      if (grade.Grade === 30) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">30</span>
          </button>
        );
      }
      if (grade.Grade === 25) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">25</span>
          </button>
        );
      }
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
          }}
          className="fa__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  getGrade(high, min, actual) {
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

  getOffenseRating() {
    if (this.state.player) {
      var obpm = parseFloat(this.state.player.obpm);
      var ows = parseFloat(this.state.player.ows);
      var offRating = obpm + ows;
      var grade = this.getGrade(13.0, -5.0, offRating);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">80</span>
          </button>
        );
      }
      if (grade.Grade === 75) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">75</span>
          </button>
        );
      }
      if (grade.Grade === 70) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">70</span>
          </button>
        );
      }
      if (grade.Grade === 65) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">65</span>
          </button>
        );
      }
      if (grade.Grade === 60) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">60</span>
          </button>
        );
      }
      if (grade.Grade === 55) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">55</span>
          </button>
        );
      }
      if (grade.Grade === 50) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">50</span>
          </button>
        );
      }
      if (grade.Grade === 45) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">45</span>
          </button>
        );
      }
      if (grade.Grade === 40) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">40</span>
          </button>
        );
      }
      if (grade.Grade === 35) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">35</span>
          </button>
        );
      }
      if (grade.Grade === 30) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">30</span>
          </button>
        );
      }
      if (grade.Grade === 25) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">25</span>
          </button>
        );
      }
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
          }}
          className="fa__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  getDefenseRating() {
    if (this.state.player) {
      var dbpm = parseFloat(this.state.player.dbpm);
      var dws = parseFloat(this.state.player.dws);
      var defRating = dbpm + dws;
      var grade = this.getGrade(6.5, -3.0, defRating);
      if (grade.Grade === 80) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), rgba(102, 252, 241, 0.5))"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">80</span>
          </button>
        );
      }
      if (grade.Grade === 75) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), rgba(80, 251, 240, 0.5), transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">75</span>
          </button>
        );
      }
      if (grade.Grade === 70) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), rgba(55, 251, 238, 0.5), transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">70</span>
          </button>
        );
      }
      if (grade.Grade === 65) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), rgba(30, 250, 236, 0.5), transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">65</span>
          </button>
        );
      }
      if (grade.Grade === 60) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), rgba(5, 250, 234, 0.5), transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">60</span>
          </button>
        );
      }
      if (grade.Grade === 55) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), rgba(5, 225, 210, 0.5), transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">55</span>
          </button>
        );
      }
      if (grade.Grade === 50) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), rgba(4, 200, 187, 0.5), transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">50</span>
          </button>
        );
      }
      if (grade.Grade === 45) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), rgba(4, 175, 164, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">45</span>
          </button>
        );
      }
      if (grade.Grade === 40) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), rgba(3, 150, 140, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">40</span>
          </button>
        );
      }
      if (grade.Grade === 35) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), rgba(3, 125, 117, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">35</span>
          </button>
        );
      }
      if (grade.Grade === 30) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), rgba(3, 99, 93, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">30</span>
          </button>
        );
      }
      if (grade.Grade === 25) {
        return (
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(1, 50, 46, 0.5), rgba(2, 74, 69, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
            }}
            className="fa__ratings-oversight-button"
          >
            <span className="player__ratings-rating">25</span>
          </button>
        );
      }
      return (
        <button
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(1, 50, 46, 0.5), transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent, transparent)"
          }}
          className="fa__ratings-oversight-button"
        >
          <span className="player__ratings-rating">20</span>
        </button>
      );
    }
  }

  renderPlayer() {
    // Props = contract / State = Player Info
    if (this.props.player.type === "Unrestricted" && !this.props.unrestricted)
      return null;
    if (this.props.player.type === "Restricted" && !this.props.restricted)
      return null;
    if (this.props.player.type === "Player Option" && !this.props.playerOption)
      return null;
    if (this.props.player.type === "Team Option" && !this.props.teamOption)
      return null;
    // if (
    //   !this.props.unrestricted &&
    //   !this.props.restricted &&
    //   !this.props.playerOption
    // ) {
    //   return <div>No Players Selected</div>;
    // }
    if (this.state.player.position === "PG" && !this.props.pg) return null;
    if (this.state.player.position === "SG" && !this.props.sg) return null;
    if (this.state.player.position === "SF" && !this.props.sf) return null;
    if (this.state.player.position === "PF" && !this.props.pf) return null;
    if (this.state.player.position === "C" && !this.props.c) return null;

    if (this.state.player.mpg < 15 && !this.props.mpg1) return null;
    if (
      this.state.player.mpg >= 15 &&
      this.state.player.mpg < 20 &&
      !this.props.mpg2
    )
      return null;
    if (
      this.state.player.mpg >= 20 &&
      this.state.player.mpg < 25 &&
      !this.props.mpg3
    )
      return null;
    if (
      this.state.player.mpg >= 25 &&
      this.state.player.mpg < 30 &&
      !this.props.mpg4
    )
      return null;
    if (this.state.player.mpg >= 30 && !this.props.mpg5) return null;

    if (this.state.player.experience === "R" && !this.props.exp1) return null;
    if (
      parseInt(this.state.player.experience) >= 1 &&
      parseInt(this.state.player.experience) <= 3 &&
      !this.props.exp2
    )
      return null;
    if (
      parseInt(this.state.player.experience) >= 4 &&
      parseInt(this.state.player.experience) <= 6 &&
      !this.props.exp3
    )
      return null;
    if (
      parseInt(this.state.player.experience) >= 7 &&
      parseInt(this.state.player.experience) < 10 &&
      !this.props.exp4
    )
      return null;
    if (parseInt(this.state.player.experience) >= 10 && !this.props.exp5)
      return null;

    if (parseInt(this.state.player.age) < 21 && !this.props.age1) return null;
    if (
      parseInt(this.state.player.age) >= 21 &&
      parseInt(this.state.player.age) <= 25 &&
      !this.props.age2
    )
      return null;
    if (
      parseInt(this.state.player.age) >= 26 &&
      parseInt(this.state.player.age) <= 30 &&
      !this.props.age3
    )
      return null;
    if (
      parseInt(this.state.player.age) >= 31 &&
      parseInt(this.state.player.age) < 35 &&
      !this.props.age4
    )
      return null;
    if (parseInt(this.state.player.age) >= 35 && !this.props.age5) return null;

    if (this.state.player.name) {
      if (
        (parseInt(this.state.player.experience) < 4 ||
          this.state.player.experience === "R") &&
        this.props.player.yearTwoOption !== "Team"
      )
        this.props.player.type = "Restricted";
      if (
        this.props.player.type === "Restricted" &&
        parseInt(this.state.player.experience) > 3
      )
        this.props.player.type = "Unrestricted";
      var picture =
        this.state.player.picture ||
        "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
      return (
        <div
          className="card"
          style={{
            backgroundColor: "black",
            height: "140px",
            overflowY: "auto",
            paddingBottom: "5px"
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(105,105,105,0.1)",
              color: "grey"
            }}
          >
            <div className="row">
              <div className="col-md-3">
                <div>
                  <img
                    src={picture}
                    style={{
                      maxHeight: "135px",
                      padding: "10px 0px 10px 10px"
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div
                  style={{
                    padding: "20px 0px",
                    display: "flex",
                    flexDirection: "column",
                    height: "135px",
                    justifyContent: "space-evenly"
                  }}
                >
                  <div style={{ fontSize: "16px" }}>
                    <a href={`/player/${this.state.player.id}`}>
                      <span style={{ color: "grey" }}>
                        {this.state.player.name}
                      </span>
                    </a>
                    <span
                      style={{
                        paddingLeft: "3px",
                        fontSize: "10px",
                        color: "grey"
                      }}
                    >
                      {" "}
                      {this.state.player.position}
                    </span>
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {this.props.player.type}
                  </div>
                  <div>
                    <span>Height: {this.state.player.height}</span>
                    <span style={{ paddingLeft: "3px" }}>
                      {" "}
                      Weight: {this.state.player.weight}
                    </span>
                  </div>
                  <div>
                    <span>Age: {this.state.player.age}</span>
                    <span style={{ paddingLeft: "3px" }}>
                      {" "}
                      Experience: {this.state.player.experience}
                    </span>
                  </div>
                  <div>
                    Current Salary:{" "}
                    {this.convertDollars(this.props.player.current)}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-md-offset-1">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "15.5px",
                    height: "135px",
                    justifyContent: "space-evenly",
                    textAlign: "right"
                  }}
                >
                  <div style={{ paddingRight: "10px" }}>
                    <span style={{ paddingRight: "10px" }}>Overall:</span>{" "}
                    {this.getOverallRating()}
                  </div>
                  <div style={{ paddingRight: "10px" }}>
                    <span style={{ paddingRight: "10px" }}>Offense:</span>{" "}
                    {this.getOffenseRating()}
                  </div>
                  <div style={{ paddingRight: "10px" }}>
                    <span style={{ paddingRight: "10px" }}>Defense:</span>{" "}
                    {this.getDefenseRating()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  getPlayer() {
    axios
      .get(`/api/teams/getPlayer/${this.props.player.name}`)
      .then(data => {
        this.setState({ player: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderLogo() {
    if (JSON.stringify(this.state.team) != "{}") {
      return (
        <div
          style={{ paddingTop: "25px", paddingLeft: "40px", height: "110px" }}
        >
          <a href={`/team/${this.state.team.id}`}>
            <img src={this.state.team.Logo} />
          </a>
        </div>
      );
    } else {
      return <div style={{ paddingTop: "25px", paddingLeft: "45px" }}></div>;
    }
  }

  render() {
    return <div>{this.renderPlayer()}</div>;
  }
}
