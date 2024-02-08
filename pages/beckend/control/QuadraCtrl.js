import Quadra from "../model/Quadra.js";

//classe ira manipular/controlar a entidade Quadra
class QuadraCTRL {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;
      const tipo = dados.tipo;
      const localizacao = dados.localizacao;
      const preco = dados.preco;

      if ((tipo, localizacao, preco)) {
        const qd = new Quadra(id, tipo, localizacao, preco);

        qd.gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Quadra gravado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Quadras!",
        });
      }
    } else {
      res.status(400).json({
        statu: false,
        messagem: "Método não Permitido",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const dados = req.body;
      const nome = dados.nome;
      const sobrenome = dados.sobrenome;
      const rg = dados.rg;
      const id = dados.id;
      const telefone = dados.telefone;
      const datanascimento = dados.datanascimento;
      const cep = dados.cep;
      const estado = dados.estado;
      const cidade = dados.cidade;
      const endereco = dados.endereco;
      const checkin = dados.checkin;
      const checkout = dados.checkout;

      if (
        (nome,
        sobrenome,
        rg,
        id,
        telefone,
        datanascimento,
        cep,
        estado,
        cidade,
        endereco,
        checkin,
        checkout)
      ) {
        const qd = new Quadra(
          nome,
          sobrenome,
          rg,
          id,
          telefone,
          datanascimento,
          cep,
          estado,
          cidade,
          endereco,
          checkin,
          checkout
        );

        qd.atualizar()
          .then(() => {
            res
              .status(200)
              .json({ status: true, messagem: "Quadra gravado com sucesso!" });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Quadras!",
        });
      }
    } else {
      res.status(400).json({
        statu: false,
        messagem: "Método não Permitido",
      });
    }
  }

  excluir(req, res) {
    res.type("application/json");

    if (req.method === "DELETE" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;

      if (id) {
        const qd = new Quadra(id);
        qd.id = id;
        qd.removerBD(id)
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Quadra excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe o ID do Quadras!",
        });
      }
    } else {
      res.status(400).json({
        statu: false,
        messagem: "Método não Permitido/JSON",
      });
    }
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const qd = new Quadra();

      qd.consultar("")
        .then((qd) => {
          res.status(200).json(qd);
        })
        .catch((erro) => {
          res.status(500).json({ status: false, messagem: erro.message });
        });
    } else {
      res.status(400).json({
        status: false,
        messagem: "Método nao Permitido!",
      });
    }
  }

  consultarID(req, res) {
    res.type("application/json");
    const id = req.params["id"];

    if (req.method === "GET") {
      const qd = new Quadra();

      qd.consultarID(id)
        .then((qd) => {
          res.status(200).json({ qd });
        })
        .catch((erro) => {
          res.status(500).json({ status: false, messagem: erro.message });
        });
    } else {
      res.status(400).json({
        status: false,
        messagem: "Método nao Permitido!",
      });
    }
  }
}

export default QuadraCTRL;
