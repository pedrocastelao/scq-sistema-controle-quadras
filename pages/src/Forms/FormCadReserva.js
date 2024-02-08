import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import STATUS from "../Util/util";
import TelaCarregamento from "../Screen/TelaCarregamento";
import TelaErro from "../Screen/TelaErro";

export default function FormCadReserva(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [status, setStatus] = useState(STATUS.sucesso);
  const [reservas, setReservas] = useState(props.reserva);

  const data = useRef(reservas.reserva_data);
  const hora = useRef(reservas.reserva_hora);
  const quadra = useRef(reservas.quadra_esporiva);
  const usuario = useRef(reservas.usuario);
  const id = useRef(reservas.reserva_id);

  //console.log(`este é meu ID ${JSON.stringify(_id)}`);

  useEffect(() => {
    //console.log(props.usuarios);
    if (props.atualizando) {
      if (props.reserva) {
        setReservas(props.reserva);
        data.current.value = reservas.reserva_data;
        hora.current.value = reservas.reserva_hora;
        quadra.current.value = reservas.quadra_esporiva.quadra_esportiva_tipo;
        usuario.current.value = reservas.usuario.usuario_nome;
        id.current.value = reservas.reserva_id;
      }
    } else {
      //console.log("entriu aqui ?");
      data.current.value = "";
      hora.current.value = "";
      quadra.current.value = "";
      usuario.current.value = "";
    }

    //console.log(reservas);
  }, [props.reserva]);

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const reserva = validarDados();
      console.log(`Valida Dados, cadastrar ${JSON.stringify(reserva)}`);
      if (reserva && !props.atualizando) {
        setStatus(STATUS.ocioso);

        cadastarReserva(reserva);
      } else {
        setStatus(STATUS.ocioso);
        //console.log(`CONTEUDO DA RESERVA ${JSON.stringify(reserva)}`);
        alterarReserva(reserva);
        //console.log(usuario);
      }
    }
    evento.preventDefault();
    evento.stopPropagation();
    setFormValidado(true);
  }

  function cadastarReserva(reserva) {
    fetch("http://localhost:4000/reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva),
    })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setStatus(STATUS.sucesso);
        alert(dados.messagem);
        setReservas(reserva);
        props.onTabela(true);
        window.location.reload(true);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
      });
  }

  function alterarReserva(reserva) {
    fetch("http://localhost:4000/reserva", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva),
    })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setStatus(STATUS.sucesso);
        alert(dados.messagem);
        setReservas(reserva);
        window.location.reload(true);
        props.onTabela(true);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
      });
  }

  function validarDados() {
    const _reservas = {
      id: id.current.value,
      data: data.current.value,
      hora: hora.current.value,
      quadra: quadra.current.value,
      usuario: usuario.current.value,
    };

    console.log(`Dentro do Valida Dados ${JSON.stringify(_reservas)}`);

    if (_reservas.id === "" || _reservas.id) {
      if (
        _reservas.data &&
        _reservas.hora &&
        _reservas.quadra &&
        _reservas.usuario
      )
        return _reservas;
      else {
        return undefined;
      }
    } else {
      console.log(`ID esta com b.ozin ${_reservas.id}`);
    }
  }

  if (status === STATUS.sucesso) {
    return (
      <Container>
        <Row className="mt-3 mb-3 border d-flex text-center">
          <h2>Formulario de Reservaa</h2>
        </Row>
        <Row className="mt-3 p-2 border">
          <Form
            noValidate
            validated={formValidado}
            onSubmit={manipularSubmissao}
          >
            <Row className="mb-3">
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} md="1">
                    <Form.Label>Id da Reserva</Form.Label>
                    <Form.Control
                      id="id"
                      name="id"
                      required
                      type="text"
                      ref={id}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group as={Col} md="3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  id="data"
                  name="data"
                  required
                  type="date"
                  ref={data}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o Data da reserva
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Hora</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="hora"
                  name="hora"
                  required
                  ref={hora}
                >
                  <option>Selecione...</option>
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o Hora do reserva
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Quadra Esportiva</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="hora"
                  name="hora"
                  required
                  ref={quadra}
                >
                  {props.listaQuadra.map((dados) => {
                    //console.log(dados);
                    return (
                      <option
                        key={dados.quadra_esportiva_id}
                        value={dados.quadra_esportiva_id}
                      >
                        {dados.quadra_esportiva_tipo}
                      </option>
                    );
                  })}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Por favor, Informa a Quadra Esportiva do reserva
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Usuario</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="hora"
                  name="hora"
                  required
                  ref={usuario}
                >
                  {props.listaUsuario.map((dados) => {
                    //console.log(dados);
                    return (
                      <option key={dados.usuario_id} value={dados.usuario_id}>
                        {dados.usuario_nome}
                      </option>
                    );
                  })}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Por favor, Informa a Quadra Esportiva do reserva
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Cadastrar
            </Button>{" "}
            <Button type="submit" variant="danger">
              Limpar
            </Button>{" "}
            <Button
              onClick={() => {
                props.onTabela(true);
              }}
              type="submit"
              variant="outline-primary"
            >
              Voltar
            </Button>
          </Form>
        </Row>
      </Container>
    );
  } else if (status === STATUS.ocioso) {
    return <TelaCarregamento />;
  } else {
    return <TelaErro messagem="Não foi possivel Gravar o Cliente" />;
  }
}
