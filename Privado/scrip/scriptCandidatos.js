const formCadCandidatos = document.getElementById("formCadastroCandidatos");

constacao = "cadastrar";

function manipularEnvio(evento) {
  evento.preventDefault();
  evento.stopPropagation();

  if (!formCadCandidatos.checkValidity()) {
    formCadCandidatos.classList.add("was-validated");
  } else {
      if (acao == "cadastrar") {
        adicionarCandidato();
        formCadCandidatos.reset();
        formCadCandidatos.classList.remove("was-validated");
      } else if (acao == "atualizar") {
        atualizarCandidato();
        formCadCandidatos.reset();
      } else if (acao == "excluir") {
        excluirCandidato();
        formCadCandidatos.reset();
      }
      mostrarTabelaCCandidatos();
  }
}

function pegarDadosCandidatos() {
  const cpf = document.getElementById("cpf").value;
  const titulo = document.getElementById("titulo").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const numero = document.getElementById("numero").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const uf = document.getElementById("uf").value;
  const cep = document.getElementById("cep").value;
  const rendaMensal = document.getElementById("rendaMensal").value;

  return {
    cpf: cpf,
    titulo: titulo,
    nome: nome,
    endereco: endereco,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    uf: uf,
    cep: cep,
    rendaMensal: rendaMensal
  };
}

function adicionarCandidato() {
  const dadosCandidato = pegarDadosCandidatos();
  fetch("http://localhost:4000/candidatos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosCandidato),
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
        mostrarTabelaCCandidatos();
      } else {
        alert(dadosRecebidos.mensagem, "danger");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro.mensagem, "danger");
    });
}

function atualizarCandidato() {
  const dadosCandidato = pegarDadosCandidatos();
  
  fetch("http://localhost:4000/candidatos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosCandidato),
  })
    .then((resposta) => resposta.json())
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
        mostrarTabelaCCandidatos();
        formCadCandidatos.reset();
        document.getElementById("atualizar").disabled = true;
        document.getElementById("cadastrar").disabled = false;
        document.getElementById("excluir").disabled = true;
      } else {
        mostrarMensagem(dadosRecebidos.mensagem, "danger");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro.mensagem, "danger");
    });
}

function excluirCandidato() {
  const cpf = document.getElementById("cpf").value;
  
  if (confirm(`Deseja realmente excluir o candidato com CPF ${cpf}?`)) {
    fetch("http://localhost:4000/candidatos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf: cpf }),
    })
      .then((resposta) => resposta.json())
      .then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
          mostrarMensagem(dadosRecebidos.mensagem, "success");
          formCadCandidatos.reset();
          document.getElementById("atualizar").disabled = true;
          document.getElementById("cadastrar").disabled = false;
          document.getElementById("excluir").disabled = true;
          mostrarTabelaCCandidatos();
        } else {
          mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
      })
      .catch((erro) => {
        mostrarMensagem(erro.mensagem, "danger");
      });
  }
}

function mostrarMensagem(mensagem, tipo = "success") {
  const espacoMensagem = document.getElementById("mensagem");
  espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">
      ${mensagem}
  </div>`;
  setTimeout(() => {
    espacoMensagem.innerHTML = "";
  }, 5000);
}

function mostrarTabelaCCandidatos() {
  fetch("http://localhost:4000/candidatos", {
    method: "GET",
  }).then((resposta) => {
    return resposta.json();
  }).then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        const candidatos = dadosRecebidos.candidatos;
        if (candidatos.length > 0) {
          const espacoTabela = document.getElementById("espacoTabela");
          espacoTabela.innerHTML = "";

          const tabela = document.createElement("table");
          tabela.className = "table table-striped table-hover";

          const cabecalho = document.createElement("thead");
          const corpo = document.createElement("tbody");

          cabecalho.innerHTML = `
          <tr>
              <th>CPF</th>
              <th>Titulo de Eleitor</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Número</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>CEP</th>
              <th>Renda Mensal</th>
              <th>Alterar</th>
              <th>Excluir</th>
          </tr>`;
          tabela.appendChild(cabecalho);

          for (let i = 0; i < candidatos.length; i++) {
            const linha = document.createElement("tr");
            linha.innerHTML = `
              <td>${candidatos[i].cpf}</td>
              <td>${candidatos[i].titulo}</td>
              <td>${candidatos[i].nome}</td>
              <td>${candidatos[i].endereco}</td>
              <td>${candidatos[i].numero}</td>
              <td>${candidatos[i].bairro}</td>
              <td>${candidatos[i].cidade}</td>
              <td>${candidatos[i].uf}</td>
              <td>${candidatos[i].cep}</td>
              <td>${candidatos[i].rendaMensal}</td>
              <td>
                  <button class="btn btn-sm btn-warning" onclick = "capturarCCandidatos('${candidatos[i].cpf}', '${candidatos[i].titulo}', '${candidatos[i].nome}', '${candidatos[i].endereco}', '${candidatos[i].numero}', '${candidatos[i].bairro}', '${candidatos[i].cidade}', '${candidatos[i].uf}', '${candidatos[i].cep}', '${candidatos[i].rendaMensal}','atualizar')"><i class="bi bi-pencil-fill"></i></button> </td>
              <td>
                  <button class="btn btn-sm btn-danger" onclick = "capturarCCandidatos('${candidatos[i].cpf}', '${candidatos[i].titulo}', '${candidatos[i].nome}', '${candidatos[i].endereco}', '${candidatos[i].numero}', '${candidatos[i].bairro}', '${candidatos[i].cidade}', '${candidatos[i].uf}', '${candidatos[i].cep}', '${candidatos[i].rendaMensal}','excluir')"><i class="bi bi-trash3-fill"></i></button>
              </td>
          `;
            corpo.appendChild(linha);
          }

          tabela.appendChild(corpo);
          espacoTabela.appendChild(tabela);
        }
      } else {
        mostrarMensagem("Não há candidatos cadastrados.", "warning");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro, "danger");
    });
}

function capturarCCandidatos(cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, acaoEscolhida = "atualizar") {
    document.getElementById("cpf").value = cpf;
    document.getElementById("titulo").value = titulo;
    document.getElementById("nome").value = nome;
    document.getElementById("endereco").value = endereco;
    document.getElementById("numero").value = numero;
    document.getElementById("bairro").value = bairro;
    document.getElementById("cidade").value = cidade;
    document.getElementById("uf").value = uf;
    document.getElementById("cep").value = cep;
    document.getElementById("rendaMensal").value = rendaMensal;

    if (acaoEscolhida == "atualizar") {
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = true;
    }
    else if (acaoEscolhida == "excluir") {
      document.getElementById("atualizar").disabled = true;
      document.getElementById("cadastrar").disabled = true;
      document.getElementById("excluir").disabled = false;
  }
   
}

formCadCandidatos.addEventListener("submit", manipularEnvio);

document.getElementById("atualizar").onclick = atualizarCandidato;
document.getElementById("excluir").onclick = excluirCandidato;

mostrarTabelaCCandidatos();


