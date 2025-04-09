import cadastroCandidatosDB from "../DataBase/cadastroCandidatosDB.js";

export default class Candidatos {

  #cpf;
  #titulo;
  #nome;
  #endereco;
  #numero;
  #bairro;
  #cidade;
  #uf;
  #cep;
  #rendaMensal;


  constructor(cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal) {

  this.#cpf = cpf;
  this.#titulo = titulo;
  this.#nome = nome;
  this.#endereco = endereco;
  this.#numero = numero;
  this.#bairro = bairro;
  this.#cidade = cidade;
  this.#uf = uf;
  this.#cep = cep;
  this.#rendaMensal = rendaMensal;

  }

    get cpf() {
    return this.#cpf;
    }
    set cpf(novoCpf){
    this.#cpf = novoCpf;
    }

    get titulo() {
      return this.#titulo;
    }
    set titulo(Titulo) {
      this.#titulo = Titulo;
    }

    get nome() {
      return this.#nome;
    }
    set nome(Nome) {
      this.#nome = Nome;
    }

    get endereco() {
      return this.#endereco;
    }
    set endereco(Endereco){
      this.#endereco = Endereco;
    }

    get numero(){
      return this.#numero;
    }
    set numero(Numero){
      this.#numero = Numero;
    }

    get bairro(){
      return this.#bairro;
    }
    set bairro(Bairro){
      this.#bairro = Bairro;
    }

    get cidade(){
      return this.#cidade;
    }
    set cidade(Cidade){
      this.#cidade = Cidade;
    }

    get uf(){
      return this.#uf;
    }
    set uf(Uf){
      this.#uf = Uf;
    }

    get cep() {
      return this.#cep;
    }
    set cep(Cep){
      this.#cep = Cep;
    }

    get rendaMensal() {
      return this.#rendaMensal;
    }
    set rendaMensal(RendaMensal){
      this.#rendaMensal = RendaMensal;
    }

    toJSON() {
      return {
        "cpf": this.#cpf,
        "titulo": this.#titulo,
        "nome": this.#nome,
        "endereco": this.#endereco,
        "numero": this.#numero,
        "bairro": this.#bairro,
        "cidade": this.#cidade,
        "uf": this.#uf,
        "cep": this.#cep,
        "rendaMensal": this.#rendaMensal
      }
    }
    async gravar() {
      const candidatosDB = new cadastroCandidatosDB();
      candidatosDB.gravar(this);
    }

    async atualizar() {
      const candidatosDB = new cadastroCandidatosDB();
      candidatosDB.atualizar(this);
    }

    async excluir() {
      const candidatosDB = new cadastroCandidatosDB();
      candidatosDB.excluir(this);
    }

    async consultar() {
      const candidatosDB = new cadastroCandidatosDB();
      return await candidatosDB.consultar(this);
    }

    async consultarPorDestino(cpf) {
      const candidatosDB = new cadastroCandidatosDB();
      return await candidatosDB.consultarPorDestino(cpf);
    }
}