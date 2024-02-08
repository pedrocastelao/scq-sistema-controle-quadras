import { Container } from "react-bootstrap";

export default function Cabecalho(props) {
    return(
        <Container className="w-100 mt-3 p-2 bg-ligth border d-flex justify-content-center align-content-center" >
            <h1>{props.titulo || "Sistema de Agendamento de Quadras Esportivas"}</h1>
        </Container>
    );
}