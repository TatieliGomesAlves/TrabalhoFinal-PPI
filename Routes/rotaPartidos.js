import {Router} from "express";
import PartidosCtrl from "../Controller/PartidosCtrl.js";

const rotaPartidos = Router ();
const partCtrl = new PartidosCtrl();

rotaPartidos.get("/:codigo", partCtrl.consultar)
rotaPartidos.get("/", partCtrl.consultar);
rotaPartidos.post("/", partCtrl.gravar);
rotaPartidos.put("/", partCtrl.atualizar);
rotaPartidos.patch("/", partCtrl.atualizar);
rotaPartidos.delete("/", partCtrl.excluir);

export default rotaPartidos;