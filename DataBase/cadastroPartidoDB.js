import conectar from "./conexao.js";
import Partidos from "../Model/partidos.js";

export default class cadastroPartidosDB {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const conexao = await conectar();
      const sql = `CREATE TABLE IF NOT EXISTS partidos  (
        codigo INT NOT NULL UNIQUE PRIMARY KEY,
        nomePartido VARCHAR(100) NOT NULL, 
        siglaPartido VARCHAR(100) NOT NULL     
        )`;
      await conexao.execute(sql);
    } catch (erro) {
      console.log("Erro ao iniciar a tabela Partidos:" + erro);
    }
  }

  async gravar(partidos) {
    if (partidos instanceof Partidos) {
      const conexao = await conectar();
      const sql = `INSERT INTO partidos (codigo, nomePartido, siglaPartido)
              VALUES (?, ?, ?)`;
      const parametros = [
        partidos.codigo,
        partidos.nomePartido,
        partidos.siglaPartido
      ];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  async atualizar(partidos) {
    if (partidos instanceof Partidos) {
      const conexao = await conectar();
      const sql = `UPDATE partidos SET nomePartido = ?, siglaPartido = ? WHERE codigo = ?`;
      const parametros = [partidos.nomePartido, partidos.siglaPartido, partidos.codigo];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  async excluir(partidos) {
    if (partidos instanceof Partidos) {
      const conexao = await conectar();
      const sql = `DELETE FROM partidos WHERE codigo= ?`;
      const parametros = [partidos.codigo];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  async consultar(partidos) {
    if (partidos instanceof Partidos) {
      const conexao = await conectar();
      const sql = `SELECT * FROM partidos ORDER BY codigo ASC`;
      const [registros] = await conexao.execute(sql);
      await conexao.release();
      let listaPartidos = [];
      for (const registro of registros) {
        const partidos = new Partidos(
          registro.codigo,
          registro.nomePartido,
          registro.siglaPartido
        );

        listaPartidos.push(partidos);
      }
      return listaPartidos;
    }
  }
  
  async consultarPorCodigo(codigo) {
    const conexao = await conectar();
    const sql = `SELECT * FROM partidos WHERE codigo = ?`;
    const [registros,campos] = await conexao.execute(sql, [codigo]);
    await conexao.release();
    let listaPartidos = [];
    for (const registro of registros) {
      const partidos = new Partidos(
        registro.codigo,
        registro.nomePartido,
        registro.siglaPartido
      );

      listaPartidos.push(partidos);
    }
    return listaPartidos;
  }
}
