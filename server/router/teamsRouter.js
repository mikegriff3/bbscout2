const router = require("express").Router();
const controller = require("../controller/teamController");

router.get("/getAllTeams", controller.getAllTeams);
router.get("/getTeamsPlayers", controller.getTeamsPlayers);
router.get("/getTeamContracts", controller.getTeamContracts);
router.get("/getTeamStats", controller.getTeamStats);
router.get("/getPlayerStats", controller.getPlayerStats);
router.get("/getPlayerContracts", controller.getPlayerContracts);
router.get("/getLeagueStats", controller.getLeagueStats);
router.get("/getcLeagueStats", controller.getcLeagueStats);
router.get("/getgLeagueStats", controller.getgLeagueStats);
router.get("/renderPlayerProfile", controller.renderPlayerProfile);
router.get("/renderTeamProfile", controller.renderTeamProfile);
router.get("/getPlayerProfile/:id", controller.getPlayerProfile);
router.get("/getPlayer/:name", controller.getPlayer);
router.get("/getPostStats/:name", controller.getPostStats);
router.get("/getHustleStats/:name", controller.getHustleStats);
router.get("/getCareerStats/:name", controller.getCareerStats);
router.get("/getPlayerContract/:name", controller.getPlayerContract);
router.get("/getPRHandler/:name", controller.getPRHandler);
router.get("/getPRRollMan/:name", controller.getPRRollMan);
router.get("/getIso/:name", controller.getIso);
router.get("/getTransition/:name", controller.getTransition);
router.get("/getCatchShootStats/:name", controller.getCatchShootStats);
router.get("/getSpeedDistanceStats/:name", controller.getSpeedDistanceStats);
router.get("/getShootingStats/:name", controller.getShootingStats);
router.get("/getTeamProfile/:id", controller.getTeamProfile);
router.put("/loadTeamLogoColor", controller.loadTeamLogoColor);
router.get("/getTeamColors/:team", controller.getTeamColors);
router.get("/getPositionStats", controller.getPositionStats);
router.get("/getCollegePlayerProfile/:id", controller.getCollegePlayerProfile);
router.get("/getgPlayerProfile/:id", controller.getgPlayerProfile);
router.get("/getAgeStats/:age", controller.getAgeStats);
router.get("/getCollegeTeamColors/:team", controller.getCollegeTeamColors);
router.get("/getgTeamColors/:team", controller.getgTeamColors);
router.get("/getCollegeTeamProfile/:id", controller.getCollegeTeamProfile);
router.get("/getGTeamProfile/:id", controller.getGTeamProfile);
router.get("/getIntTeamProfile/:id", controller.getIntTeamProfile);
router.get("/getCollegeTeamsPlayers", controller.getCollegeTeamsPlayers);
router.get("/getGTeamsPlayers", controller.getGTeamsPlayers);
//router.get("/getIntTeamsPlayers", controller.getIntTeamsPlayers);
router.get("/getcLeagueStats", controller.getcLeagueStats);
router.get("/getgLeagueStats", controller.getgLeagueStats);
router.get("/getcPlayerStats", controller.getcPlayerStats);
router.get("/getgPlayerStats", controller.getgPlayerStats);
router.get("/getcPositionStats", controller.getcPositionStats);
router.get("/getgPositionStats", controller.getgPositionStats);
router.get("/getAllNbaPlayers", controller.getAllNbaPlayers);
router.get("/getAllCollegePlayers", controller.getAllCollegePlayers);
router.get("/getAllgPlayers", controller.getAllgPlayers);
router.get("/getNbaSchedule", controller.getNbaSchedule);
router.get("/nbaPlayersList", controller.nbaPlayersList);
router.get("/collegePlayersList", controller.collegePlayersList);
router.get("/gPlayersList", controller.gPlayersList);
router.get("/nbaTeamsList", controller.nbaTeamsList);
router.get("/collegeTeamsList", controller.collegeTeamsList);
router.get("/gTeamsList", controller.gTeamsList);
router.get("/getHistoryPlayers", controller.getHistoryPlayers);
router.get("/getFutureStats", controller.getFutureStats);

router.put("/updategPlayersAdv", controller.updategPlayersAdv);
router.put("/updateCurrentSalary", controller.updateCurrentSalary);
router.put("/upsertPlayerInfo", controller.upsertPlayerInfo);
router.put("/updateTeams", controller.updateTeams);
router.put("/updateTeamsAdvanced", controller.updateTeamsAdvanced);
router.put("/updatecTeams", controller.updatecTeams);
router.put("/updategTeams", controller.updategTeams);
router.put("/updategTeamsAdv", controller.updategTeamsAdv);
router.put("/updateiTeams", controller.updateiTeams);
router.put("/updatePlayerStats", controller.updatePlayerStats);
router.put("/updatePlayerAdvancedStats", controller.updatePlayerAdvancedStats);
router.put(
  "/updateGPlayerAdvancedStats",
  controller.updateGPlayerAdvancedStats
);
router.put(
  "/updateCPlayerAdvancedStats",
  controller.updateCPlayerAdvancedStats
);
router.put("/updateCollegePlayers", controller.updateCollegePlayers);
router.put("/updategPlayers", controller.updategPlayers);
router.put("/updategPositions", controller.updategPositions);

router.post("/postCollegePlayers", controller.postCollegePlayers);
router.post("/postgPlayers", controller.postgPlayers);
router.post("/createCollegeTeams", controller.createCollegeTeams);
router.post("/creategLeagueTeams", controller.creategLeagueTeams);
router.post("/createInternationalTeams", controller.createInternationalTeams);
router.post("/createPostStats", controller.createPostStats);
router.post("/createHustleStats", controller.createHustleStats);
router.post("/createShootingStats", controller.createShootingStats);
router.post("/createCatchShootStats", controller.createCatchShootStats);
router.post("/createPRBHStats", controller.createPRBHStats);
router.post("/createPRRMStats", controller.createPRRMStats);
router.post("/createIsoStats", controller.createIsoStats);
router.post("/createTransitionStats", controller.createTransitionStats);
router.post("/createSpeedDistanceStats", controller.createSpeedDistanceStats);
router.post("/createPlayerSalaries", controller.createPlayerSalaries);
router.post("/createNbaSchedule", controller.createNbaSchedule);
router.post("/savePlayerInfo", controller.savePlayerInfo);
router.post("/createTeams", controller.createTeams);

module.exports = router;
