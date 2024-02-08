import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.status != "disconnected") {
    return global.conexao;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SCQ",
  });

  global.conexao = conexao;

  return conexao;
}
