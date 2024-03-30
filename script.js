// Array com os números possíveis
const arrayNumerosPossiveis = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 54, 56, 63, 64, 72, 81, 50, 60, 70, 80, 90];

// Elementos da interface
const sortearBtn = document.getElementById('sortearBtn');
const numeroSorteadoText = document.getElementById('numeroSorteado');
const numerosSorteados = new Set(); // Conjunto para armazenar números sorteados
let ultimoIndiceSorteado; // Variável global para armazenar o último índice sorteado
let sorteioHabilitado = true; // Variável global para controlar se o sorteio está habilitado

// Evento de clique no botão "Sortear"
sortearBtn.addEventListener('click', () => {
    if (!sorteioHabilitado) {
        return; // Interrompe a execução se o sorteio não estiver habilitado
    }

    // Verifica se todos os números já foram sorteados
    if (numerosSorteados.size === arrayNumerosPossiveis.length) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let indiceSorteado;

    do {
        indiceSorteado = gerarNumeroAleatorio();
    } while (numerosSorteados.has(indiceSorteado));


    if (ultimoIndiceSorteado !== undefined) {
        registrarMultiplicacao(ultimoIndiceSorteado);
    }

    numerosSorteados.add(indiceSorteado);
    ultimoIndiceSorteado = indiceSorteado;
    atualizarNumeroSorteado(arrayNumerosPossiveis[indiceSorteado]);

    // Desabilita o botão de sortear após o sorteio
    sorteioHabilitado = false; // Desabilita o sorteio
});

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
        numeroSorteadoText.textContent = "Multiplicação Sorteada: " + fator1 + " * " + fator2;
    } else {
        numeroSorteadoText.textContent = "Não foi possível encontrar fatores menores que 10 da tabuada de 2 a 9 para o número " + numero + ".";
    }
}

// Função para registrar a multiplicação sorteada
function registrarMultiplicacao(indice) {
    const numeroSorteado = arrayNumerosPossiveis[indice];
    let fator1, fator2;

    // Procura por um fator que seja da tabuada de 2 a 9 e menor que 10
    for (let i = 2; i <= 10; i++) {
        if (numeroSorteado % i === 0 && numeroSorteado / i <= 9) {
            fator1 = i;
            fator2 = numeroSorteado / i;
            break;
        }
    }

    // Exibe a multiplicação dos dois fatores no log
    if (fator1 && fator2) {
        const logMultiplicacao = document.createElement('p');
        logMultiplicacao.textContent = "Multiplicação Sorteada: " + fator1 + " * " + fator2;
        document.getElementById('logMultiplicacoes').appendChild(logMultiplicacao);
    } else {
        const logErro = document.createElement('p');
        logErro.textContent = "Não foi possível encontrar fatores menores que 10 da tabuada de 2 a 9 para o número " + numeroSorteado + ".";
        document.getElementById('logMultiplicacoes').appendChild(logErro);
    }
}
