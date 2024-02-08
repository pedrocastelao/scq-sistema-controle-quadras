import { Router } from "express";
import UsuarioCtrl from "../control/UsuarioCtrl.js";

const RotaUsuario = new Router();

const usuCTRL = new UsuarioCtrl();

//endpoints
RotaUsuario
  .post("/", usuCTRL.gravar)
  .put("/", usuCTRL.atualizar)
  .delete("/", usuCTRL.excluir)
  .get("/", usuCTRL.consultar)
  .get("/:cpf", usuCTRL.consultarCPF);

export default RotaUsuario;

