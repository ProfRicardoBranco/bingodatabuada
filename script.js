const maximoBingo = 75; // Definindo o número máximo do bingo
const numerosNaTabela = []; // Array para armazenar os números na tabela

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

    // Preenche o array com os números na tabela
    for (let tabuada = 2; tabuada <= 9; tabuada++) {
        for (let multiplicador = 1; multiplicador <= 10; multiplicador++) {
            const resultado = tabuada * multiplicador;
            numerosNaTabela.push(resultado);
        }
    }

    // Preenche a tabela
    for (let i = 0; i < numerosNaTabela.length; i += 10) {
        const row = bingoTable.insertRow();
        for (let j = i; j < i + 10; j++) {
            const cell = row.insertCell();
            cell.textContent = numerosNaTabela[j];
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
    return Math.floor(Math.random() * numerosNaTabela.length);
}

// Função para marcar o número sorteado na tabela
function marcarNumeroSorteado(indice) {
    const numeroSorteado = numerosNaTabela[indice];
    const cells = bingoTable.querySelectorAll('td');
    for (const cell of cells) {
        if (parseInt(cell.textContent) === numeroSorteado) {
            cell.classList.add('marked');
            cell.style.backgroundColor = '#28a745'; // Altera a cor de fundo da célula
            break;
        }
    }
}

sortearBtn.addEventListener('click', () => {
    if (todosSorteados()) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    let indiceSorteado;
    
    do {
        indiceSorteado = gerarNumeroAleatorio();
    } while (numerosSorteados.has(numerosNaTabela[indiceSorteado]));

    numerosSorteados.add(numerosNaTabela[indiceSorteado]);
    marcarNumeroSorteado(indiceSorteado);
    atualizarNumeroSorteado(numerosNaTabela[indiceSorteado]);
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
