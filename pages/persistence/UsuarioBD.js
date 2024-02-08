import conectar from "./Conexao.js";
import Usuario from "../model/Usuario.js";

class UsuarioBD {
  async incluir(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql = `INSERT INTO usuario (usu_nome, usu_cpf, usu_celular, usu_email, usu_senha)
                    VALUES (UPPER(?), UPPER(?), UPPER(?), UPPER(?), UPPER(?))`;

      console.log(
        usuario.nome,
        usuario.cpf,
        usuario.celular,
        usuario.email,
        usuario.senha
      );

      const val = [
        usuario.nome,
        usuario.cpf,
        usuario.celular,
        usuario.email,
        usuario.senha,
      ];

      await conexao.query(sql, val);
    }
  }

  async alterar(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql = `UPDATE usuario 
                  SET usu_nome = UPPER(?), usu_cpf = UPPER(?), usu_celular = UPPER(?), usu_email = UPPER(?), usu_senha = ? 
                  WHERE ID_usuario = ?`;

      console.log(
        usuario.nome,
        usuario.cpf,
        usuario.celular,
        usuario.email,
        usuario.senha,
        usuario.id
      );

      const val = [
        usuario.nome,
        usuario.cpf,
        usuario.celular,
        usuario.email,
        usuario.senha,
        usuario.id,
      ];
      await conexao.query(sql, val);
    }
  }

  async excluir(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql = `DELETE FROM usuario WHERE ID_usuario = ?`;
      console.log(sql + " " + usuario.id);

      const val = [usuario.id];

      await conexao.query(sql, val);
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * FROM usuario";
    const val = [];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Usuarios
    const listaUsuarios = [];

    for (const row of rows) {
      const usuario = new Usuario(
        row["ID_usuario"],
        row["usu_nome"],
        row["usu_cpf"],
        row["usu_celular"],
        row["usu_email"],
        row["usu_senha"]
      );

      listaUsuarios.push(usuario);
    }

    console.log(`listaUsuarios ${listaUsuarios}`);

    return listaUsuarios;
  }

  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM usuario WHERE usu_cpf = ?";
    const val = [cpf];

    //recuperando as linhas retornada pela instrução
    const [rows] = await conexao.query(sql, val);

    //retornando uma lista de Usuarios
    const listaUsuarios = [];

    for (const row of rows) {
      const usuario = new Usuario(
        row["ID_usuario"],
        row["usu_nome"],
        row["usu_cpf"],
        row["usu_celular"],
        row["usu_email"],
        row["usu_senha"]
      );

      listaUsuarios.push(usuario);
    }

    console.log(`listaUsuarios ${listaUsuarios}`);
    return listaUsuarios;
  }
}

export default UsuarioBD;
