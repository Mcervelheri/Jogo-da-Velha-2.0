const tabuleiro = [
    [
      [['', '', ''], ['', '', ''], ['', '', '']],
      [['', '', ''], ['', '', ''], ['', '', '']],
      [['', '', ''], ['', '', ''], ['', '', '']]
    ],
    [
      [['', '', ''], ['', '', ''], ['', '', '']],
      [['', '', ''], ['', '', ''], ['', '', '']],
      [['', '', ''], ['', '', ''], ['', '', '']]
    ],
    [
      [['', '', ''], ['', '', ''], ['', '', '']],
      [['', '', ''], ['', '', ''], ['', '', '']],
      [['', '', ''], ['', '', ''], ['', '', '']]
    ]
  ];

const quadradosPequenos = document.querySelectorAll(".quadradoPequeno");
let quadradosMarcados = [];
let jogadorAtual = "X";

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

let listaQuadradosGrande = [
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

// Função para abrir a tela de regras
function abrirRegras() {
    document.getElementById("tela-regras").style.display = "flex";
}

// Função para fechar a tela de regras
function fecharRegras() {
    document.getElementById("tela-regras").style.display = "none";
}

function comecarJogo() {
    todosQuadrados = document.querySelectorAll('.quadradoPequeno');
    todosQuadrados.forEach(quadrado => {
        quadrado.classList.add('quadradoValido');
        quadrado.onclick = () => escolherQuadrado(quadrado.id);
    })
}

function obterQuadradosFilhos(quadradoGrande) {
    return quadradoGrande.querySelectorAll('.quadradoPequeno');
}

function escolherQuadrado(id) {
    const quadradoGrande = document.getElementById(id).parentNode;
    quadradoJogado = document.getElementById(id);
    quadradoJogado.innerHTML = jogadorAtual;
    quadradosMarcados.push(id);

    let vitoriaX = verificarSequenciaPequeno('X', quadradoGrande);
    let vitoriaO = verificarSequenciaPequeno('O', quadradoGrande);
    if (vitoriaX || vitoriaO) {
        // Desabilita o clique em todas as divs filhas do quadradoGrande
        const divsFilhas = quadradoGrande.querySelectorAll('.quadradoPequeno');
        divsFilhas.forEach(divFilha => {
            divFilha.onclick = null;
            console.log(divFilha);
        });

        // Aplica os estilos de vencedor
        if (vitoriaX) {
            quadradoGrande.classList.add('vencedorX');
        }
        if (vitoriaO) {
            quadradoGrande.classList.add('vencedorO');
        }
    }
    const quadradosVencedor = Array.from(obterQuadradosFilhos(quadradoGrande));
    quadradosMarcados.push(quadradosVencedor);
    

    console.log(quadradosMarcados);

    const ultimoDigito = id.slice(-1);
    const proximoQuadrado = ultimoDigito + '0';

    trocarJogador(jogadorAtual);

    let quadradosValidos = [];
    listaQuadradosGrande = removerNumeroDaLista(id);

    switch (proximoQuadrado) {
        case '10':
            quadradosValidos = listaQuadradosGrande[0];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;

        case '20':
            quadradosValidos = listaQuadradosGrande[1];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;

        case '30':
            quadradosValidos = listaQuadradosGrande[2];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;
        case '40':
            quadradosValidos = listaQuadradosGrande[3];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;
        case '50':
            quadradosValidos = listaQuadradosGrande[4];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;
        case '60':
            quadradosValidos = listaQuadradosGrande[5];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;
        case '70':
            quadradosValidos = listaQuadradosGrande[6];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;
        case '80':
            quadradosValidos = listaQuadradosGrande[7];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;
        case '90':
            quadradosValidos = listaQuadradosGrande[8];
            quadradosValidos = quadradosValidos.filter(quadrado => !quadradosVencedor.includes(quadrado));
            desabilitarQuadrados(quadradosValidos)
            break;

        default:
            break;
    }
}
function verificarSequenciaPequeno(simbolo, quadradoGrande) {
    const sequenciasVitoria = sequenciaQuadradoPequeno.filter(seq => seq.every(posicao => {
        const idDiv = posicao.toString();
        const conteudoDiv = document.getElementById(idDiv).textContent;
        return conteudoDiv === simbolo;
    }));

    // Inicialize um array para armazenar os IDs dos elementos filhos
    const idsElementosFilhos = [];

    // Itere sobre os elementos filhos para coletar seus IDs
    for (let i = 0; i < quadradoGrande.children.length; i++) {
        const elementoFilho = quadradoGrande.children[i];
        idsElementosFilhos.push(elementoFilho.id);
    }

    // Verifica se alguma das sequências de vitória pertence ao jogo menor atual
    return sequenciasVitoria.some(seq => seq.every(posicao => idsElementosFilhos.includes(posicao.toString())));
}


// function verificarSequenciaPequeno(simbolo) {

//     for (let i = 0; i < sequenciaQuadradoPequeno.length; i++) {
//         const element = sequenciaQuadradoPequeno[i];

//         const todasMarcadas = element.every((posicao) => {
//             const idDiv = posicao.toString();
//             const conteudoDiv = document.getElementById(idDiv).textContent;
//             return conteudoDiv === simbolo;
//         });
//         if (todasMarcadas) {
//             return true;
//         }
//     }
//     return false;
// }

function desabilitarQuadrados(quadradosValidos) {
    const todosQuadrados = document.querySelectorAll('.quadradoPequeno');
    todosQuadrados.forEach(quadrado => {
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
    if (ultimoAJogar === "X") {
        jogadorAtual = "O";
    } else if (ultimoAJogar === "O") {
        jogadorAtual = "X";
    }
}