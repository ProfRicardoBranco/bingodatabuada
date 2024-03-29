// const maximoBingo = 75; // Não é mais necessário
// const numerosNaTabela = []; // Array para armazenar os números na tabela
const arrayNumerosPossiveis = [6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 70, 72, 80, 81, 90];

// document.addEventListener('DOMContentLoaded', function() {
//     reiniciarJogo();
// });

const bingoTable = document.getElementById('bingoTable');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const numerosSorteados = new Set(); // Usando um conjunto para garantir números únicos

// Função para limpar a tabela e reiniciar o jogo
function reiniciarJogo() {
    // Limpa a tabela
    bingoTable.innerHTML = '';

    // Limpa o conjunto de números sorteados
    numerosSorteados.clear();

    // Preenche a tabela com os números possíveis
    for (let i = 0; i < arrayNumerosPossiveis.length; i += 1) {
        const row = bingoTable.insertRow();
        for (let j = i; j < i + 1 && j < arrayNumerosPossiveis.length; j++) {
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

sortearBtn.addEventListener('click', () => {
    if (numerosSorteados.size === arrayNumerosPossiveis.length) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let indiceSorteado;
    
    do {
        indiceSorteado = gerarNumeroAleatorio();
    } while (numerosSorteados.has(arrayNumerosPossiveis[indiceSorteado]));

    numerosSorteados.add(arrayNumerosPossiveis[indiceSorteado]);
    marcarNumeroSorteado(indiceSorteado);
    atualizarNumeroSorteado(arrayNumerosPossiveis[indiceSorteado]);
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
