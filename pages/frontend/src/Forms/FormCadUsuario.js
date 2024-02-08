import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import STATUS from "../Util/util";
import TelaCarregamento from "../Screen/TelaCarregamento";
import TelaErro from "../Screen/TelaErro";
import InputMask from "react-input-mask";

export default function FormCadUsuario(props) {
  const [formValidado, setFormValidado] = useState(false);
  const [status, setStatus] = useState(STATUS.sucesso);
  const [usuario, setUsuario] = useState(props.usuarios);
  //const [emEdicao, setEmEdicao] = useState(props.atualizando);
  const [acao, setAcao] = useState(props.botAcao);
  // console.log(`aqui tem uma ação ${acao}`);

  const nome = useRef(usuario.usuario_nome);
  const cpf = useRef(usuario.usuario_cpf);
  const celular = useRef(usuario.usuario_celular);
  const email = useRef(usuario.usuario_email);
  const senha = useRef(usuario.usuario_senhas);
  const id = useRef(usuario.usuario_id);

  // Aqui vou trazer as informações do botao
  const butCadastrar = useRef();
  const butEditar = useRef(null);
  // useLayoutEffect(()=>{
  //   if(acao === "Editar")
  //   butEditar.current.disabled=false
  //   butCadastrar.current.disabled=true

  //   console.log(butEditar.current);
  // })
  // console.log(botao);

  useEffect(() => {
    //console.log(props.usuarios);
    if (props.atualizando) {
      if (props.usuarios) {
        setUsuario(props.usuarios);
        nome.current.value = usuario.usuario_nome;
        cpf.current.value = usuario.usuario_cpf;
        celular.current.value = usuario.usuario_celular;
        email.current.value = usuario.usuario_email;
        senha.current.value = usuario.usuario_senha;
        id.current.value = usuario.usuario_id;
      }
    } else {
      nome.current.value = "";
      cpf.current.value = "";
      celular.current.value = "";
      email.current.value = "";
      senha.current.value = "";
    }

    //console.log(usuario);
  }, [props.usuarios]);

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const usuario = validarDados();
      if (usuario && !props.atualizando) {
        setStatus(STATUS.ocioso);
        cadastrarUsuario(usuario);
      } else {
        setStatus(STATUS.ocioso);
        // console.log(`entrou aqui`);
        alterarUsuario(usuario);
        // console.log(usuario);
      }
    }
    evento.preventDefault();
    evento.stopPropagation();
    setFormValidado(true);
  }

  // USADO PARA VERIFICAR SE TEM O CPF ANTES DE CADASTRAR UM NOVO USUARIO
  function cadastrarUsuario(usuario) {
    fetch("http://localhost:4000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setStatus(STATUS.sucesso);
        dados.duplicate ? alert(`CPF ja Cadastrado!`) : alert(dados.messagem);
        setUsuario(usuario);
        props.onTabela(true);
        window.location.reload(true);
      })
      .catch((erro) => {
        console.log(erro.messagem);
        alert("CPF ja Cadastrado");
        setStatus(STATUS.erro);
      });
  }

  function alterarUsuario(usuario) {
    fetch("http://localhost:4000/usuario", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setStatus(STATUS.sucesso);
        alert(dados.messagem);
        setUsuario(usuario);
        window.location.reload(true);
        props.onTabela(true);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
      });
  }

  // console.log(`aqui é antes do validar dados ${nome.current.value}` );

  // const _usuario = useRef(usuario)

  function validarDados() {
    const _usuario = {
      nome: nome.current.value,
      cpf: cpf.current.value,
      celular: celular.current.value,
      email: email.current.value,
      senha: senha.current.value,
      id: id.current.value,
    };

    // console.log(`aqui é o validar dados ${_usuario.nome}`);
    if (
      _usuario.nome &&
      _usuario.cpf &&
      _usuario.celular &&
      _usuario.email &&
      _usuario.senha
    )
      return _usuario;
    else {
      return undefined;
    }
  }

  if (status === STATUS.sucesso) {
    return (
      <Container>
        <Row className="mt-3 mb-3 border d-flex  align-content-center">
          <h2>Formulario de Cadastro de Usuario</h2>
        </Row>
        <Row className="mt-3 p-2 border ">
          <Form
            noValidate
            validated={formValidado}
            onSubmit={manipularSubmissao}
          >
            <Row className="mb-3 p-2  justify-content-center align-content-center">
              {/* Aqui apresentação do ID */}
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} md="1">
                    <Form.Label hidden={acao === "Cadastrar" ? true : false}>
                      Id
                    </Form.Label>
                    <Form.Control
                      hidden={acao === "Cadastrar" ? true : false}
                      id="id"
                      name="id"
                      required
                      type="text"
                      ref={id}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, Informa o nome do Usuario
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              {/* Aqui começa o formulario */}
              <Form.Group as={Col} md="4">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  id="nome"
                  name="nome"
                  required
                  type="text"
                  ref={nome}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o nome do Usuario
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>C.P.F</Form.Label>
                <Form.Control
                  id="cpf"
                  name="cpf"
                  required
                  type="text"
                  minLength="14"
                  ref={cpf}
                  as={InputMask}
                  mask="999.999.999-99"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o C.P.F do Usuario
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  id="celular"
                  name="celular"
                  placeholder="Digite seu Numero com DD"
                  required
                  type="tel"
                  minLength="14"
                  ref={celular}
                  as={InputMask}
                  mask="(99)99999-9999"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o Celular do Usuario
                </Form.Control.Feedback>
              </Form.Group>
              {""}
              <Form.Group as={Col} md="12">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    aria-describedby="inputGroupPrepend"
                    required
                    ref={email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, Informa o E-mail do Usuario
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  id="senha"
                  name="senha"
                  required
                  type="password"
                  ref={senha}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, Informa o Senha do Usuario
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {""}
            <Button
              type="submit"
              ref={butCadastrar}
              disabled={acao === "Cadastrar" ? false : true}
              variant="success"
            >
              Cadastrar
            </Button>{" "}
            <Button
              type="submit"
              ref={butEditar}
              disabled={acao === "Editar" ? false : true}
              variant="warning"
            >
              Atualizar
            </Button>{" "}
            <Button type="submit" name="limpar" variant="secondary">
              Limpar
            </Button>{" "}
            <Button
              id="voltar"
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
