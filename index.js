import express from "express";
import rotaCandidatos from "./Routes/rotaCandidatos.js";
import rotaPartidos from "./Routes/rotaPartidos.js";
import autenticar from "./Seguranca/autenticar.js";
import session from "express-session";

const host = "0.0.0.0";
const porta = 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  session({
    secret: "S3gur4S3ss10nK3y2025",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use("/candidatos", rotaCandidatos);
app.use("/partidos", rotaPartidos);

app.get("/login", (requisicao, resposta) => {
  resposta.redirect("/login.html");
});

app.post("/login", (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if (usuario === "admin" && senha === "admin") {
    requisicao.session.autenticado = true;
    resposta.redirect("/index.html");
  } else {
    resposta.redirect("/login.html");
  }
});

app.get("/logout", (requisicao, resposta) => {
  if (requisicao.session.autenticado) {
    requisicao.session.destroy((err) => {
      if (err) {
        return resposta.status(500).send("Erro ao fazer logout");
      }
    });
  }
  resposta.redirect("/index.html");
});

app.use(express.static("./publico"));

app.use(autenticar, express.static("./privado"));

app.listen(porta, host, () => {
  console.log("Servidor backend em execução: http://" + host + ":" + porta);
});
