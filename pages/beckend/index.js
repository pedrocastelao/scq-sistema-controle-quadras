import express from "express";
import cors from "cors";
import rotaQuadra from "./routes/rotaQuadra.js";
import rotaReserva from "./routes/rotaReserva.js";
import rotaUsuario from "./routes/rotaUsuario.js";

const porta = 4000;

const app = express();
app.use(cors({ origin: ["*", "http://localhost:3000"] }));

//Aceitar objetos aninhados
app.use(express.urlencoded({ extended: false }));

//aceitação do JSON
app.use(express.json());

//ckeckin ok
app.use("/quadra", rotaQuadra);

//checkout
app.use("/reserva", rotaReserva);

app.use("/usuario", rotaUsuario);

app.listen(porta, () => {
  console.log("Ouvindo na Porta => " + porta);
});
