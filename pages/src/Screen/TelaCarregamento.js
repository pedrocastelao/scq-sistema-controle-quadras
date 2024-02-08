import { Container, Button, Spinner } from "react-bootstrap";
//import Pagina from "../templates/Pagina";

export default function TelaCarregamento(props) {
  return (
    <Container>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Em processamento...
      </Button>
    </Container>
  );
}
