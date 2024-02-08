import UsuarioBD from "../persistence/UsuarioBD.js";

class Usuario {
  #id;
  #nome;
  #cpf;
  #celular
  #email;
  #senha;

  constructor(id, nome, cpf, celular, email, senha) {
    this.#id = id;
    this.#nome = nome;
    this.#cpf = cpf;
    this.#celular = celular
    this.#email = email;
    this.#senha = senha;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCPF) {
    this.#cpf = novoCPF;
  }

  get celular() {
    return this.#celular;
  }

  set celular(novoCelular) {
    this.#celular = novoCelular;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get senha() {
    return this.#senha;
  }

  set senha(novoSenha) {
    this.#senha = novoSenha;
  }

  //Json
  toJSON() {
    return {
      usuario_id: this.#id,
      usuario_nome: this.#nome,
      usuario_cpf: this.#cpf,
      usuario_celular: this.#celular,
      usuario_email: this.#email,
      usuario_senha: this.#senha,
    };
  }

  async gravar() {
    const usuarioBD = new UsuarioBD();

    await usuarioBD.incluir(this);
  }

  async atualizar() {
    const usuarioBD = new UsuarioBD();

    await usuarioBD.alterar(this);
  }

  async removerBD() {
    const usuarioBD = new UsuarioBD();

    await usuarioBD.excluir(this);
  }

  async consultar() {
    const usuarioBD = new UsuarioBD();

    const usuarios = await usuarioBD.consultar();
    return usuarios;
  }

  async consultarCPF(cpf) {
    const usuarioBD = new UsuarioBD();

    const usuarios = await usuarioBD.consultarCPF(cpf);
    return usuarios;
  }
}

export default Usuario;
