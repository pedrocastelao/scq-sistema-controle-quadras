import QuadraBD from "../persistence/QuadraBD.js";

class Quadra {
  #id;
  #tipo;
  #localizacao;
  #preco;

  constructor(id, tipo, localizacao, preco) {
    this.#id = id;
    this.#tipo = tipo;
    this.#localizacao = localizacao;
    this.#preco = preco;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get tipo() {
    return this.#tipo;
  }

  set tipo(novoTipo) {
    this.#tipo = novoTipo;
  }

  get localizacao() {
    return this.#localizacao;
  }

  set localizacao(novoLocalizacao) {
    this.#localizacao = novoLocalizacao;
  }

  get preco() {
    return this.#preco;
  }

  set preco(novoPreco) {
    this.#preco = novoPreco;
  }

  //Json
  toJSON() {
    return {
      quadra_esportiva_id: this.#id,
      quadra_esportiva_tipo: this.#tipo,
      quadra_esportiva_localizacao: this.#localizacao,
      quadra_esportiva_preco: this.#preco,
    };
  }

  async gravar() {
    const quadraBD = new QuadraBD();

    await quadraBD.incluir(this);
  }

  async atualizar() {
    const quadraBD = new QuadraBD();

    await quadraBD.alterar(this);
  }

  async removerBD() {
    const quadraBD = new QuadraBD();

    await quadraBD.excluir(this);
  }

  async consultar() {
    const quadraBD = new QuadraBD();

    const quadras = await quadraBD.consultar();
    return quadras;
  }

  async consultarID(id) {
    const quadraBD = new QuadraBD();

    const quadras = await quadraBD.consultarID(id);
    return quadras;
  }
}

export default Quadra;
