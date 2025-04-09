import Partidos from "../Model/partidos.js";

export default class PartidosCtrl {
  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const nomePartido = dados.nomePartido;
      const siglaPartido = dados.siglaPartido;

      if (
        codigo &&
        nomePartido &&
        siglaPartido
      ) {
        const partidos = new Partidos(
          codigo,
          nomePartido,
          siglaPartido
        );
        partidos
          .gravar()
          .then(() => {
            resposta.status(201).json({
              status: true,
              mensagem: "Partido gravado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o partido: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Todos os campos devem ser informados",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  atualizar(requisicao, resposta) {
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const nomePartido = dados.nomePartido;
      const siglaPartido = dados.siglaPartido;

      if (
        codigo &&
        nomePartido &&
        siglaPartido
      ) {
        const partidos = new Partidos(
          codigo,
          nomePartido,
          siglaPartido
        );
        partidos
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Partido atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o partidos: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Todos os campos devem ser informados",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      if (codigo) {
        const partidos = new Partidos(codigo);
        partidos
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Partido excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir partido: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o partido a ser excluído!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      const partidos = new Partidos();

      if (requisicao.params.codigo) {
        partidos
          .consultarPorCodigo(requisicao.params.codigo)
          .then((listaPartidos) => {
            resposta.status(200).json({
              status: true,
              partidos: listaPartidos,
            });
          }).catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar partido: " + erro,
            });
          });
      } else {
        partidos
          .consultar()
          .then((listaPartidos) => {
            resposta.status(200).json({
              status: true,
              partidos: listaPartidos,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar partido: " + erro,
            });
          });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }
}