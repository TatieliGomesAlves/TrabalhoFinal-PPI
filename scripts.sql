CREATE TABLE IF NOT EXISTS candidatos (
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
);


CREATE TABLE IF NOT EXISTS partidos  (
    codigo INT NOT NULL PRIMARY KEY,
    nomePartido VARCHAR(100) NOT NULL, 
    siglaPartido VARCHAR(100) NOT NULL     
);
