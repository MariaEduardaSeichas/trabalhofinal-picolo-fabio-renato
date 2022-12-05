window.onload = () => {//mapeando a serviceWorker
    "use strict";   
    postNews();
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;

    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+"," + posicaoInicial.coords.longitude +"&z=16&output=embed"
};

const erro = (error) => {//callback de error (falha para captura de localizacao)
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!" 
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);


});
 let url= 'https://doubtful-pear-donkey.cyclic.app/produtos';

 async function postNews() {
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('tabela').innerHTML = data.map(createArticle).join('\n');
}

function createArticle(article){
    return `
           <div class="article">
                <a href="${article.url}" target="_blank">
                    <img src="${article.imagem}" class="imagem"/>
                    <h2>${article.id}</h2>
                    <h2>${article.titulo}</h2>
                    <h2>${article.preco}</h2>
                    <h2>${article.descricao}</h2>
                </a>
           </div>
    `
}


