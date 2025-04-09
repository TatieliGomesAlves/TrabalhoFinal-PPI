const formCadPartidos = document.getElementById("formCadastroPartidos");

let acao = "cadastrar";

function manipularEnvio(evento) {
  evento.preventDefault();
  evento.stopPropagation();

  if (!formCadPartidos.checkValidity()) {
    formCadPartidos.classList.add("was-validated");
  } else {
      if (acao == "cadastrar") {
        adicionarPartido();
        formCadPartidos.reset();
        formCadPartidos.classList.remove("was-validated");
      } else if (acao == "atualizar") {
        atualizarPartido();
        formCadPartidos.reset();
      } else if (acao == "excluir") {
        excluirPartido();
        formCadPartidos.reset();
      }
      mostrarTabelaCPartidos();
  }
}

function pegarDadosPartidos() {
  const codigo = document.getElementById("codigo").value;
  const nomePartido = document.getElementById("nomePartido").value;
  const siglaPartido = document.getElementById("siglaPartido").value;

  return {
    codigo: codigo,
    nomePartido: nomePartido,
    siglaPartido: siglaPartido
  };
}

function adicionarPartido() {
  const dadosPartido = pegarDadosPartidos();
  fetch("http://localhost:4000/partidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPartido),
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
        mostrarTabelaCPartidos();
      } else {
        alert(dadosRecebidos.mensagem, "danger");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro.mensagem, "danger");
    });
}

function atualizarPartido() {
  const dadosPartido = pegarDadosPartidos();
  fetch("http://localhost:4000/partidos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPartido),
  })
    .then((resposta) => resposta.json())
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
        mostrarTabelaCPartidos();
        formCadPartidos.reset();
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

function excluirPartido() {
  const codigo = document.getElementById("codigo").value;
  
  if (confirm(`Deseja realmente excluir o partido com Código ${codigo}?`)) {
    fetch("http://localhost:4000/partidos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo: codigo }),
    })
      .then((resposta) => resposta.json())
      .then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
          mostrarMensagem(dadosRecebidos.mensagem, "success");
          formCadPartidos.reset();
          document.getElementById("atualizar").disabled = true;
          document.getElementById("cadastrar").disabled = false;
          document.getElementById("excluir").disabled = true;
          mostrarTabelaCPartidos();
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

function mostrarTabelaCPartidos() {
  fetch("http://localhost:4000/partidos", {
    method: "GET",
  }).then((resposta) => {
    return resposta.json();
  }).then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        const partidos = dadosRecebidos.partidos;
        if (partidos.length > 0) {
          const espacoTabela = document.getElementById("espacoTabela");
          espacoTabela.innerHTML = "";

          const tabela = document.createElement("table");
          tabela.className = "table table-striped table-hover";

          const cabecalho = document.createElement("thead");
          const corpo = document.createElement("tbody");

          cabecalho.innerHTML = `
          <tr>
              <th>Código</th>
              <th>Nome do Partido</th>
              <th>Sigla do Partido</th>
              <th>Alterar</th>
              <th>Excluir</th>
          </tr>`;
          tabela.appendChild(cabecalho);

          for (let i = 0; i < partidos.length; i++) {
            const linha = document.createElement("tr");
            linha.innerHTML = `
              <td>${partidos[i].codigo}</td>
              <td>${partidos[i].nomePartido}</td>
              <td>${partidos[i].siglaPartido}</td>
              <td>
                  <button class="btn btn-sm btn-warning" onclick = "capturarCPartidos('${partidos[i].codigo}', '${partidos[i].nomePartido}', '${partidos[i].siglaPartido}','atualizar')"><i class="bi bi-pencil-fill"></i></button>
              </td>
              <td>
                  <button class="btn btn-sm btn-danger" onclick = "capturarCPartidos('${partidos[i].codigo}', '${partidos[i].nomePartido}', '${partidos[i].siglaPartido}','excluir')"><i class="bi bi-trash3-fill"></i></button>
              </td>
          `;
            corpo.appendChild(linha);
          }

          tabela.appendChild(corpo);
          espacoTabela.appendChild(tabela);
        }
      } else {
        mostrarMensagem("Não há partidos cadastrados.", "warning");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro, "danger");
    });
}

function capturarCPartidos(codigo, nomePartido, siglaPartido, acaoEscolhida = "atualizar") {
    document.getElementById("codigo").value = codigo;
    document.getElementById("nomePartido").value = nomePartido;
    document.getElementById("siglaPartido").value = siglaPartido;

    acao = acaoEscolhida;

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

formCadPartidos.addEventListener("submit", manipularEnvio);

document.getElementById("atualizar").onclick = atualizarPartido;
document.getElementById("excluir").onclick = excluirPartido;

mostrarTabelaCPartidos();

