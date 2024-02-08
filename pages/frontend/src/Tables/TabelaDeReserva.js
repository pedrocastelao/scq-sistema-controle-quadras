import { Button, Container, Table, Row, Col, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";

export default function TabelaReserva(props) {
  const [busca, setBusca] = useState("");
  //console.log(busca);
  const reservas = props.dados;
  const buscaLower = busca.toLowerCase();

  const reservasFiltradas = reservas.filter((reservasFiltradas) =>
    reservasFiltradas.reserva_data.toLowerCase().includes(buscaLower)
  );

  return (
    <Container>
      <Row className="mt-3 mb-3 border d-flex text-center">
        <h2>Lista de Reservas</h2>
      </Row>

      <Row>
        <Col>
          <Button
            onClick={() => {
              props.onTabela(false);
              props.editarAtualizando(false);
            }}
          >
            Cadastrar Reserva
          </Button>
        </Col>
      </Row>

      <Row className="mt-3 mb-3 d-flex text-center">
        <Col>
          <InputGroup
            size="sm"
            className="mb-3"
            onChange={(eve) => setBusca(eve.target.value)}
          >
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Pesquise..."
              value={busca}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-3 p-2 border">
        <Table striped bordered hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Quadra Esportiva</th>
              <th>Locazição</th>
              <th>Preço</th>
              <th>Usuario</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tabela-reservas">
            {reservasFiltradas.map((reserva) => {
              //console.log(reserva);
              return (
                <tr key={reserva.reserva_id}>
                  <td>{reserva.reserva_id}</td>
                  <td>{reserva.reserva_data}</td>
                  <td>{reserva.reserva_hora}</td>
                  <td>{reserva.quadra_esporiva.quadra_esportiva_tipo}</td>
                  <td>
                    {reserva.quadra_esporiva.quadra_esportiva_localizacao}
                  </td>
                  <td>R$ {reserva.quadra_esporiva.quadra_esportiva_preco}</td>
                  <td>{reserva.usuario.usuario_nome}</td>

                  <td>
                    <Button
                      onClick={() => {
                        props.editarReserva(reserva);
                        props.onTabela(false);
                        //console.log(`cade voceeee ${reserva} `);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          fill
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        props.excluirReserva(reserva);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>{" "}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
