import Candidatos from "../Model/candidatos.js";

export default class CandidatosCtrl {
  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const titulo = dados.titulo;
      const nome = dados.nome;
      const endereco = dados.endereco;
      const numero = dados.numero;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cep = dados.cep;
      const rendaMensal = dados.rendaMensal;

      if (
        cpf &&
        titulo &&
        nome &&
        endereco &&
        numero &&
        bairro &&
        cidade &&
        uf &&
        cep &&
        rendaMensal
      ) {
        const candidatos = new Candidatos(
          cpf,
          titulo,
          nome,
          endereco,
          numero,
          bairro,
          cidade,
          uf,
          cep,
          rendaMensal
        );
        candidatos
          .gravar()
          .then(() => {
            resposta.status(201).json({
              status: true,
              mensagem: "Candidato gravado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o candidato: " + erro,
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
      const cpf = dados.cpf;
      const titulo = dados.titulo;
      const nome = dados.nome;
      const endereco = dados.endereco;
      const numero = dados.numero;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cep = dados.cep;
      const rendaMensal = dados.rendaMensal;

      if (
        cpf &&
        titulo &&
        nome &&
        endereco &&
        numero &&
        bairro &&
        cidade &&
        uf &&
        cep &&
        rendaMensal
      ) {
        const candidatos = new Candidatos(
          cpf,
          titulo,
          nome,
          endereco,
          numero,
          bairro,
          cidade,
          uf,
          cep,
          rendaMensal
        );
        candidatos
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Candidato atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar candidato: " + erro,
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
      const cpf = dados.cpf;
      if (cpf) {
        const candidatos = new Candidatos(cpf);
        candidatos
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Candidato excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o candidato: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe candidato a ser excluído!",
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
      const candidatos = new Candidatos();

      if (requisicao.params.cpf) {
        candidatos
          .consultarPorCpf(requisicao.params.cpf)
          .then((listaCandidatos) => {
            resposta.status(200).json({
              status: true,
              candidatos: listaCandidatos,
            });
          }).catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar candidato: " + erro,
            });
          });
      } else {
        candidatos
          .consultar()
          .then((listaCandidatos) => {
            resposta.status(200).json({
              status: true,
              candidatos: listaCandidatos,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar candidato: " + erro,
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