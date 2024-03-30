// Array com os números possíveis
const arrayNumerosPossiveis = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 54, 56, 63, 64, 72, 81,50,60,70,80,90];

// Elementos da interface
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const ultimaMultiplicacao = document.getElementById('ultimaMultiplicacao');
const logMultiplicacoes = document.getElementById('logMultiplicacoes');
const numerosSorteados = new Set(); // Conjunto para armazenar números sorteados

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    ultimaMultiplicacao.innerHTML = ""; // Limpa o conteúdo do elemento
    logMultiplicacoes.innerHTML = ""; // Limpa o log de multiplicacoes
});

// Evento de clique no botão "Sortear"
sortearBtn.addEventListener('click', () => {
    // Verifica se todos os números já foram sorteados
    if (numerosSorteados.size === arrayNumerosPossiveis.length) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let indiceSorteado;

    do {
        indiceSorteado = gerarNumeroAleatorio();
    } while (numerosSorteados.has(indiceSorteado));

    numerosSorteados.add(indiceSorteado);
    atualizarNumeroSorteado(arrayNumerosPossiveis[indiceSorteado]);
    registrarMultiplicacao(arrayNumerosPossiveis[indiceSorteado]);
});

// Função para reiniciar o jogo
function reiniciarJogo() {
    numerosSorteados.clear();
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * arrayNumerosPossiveis.length);
}

// Função para atualizar o texto com o número sorteado na tela
function atualizarNumeroSorteado(numero) {
    let fator1, fator2;

    // Procura por um fator que seja da tabuada de 2 a 9 e menor que 10
    for (let i = 2; i <= 10; i++) {
        if (numero % i === 0 && numero / i <= 9) {
            fator1 = i;
            fator2 = numero / i;
            break;
        }
    }

    // Exibe a multiplicação dos dois fatores na tela
    if (fator1 && fator2) {
        ultimaMultiplicacao.innerHTML = "<span style='font-size: 30px;'>O resultado de: " +  "</span><br/>" + 
                                        "<span style='font-size: 70px; font-weight: bold; color: green;'>" + 
                                        fator1 + " * " + fator2 + 
                                        "</span>";
    } else {
        ultimaMultiplicacao.innerHTML = "<span style='font-size: 30px;'>Não foi possível encontrar fatores menores que 10 da tabuada de 2 a 9 para o número " + numero + ".</span>";
    }
}

// Função para registrar a multiplicação sorteada no log
function registrarMultiplicacao(numero) {
    let fator1, fator2;
    for (let i = 2; i <= 10; i++) {
        if (numero % i === 0 && numero / i <= 9) {
            fator1 = i;
            fator2 = numero / i;
            break;
        }
    }

    if (fator1 && fator2) {
        const multiplicacao = fator1 + " * " + fator2;
        const multiplicacaoItem = document.createElement('p');
        multiplicacaoItem.textContent = multiplicacao;
        logMultiplicacoes.appendChild(multiplicacaoItem);
    }
}

// Função para inicializar o jogo quando a página é carregada
window.addEventListener('DOMContentLoaded', () => {
    reiniciarJogo();
});
