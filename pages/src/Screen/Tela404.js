import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";

export default function Tela404(props) {
  return (
    <Pagina>
      <Container>
        <p>A pagina solicitada não Existe!</p>
        <p>Use o menu do sistema para selecionar a opção Correta</p>
      </Container>
    </Pagina>
  );
}
