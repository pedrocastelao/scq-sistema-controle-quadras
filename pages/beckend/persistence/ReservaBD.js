import Reserva from "../model/Reserva.js";
import Quadra from "../model/Quadra.js";
import Usuario from "../model/Usuario.js";
import Pagamento from "../model/Pagamento.js";
import conectar from "./Conexao.js";
import dateFormat, { masks } from "dateformat";

class ReservaBD {
  async incluir(reserva) {
    if (reserva instanceof Reserva) {
      const conexao = await conectar();
      const sql = `INSERT INTO reserva (re_data, re_hora, ID_quadra_esportiva , ID_usuario) VALUES (?, ?, UPPER(?), UPPER(?))`;

      console.log(reserva.data, reserva.hora, reserva.quadra, reserva.usuario);

      const val = [reserva.data, reserva.hora, reserva.quadra, reserva.usuario];

      await conexao.query(sql, val);
    }
  }

  async alterar(reserva) {
    if (reserva instanceof Reserva) {
      const conexao = await conectar();
      const sql = `UPDATE reserva SET re_data = ?, re_hora = ?, ID_quadra_esportiva = ?, ID_usuario = ?  WHERE ID_Reserva = ?`;

      console.log(
        reserva.data,
        reserva.hora,
        reserva.quadra,
        reserva.usuario,
        reserva.id
      );

      const val = [
        reserva.data,
        reserva.hora,
        reserva.quadra,
        reserva.usuario,
        reserva.id,
      ];

      await conexao.query(sql, val);
    }
  }

  async excluir(reserva) {
    if (reserva instanceof Reserva) {
      const conexao = await conectar();
      const sql = "DELETE FROM reserva WHERE id = ?";

      const val = [reserva.id];
      console.log(sql + " " + reserva.id);

      await conexao.query(sql, val);
    }
  }

  async consultar() {
    const conexao = await conectar();

    const sql = `SELECT * FROM reserva re
                INNER JOIN quadra_esportiva qe ON re.ID_quadra_esportiva = qe.ID_quadra_esportiva 
                INNER JOIN usuario usu ON re.ID_usuario = usu.ID_usuario ORDER BY re.ID_Reserva ASC`;
    const val = [];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Quadras
    const listaReservas = [];
    for (const row of rows) {
      const quadra = new Quadra(
        row["ID_quadra_esportiva"],
        row["qe_tipo"],
        row["qe_localizacao"],
        row["qe_preco"]
      );

      const usuario = new Usuario(
        row["ID_usuario"],
        row["usu_nome"],
        row["usu_cpf"],
        row["usu_email"],
        row["usu_senha"]
      );

      const pagamento = new Pagamento(
        row["ID_pagamento"],
        row["pg_valor"],
        row["pg_status"]
      );

      const reserva = new Reserva(
        row["ID_Reserva"],
        dateFormat(row["re_data"], "dd/mm/yyyy"),
        row["re_hora"],
        quadra,
        usuario,
        pagamento
      );

      listaReservas.push(reserva);
    }

    return listaReservas;
  }

  async consultarID(id) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM reserva INNER JOIN quadra_esportiva ON reserva.ID_quadra_esportiva = quadra_esportiva.ID_quadra_esportiva WHERE ID_Reserva = ?";
    const val = [id];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Reservas
    const listaReservas = [];
    for (const row of rows) {
      const quadra = new Quadra(
        row["ID_quadra_esportiva"],
        row["qe_tipo"],
        row["qe_localizacao"],
        row["qe_preco"]
      );

      const reserva = new Reserva(
        row["ID_Reserva"],
        dateFormat(row["re_data"], "paddedShortDate"),
        row["re_hora"],
        quadra
      );

      listaReservas.push(reserva);
    }

    return listaReservas;
  }
}

export default ReservaBD;
