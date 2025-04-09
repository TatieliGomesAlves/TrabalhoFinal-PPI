import cadastroPartidosDB from "../DataBase/cadastroPartidoDB.js";

export default class Partidos {

  #codigo;
  #nomePartido;
  #siglaPartido;

  constructor(codigo, nomePartido, siglaPartido ) {

  this.#codigo = codigo;
  this.#nomePartido = nomePartido;
  this.#siglaPartido = siglaPartido;

  }

    get codigo() {
    return this.#codigo;
    }
    set codigo(novoCodigo){
    this.#codigo = novoCodigo;
    }

    get nomePartido() {
      return this.#nomePartido;
    }
    set nomePartido(NomePartido) {
      this.#nomePartido = NomePartido;
    }

    get siglaPartido() {
      return this.#siglaPartido;
    }
    set siglaPartido(SiglaPartido) {
      this.#siglaPartido = SiglaPartido;
    }

  
    toJSON() {
      return {
        "codigo": this.#codigo,
        "nomePartido": this.#nomePartido,
        "siglaPartido": this.#siglaPartido
      }
    }
    async gravar() {
      const partidosDB = new cadastroPartidosDB();
      partidosDB.gravar(this);
    }

    async atualizar() {
      const partidosDB = new cadastroPartidosDB();
      partidosDB.atualizar(this);
    }

    async excluir() {
      const partidosDB = new cadastroPartidosDB();
      partidosDB.excluir(this);
    }

    async consultar() {
      const partidosDB = new cadastroPartidosDB();
      return await partidosDB.consultar(this);
    }

    async consultarPorCodigo(codigo) {
      const partidosDB = new cadastroPartidosDB();
      return await partidosDB.consultarPorCodigo(codigo);
    }
}