document.addEventListener("DOMContentLoaded", function() {
    const numerosContainer = document.getElementById("numerosContainer");
    const resultado = document.getElementById("resultado");
    const sortearBtn = document.getElementById("sortear");

    const tabuadas = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    sortearBtn.addEventListener("click", function() {
        // Limpar os números anteriores
        numerosContainer.innerHTML = "";

        // Sortear um número aleatório de 1 a 100
        const numeroSorteado = Math.floor(Math.random() * 100) + 1;

        // Verificar se o número sorteado é resultado de alguma tabuada
        for (const tabuada of tabuadas) {
            if (numeroSorteado % tabuada === 0 && numeroSorteado / tabuada <= 10) {
                const numeroDiv = document.createElement("div");
                numeroDiv.textContent = numeroSorteado;
                numerosContainer.appendChild(numeroDiv);
                resultado.value = `Qual é o resultado de ${tabuada} x ${numeroSorteado / tabuada}?`;
                break;
            }
        }
    });

    // Evento para iniciar novo jogo
    document.getElementById("novoJogo").addEventListener("click", function() {
        resultado.value = "";
        numerosContainer.innerHTML = "";
    });
});
