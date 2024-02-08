import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroDeUsuario from "./Screen/TelaDeCadastroDeUsuario";
import TelaCadastroDeQuadras from "./Screen/TelaDeCasdastroDeQuadras";
import TelaCadastroDeReserva from "./Screen/TelaCadastroDeReserva";
import TelaMenu from "./Screen/TelaMenu";
import Tela404 from "./Screen/Tela404";


function App() {
  return (
    <Container className="w-100">
      <BrowserRouter>
        <Routes>
          <Route element={<TelaCadastroDeUsuario/>} path="/cadastroUsuario" />
          <Route element={<TelaCadastroDeQuadras/>} path="/cadastroQuadra" />
          <Route element={<TelaCadastroDeReserva/>} path="/CadastroReserva" />
          <Route element={<TelaMenu/>} path="/" exact/>
          <Route element={<Tela404/>} path="*" />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
