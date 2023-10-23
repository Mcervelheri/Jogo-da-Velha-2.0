const quadradosPequenos = document.querySelectorAll(".quadradoPequeno");
let contadorVitoriasX = 0;
let contadorVitoriasO = 0;
let quadradosMarcados = [];
let X = {
    imagem: "url(img/X.png)",
    texto: "X"
}
let O = {
    imagem: "url(img/O.png)",
    texto: "O"
}
let jogadorAtual = X;
let mostrarJogador = '';
let mostrarPlacar = '';
let quadradosValidos = [];
let numerosQuadradosMarcados = [];


let sequenciaQuadradoPequeno = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
    [11, 12, 13],
    [11, 15, 19],
    [11, 14, 17],
    [12, 15, 18],
    [13, 15, 17],
    [13, 16, 19],
    [14, 15, 16],
    [17, 18, 19],
    [21, 22, 23],
    [21, 25, 29],
    [21, 24, 27],
    [22, 25, 28],
    [23, 25, 27],
    [23, 26, 29],
    [24, 25, 26],
    [27, 28, 29],
    [31, 32, 33],
    [31, 35, 39],
    [31, 34, 37],
    [32, 35, 38],
    [33, 35, 37],
    [33, 36, 39],
    [34, 35, 36],
    [37, 38, 39],
    [41, 42, 43],
    [41, 45, 49],
    [41, 44, 47],
    [42, 45, 48],
    [43, 45, 47],
    [43, 46, 49],
    [44, 45, 46],
    [47, 48, 49],
    [51, 52, 53],
    [51, 55, 59],
    [51, 54, 57],
    [52, 55, 58],
    [53, 55, 57],
    [53, 56, 59],
    [54, 55, 56],
    [57, 58, 59],
    [61, 62, 63],
    [61, 65, 69],
    [61, 64, 67],
    [62, 65, 68],
    [63, 65, 67],
    [63, 66, 69],
    [64, 65, 66],
    [67, 68, 69],
    [71, 72, 73],
    [71, 75, 79],
    [71, 74, 77],
    [72, 75, 78],
    [73, 75, 77],
    [73, 76, 79],
    [74, 75, 76],
    [77, 78, 79],
    [81, 82, 83],
    [81, 85, 89],
    [81, 84, 87],
    [82, 85, 88],
    [83, 85, 87],
    [83, 86, 89],
    [84, 85, 86],
    [87, 88, 89],
];

let sequenciaQuadradoGrande = [
    [10, 20, 30],
    [10, 50, 90],
    [10, 40, 70],
    [20, 50, 80],
    [30, 50, 70],
    [30, 60, 90],
    [40, 50, 60],
    [70, 80, 90],
]

function deepCopy(arr) {
    return arr.map(subArr => [...subArr]);
}

let listaQuadradosGrandeInalterada = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [11, 12, 13, 14, 15, 16, 17, 18, 19],
    [21, 22, 23, 24, 25, 26, 27, 28, 29],
    [31, 32, 33, 34, 35, 36, 37, 38, 39],
    [41, 42, 43, 44, 45, 46, 47, 48, 49],
    [51, 52, 53, 54, 55, 56, 57, 58, 59],
    [61, 62, 63, 64, 65, 66, 67, 68, 69],
    [71, 72, 73, 74, 75, 76, 77, 78, 79],
    [81, 82, 83, 84, 85, 86, 87, 88, 89]
];

let listaQuadradosGrande = deepCopy(listaQuadradosGrandeInalterada);

function comecarJogo() {
    let checkbox = document.getElementById("menu__toggle");
    checkbox.checked = false;

    quadradosMarcados = [];
    quadradosValidos = [];
    listaQuadradosGrande = deepCopy(listaQuadradosGrandeInalterada);
    todosQuadrados = document.querySelectorAll('.quadradoPequeno');
    todosQuadrados.forEach(quadrado => {
        quadrado.classList.add('quadradoValido');
        quadrado.style.backgroundImage = '';
        quadrado.onclick = () => escolherQuadrado(quadrado.id);
        quadradosValidos.push(parseInt(quadrado.id));
    });

    todosQuadradosGrandes = document.querySelectorAll('.quadradoGrande');
    todosQuadradosGrandes.forEach(quadradoGrande => {
        quadradoGrande.classList.remove('vencedorX');
        quadradoGrande.classList.remove('vencedorO');
    })
    mostrarJogador = document.querySelector('.jogador-atual');
    mostrarJogador.textContent = 'Jogador atual:' + jogadorAtual.texto;
    mostrarPlacar = document.querySelector('.placar');
    mostrarPlacar.innerHTML = 'Placar';
    const vitoriasX = document.querySelector('.vitoriaX');
    vitoriasX.innerHTML = "Jogador X: " + contadorVitoriasX;
    const vitoriasO = document.querySelector('.vitoriaO');
    vitoriasO.innerHTML = "Jogador O: " + contadorVitoriasO;
}

function abrirRegras() {
    document.getElementById("tela-regras").style.display = "flex";
}

function fecharRegras() {
    document.getElementById("tela-regras").style.display = "none";
}

function abrirVencedor(jogadorAtual) {
    document.getElementById("tela-vencedor").style.display = "flex";
    document.querySelector('.tela-vencedor').querySelector('h2').textContent = 'Vitoria do jogador ' + jogadorAtual.texto;
}

function fecharVencedor() {
    document.getElementById("tela-vencedor").style.display = "none";
    comecarJogo();
}

function escolherQuadrado(id) {

    const quadradoGrande = document.getElementById(id).parentNode;
    quadradoJogado = document.getElementById(id);
    quadradoJogado.style.backgroundImage = jogadorAtual.imagem;

    // Adiciona o quadrado atual à lista de quadrados marcados
    quadradosMarcados.push(id);
    let vitoriaQuadradinhoX = verificarSequenciaPequeno(X.texto, quadradoGrande);
    let vitoriaQuadradinhoO = verificarSequenciaPequeno(O.texto, quadradoGrande);
    let quadradaoVencido = 0
    // Se houver uma vitória, adiciona todos os quadrados da sequência à lista de quadrados marcados
    if (vitoriaQuadradinhoX || vitoriaQuadradinhoO) {
        const quadradosFilhos = quadradoGrande.children;
        const idQuadradosFilhos = Array.from(quadradosFilhos).map(elemento => elemento.id);
        quadradosMarcados.push(...idQuadradosFilhos);
        quadradaoVencido = quadradoGrande.id;
        // Aplica os estilos de vencedor
        if (vitoriaQuadradinhoX) {
            quadradosMarcados.push(quadradaoVencido);
            quadradoGrande.classList.add('vencedorX');
            if (verificarSequenciaGrandeCompletaX()) {
                abrirVencedor(jogadorAtual);
                contadorVitoriasX += 1;
            }
        }
        if (vitoriaQuadradinhoO) {
            quadradosMarcados.push(quadradaoVencido);
            quadradoGrande.classList.add('vencedorO');
            if (verificarSequenciaGrandeCompletaO()) {
                abrirVencedor(jogadorAtual);
                contadorVitoriasO += 1;
            }
        }
    }
    const ultimoDigito = id.slice(-1);
    const proximoQuadrado = ultimoDigito + '0';

    trocarJogador(jogadorAtual);

    quadradosValidos = obterQuadradosValidos(proximoQuadrado);
    listaQuadradosGrande = removerNumeroDaLista(id);

    desabilitarQuadrados(quadradosValidos);

}

function removerNumeroDaLista(numeroRemover) {
    numeroRemover = parseInt(numeroRemover);
    for (let i = 0; i < listaQuadradosGrande.length; i++) {
        let indiceParaRemover = listaQuadradosGrande[i].indexOf(numeroRemover);
        if (indiceParaRemover !== -1) {
            listaQuadradosGrande[i].splice(indiceParaRemover, 1);

            break; // Saímos do loop após a remoção bem-sucedida
        }
    }
    return listaQuadradosGrande;
}

function obterQuadradosFilhos(quadradoGrande) {
    return quadradoGrande.querySelectorAll('.quadradoPequeno');
}

function obterQuadradosValidos(proximoQuadrado) {
    quadradosValidos = listaQuadradosGrande[parseInt(proximoQuadrado[0]) - 1]; // Obtém os quadrados válidos com base no próximo quadrado
    quadradosValidos = quadradosValidos.filter(quadrado => !quadradosMarcados.includes(quadrado));
    numerosQuadradosMarcados = quadradosMarcados.map(numero => Number(numero));

    for (let i = 0; i < numerosQuadradosMarcados.length; i++) {
        const index = quadradosValidos.indexOf(numerosQuadradosMarcados[i]);
        if (index !== -1) {
            quadradosValidos.splice(index, 1);
        }
    }

    if (quadradosValidos.length === 0) {
        quadradosValidos = listaQuadradosGrande.flat().filter(quadrado => !numerosQuadradosMarcados.includes(quadrado));
    }
    return quadradosValidos;
}

function removerQuadradosDoQuadradao(quadradaoId) {
    const quadradao = document.getElementById(quadradaoId);
    const quadradosDoQuadradao = quadradao.querySelectorAll('.quadradoPequeno');
    quadradosDoQuadradao.forEach(quadrado => {
        const quadradoId = quadrado.id;
        if (!quadradosMarcados.includes(quadradoId)) {
            quadradosMarcados.push(quadradoId);
        }
    });
}

function verificarSequenciaPequeno(simbolo, idQuadradoGrande) {
    const sequenciasVitoria = sequenciaQuadradoPequeno.filter(seq => seq.every(posicao => {
        const idDiv = posicao.toString();
        let conteudoDiv;
        console.log(document.getElementById(idDiv).style.backgroundImage);

        if (document.getElementById(idDiv).style.backgroundImage === 'url("img/X.png")') {
            conteudoDiv = "X";
        } else if(document.getElementById(idDiv).style.backgroundImage === 'url("img/O.png")') {
            conteudoDiv = "O";
        }
        return conteudoDiv === simbolo;
    }));
    const idsElementosFilhos = [];
    if (typeof idQuadradoGrande === 'string') {
        return sequenciasVitoria.length >= 1 ? idQuadradoGrande : null;
    } else {
        const filhos = idQuadradoGrande.children;
        // É um objeto, portanto, é um elemento DOM, colete os IDs dos elementos filhos
        for (let i = 0; i < filhos.length; i++) {
            const elementoFilho = filhos[i];
            if (elementoFilho.nodeType === 1) { // Verifique se é um elemento HTML (nodeType 1)
                idsElementosFilhos.push(elementoFilho.id);
            }
        }

        const sequenciaVitoriosa = sequenciasVitoria.find(seq => seq.every(posicao => idsElementosFilhos.includes(posicao.toString())));
        // Verifica se houve uma sequência vitoriosa
        return sequenciaVitoriosa ? true : false;
    }
}

function verificarSequenciaGrandeCompletaO() {
    // Percorre a matriz de sequência de quadrados grandes
    for (let i = 0; i < sequenciaQuadradoGrande.length; i++) {
        const sequencia = sequenciaQuadradoGrande[i];

        // Verifica se todos os quadrados na sequência têm a classe do símbolo do jogador
        const sequenciaCompleta = sequencia.every(quadradoId => {
            const quadrado = document.getElementById(quadradoId.toString());
            return quadrado.classList.contains('vencedorO');
        });

        if (sequenciaCompleta) {
            return true;
        }
    }

    return false; // Nenhuma sequência completa encontrada
}

function verificarSequenciaGrandeCompletaX() {
    // Percorre a matriz de sequência de quadrados grandes
    for (let i = 0; i < sequenciaQuadradoGrande.length; i++) {
        const sequencia = sequenciaQuadradoGrande[i];

        // Verifica se todos os quadrados na sequência têm a classe do símbolo do jogador
        const sequenciaCompleta = sequencia.every(quadradoId => {
            const quadrado = document.getElementById(quadradoId.toString());
            return quadrado.classList.contains('vencedorX');
        });

        if (sequenciaCompleta) {
            return true;
        }
    }

    return false; // Nenhuma sequência completa encontrada
}

function desabilitarQuadrados(quadradosValidos) {
    const cadaQuadrado = document.querySelectorAll('.quadradoPequeno');
    cadaQuadrado.forEach(quadrado => {
        quadrado.classList.remove('quadradoValido');
        quadrado.onclick = null;
    });
    quadradosValidos.forEach(quadradoId => {
        const quadrado = document.getElementById(quadradoId);
        quadrado.classList.add('quadradoValido');
        quadrado.onclick = () => escolherQuadrado(quadrado.id);
    })
}

function trocarJogador(ultimoAJogar) {
    if (ultimoAJogar === X) {
        jogadorAtual = O;

        mostrarJogador.textContent = 'Jogador atual:' + jogadorAtual.texto;
    } else if (ultimoAJogar === O) {
        jogadorAtual = X;
        mostrarJogador.textContent = 'Jogador atual:' + jogadorAtual.texto;
    }
}