const bingoTable = document.getElementById('bingoTable');
const sortearBtn = document.getElementById('sortearBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');
const marcarResultadoBtn = document.getElementById('btnMarcarResultado'); // Botão "Marcar Resultado"
const numerosSorteados = new Set(); // Usando um conjunto para garantir números únicos

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

// Evento de clique no botão "Sortear"
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

// Evento de clique no botão "Novo Jogo"
novoJogoBtn.addEventListener('click', () => {
    reiniciarJogo();
    numeroSorteadoText.innerHTML = ""; // Limpa o conteúdo do elemento
});

// Evento de clique no botão "Marcar Resultado"
marcarResultadoBtn.addEventListener('click', () => {
    // Aqui você pode adicionar a lógica para marcar o resultado na tabela
    // Por enquanto, vou apenas exibir uma mensagem
    alert('Resultado marcado na tabela!');
});
