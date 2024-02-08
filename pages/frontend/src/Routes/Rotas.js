import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import TelaCadastroDeUsuario from "../Screen/TelaDeCadastroDeUsuario";
import TelaCadastroDeQuadras from "../Screen/TelaDeCasdastroDeQuadras";
import TelaMenu from "../Screen/TelaMenu";
import Tela404 from "../Screen/Tela404";
import TelaCadastroDeReserva from "../Screen/TelaCadastroDeReserva";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Route element={<TelaCadastroDeUsuario />} path="/cadastroUsuario" />
      <Route element={<TelaCadastroDeQuadras />} path="/cadastroQuadra" />
      <Route element={<TelaCadastroDeReserva />} path="/cadastroReserva" />
      <Route element={<TelaMenu />} path="/" exact />
      <Route element={<Tela404 />} path="*" />
    </BrowserRouter>
  );
};

export default Rotas;
