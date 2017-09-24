import Sequelize from 'sequelize';
import config from '../../../../config';
import dbCreate from './dbCreate';
import userModel from './user';

const db = {};
const dbConfig = config('database');

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.pw,
  database: dbConfig.schema,
  timezone: dbConfig.timezone,
  logging: dbConfig.logging,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

db.User = sequelize.import('User', userModel);

Object.keys(db).forEach((key) => {
  const model = db[key];
  if (model.associate) {
    model.associate(db);
  }
});

dbCreate(db);

export { db as models, sequelize };
