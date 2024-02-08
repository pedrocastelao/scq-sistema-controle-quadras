import { Router } from "express";
import PagamentoCtrl from "../control/PagamentoCtrl.js";

const rotaPagamento = new Router();

const pgCTRL = new PagamentoCtrl();

//endpoints
rotaPagamento
  .post("/", pgCTRL.gravar)
  .put("/", pgCTRL.atualizar)
  .delete("/", pgCTRL.excluir)
  .get("/", pgCTRL.consultar)
  .get("/:id", pgCTRL.consultarID);

  
export default rotaPagamento;

