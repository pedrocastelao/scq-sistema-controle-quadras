import { Alert } from "react-bootstrap";
//import Pagina from "../templates/Pagina";

export default function TelaErro(props) {
  return <Alert variant="danger">{props.messagem}</Alert>;
}
