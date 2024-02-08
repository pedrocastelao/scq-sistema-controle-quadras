import { Container } from "react-bootstrap";

export default function Rodape(props) {
  return (
    <Container style={{'position' : 'absolute', 'bottom' : '0'}}>
      <h3>{props.titulo || "Informe o texto do Rodapé"}</h3>
    </Container>
  );
}
