import Quadra from "../model/Quadra.js";
import conectar from "./Conexao.js";
import dateFormat, { masks } from "dateformat";

class QuadraBD {
  async incluir(quadra) {
    if (quadra instanceof Quadra) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO" +
        " quadra_esportiva" +
        " (tipo, localizacao, preco)" +
        " VALUES" +
        " (UPPER(?), UPPER(?), ?)";

        console.log(
          quadra.tipo,
          quadra.localizacao,
          quadra.preco
        );

      const val = [quadra.tipo, quadra.localizacao, quadra.preco];

      await conexao.query(sql, val);
    }
  }

  async alterar(quadra) {
    if (quadra instanceof Quadra) {
      const conexao = await conectar();
      const sql =
        "UPDATE" +
        "quadra_esportiva SET" +
        "tipo = ?, localizacao = ?, preco = ?" +
        "WHERE" +
        "id = ?";

      const val = [quadra.tipo, quadra.localizacao, quadra.preco, quadra.id];

      await conexao.query(sql, val);
    }
  }

  async excluir(quadra) {
    if (quadra instanceof Quadra) {
      const conexao = await conectar();
      const sql = "DELETE FROM quadra_esportiva WHERE id = ?";

      const val = [quadra.id];
      console.log(sql + " " + quadra.id);

      await conexao.query(sql, val);
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * FROM quadra_esportiva";
    const val = [];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Quadras
    const listaQuadras = [];

    for (const row of rows) {
      const quadra = new Quadra(
        row["ID_quadra_esportiva"],
        row["qe_tipo"],
        row["qe_localizacao"],
        row["qe_preco"]
      );

      listaQuadras.push(quadra);
    }

    return listaQuadras;
  }

  async consultarCPF(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM quadra_esportiva WHERE id = ?";
    const val = [id];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Quadras
    const listaQuadras = [];

    for (const row of rows) {
      const quadra = new Quadra(
        row["id"],
        row["tipo"],
        row["localizacao"],
        row["preco"]
      );

      listaQuadras.push(quadra);
    }

    return listaQuadras;
  }
}

export default QuadraBD;
