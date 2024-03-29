// Array com os números possíveis
const arrayNumerosPossiveis = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 54, 56, 63, 64, 72, 81];

// Elementos da interface
const bingoTable = document.getElementById('bingoTable');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const btnMarcarResultado = document.getElementById('btnMarcarResultado');
const numeroSorteadoText = document.getElementById('numeroSorteado');
const numerosSorteados = new Set(); // Conjunto para armazenar números sorteados
let ultimoIndiceSorteado; // Variável global para armazenar o último índice sorteado

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    numeroSorteadoText.innerHTML = ""; // Limpa o conteúdo do elemento
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
    ultimoIndiceSorteado = indiceSorteado;
    atualizarNumeroSorteado(arrayNumerosPossiveis[indiceSorteado]);
    
    if (ultimoIndiceSorteado !== undefined) {
        marcarNumeroSorteado(ultimoIndiceSorteado);
    }


});

// Evento de clique no botão "Marcar Resultado"
btnMarcarResultado.addEventListener('click', () => {
    if (ultimoIndiceSorteado !== undefined) {
        marcarNumeroSorteado(ultimoIndiceSorteado);
    } else {
        alert('Nenhum número foi sorteado ainda!');
    }
});

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Limpa a tabela
    bingoTable.innerHTML = '';

    // Limpa o conjunto de números sorteados
    numerosSorteados.clear();

    // Preenche a tabela com os números possíveis
    const numerosPorLinha = 6; // Quantidade de números por linha
    for (let i = 0; i < arrayNumerosPossiveis.length; i += numerosPorLinha) {
        const row = bingoTable.insertRow();
        for (let j = i; j < i + numerosPorLinha && j < arrayNumerosPossiveis.length; j++) {
            const cell = row.insertCell();
            cell.textContent = arrayNumerosPossiveis[j];
            cell.style.padding = '5px 10px';
            cell.style.fontSize = '40px';
            cell.style.fontWeight = 'bold';

            if ((j + 1) % 2 === 0) {
                // Se o número for par, define a cor de fundo como branco
                cell.style.backgroundColor = '#ffffff';
            } else {
                // Se o número for ímpar, define a cor de fundo como cinza claro
                cell.style.backgroundColor = '#f2f2f2';
            }
        }
    }
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * arrayNumerosPossiveis.length);
}

// Função para atualizar o texto com o número sorteado na tela
function atualizarNumeroSorteado(numero) {
    numeroSorteadoText.innerHTML = "<span style='font-size: 30px;'>O número sorteado foi:</span><br/>" + 
                                   "<span style='font-size: 70px; font-weight: bold; color: green;'>" + 
                                   numero + 
                                   "</span>";
}

// Função para marcar o número sorteado na tabela
function marcarNumeroSorteado(indice) {
    const numeroSorteado = arrayNumerosPossiveis[indice];
    console.log('Marcando número sorteado:', numeroSorteado);
    const cells = bingoTable.querySelectorAll('td');
    for (const cell of cells) {
        if (parseInt(cell.textContent) === numeroSorteado) {
            cell.classList.add('marked');
            cell.style.backgroundColor = '#28a745'; // Altera a cor de fundo da célula
            break;
        }
    }
}


// Função para inicializar o jogo quando a página é carregada
window.addEventListener('DOMContentLoaded', () => {
    reiniciarJogo();
});
