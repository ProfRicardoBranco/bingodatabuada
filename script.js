// Array com os números possíveis
const arrayNumerosPossiveis = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 54, 56, 63, 64, 72, 81, 50, 60, 70, 80, 90];

// Elementos da interface
const tabelaNumerosSorteados = document.getElementById('tabelaNumerosSorteados');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const ultimaMultiplicacao = document.getElementById('ultimaMultiplicacao');
const numerosSorteados = []; // Array para armazenar números sorteados

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    ultimaMultiplicacao.innerHTML = ""; // Limpa o conteúdo do elemento
});

// Evento de clique no botão "Sortear"
sortearBtn.addEventListener('click', () => {
    // Verifica se todos os números já foram sorteados
    if (numerosSorteados.length === arrayNumerosPossiveis.length) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let indiceSorteado;

    do {
        indiceSorteado = gerarNumeroAleatorio();
    } while (numerosSorteados.includes(indiceSorteado));

    numerosSorteados.push(indiceSorteado);
    atualizarNumeroSorteado(arrayNumerosPossiveis[indiceSorteado]);

});

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Limpa a tabela
    tabelaNumerosSorteados.innerHTML = '';

    // Determina o número de linhas e colunas necessárias para a tabela
    const totalNumeros = arrayNumerosPossiveis.length;
    const colunas = 6; // Número fixo de colunas
    const linhas = Math.ceil(totalNumeros / colunas);

    // Cria a estrutura da tabela sem preencher com valores
    for (let i = 0; i < linhas; i++) {
        const tr = tabelaNumerosSorteados.insertRow();
        for (let j = 0; j < colunas; j++) {
            const cell = tr.insertCell();
            cell.style.padding = '5px'; // Ajuste do padding
            cell.style.width = '70px'; // Largura das células
            cell.style.height = '60px'; // Altura das células
            cell.style.fontSize = '30px';
            cell.style.fontWeight = 'bold';
            cell.style.textAlign = 'center'; // Centraliza o texto

            if ((i * colunas + j) % 2 === 0) {
                // Se o número da célula for par, define a cor de fundo como branco
                cell.style.backgroundColor = '#ffffff';
            } else {
                // Se o número da célula for ímpar, define a cor de fundo como cinza claro
                cell.style.backgroundColor = '#f2f2f2';
            }
        }
    }

    // Limpa o array de números sorteados
    numerosSorteados.length = 0;
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * arrayNumerosPossiveis.length);
}

// Função para atualizar o texto com o número sorteado na tela
function atualizarNumeroSorteado(numero) {
    let fator1, fator2;

    // Procura por um fator que seja da tabuada de 2 a 9 e menor que 10
    for (let i = 2; i <= 9; i++) {
        if (numero % i === 0 && numero / i <= 10) {
            fator1 = i;
            fator2 = numero / i;
            break;
        }
    }

    // Exibe a fatoração na tabela
    const linha = Math.floor(numerosSorteados.length / 6);
    const coluna = numerosSorteados.length % 6;
    const celula = tabelaNumerosSorteados.rows[linha].cells[coluna];
    celula.textContent = `${fator1} * ${fator2}`;

    console.log(`sorteados: ${numerosSorteados.length},`Linha: ${linha}, Coluna: ${coluna}, Valor: ${celula.textContent}`);
}


// Função para inicializar o jogo quando a página é carregada
window.addEventListener('DOMContentLoaded', () => {
    reiniciarJogo();
});
