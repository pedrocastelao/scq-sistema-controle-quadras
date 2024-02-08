import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";

export default function Pagina(props) {
  return (
    <Container>
      <Cabecalho titulo="Sistema de Agendamentos de Quadras Esportivas" />
      <Menu />
      <Container>{props.children}</Container>
      <Container>
        <Rodape titulo="Rua x, 10 - Teodoro Sampaio - SP"></Rodape>
      </Container>
    </Container>
  );
}
