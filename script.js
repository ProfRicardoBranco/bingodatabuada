const bingoTable = document.getElementById('bingoTable');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const marcarResultadoBtn = document.getElementById('btnMarcarResultado'); // Botão "Marcar Resultado"
const numeroSorteadoText = document.getElementById('numeroSorteado');
const numerosSorteados = new Set(); // Usando um conjunto para garantir números únicos
let ultimoIndiceSorteado = null; // Variável global para armazenar o último índice sorteado

// Função para limpar a tabela e reiniciar o jogo
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

// Evento de clique no botão "Sortear"
sortearBtn.addEventListener('click', () => {
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
});

// Evento de clique no botão "Marcar Resultado"
marcarResultadoBtn.addEventListener('click', () => {
    if (ultimoIndiceSorteado !== null) {
        marcarNumeroSorteado(ultimoIndiceSorteado);
    } else {
        alert('Nenhum número foi sorteado ainda.');
    }
});

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    numeroSorteadoText.innerHTML = ""; // Limpa o conteúdo do elemento
});

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

// Chama a função reiniciarJogo() quando a página é carregada
document.addEventListener('DOMContentLoaded', reiniciarJogo);
