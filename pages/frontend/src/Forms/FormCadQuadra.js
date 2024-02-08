import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

export default function FormCadReserva(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [reservas, setReservas] = useState(props.reserva);

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity() === false) {
      evento.preventDefault();
      evento.stopPropagation();
    }

    setFormValidado(true);
  }

  return (
    <Container>
      <Row className="mt-3 mb-3 border d-flex text-center">
        <h2>Formulario de Quadra</h2>
      </Row>
      <Row className="mt-3 p-2 border">
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                id="tipo"
                name="tipo"
                required
                type="text"
                placeholder="Grama, Sintetico, Quadra"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, Informa o Tipo do Usuario
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Localização</Form.Label>
              <Form.Control
                id="localizacao"
                name="localizacao"
                required
                type="text"
                placeholder="Endereço"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, Informa o Endereço do Usuario
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Preço</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  id="preco"
                  name="preco"
                  type="text"
                  placeholder="Preço"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o Preço do Usuario
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Row>
    </Container>
  );
}
