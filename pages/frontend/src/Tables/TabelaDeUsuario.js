import { Button, Container, Table, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
//import prepararFormulario from "../Util/formsValidados";

export default function TabelaUsuario(props) {
  const [listaUsuario, setListaUsuario] = useState(props.dados);

  function excluirUsuario(usuario) {
    fetch("http://localhost:4000/usuario", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((dados) => {
        alert(dados.messagem);
        setListaUsuario(usuario);
        window.location.reload(true);
      })
      .catch((erro) => {
        alert(erro.messagem);
      });
  }

  return (
    <Container>
      <Row className="mt-3 mb-3 border d-flex text-center">
        <h2>Lista de Usuários</h2>
      </Row>

      <Row>
        <Col>
          <Button
            onClick={() => {
              props.onTabela(false);
              props.editarAtualizando(false);
              props.acaoBotao("Cadastrar");

            }}
          >
            Cadastrar Usuario
          </Button>
        </Col>
      </Row>

      <Row className="mt-3 p-2 border">
        <Table striped bordered hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>celular</th>
              <th>E-mail</th>
              <th>senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaUsuario.map((usuario) => {
              return (
                <tr key={usuario.usuario_id}>
                  <td>{usuario.usuario_id}</td>
                  <td>{usuario.usuario_nome}</td>
                  <td>{usuario.usuario_cpf}</td>
                  <td>{usuario.usuario_celular}</td>
                  <td>{usuario.usuario_email}</td>
                  <td>{usuario.usuario_senha}</td>
                  <td>
                    <Button
                      onClick={() => {
                        props.editarUsuario(usuario);
                        //console.log(usuario);
                        props.onTabela(false);
                        props.acaoBotao("Editar");
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
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        // console.log(usuario.usuario_id);
                        if (window.confirm("Deseja excluir este usuário")) {
                          excluirUsuario(usuario);
                        }
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
