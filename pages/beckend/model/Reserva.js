import ReservaBD from "../persistence/ReservaBD.js";

class Reserva {
  #id;
  #data;
  #hora;
  #quadra;
  #usuario;

  constructor(id, data, hora, quadra, usuario) {
    this.#id = id;
    this.#data = data;
    this.#hora = hora;
    this.#quadra = quadra;
    this.#usuario = usuario;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get data() {
    return this.#data;
  }

  set data(novoData) {
    this.#data = novoData;
  }

  get hora() {
    return this.#hora;
  }

  set hora(novoHora) {
    this.#hora = novoHora;
  }

  get quadra() {
    return this.#quadra;
  }

  set quadra(novoQuadra) {
    this.#quadra = novoQuadra;
  }

  get usuario() {
    return this.#usuario;
  }

  set usuario(novoUsuario) {
    this.#usuario = novoUsuario;
  }

  //Json
  toJSON() {
    return {
      reserva_id: this.#id,
      reserva_data: this.#data,
      reserva_hora: this.#hora,
      quadra_esporiva: this.#quadra,
      usuario: this.#usuario,
    };
  }

  async gravar() {
    const reservaBD = new ReservaBD();

    await reservaBD.incluir(this);
  }

  async atualizar() {
    const reservaBD = new ReservaBD();

    await reservaBD.alterar(this);
  }

  async removerBD() {
    const reservaBD = new ReservaBD();

    await reservaBD.excluir(this);
  }

  async consultar() {
    const reservaBD = new ReservaBD();

    const reservas = await reservaBD.consultar();
    return reservas;
  }

  async consultarID(id) {
    const reservaBD = new ReservaBD();

    const reservas = await reservaBD.consultarID(id);
    return reservas;
  }
}

export default Reserva;
