import Usuario from "../model/Usuario.js";

//classe ira manipular/controlar a entidade Usuario
class UsuarioCTRL {

  

  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;
      const nome = dados.nome;
      const cpf = dados.cpf;
      const celular = dados.celular;
      const email = dados.email;
      const senha = dados.senha;

      if ((nome, cpf, celular, email, senha)) {
        const qd = new Usuario(id, nome, cpf, celular, email, senha);

        qd.gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Usuario gravado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message, duplicate: true });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Usuarios!",
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
      const cpf = dados.cpf;
      const celular = dados.celular;
      const email = dados.email;
      const senha = dados.senha;
      const id = dados.id;

      if ((nome, cpf, celular, email, senha, id)) {
        const qd = new Usuario(id, nome, cpf, celular, email, senha);

        qd.atualizar()
          .then(() => {
            res
              .status(200)
              .json({
                status: true,
                messagem: "Usuario Alterado com sucesso!",
              });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados do Usuario!",
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
      const usuario_id = dados.usuario_id;
      console.log(`aquiiiii ${usuario_id}`);

      if (usuario_id) {
        const qd = new Usuario(usuario_id);
        qd.removerBD()
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Usuario excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe o ID do Usuarios!",
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
      const qd = new Usuario();

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

  consultarCPF(req, res) {
    res.type("application/json");
    const cpf = req.params["cpf"];

    if (req.method === "GET") {
      const qd = new Usuario();

      qd.consultarCPF(cpf)
        .then((qd) => {
          res.status(200).json(qd);
        })
        .catch((erro) => {
          console.log(`entrou aqui`);
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

export default UsuarioCTRL;
