import {Router} from "express";
import CandidatosCtrl from "../Controller/CandidatosCtrl.js";

const rotaCandidatos = Router ();
const candCtrl = new CandidatosCtrl();

rotaCandidatos.get("/:cpf", candCtrl.consultar)
rotaCandidatos.get("/", candCtrl.consultar);
rotaCandidatos.post("/", candCtrl.gravar);
rotaCandidatos.put("/", candCtrl.atualizar);
rotaCandidatos.patch("/", candCtrl.atualizar);
rotaCandidatos.delete("/", candCtrl.excluir);

export default rotaCandidatos;