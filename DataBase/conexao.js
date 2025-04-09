import mysql from "mysql2/promise.js";

export default async function conectar(){
  if (global.poolConexoes){
    return await global.poolConexoes.getConnection();
} else {
  global.poolConexoes = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'backend',
  port: 3306,
  password:'root\'@\'%',
  waitForConnections: true,
  connectionLimit: 20,
  maxIdle: 10,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
  });
    return await global.poolConexoes.getConnection()
}
}