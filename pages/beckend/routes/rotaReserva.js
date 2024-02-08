import { Router } from "express";
import ReservaCtrl from "../control/ReservaCtrl.js";

const RotaReserva = new Router();

const rvCTRL = new ReservaCtrl();

//endpoints
RotaReserva
  .post("/", rvCTRL.gravar)
  .put("/", rvCTRL.atualizar)
  .delete("/", rvCTRL.excluir)
  .get("/", rvCTRL.consultar)
  .get("/:id", rvCTRL.consultarID);

export default RotaReserva;

