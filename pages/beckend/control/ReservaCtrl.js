import Reserva from "../model/Reserva.js";
import Quadra from "../model/Quadra.js";
import Usuario from "../model/Usuario.js";

//classe ira manipular/controlar a entidade Reserva
class ReservaCTRK {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;
      const data = dados.data;
      const hora = dados.hora;
      const quadra = dados.quadra;
      const usuario = dados.usuario;

      //console.log("aquiiii", id, data, hora, quadra, usuario);

      if ((data, hora, quadra, usuario)) {
        const rv = new Reserva(id, data, hora, quadra, usuario);

        rv.gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Reserva gravado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Reservas!",
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
      const data = dados.data;
      const hora = dados.hora;
      const quadra = dados.quadra;
      const usuario = dados.usuario;
      const id = dados.id;

      if ((data, hora, quadra, usuario)) {
        const rv = new Reserva(id, data, hora, quadra, usuario);

        rv.atualizar()
          .then(() => {
            res
              .status(200)
              .json({ status: true, messagem: "Reserva gravado com sucesso!" });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Reservas!",
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
        const rv = new Reserva(id);

        rv.id = id;
        rv.removerBD(id)
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Reserva excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe o ID do Reservas!",
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
      const rv = new Reserva();

      rv.consultar("")
        .then((rvs) => {
          res.status(200).json(rvs);
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
      const rv = new Reserva();

      rv.consultarID(id)
        .then((rv) => {
          res.status(200).json(rv);
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

export default ReservaCTRK;
