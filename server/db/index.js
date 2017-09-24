import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_SCHEMA,
});

console.log(`pool${typeof pool}`);

const getSqlConnection = async () => pool.getConnection();

const connect = async () => {
  try {
    const connection = await getSqlConnection();

    await connection.query('SELECT 1 + 1 AS solution');

    console.log('Database connected');
  } catch (err) {
    console.log('Error connecting to db server', err);
  }
};

export default connect;
