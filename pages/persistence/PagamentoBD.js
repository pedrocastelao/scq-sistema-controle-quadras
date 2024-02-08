import Pagamento from "../model/Pagamento.js";
import conectar from "./Conexao.js";
import dateFormat, { masks } from "dateformat";

class PagamentoBD {
  async incluir(pagamento) {
    if (pagamento instanceof Pagamento) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO" +
        " pagamento" +
        " (valor, status)" +
        " VALUES" +
        " (?, UPPER(?))";

      const val = [pagamento.valor, pagamento.status];

      await conexao.query(sql, val);
    }
  }

  async alterar(pagamento) {
    if (pagamento instanceof Pagamento) {
      const conexao = await conectar();
      const sql =
        "UPDATE" +
        "pagamento_esportiva SET" +
        "valor = ?, status = ?, preco = ?" +
        "WHERE" +
        "id = ?";

      const val = [
        pagamento.valor,
        pagamento.status,
        pagamento.preco,
        pagamento.id,
      ];

      await conexao.query(sql, val);
    }
  }

  async excluir(pagamento) {
    if (pagamento instanceof Pagamento) {
      const conexao = await conectar();
      const sql = "DELETE FROM pagamento_esportiva WHERE id = ?";

      const val = [pagamento.id];
      console.log(sql + " " + pagamento.id);

      await conexao.query(sql, val);
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * FROM pagamento";
    const val = [];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Pagamentos
    const listaPagamentos = [];

    for (const row of rows) {
      const pagamento = new Pagamento(
        row["ID_pagamento"],
        row["pg_valor"],
        row["pg_status"]
      );

      listaPagamentos.push(pagamento);
    }

    return listaPagamentos;
  }

  async consultarCPF(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM pagamento_esportiva WHERE id = ?";
    const val = [id];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Pagamentos
    const listaPagamentos = [];

    for (const row of rows) {
      const pagamento = new Pagamento(
        row["id"],
        row["valor"],
        row["status"],
        row["preco"]
      );

      listaPagamentos.push(pagamento);
    }

    return listaPagamentos;
  }
}

export default PagamentoBD;
