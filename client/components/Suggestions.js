import React from "react";

const Suggestions = props => {
  const options = props.results.map(player => (
    <li key={player.id}>{player.name}</li>
  ));
  return <ul>{options}</ul>;
};

export default Suggestions;
