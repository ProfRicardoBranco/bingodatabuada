const maximoBingo = 75; // Definindo o número máximo do bingo

document.addEventListener('DOMContentLoaded', function() {
    reiniciarJogo();
});

const bingoTable = document.getElementById('bingoTable');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const numerosSorteados = new Set(); // Usando um conjunto para garantir números únicos

// Função para verificar se todos os números já foram sorteados
function todosSorteados() {
    return numerosSorteados.size === maximoBingo;
}

// Função para limpar a tabela e reiniciar o jogo
function reiniciarJogo() {
    // Limpa a tabela
    bingoTable.innerHTML = '';

    // Limpa o conjunto de números sorteados
    numerosSorteados.clear();

    // Preenche a tabela novamente
    for (let tabuada = 2; tabuada <= 9; tabuada++) {
        const row = bingoTable.insertRow();
        for (let multiplicador = 1; multiplicador <= 10; multiplicador++) {
            const resultado = tabuada * multiplicador;
            const cell = row.insertCell();
            cell.textContent = resultado;
            cell.style.padding = '5px 10px';
            cell.style.fontSize = '40px';
            cell.style.fontWeight = 'bold';

            if (multiplicador % 2 === 0) {
                // Se o multiplicador for par, define a cor de fundo como branco
                cell.style.backgroundColor = '#ffffff';
            } else {
                // Se o multiplicador for ímpar, define a cor de fundo como cinza claro
                cell.style.backgroundColor = '#f2f2f2';
            }
        }
    }
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * maximoBingo) + 1;
}

// Função para marcar o número sorteado na tabela
function marcarNumeroSorteado(numeroSorteado) {
    const cellIndex = numeroSorteado - 1; // Índice da célula na tabela
    const rowNumber = Math.floor(cellIndex / 10); // Número da linha
    const colNumber = cellIndex % 10; // Número da coluna
    
    const cell = bingoTable.rows[rowNumber].cells[colNumber];
    cell.classList.add('marked');
    cell.style.backgroundColor = '#28a745'; // Altera a cor de fundo da célula
}

sortearBtn.addEventListener('click', () => {
    if (todosSorteados()) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let numeroSorteado;
    
    do {
        numeroSorteado = gerarNumeroAleatorio();
    } while (numerosSorteados.has(numeroSorteado));

    numerosSorteados.add(numeroSorteado);
    marcarNumeroSorteado(numeroSorteado);
    atualizarNumeroSorteado(numeroSorteado);
});

novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    numeroSorteadoText.innerHTML = ""; // Limpa o conteúdo do elemento
});

const numeroSorteadoText = document.getElementById('numeroSorteado');

// Função para atualizar o texto com o número sorteado na tela
function atualizarNumeroSorteado(numero) {
    numeroSorteadoText.innerHTML = "<span style='font-size: 30px;'>O número sorteado foi:</span><br/>" + 
                                   "<span style='font-size: 70px; font-weight: bold; color: green;'>" + 
                                   numero + 
                                   "</span>";
}
