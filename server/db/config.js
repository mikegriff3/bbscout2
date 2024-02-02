const Sequelize = require("sequelize");

// const bbscoutdb = new Sequelize(
//   "postgres://griff:temecula1@bbscoutdb.cpbianqr35ok.us-west-1.rds.amazonaws.com:5432/bbscoutdb",
//   {
//     dialect: "postgres",
//     pool: {
//       min: 0,
//       idle: 1000
//     },
//     logging: false
//   }
// );

// bbscoutdb
//   .authenticate()
//   .then(() => console.log("connected to db"))
//   .catch(err => console.log("FAILED TO CONNECT TO DB", err));

const db = new Sequelize(
  "postgres://ygldlctj:DzggMV4DXKAZfbFv9RpsuUbWi9UUdO_u@mahmud.db.elephantsql.com/ygldlctj",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      // evict: 20000,
    },
  }
);

db.authenticate()
  .then(() => console.log("Successfully connected to DB"))
  .catch((err) => console.log("Could not connect to DB", err));

// const playerHistdb = new Sequelize(
//   "postgres://jupsdajv:iX10xzBNGQBT4GkegGM8VEFw7GisAFYt@ruby.db.elephantsql.com:5432/jupsdajv",
//   {
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 20000,
//       acquire: 20000,
//       evict: 20000,
//     },
//   }
// );

// const cdb = new Sequelize(
//   "postgres://mmtnbyyu:8th65F6EICt46OY-pbY6thbqhB6-rSKv@baasu.db.elephantsql.com:5432/mmtnbyyu",
//   {
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 20000,
//       acquire: 20000,
//       evict: 20000,
//     },
//   }
// );

const catchShootDB = new Sequelize(
  "postgres://uswrrdhl:c_JP-Ex2z2vJrQ0UVNsBVljtEUVxSilr@mahmud.db.elephantsql.com/uswrrdhl",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

const hustleDB = new Sequelize(
  "postgres://iuwmrsqq:qdYN3AslfP5cnTkK44DfMWVcOY2KkZCQ@kashin.db.elephantsql.com/iuwmrsqq",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

const isolationDB = new Sequelize(
  "postgres://ttbukfwh:ZSA99SNO0nkjn2YsEqaKflAJXudUdaev@kashin.db.elephantsql.com/ttbukfwh",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

const postUpDB = new Sequelize(
  "postgres://xewljthf:TXRaOK30Dv0AMuseriV1mrlD4LKwZpmK@kashin.db.elephantsql.com/xewljthf",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000,
    },
  }
);

const prbhDB = new Sequelize(
  "postgres://zytdyoku:oJicEVnxUa1WPe4j9imuJi8u09qU28xW@kashin.db.elephantsql.com/zytdyoku",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

const prrmDB = new Sequelize(
  "postgres://ucnsirje:CNsmax1fEABUvkYJZTAG4O0FDbX4PN-U@kashin.db.elephantsql.com/ucnsirje",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000,
    },
  }
);

const shootingDB = new Sequelize(
  "postgres://kxyegdfk:gIira8fSSfXL4UOYqVcAPuX2zw-zJFzL@kashin.db.elephantsql.com/kxyegdfk",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

const speedDistanceDB = new Sequelize(
  "postgres://ltuavsqx:1Cbm3UpkNUvQu3kpu-HUK2tBWVcDgVZC@kashin.db.elephantsql.com/ltuavsqx",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

const transitionDB = new Sequelize(
  "postgres://ibinlcjc:jSCCqHf4HOk5iT2FFo_PMWNWFJMLb1St@kashin.db.elephantsql.com/ibinlcjc",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000,
    },
  }
);

// const ligaacbdb = new Sequelize(
//   "postgres://duxdpgwx:fsdbfMAx6UIMhQJhlMHs-mqql6WCrX2o@baasu.db.elephantsql.com:5432/duxdpgwx",
//   {
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 20000,
//       acquire: 20000,
//       evict: 20000,
//     },
//   }
// );

// const eurodb = new Sequelize(
//   "postgres://nfovijmt:fn8nhHXaG61oqOLEbTuiAA0IabybxSec@baasu.db.elephantsql.com:5432/nfovijmt",
//   {
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 20000,
//       acquire: 20000,
//       evict: 20000,
//     },
//   }
// );

// const gleaguedb = new Sequelize(
//   "postgres://cachveoj:tuzux8D7xfrOFiMK3R3AJObM6pRSJ6wn@stampy.db.elephantsql.com:5432/cachveoj",
//   {
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 20000,
//       acquire: 20000,
//       evict: 20000,
//     },
//   }
// );

const salariesdb = new Sequelize(
  "postgres://fekgyfmn:a1cq0ZX0InRxnkhCCIWe1KG9GRSGSPKw@kashin.db.elephantsql.com/fekgyfmn",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      //evict: 20000,
    },
  }
);

module.exports = {
  db,
  // cdb,
  // ligaacbdb,
  catchShootDB,
  hustleDB,
  isolationDB,
  postUpDB,
  prbhDB,
  prrmDB,
  shootingDB,
  speedDistanceDB,
  transitionDB,
  // eurodb,
  // gleaguedb,
  salariesdb,
  // playerHistdb,
};
