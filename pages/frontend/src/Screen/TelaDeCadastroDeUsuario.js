import Pagina from "../templates/Pagina";
import FormCadUsuario from "../Forms/FormCadUsuario";
import TabelaUsuario from "../Tables/TabelaDeUsuario";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../Util/util";

export default function TelaCadastroDeUsuario(props) {
  function preparaAcao(acao) {
    setAcao(acao);
  }

  function preparaUsuarioExcluir(usuario) {
    setExcluirUsuario(setExcluirUsuario);
  }

  function prepararUsuarioEdicao(usuario) {
    setAtualizando(true);
    setUsuarioEmEdicao(usuario);
  }

  function buscarUsuario() {
    fetch("http://localhost:4000/usuario", { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setListaUsuario(dados);
        setStatus(STATUS.sucesso);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
        console.log(erro.messagem);
      });
  }

  const [status, setStatus] = useState(STATUS.sucesso);
  const [listaUsuario, setListaUsuario] = useState([]);
  const [atualizando, setAtualizando] = useState(false);
  const [exibeTabela, setExibirTabela] = useState(true);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState({
    id: 0,
    name: "",
    cpf: "",
    celular: "",
    email: "",
    senha: "",
  });

  const [excluirUsuario, setExcluirUsuario] = useState({});

  const [acao, setAcao] = useState("");

  useEffect(() => {
    setStatus(STATUS.ocioso);
    buscarUsuario();
  }, []);

  if (exibeTabela) {
    if (status === STATUS.ocioso) {
      return <TelaCarregamento />;
    } else if (status === STATUS.sucesso) {
      return (
        <Pagina>
          <TabelaUsuario
            dados={listaUsuario}
            onTabela={setExibirTabela}
            editarUsuario={prepararUsuarioEdicao}
            editarAtualizando={setAtualizando}
            dadosExcluir={preparaUsuarioExcluir}
            acaoEditar={setAcao}
            acaoBotao={preparaAcao}
          />
        </Pagina>
      );
    } else {
      return (
        <TelaErro messagem="Não foi possivel recuperar os dados dos Usuarios"></TelaErro>
      );
    }
  } else {
    return (
      <Pagina>
        <FormCadUsuario
          usuarios={usuarioEmEdicao}
          exclui={excluirUsuario}
          listaUsuario={listaUsuario}
          atualizando={atualizando}
          onTabela={setExibirTabela}
          botAcao={acao}
        />
      </Pagina>
    );
  }
}
