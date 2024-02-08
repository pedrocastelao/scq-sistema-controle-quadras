import { Router } from "express";
import QuadraCtrl from "../control/QuadraCtrl.js";

const rotaQuadra = new Router();

const qdCTRL = new QuadraCtrl();

//endpoints
rotaQuadra
  .post("/", qdCTRL.gravar) 
  .put("/", qdCTRL.atualizar)
  .delete("/", qdCTRL.excluir)
  .get("/", qdCTRL.consultar)
  .get("/:id", qdCTRL.consultarID);
export default rotaQuadra;
//export default rotaCheckout;
