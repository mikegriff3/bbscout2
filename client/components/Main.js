import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import TeamPage from "./TeamPage";
import PlayerPage from "./PlayerPage";
import NBAScoutingPage from "./nba-scouting/NBAScoutingPage";
import Test from "./Test";
import Home from "./Home";
import CollegeScoutingPage from "./college-scouting/CollegeScoutingPage";
import GLeagueScoutingPage from "./gleague-scouting/GLeagueScoutingPage";
import CPlayerPage from "./College/CPlayerPage";
// import CollegeTeamPage from "./College/CollegeTeamPage";
// import IntTeamPage from "./International/IntTeamPage";
import GTeamPage from "./GLeague/GTeamPage";
import GPlayerPage from "./GLeague/GPlayerPage";

const Main = () => (
  <BrowserRouter>
    <Switch>
      {/*
      <Route path="/player/:id" component={PlayerPage} />
      <Route path="/college-player/:id" component={CollegePlayerPage} />
      <Route path="/college-team/:id" component={CollegeTeamPage} />
      <Route path="/gleague-player/:id" component={GPlayerPage} />
      <Route path="/int-team/:id" component={IntTeamPage} />
      <Redirect from="/" to="/team/26" />
    */}
      <Route path="/player/:id" component={PlayerPage} />
      <Route path="/gleague-player/:id" component={GPlayerPage} />
      <Route path="/college-player/:id" component={CPlayerPage} />
      <Route path="/team/:id" component={TeamPage} />
      <Route path="/gleague-team/:id" component={GTeamPage} />
      <Route path="/test" component={Test} />
      <Route path="/home" component={Home} />
      <Route path="/nba-scouting" component={NBAScoutingPage} />
      <Route path="/gleague-scouting" component={GLeagueScoutingPage} />
      <Route path="/college-scouting" component={CollegeScoutingPage} />
      <Redirect from="/" to="/home" exact />
    </Switch>
  </BrowserRouter>
);

export default Main;
// <Route exact path="/team/:id" component={TeamPage} />
// <Route exact path="/player/:id" component={PlayerPage} />
