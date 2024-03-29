// Define os elementos do DOM
const bingoTable = document.getElementById('bingoTable');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const marcarResultadoBtn = document.getElementById('btnMarcarResultado');
const numeroSorteadoText = document.getElementById('numeroSorteado');

// Define os números possíveis para o jogo
const arrayNumerosPossiveis = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 54, 56, 63, 64, 72, 81];
const numerosPorLinha = 6; // Quantidade de números por linha

let ultimoIndiceSorteado = null; // Variável global para armazenar o último índice sorteado

// Limpa a tabela e reinicia o jogo
function reiniciarJogo() {
    bingoTable.innerHTML = ''; // Limpa a tabela
    ultimoIndiceSorteado = null; // Reseta o último índice sorteado

    // Preenche a tabela com os números possíveis
    for (let i = 0; i < arrayNumerosPossiveis.length; i += numerosPorLinha) {
        const row = bingoTable.insertRow(); // Adiciona uma nova linha à tabela
        for (let j = i; j < i + numerosPorLinha && j < arrayNumerosPossiveis.length; j++) {
            const cell = row.insertCell(); // Adiciona uma nova célula à linha
            cell.textContent = arrayNumerosPossiveis[j]; // Define o conteúdo da célula como o número
            cell.style.padding = '5px 10px'; // Adiciona padding à célula
            cell.style.fontSize = '40px'; // Define o tamanho da fonte da célula
            cell.style.fontWeight = 'bold'; // Define o peso da fonte da célula

            // Define a cor de fundo da célula com base na paridade do número
            cell.style.backgroundColor = (j + 1) % 2 === 0 ? '#ffffff' : '#f2f2f2';
        }
    }
}

// Função para gerar um número aleatório dentro dos limites do array de números possíveis
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * arrayNumerosPossiveis.length);
}

// Evento de clique no botão "Sortear"
sortearBtn.addEventListener('click', () => {
    if (ultimoIndiceSorteado !== null) {
        alert('O número sorteado foi: ' + arrayNumerosPossiveis[ultimoIndiceSorteado]);
    } else {
        //alert('Nenhum número foi sorteado ainda.');
    }
});

// Evento de clique no botão "Marcar Resultado"
marcarResultadoBtn.addEventListener('click', () => {
    if (ultimoIndiceSorteado !== null) {
        const cell = bingoTable.querySelector('td:nth-child(' + (ultimoIndiceSorteado % numerosPorLinha + 1) + ')');
        cell.classList.add('marked');
        cell.style.backgroundColor = '#28a745'; // Altera a cor de fundo da célula
    } else {
        alert('Nenhum número foi sorteado ainda.');
    }
});

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo(); // Reinicia o jogo
    numeroSorteadoText.innerHTML = ''; // Limpa o texto do número sorteado
});

// Chama a função reiniciarJogo() quando a página é carregada
document.addEventListener('DOMContentLoaded', reiniciarJogo);
