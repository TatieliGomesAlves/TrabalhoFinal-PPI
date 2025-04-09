CREATE TABLE IF NOT EXISTS partidos (
    codigo INT NOT NULL PRIMARY KEY,
    nomePartido VARCHAR(100) NOT NULL, 
    siglaPartido VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS candidatos (
    cpf VARCHAR(14) NOT NULL PRIMARY KEY,
    titulo INT NOT NULL, 
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    rendaMensal DECIMAL(8,2) NOT NULL,
    partido_codigo INT NOT NULL,
    CONSTRAINT fk_partido FOREIGN KEY (partido_codigo)
        REFERENCES partidos(codigo)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);