import React from "react";

export default class PlayerContracts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: []
    };
    this.numberWithCommas = this.numberWithCommas.bind(this);
  }

  componentDidMount() {
    let arr = this.props.contracts.slice();
    let totalOne = 0;
    let totalTwo = 0;
    let totalThree = 0;
    let totalFour = 0;
    let totalFive = 0;
    let totalSix = 0;
    let totalAge = 0;

    for (let i = 0; i < arr.length; i++) {
      totalAge += parseInt(arr[i].age);

      if (arr[i].yearOne.length > 0) {
        let spl1 = arr[i].yearOne.split("");
        let num1 = spl1.slice(1, spl1.length);
        let str1 = num1.join("");
        totalOne += parseFloat(str1);
        arr[i].yearOne = "$" + this.numberWithCommas(str1);
      }

      if (arr[i].yearTwo.length > 0) {
        let spl2 = arr[i].yearTwo.split("");
        let num2 = spl2.slice(1, spl2.length);
        let str2 = num2.join("");
        totalTwo += parseFloat(str2);
        arr[i].yearTwo = "$" + this.numberWithCommas(str2);
      }

      if (arr[i].yearThird.length > 0) {
        let spl3 = arr[i].yearThird.split("");
        let num3 = spl3.slice(1, spl3.length);
        let str3 = num3.join("");
        totalThree += parseFloat(str3);
        arr[i].yearThird = "$" + this.numberWithCommas(str3);
      }

      if (arr[i].yearFour.length > 0) {
        let spl4 = arr[i].yearFour.split("");
        let num4 = spl4.slice(1, spl4.length);
        let str4 = num4.join("");
        totalFour += parseFloat(str4);
        arr[i].yearFour = "$" + this.numberWithCommas(str4);
      }

      if (arr[i].yearFive.length > 0) {
        let spl5 = arr[i].yearFive.split("");
        let num5 = spl5.slice(1, spl5.length);
        let str5 = num5.join("");
        totalFive += parseFloat(str5);
        arr[i].yearFive = "$" + this.numberWithCommas(str5);
      }

      if (arr[i].yearSix.length > 0) {
        let spl6 = arr[i].yearSix.split("");
        let num6 = spl6.slice(1, spl6.length);
        let str6 = num6.join("");
        totalSix += parseFloat(str6);
        arr[i].yearSix = "$" + this.numberWithCommas(str6);
      }

      if (arr[i].guaranteed.length > 0) {
        let splg = arr[i].guaranteed.split("");
        let numg = splg.slice(1, splg.length);
        let strg = numg.join("");
        arr[i].guaranteed = "$" + this.numberWithCommas(strg);
      }
    }
    totalAge = (totalAge / arr.length).toFixed(1);

    let totalOneStr = "$" + this.numberWithCommas(totalOne);
    let totalTwoStr = "$" + this.numberWithCommas(totalTwo);
    let totalThreeStr = "$" + this.numberWithCommas(totalThree);
    let totalFourStr = "$" + this.numberWithCommas(totalFour);
    let totalFiveStr = "$" + this.numberWithCommas(totalFive);
    let totalSixStr = "$" + this.numberWithCommas(totalSix);
    this.setState({
      totalOne: totalOneStr,
      totalTwo: totalTwoStr,
      totalThree: totalThreeStr,
      totalFour: totalFourStr,
      totalFive: totalFiveStr,
      totalSix: totalSixStr,
      totalAge: totalAge,
      contracts: arr
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contracts !== this.props.contracts) {
      let arr2 = this.props.contracts.slice();
      let totalOne = 0;
      let totalTwo = 0;
      let totalThree = 0;
      let totalFour = 0;
      let totalFive = 0;
      let totalSix = 0;
      let totalAge = 0;

      for (let i = 0; i < arr2.length; i++) {
        totalAge += parseInt(arr2[i].age);

        if (arr2[i].yearOne.length > 0) {
          let spl1 = arr2[i].yearOne.split("");
          let num1 = spl1.slice(1, spl1.length);
          let str1 = num1.join("");
          totalOne += parseFloat(str1);
          arr2[i].yearOne = "$" + this.numberWithCommas(str1);
        }

        if (arr2[i].yearTwo.length > 0) {
          let spl2 = arr2[i].yearTwo.split("");
          let num2 = spl2.slice(1, spl2.length);
          let str2 = num2.join("");
          totalTwo += parseFloat(str2);
          arr2[i].yearTwo = "$" + this.numberWithCommas(str2);
        }

        if (arr2[i].yearThird.length > 0) {
          let spl3 = arr2[i].yearThird.split("");
          let num3 = spl3.slice(1, spl3.length);
          let str3 = num3.join("");
          totalThree += parseFloat(str3);
          arr2[i].yearThird = "$" + this.numberWithCommas(str3);
        }

        if (arr2[i].yearFour.length > 0) {
          let spl4 = arr2[i].yearFour.split("");
          let num4 = spl4.slice(1, spl4.length);
          let str4 = num4.join("");
          totalFour += parseFloat(str4);
          arr2[i].yearFour = "$" + this.numberWithCommas(str4);
        }

        if (arr2[i].yearFive.length > 0) {
          let spl5 = arr2[i].yearFive.split("");
          let num5 = spl5.slice(1, spl5.length);
          let str5 = num5.join("");
          totalFive += parseFloat(str5);
          arr2[i].yearFive = "$" + this.numberWithCommas(str5);
        }

        if (arr2[i].yearSix.length > 0) {
          let spl6 = arr2[i].yearSix.split("");
          let num6 = spl6.slice(1, spl6.length);
          let str6 = num6.join("");
          totalSix += parseFloat(str6);
          arr2[i].yearSix = "$" + this.numberWithCommas(str6);
        }

        if (arr2[i].guaranteed.length > 0) {
          let splg = arr2[i].guaranteed.split("");
          let numg = splg.slice(1, splg.length);
          let strg = numg.join("");
          arr2[i].guaranteed = "$" + this.numberWithCommas(strg);
        }
      }
      totalAge = (totalAge / arr2.length).toFixed(1);

      let totalOneStr = "$" + this.numberWithCommas(totalOne);
      let totalTwoStr = "$" + this.numberWithCommas(totalTwo);
      let totalThreeStr = "$" + this.numberWithCommas(totalThree);
      let totalFourStr = "$" + this.numberWithCommas(totalFour);
      let totalFiveStr = "$" + this.numberWithCommas(totalFive);
      let totalSixStr = "$" + this.numberWithCommas(totalSix);
      this.setState({
        totalOne: totalOneStr,
        totalTwo: totalTwoStr,
        totalThree: totalThreeStr,
        totalFour: totalFourStr,
        totalFive: totalFiveStr,
        totalSix: totalSixStr,
        totalAge: totalAge,
        contracts: arr2
      });
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let contracts = this.state.contracts;
    return (
      <div style={{ paddingTop: "40px" }}>
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
              <th className="stat-th">Player</th>
              <th className="stat-th">Age</th>
              <th className="stat-th">2019-2020</th>
              <th className="stat-th">2020-2021</th>
              <th className="stat-th">2021-2022</th>
              <th className="stat-th">2022-2023</th>
              <th className="stat-th">2023-2024</th>
              <th className="stat-th">2024-2025</th>
              <th className="stat-th">Signed Using</th>
              <th className="stat-th">Guaranteed</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(function(player, index) {
              let twoColor = "white";
              let threeColor = "white";
              let fourColor = "white";
              let fiveColor = "white";
              let sixColor = "white";
              if (player["yearTwoOption"] === "Player")
                twoColor = "rgba(210, 255, 77, 0.8)";
              if (player["yearThirdOption"] === "Player")
                threeColor = "rgba(210, 255, 77, 0.8)";
              if (player["yearFourOption"] === "Player")
                fourColor = "rgba(210, 255, 77, 0.8)";
              if (player["yearFiveOption"] === "Player")
                fiveColor = "rgba(210, 255, 77, 0.8)";
              if (player["yearSixOption"] === "Player")
                sixColor = "rgba(210, 255, 77, 0.8)";
              if (player["yearTwoOption"] === "Team")
                twoColor = "rgba(102, 252, 241, 0.8)";
              if (player["yearThirdOption"] === "Team")
                threeColor = "rgba(102, 252, 241, 0.8)";
              if (player["yearFourOption"] === "Team")
                fourColor = "rgba(102, 252, 241, 0.8)";
              if (player["yearFiveOption"] === "Team")
                fiveColor = "rgba(102, 252, 241, 0.8)";
              if (player["yearSixOption"] === "Team")
                sixColor = "rgba(102, 252, 241, 0.8)";
              if (player["yearTwoOption"] === "Early Termination")
                twoColor = "rgba(255, 0, 127, 0.8)";
              if (player["yearThirdOption"] === "Early Termination")
                threeColor = "rgba(255, 0, 127, 0.8)";
              if (player["yearFourOption"] === "Early Termination")
                fourColor = "rgba(255, 0, 127, 0.8)";
              if (player["yearFiveOption"] === "Early Termination")
                fiveColor = "rgba(255, 0, 127, 0.8)";
              if (player["yearSixOption"] === "Early Termination")
                sixColor = "rgba(255, 0, 127, 0.8)";
              return (
                <tr className="full-data">
                  <td>
                    {/*<a href={`/player/${player.id}`}>*/}
                    {player["name"]}
                    {/*</a>*/}
                  </td>
                  <td>{player["age"]}</td>
                  <td>{player["yearOne"]}</td>
                  <td style={{ color: twoColor }}>{player["yearTwo"]}</td>
                  <td style={{ color: threeColor }}>{player["yearThird"]}</td>
                  <td style={{ color: fourColor }}>{player["yearFour"]}</td>
                  <td style={{ color: fiveColor }}>{player["yearFive"]}</td>
                  <td style={{ color: sixColor }}>{player["yearSix"]}</td>
                  <td>{player["signedUsing"]}</td>
                  <td>{player["guaranteed"]}</td>
                </tr>
              );
            })}
            <tr className="full-data" style={{ borderTop: "2px solid grey" }}>
              <td>Totals</td>
              <td>{this.state.totalAge}</td>
              <td>{this.state.totalOne}</td>
              <td>{this.state.totalTwo}</td>
              <td>{this.state.totalThree}</td>
              <td>{this.state.totalFour}</td>
              <td>{this.state.totalFive}</td>
              <td>{this.state.totalSix}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            fontSize: "12px"
          }}
        >
          <div style={{ color: "rgba(102, 252, 241, 0.8)" }}>Team Option</div>
          <div
            style={{ color: "rgba(210, 255, 77, 0.8)", paddingLeft: "20px" }}
          >
            Player Option
          </div>
          <div style={{ color: "rgba(255, 0, 127, 0.8)", paddingLeft: "20px" }}>
            Early Termination
          </div>
        </div>
      </div>
    );
  }
}
