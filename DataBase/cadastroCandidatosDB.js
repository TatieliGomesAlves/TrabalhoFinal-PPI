import conectar from "./conexao.js";
import Candidatos from "../Model/candidatos.js";

export default class cadastroCandidatosDB {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const conexao = await conectar();
      const sql = `CREATE TABLE IF NOT EXISTS candidatos (
        cpf VARCHAR (14) NOT NULL PRIMARY KEY,
        titulo INT NOT NULL, 
        nome VARCHAR(100) NOT NULL,
        endereco VARCHAR(100),
        numero INT,
        bairro VARCHAR(100),
        cidade VARCHAR(100),
        uf VARCHAR (2),
        cep VARCHAR(9),
        rendaMensal DECIMAL(8,2) NOT NULL      
        )`;
      await conexao.execute(sql);
    } catch (erro) {
      console.log("Erro ao iniciar a tabela Candidatos:" + erro);
    }
  }

  async gravar(candidatos) {
    if (candidatos instanceof Candidatos) {
      const conexao = await conectar();
      const sql = `INSERT INTO candidatos (cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const parametros = [
        candidatos.cpf,
        candidatos.titulo,
        candidatos.nome,
        candidatos.endereco,
        candidatos.numero,
        candidatos.bairro,
        candidatos.cidade,
        candidatos.uf,
        candidatos.cep,
        candidatos.rendaMensal
      ];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  async atualizar(candidatos) {
    if (candidatos instanceof Candidatos) {
      const conexao = await conectar();
      const sql = `UPDATE candidatos SET titulo = ?, nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, rendaMensal = ? WHERE cpf = ?`;
      const parametros = [candidatos.titulo,candidatos.nome,candidatos.endereco,candidatos.numero,candidatos.bairro,candidatos.cidade,candidatos.uf, candidatos.cep,candidatos.rendaMensal,candidatos.cpf];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  async excluir(candidatos) {
    if (candidatos instanceof Candidatos) {
      const conexao = await conectar();
      const sql = `DELETE FROM candidatos WHERE cpf = ?`;
      const parametros = [candidatos.cpf];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  async consultar(candidatos) {
    if (candidatos instanceof Candidatos) {
      const conexao = await conectar();
      const sql = `SELECT * FROM candidatos ORDER BY cpf`;
      const [registros] = await conexao.execute(sql);
      await conexao.release();
      let listaCandidatos = [];
      for (const registro of registros) {
        const candidatos = new Candidatos(
          registro.cpf,
          registro.titulo,
          registro.nome,
          registro.endereco,
          registro.numero,
          registro.bairro,
          registro.cidade,
          registro.uf,
          registro.cep,
          registro.rendaMensal
        );

        listaCandidatos.push(candidatos);
      }
      return listaCandidatos;
    }
  }
  async consultarPorCpf(cpf) {
    const conexao = await conectar();
    const sql = `SELECT * FROM candidatos WHERE cpf = ?`;
    const [registros] = await conexao.execute(sql, [cpf]);
    await conexao.release();
    let listaCandidatos = [];
    for (const registro of registros) {
      const candidatos = new Candidatos(
        registro.cpf,
        registro.titulo,
        registro.nome,
        registro.endereco,
        registro.numero,
        registro.bairro,
        registro.cidade,
        registro.uf,
        registro.cep,
        registro.rendaMensal
      );

      listaCandidatos.push(candidatos);
    }
    return listaCandidatos;
  }
}
