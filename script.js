// Array com os números possíveis
const arrayNumerosPossiveis = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 54, 56, 63, 64, 72, 81, 50, 60, 70, 80, 90];

// Elementos da interface
const novoJogoBtn = document.getElementById('novoJogoBtn');
const sortearBtn = document.getElementById('sortearBtn');
const btnMarcarResultado = document.getElementById('btnMarcarResultado');
const numeroSorteadoText = document.getElementById('numeroSorteado');
const logMultiplicacoes = document.getElementById('logMultiplicacoes');

let sorteioHabilitado = true; // Variável global para controlar se o sorteio está habilitado

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    numeroSorteadoText.innerHTML = ""; // Limpa o conteúdo do elemento
    sorteioHabilitado = true; // Habilita o sorteio
    atualizarCorBotaoSortear(); // Atualiza a cor do botão "Sortear"
});

// Evento de clique no botão "Sortear"
sortearBtn.addEventListener('click', () => {
    if (!sorteioHabilitado) {
        return; // Interrompe a execução se o sorteio não estiver habilitado
    }

    // Verifica se todos os números já foram sorteados
    if (logMultiplicacoes.childElementCount === arrayNumerosPossiveis.length) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let indiceSorteado;

    do {
        indiceSorteado = gerarNumeroAleatorio();
    } while (logMultiplicacoes.querySelector(`#multiplicacao-${indiceSorteado}`));

    const numeroSorteado = arrayNumerosPossiveis[indiceSorteado];
    let fator1, fator2;

    // Procura por um fator que seja da tabuada de 2 a 9 e menor que 10
    for (let i = 2; i <= 10; i++) {
        if (numeroSorteado % i === 0 && numeroSorteado / i <= 9) {
            fator1 = i;
            fator2 = numeroSorteado / i;
            break;
        }
    }

    // Exibe a multiplicação dos dois fatores na tela
    if (fator1 && fator2) {
        const multiplicacao = `${fator1} * ${fator2}`;
        const logItem = document.createElement('p');
        logItem.textContent = multiplicacao;
        logItem.id = `multiplicacao-${indiceSorteado}`;
        logMultiplicacoes.appendChild(logItem);
    } else {
        console.error(`Não foi possível encontrar fatores menores que 10 da tabuada de 2 a 9 para o número ${numeroSorteado}.`);
    }

    // Desabilita o botão de sortear após o sorteio
    sorteioHabilitado = false;
    atualizarCorBotaoSortear(); // Atualiza a cor do botão "Sortear"
});

// Evento de clique no botão "Marcar Resultado"
btnMarcarResultado.addEventListener('click', () => {
    // Muda a variável sorteioHabilitado para true
    sorteioHabilitado = true;
    atualizarCorBotaoSortear(); // Atualiza a cor do botão "Sortear"
});

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Limpa o log de multiplicacoes
    logMultiplicacoes.innerHTML = '';
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * arrayNumerosPossiveis.length);
}

// Função para atualizar a cor do botão "Sortear" com base no estado do sorteio
function atualizarCorBotaoSortear() {
    if (sorteioHabilitado) {
        sortearBtn.disabled = false;
        sortearBtn.style.backgroundColor = ''; // Remove a cor de fundo personalizada
    } else {
        sortearBtn.disabled = true;
        sortearBtn.style.backgroundColor = '#6c757d'; // Cor cinza azulado
    }
}
