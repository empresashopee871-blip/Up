const TOKEN = "SEU_TOKEN_AQUI";
const USER = "SEU_USUARIO";
const REPO = "SEU_REPOSITORIO";

async function removerNumero(numero) {

    const url = `https://api.github.com/repos/${USER}/${REPO}/contents/numeros.json`;

    const res = await fetch(url, {
        headers: { "Authorization": "token " + TOKEN }
    });
    const file = await res.json();

    const conteudo = JSON.parse(atob(file.content));
    conteudo.numeros = conteudo.numeros.filter(n => n !== numero);

    await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": "token " + TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Remove número usado",
            content: btoa(JSON.stringify(conteudo, null, 2)),
            sha: file.sha
        })
    });
      }
