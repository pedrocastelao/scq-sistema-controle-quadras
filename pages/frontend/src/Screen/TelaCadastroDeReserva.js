import Pagina from "../templates/Pagina";
import FormCadReserva from "../Forms/FormCadReserva";
import TabelaReserva from "../Tables/TabelaDeReserva";
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../Util/util";

export default function TelaCadastroDeReserva(props) {
  function preparaReservaEdicao(reserva) {
    setAtualizando(true);
    setReservaEmEdicao(reserva);
  }

  function preparaReservaDel(reserva) {
    setExcluindo(true);
    setDelReserva(reserva);
  }

  const [exibeTabela, setExibirTabela] = useState(true);
  const [status, setStatus] = useState(STATUS.sucesso);
  const [listaReservas, setlistaReservas] = useState([]);
  const [listaQuadra, setListaQuadra] = useState([]);
  const [listaUsuario, setListaUsuario] = useState([]);

  //função de editar
  const [atualizando, setAtualizando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [reservaEmEdicao, setReservaEmEdicao] = useState({
    id: 0,
    data: "",
    hora: "",
    quadra: "",
    usuario: "",
  });

  const [delReserva, setDelReserva] = useState({});

  function buscarReserva() {
    fetch("http://localhost:4000/reserva", { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setlistaReservas(dados);
        setStatus(STATUS.sucesso);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
        console.log(erro.messagem);
      });
  }

  function buscarQuadra() {
    fetch("http://localhost:4000/quadra", { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((dados) => {
        setListaQuadra(dados);
        setStatus(STATUS.sucesso);
      })
      .catch((erro) => {
        setStatus(STATUS.erro);
        console.log(erro.messagem);
      });
  }

  function BuscaUsuario() {
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

  useEffect(() => {
    setStatus(STATUS.ocioso);
    buscarReserva();
  }, []);

  useEffect(() => {
    setStatus(STATUS.ocioso);
    buscarQuadra();
  }, []);

  useEffect(() => {
    setStatus(STATUS.ocioso);
    BuscaUsuario();
  }, []);

  if (exibeTabela) {
    if (status === STATUS.ocioso) {
      return <TelaCarregamento />;
    } else if (status === STATUS.sucesso) {
      return (
        <Pagina>
          <TabelaReserva
            dados={listaReservas}
            onTabela={setExibirTabela}
            editarReserva={preparaReservaEdicao}
            editarAtualizando={setAtualizando}
            excluirReserva={preparaReservaDel}
          />
        </Pagina>
      );
    } else {
      return (
        <TelaErro messagem="Não foi possivel recuperar os dados dos reservas"></TelaErro>
      );
    }
  } else {
    return (
      <Pagina>
        <FormCadReserva
          reserva={reservaEmEdicao}
          excluir={delReserva}
          listaReservas={listaReservas}
          listaQuadra={listaQuadra}
          listaUsuario={listaUsuario}
          onTabela={setExibirTabela}
          atualizando={atualizando}
          excluindo={excluindo}
        />
      </Pagina>
    );
  }
}
