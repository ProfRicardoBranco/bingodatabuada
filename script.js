document.addEventListener("DOMContentLoaded", function() {
    const numerosContainer = document.getElementById("numerosContainer");
    const resultado = document.getElementById("resultado");
    const sortearBtn = document.getElementById("sortear");
    const tabuadaTable = document.getElementById("tabuada");

    const tabuadas = [2, 3, 4, 5, 6, 7, 8, 9];
    const numerosPossiveis = [];

    // Preencher array com todos os resultados possíveis
    for (const tabuada of tabuadas) {
        for (let i = 1; i <= 10; i++) {
            numerosPossiveis.push(tabuada * i);
        }
    }

    // Função para sortear um número
    function sortearNumero() {
        // Limpar células marcadas
        const markedCells = document.querySelectorAll(".marked");
        markedCells.forEach(cell => cell.classList.remove("marked"));

        // Sortear um número aleatório
        const numeroSorteado = numerosPossiveis[Math.floor(Math.random() * numerosPossiveis.length)];

        // Marcar a célula correspondente na tabela
        const rowIndex = Math.ceil(numeroSorteado / 10) - 1;
        const colIndex = (numeroSorteado % 10 === 0) ? 9 : (numeroSorteado % 10) - 1;
        const cell = tabuadaTable.rows[rowIndex].cells[colIndex];
        cell.classList.add("marked");

        // Atualizar campo de texto com a multiplicação correspondente
        const tabuada = tabuadas[colIndex];
        resultado.value = `Qual é o resultado de ${tabuada} &times; ${Math.ceil(numeroSorteado / 10)}?`;
    }

    // Evento para sortear número ao clicar no botão
    sortearBtn.addEventListener("click", sortearNumero);

    // Evento para iniciar novo jogo
    document.getElementById("novoJogo").addEventListener("click", function() {
        resultado.value = "";
        sortearNumero(); // Limpar células marcadas ao iniciar novo jogo
    });
});
