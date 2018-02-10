const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL ||
   'postgres://localhost/cryptoDB', {
  logging: false,
  // fix deprecation warning for query string
  operatorsAliases: Sequelize.Op,
});

const Users = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  firebaseUID: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// store all coins detail here
const Coins = db.define('coin', {
  coinName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coinId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cryptoCoinFullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// user coin holdings saved @ per transaction
// name -> id
const UserTransactions = db.define('transactions', {
  coinName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coinAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  buyPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sellPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// DB association
UserTransactions.belongsTo(Users);
UserTransactions.belongsTo(Coins);
Users.hasMany(UserTransactions);
Coins.hasMany(UserTransactions);

// sync db
const sync = () => {
  const syncDatabase = db.sync({ force: true });
  return syncDatabase;
};

module.exports = {
  models: {
    Users,
    Coins,
    UserTransactions,
  },
  sync,
};
