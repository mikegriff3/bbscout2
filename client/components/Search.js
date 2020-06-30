import React from "react";
import axios from "axios";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.items = this.props.suggestions;
    this.state = {
      suggestions: []
      //items: ["Sam", "SANDY", "RYAN"]
    };
  }

  onTextChanged = e => {
    const value = e.target.value;
    console.log(value);
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .filter(v => regex.test(v.name));
    }
    this.setState({ suggestions });
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    const playerList = suggestions.map(player => (
      <a style={{ textDecoration: "none" }} href={player.tag}>
        <div key={player.id} className="suggestion-item">
          <div className="suggestion-picture-container">
            <img
              className="suggestion-picture"
              src={
                player.picture ||
                "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
              }
            />
          </div>
          <div className="suggestion-info">
            <div className="suggestion-name">{player.name}</div>
            <div className="suggestion-team">{player.team || ""}</div>
          </div>
        </div>
      </a>
    ));
    return <div className="suggestion-box">{playerList}</div>;
  }

  render() {
    return (
      <form action="#" className="search" style={{ marginLeft: "-50px" }}>
        <input
          onChange={this.onTextChanged}
          type="text"
          className="search__input"
          placeholder="Search Players or Teams"
        />
        <button className="search__button">
          <svg className="search__icon">
            <use xlinkHref="img/sprite.svg#icon-magnifying-glass" />
          </svg>
        </button>
        {this.renderSuggestions()}
      </form>
    );
  }
}
