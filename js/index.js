const quadradosPequenos = document.querySelectorAll(".quadradoPequeno");
let contadorVitoriasX = 0;
let contadorVitoriasO = 0;
let quadradosMarcados = [];
let X = {
    imagem: "X",
    texto: "X",
    cor: "#FF5733",
    img_path: "img/X.png"
}
let O = {
    imagem: "O",
    texto: "O",
    cor: "#33FF33",
    img_path: "img/O.png"
}
let jogadorAtual = X;
let mostrarJogador = '';
let mostrarPlacar = '';
let quadradosValidos = [];
let numerosQuadradosMarcados = [];
// Variáveis para controle do modo de jogo
let modoIA = false;
let dificuldadeIA = 'medio'; // 'facil', 'medio', 'dificil'
let jogadorHumano = X; // O jogador humano sempre começa como X
let jogadorIA = O; // A IA sempre será O
let iaJogando = false; // Flag para controlar se a IA está "pensando"
let debugMode = true; // Ativar logs de depuração

// Função para logs de depuração
function debug(mensagem) {
    if (debugMode) {
        console.log("[DEBUG] " + mensagem);
    }
}

// Função para adicionar eventos de clique diretamente
function adicionarEventosClique() {
    debug("Adicionando eventos de clique aos quadrados");
    
    // Seleciona todos os quadrados pequenos
    const quadradosPequenos = document.querySelectorAll('.quadradoPequeno');
    
    // Adiciona evento de clique a cada quadrado
    quadradosPequenos.forEach(quadrado => {
        // Remove evento antigo para evitar duplicação
        quadrado.removeEventListener('click', handleQuadradoClick);
        
        // Adiciona novo evento
        quadrado.addEventListener('click', handleQuadradoClick);
        
        // Adiciona classe para destacar quadrados válidos
        quadrado.classList.add('quadradoValido');
    });
    
    debug("Eventos de clique adicionados a " + quadradosPequenos.length + " quadrados");
}

// Função handler para o evento de clique
function handleQuadradoClick(event) {
    const id = event.target.id;
    debug("Clique detectado no quadrado: " + id);
    escolherQuadrado(id);
}

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

// Função para iniciar o jogo no modo contra IA
function iniciarModoIA(dificuldade) {
    debug("Iniciando modo IA com dificuldade: " + dificuldade);
    modoIA = true;
    dificuldadeIA = dificuldade;
    jogadorHumano = X;
    jogadorIA = O;
    comecarJogo();
    
    // Atualiza o texto para mostrar que o jogador está jogando contra a IA
    mostrarJogador = document.querySelector('.jogador-atual');
    mostrarJogador.textContent = 'Jogador X vs IA (Nível: ' + dificuldadeIA + ')';
    
    // Fecha o menu após a seleção
    let checkbox = document.getElementById("menu__toggle");
    if (checkbox) checkbox.checked = false;
    
    debug("Modo IA iniciado. modoIA=" + modoIA + ", jogadorAtual=" + jogadorAtual.texto);
}

// Função para iniciar o jogo no modo jogador vs jogador
function iniciarModoJogador() {
    debug("Iniciando modo jogador vs jogador");
    modoIA = false;
    comecarJogo();
    
    // Fecha o menu após a seleção
    let checkbox = document.getElementById("menu__toggle");
    if (checkbox) checkbox.checked = false;
}

function comecarJogo() {
    debug("Iniciando jogo");
    let checkbox = document.getElementById("menu__toggle");
    if (checkbox) checkbox.checked = false;

    quadradosMarcados = [];
    quadradosValidos = [];
    listaQuadradosGrande = deepCopy(listaQuadradosGrandeInalterada);
    
    // Importante: Obter os elementos do DOM após cada reinício
    const todosQuadrados = document.querySelectorAll('.quadradoPequeno');
    debug("Total de quadrados pequenos encontrados: " + todosQuadrados.length);
    
    todosQuadrados.forEach(quadrado => {
        quadrado.classList.add('quadradoValido');
        quadrado.style.backgroundColor = '#64B5F6';
        quadrado.textContent = '';
        
        // Limpar qualquer estilo ou imagem de fundo
        quadrado.style.backgroundImage = 'none';
        quadrado.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        
        // Remover evento antigo e adicionar novo
        quadrado.removeEventListener('click', handleQuadradoClick);
        quadrado.addEventListener('click', handleQuadradoClick);
        
        quadradosValidos.push(parseInt(quadrado.id));
    });

    const todosQuadradosGrandes = document.querySelectorAll('.quadradoGrande');
    todosQuadradosGrandes.forEach(quadradoGrande => {
        // Remover classes de vencedor
        quadradoGrande.classList.remove('vencedorX');
        quadradoGrande.classList.remove('vencedorO');
        quadradoGrande.classList.remove('pulse-animation');
        
        // Remover overlays de vitória
        const overlays = quadradoGrande.querySelectorAll('.victory-overlay');
        overlays.forEach(overlay => {
            quadradoGrande.removeChild(overlay);
        });
    });
    
    jogadorAtual = X;
    iaJogando = false;
    
    mostrarJogador = document.querySelector('.jogador-atual');
    if (modoIA) {
        mostrarJogador.textContent = 'Jogador X vs IA (Nível: ' + dificuldadeIA + ')';
    } else {
        mostrarJogador.textContent = 'Jogador atual: ' + jogadorAtual.texto;
    }
    
    mostrarPlacar = document.querySelector('.placar');
    if (mostrarPlacar) mostrarPlacar.innerHTML = 'Placar';
    
    const vitoriasX = document.querySelector('.vitoriaX');
    if (vitoriasX) vitoriasX.innerHTML = "Jogador X: " + contadorVitoriasX;
    
    const vitoriasO = document.querySelector('.vitoriaO');
    if (vitoriasO) vitoriasO.innerHTML = modoIA ? "IA: " + contadorVitoriasO : "Jogador O: " + contadorVitoriasO;
    
    debug("Jogo iniciado. modoIA=" + modoIA + ", jogadorAtual=" + jogadorAtual.texto);
    debug("Quadrados válidos: " + quadradosValidos.length);
    
    // Adiciona eventos de clique diretamente
    adicionarEventosClique();
}

function abrirRegras() {
    document.getElementById("tela-regras").style.display = "flex";
}

function fecharRegras() {
    document.getElementById("tela-regras").style.display = "none";
}

function abrirVencedor(jogadorAtual) {
    document.getElementById("tela-vencedor").style.display = "flex";
    const mensagemVencedor = document.querySelector('.tela-vencedor').querySelector('h2');
    
    if (modoIA && jogadorAtual === jogadorIA) {
        mensagemVencedor.textContent = 'A IA venceu!';
    } else if (modoIA && jogadorAtual === jogadorHumano) {
        mensagemVencedor.textContent = 'Você venceu!';
    } else {
        mensagemVencedor.textContent = 'Vitória do jogador ' + jogadorAtual.texto;
    }
}

function fecharVencedor() {
    document.getElementById("tela-vencedor").style.display = "none";
    comecarJogo();
}

function escolherQuadrado(id) {
    debug("Tentando escolher quadrado: " + id);
    
    // Se a IA estiver "pensando", não permitir jogadas do humano
    if (iaJogando && !id.toString().startsWith('ia_')) {
        debug("IA está pensando, jogada ignorada");
        return;
    }
    
    // No modo IA, só permitir que o jogador humano faça jogadas quando for sua vez
    if (modoIA && jogadorAtual !== jogadorHumano && !id.toString().startsWith('ia_')) {
        debug("Não é a vez do jogador humano, jogada ignorada");
        return;
    }

    // Remove o prefixo 'ia_' se existir (usado para jogadas da IA)
    const cleanId = id.toString().replace('ia_', '');
    
    // Converte o ID para número
    const idNum = parseInt(cleanId);
    
    // Verifica se o quadrado já está marcado
    if (quadradosMarcados.includes(idNum.toString()) || quadradosMarcados.includes(idNum)) {
        debug("Quadrado já marcado: " + idNum);
        return; // Se já estiver marcado, não faz nada
    }
    
    // Verifica se o quadrado é válido para a jogada atual
    if (!quadradosValidos.includes(idNum)) {
        debug("Quadrado não válido para jogada atual: " + idNum);
        return; // Se não for válido, não faz nada
    }
    
    debug("Jogada válida no quadrado: " + idNum + " pelo jogador: " + jogadorAtual.texto);
    
    const quadradoGrande = document.getElementById(idNum).parentNode;
    const quadradoJogado = document.getElementById(idNum);
    
    // Marca o quadrado com a imagem do jogador atual
    quadradoJogado.style.backgroundColor = '#64B5F6';
    quadradoJogado.textContent = '';
    quadradoJogado.style.backgroundImage = `url('${jogadorAtual.img_path}')`;
    quadradoJogado.style.backgroundSize = '70%';
    quadradoJogado.style.backgroundPosition = 'center';
    quadradoJogado.style.backgroundRepeat = 'no-repeat';
    quadradoJogado.style.display = 'flex';
    quadradoJogado.style.justifyContent = 'center';
    quadradoJogado.style.alignItems = 'center';

    // Adiciona o quadrado atual à lista de quadrados marcados
    quadradosMarcados.push(idNum);
    debug("Quadrado marcado: " + idNum + ", total de quadrados marcados: " + quadradosMarcados.length);
    
    // Verifica se houve vitória em um quadrado pequeno
    let vitoriaQuadradinhoX = verificarSequenciaPequeno(X, quadradoGrande);
    let vitoriaQuadradinhoO = verificarSequenciaPequeno(O, quadradoGrande);
    let quadradaoVencido = 0;
    
    // Se houver uma vitória, adiciona todos os quadrados da sequência à lista de quadrados marcados
    if (vitoriaQuadradinhoX || vitoriaQuadradinhoO) {
        debug("Vitória em quadrado pequeno detectada");
        const quadradosFilhos = quadradoGrande.children;
        const idQuadradosFilhos = Array.from(quadradosFilhos).map(elemento => parseInt(elemento.id));
        
        // Marca todos os quadrados do quadrado grande como ocupados
        idQuadradosFilhos.forEach(idFilho => {
            if (!quadradosMarcados.includes(idFilho)) {
                quadradosMarcados.push(idFilho);
            }
        });
        
        quadradaoVencido = parseInt(quadradoGrande.id);
        
        // Aplica os estilos de vencedor com efeitos visuais
        if (vitoriaQuadradinhoX) {
            debug("Vitória do X no quadrado grande: " + quadradaoVencido);
            quadradosMarcados.push(quadradaoVencido);
            quadradoGrande.classList.add('vencedorX');
            
            // Adiciona animação de pulso
            quadradoGrande.classList.add('pulse-animation');
            
            // Adiciona um X grande como overlay
            const xElement = document.createElement('div');
            xElement.className = 'victory-overlay';
            xElement.style.backgroundImage = "url('img/X.png')";
            quadradoGrande.appendChild(xElement);
            
            if (verificarSequenciaGrandeCompletaX()) {
                debug("Vitória completa do X");
                abrirVencedor(jogadorAtual);
                contadorVitoriasX += 1;
                atualizarPlacar();
                return; // Encerra a função se houver vitória
            }
        }
        if (vitoriaQuadradinhoO) {
            debug("Vitória do O no quadrado grande: " + quadradaoVencido);
            quadradosMarcados.push(quadradaoVencido);
            quadradoGrande.classList.add('vencedorO');
            
            // Adiciona animação de pulso
            quadradoGrande.classList.add('pulse-animation');
            
            // Adiciona um O grande como overlay
            const oElement = document.createElement('div');
            oElement.className = 'victory-overlay';
            oElement.style.backgroundImage = "url('img/O.png')";
            quadradoGrande.appendChild(oElement);
            
            if (verificarSequenciaGrandeCompletaO()) {
                debug("Vitória completa do O");
                abrirVencedor(jogadorAtual);
                contadorVitoriasO += 1;
                atualizarPlacar();
                return; // Encerra a função se houver vitória
            }
        }
    }
    
    // Determina o próximo quadrado grande onde o jogador deve jogar
    const ultimoDigito = idNum % 10;
    const proximoQuadrado = ultimoDigito + '0';
    debug("Próximo quadrado grande: " + proximoQuadrado);

    // Troca o jogador atual
    const jogadorAnterior = jogadorAtual;
    trocarJogador();
    debug("Jogador trocado de " + jogadorAnterior.texto + " para " + jogadorAtual.texto);

    // Obtém os quadrados válidos para a próxima jogada
    quadradosValidos = obterQuadradosValidos(proximoQuadrado);
    listaQuadradosGrande = removerNumeroDaLista(idNum);

    // Atualiza os quadrados válidos na interface
    desabilitarQuadrados(quadradosValidos);
    debug("Quadrados válidos atualizados: " + quadradosValidos.length + " quadrados disponíveis");
    
    // Se for modo IA e agora é a vez da IA, fazer a jogada da IA
    if (modoIA && jogadorAtual === jogadorIA) {
        debug("É a vez da IA jogar");
        executarJogadaIA();
    }
}

// Função para executar a jogada da IA com atraso
function executarJogadaIA() {
    iaJogando = true;
    mostrarJogador.textContent = 'IA está pensando...';
    debug("IA começou a pensar...");
    
    // Adiciona um atraso para simular "pensamento" da IA
    setTimeout(() => {
        debug("IA vai jogar agora");
        const escolha = fazerJogadaIA();
        debug("IA escolheu o quadrado: " + escolha);
        
        // Importante: Desativa a flag iaJogando antes de fazer a jogada
        iaJogando = false;
        
        // Executa a jogada escolhida pela IA com um prefixo especial
        escolherQuadrado('ia_' + escolha.toString());
        
        if (modoIA) {
            mostrarJogador.textContent = 'Jogador X vs IA (Nível: ' + dificuldadeIA + ')';
        }
        debug("IA terminou de jogar");
    }, 1000); // Atraso de 1 segundo
}

// Função para a IA fazer sua jogada
function fazerJogadaIA() {
    debug("Executando jogada da IA");
    if (quadradosValidos.length === 0) {
        debug("Nenhum quadrado válido disponível para a IA");
        return null;
    }
    
    let escolha;
    
    switch (dificuldadeIA) {
        case 'facil':
            escolha = jogadaIAFacil();
            break;
        case 'medio':
            escolha = jogadaIAMedio();
            break;
        case 'dificil':
            escolha = jogadaIADificil();
            break;
        default:
            escolha = jogadaIAMedio();
    }
    
    return escolha;
}

// Função para trocar o jogador atual
function trocarJogador() {
    if (jogadorAtual === X) {
        jogadorAtual = O;
        if (!modoIA) {
            mostrarJogador.textContent = 'Jogador atual: ' + jogadorAtual.texto;
        }
    } else {
        jogadorAtual = X;
        if (!modoIA) {
            mostrarJogador.textContent = 'Jogador atual: ' + jogadorAtual.texto;
        }
    }
    debug("Jogador atual agora é: " + jogadorAtual.texto);
}

// Função para atualizar o placar na interface
function atualizarPlacar() {
    const vitoriasX = document.querySelector('.vitoriaX');
    const vitoriasO = document.querySelector('.vitoriaO');
    
    if (vitoriasX) {
        vitoriasX.innerHTML = "Jogador X: " + contadorVitoriasX;
    }
    
    if (vitoriasO) {
        vitoriasO.innerHTML = modoIA ? "IA: " + contadorVitoriasO : "Jogador O: " + contadorVitoriasO;
    }
    
    debug("Placar atualizado: X=" + contadorVitoriasX + ", O=" + contadorVitoriasO);
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
    // Verifica se o índice está dentro dos limites
    const indiceQuadrado = parseInt(proximoQuadrado[0]) - 1;
    if (indiceQuadrado < 0 || indiceQuadrado >= listaQuadradosGrande.length) {
        debug("Índice de quadrado inválido: " + indiceQuadrado);
        return [];
    }
    
    // Obtém os quadrados válidos com base no próximo quadrado
    quadradosValidos = [...listaQuadradosGrande[indiceQuadrado]];
    
    // Filtra os quadrados que já estão marcados
    numerosQuadradosMarcados = quadradosMarcados.map(numero => Number(numero));
    quadradosValidos = quadradosValidos.filter(quadrado => !numerosQuadradosMarcados.includes(quadrado));
    
    // Se não houver quadrados válidos no quadrado grande alvo, permite jogar em qualquer quadrado não marcado
    if (quadradosValidos.length === 0) {
        debug("Nenhum quadrado válido no quadrado grande " + proximoQuadrado + ", permitindo jogar em qualquer lugar");
        quadradosValidos = [];
        for (let i = 0; i < listaQuadradosGrande.length; i++) {
            quadradosValidos = quadradosValidos.concat(
                listaQuadradosGrande[i].filter(quadrado => !numerosQuadradosMarcados.includes(quadrado))
            );
        }
    }
    
    debug("Quadrados válidos: " + quadradosValidos);
    return quadradosValidos;
}

function removerQuadradosDoQuadradao(quadradaoId) {
    const quadradao = document.getElementById(quadradaoId);
    if (!quadradao) return;
    
    const quadradosDoQuadradao = quadradao.querySelectorAll('.quadradoPequeno');
    quadradosDoQuadradao.forEach(quadrado => {
        const quadradoId = parseInt(quadrado.id);
        if (!quadradosMarcados.includes(quadradoId)) {
            quadradosMarcados.push(quadradoId);
        }
    });
}

// Função para verificar se há uma sequência completa de X ou O em um quadrado pequeno
function verificarSequenciaPequeno(jogador, quadradoGrande) {
    const quadradosFilhos = quadradoGrande.children;
    const idQuadradosFilhos = Array.from(quadradosFilhos).map(elemento => parseInt(elemento.id));
    
    // Verifica se alguma das sequências possíveis está completa
    for (let i = 0; i < sequenciaQuadradoPequeno.length; i++) {
        const sequencia = sequenciaQuadradoPequeno[i];
        
        // Verifica se todos os elementos da sequência estão no quadrado grande atual
        if (idQuadradosFilhos.includes(sequencia[0]) && idQuadradosFilhos.includes(sequencia[1]) && idQuadradosFilhos.includes(sequencia[2])) {
            // Verifica se todos os elementos da sequência têm o mesmo jogador
            const elemento1 = document.getElementById(sequencia[0]);
            const elemento2 = document.getElementById(sequencia[1]);
            const elemento3 = document.getElementById(sequencia[2]);
            
            // Verifica pelo background-image em vez do textContent
            if (elemento1 && elemento2 && elemento3) {
                const img1 = elemento1.style.backgroundImage;
                const img2 = elemento2.style.backgroundImage;
                const img3 = elemento3.style.backgroundImage;
                
                // Verifica se todos têm a mesma imagem e se não está vazia
                if (img1 && img2 && img3 && 
                    img1 !== 'none' && img2 !== 'none' && img3 !== 'none') {
                    
                    // Verifica se a imagem corresponde ao jogador atual
                    if ((jogador === X && img1.includes('X.png')) || 
                        (jogador === O && img1.includes('O.png'))) {
                        
                        if (img1 === img2 && img2 === img3) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    
    return false;
}

function verificarSequenciaGrandeCompletaO() {
    // Percorre a matriz de sequência de quadrados grandes
    for (let i = 0; i < sequenciaQuadradoGrande.length; i++) {
        const sequencia = sequenciaQuadradoGrande[i];

        // Verifica se todos os quadrados na sequência têm a classe do símbolo do jogador
        const sequenciaCompleta = sequencia.every(quadradoId => {
            const quadrado = document.getElementById(quadradoId.toString());
            return quadrado && quadrado.classList.contains('vencedorO');
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
            return quadrado && quadrado.classList.contains('vencedorX');
        });

        if (sequenciaCompleta) {
            return true;
        }
    }

    return false; // Nenhuma sequência completa encontrada
}

function desabilitarQuadrados(quadradosValidos) {
    debug("Atualizando quadrados válidos na interface");
    // Primeiro, remove a classe e o evento de clique de todos os quadrados
    const cadaQuadrado = document.querySelectorAll('.quadradoPequeno');
    cadaQuadrado.forEach(quadrado => {
        quadrado.classList.remove('quadradoValido');
        quadrado.removeEventListener('click', handleQuadradoClick);
    });
    
    // Depois, adiciona a classe e o evento de clique apenas aos quadrados válidos
    quadradosValidos.forEach(quadradoId => {
        const quadrado = document.getElementById(quadradoId);
        if (quadrado) {
            quadrado.classList.add('quadradoValido');
            quadrado.addEventListener('click', handleQuadradoClick);
        }
    });
    
    // Destaca visualmente os quadrados válidos
    cadaQuadrado.forEach(quadrado => {
        if (quadrado.classList.contains('quadradoValido')) {
            // Adiciona um efeito visual para destacar os quadrados válidos
            quadrado.style.boxShadow = "0 0 5px 2px rgba(255, 255, 255, 0.7)";
        } else {
            // Remove o efeito visual dos quadrados não válidos
            quadrado.style.boxShadow = "1px 1px 0 1px";
        }
    });
}

// IA de nível fácil - escolhe aleatoriamente entre os quadrados válidos
function jogadaIAFacil() {
    const indiceAleatorio = Math.floor(Math.random() * quadradosValidos.length);
    return quadradosValidos[indiceAleatorio];
}

// IA de nível médio - mistura de estratégia e aleatoriedade
function jogadaIAMedio() {
    // 70% de chance de fazer uma jogada estratégica
    if (Math.random() < 0.7) {
        const jogadaEstrategica = encontrarJogadaEstrategica();
        if (jogadaEstrategica !== null) {
            return jogadaEstrategica;
        }
    }
    
    // Se não encontrar jogada estratégica ou cair nos 30% de aleatoriedade
    return jogadaIAFacil();
}

// IA de nível difícil - sempre tenta a melhor jogada possível
function jogadaIADificil() {
    const jogadaEstrategica = encontrarJogadaEstrategica();
    if (jogadaEstrategica !== null) {
        return jogadaEstrategica;
    }
    
    // Se não encontrar jogada estratégica, escolhe aleatoriamente
    return jogadaIAFacil();
}

// Função para encontrar uma jogada estratégica
function encontrarJogadaEstrategica() {
    // Implementação simplificada: procura por uma jogada que complete uma sequência
    
    // Verifica se pode vencer em um movimento
    for (let i = 0; i < quadradosValidos.length; i++) {
        const quadradoId = quadradosValidos[i];
        const quadradoGrande = document.getElementById(quadradoId).parentNode;
        
        // Simula a jogada
        const simulacao = simularJogada(quadradoId, jogadorIA);
        
        // Verifica se a jogada resulta em vitória
        if (simulacao.vitoria) {
            return quadradoId;
        }
    }
    
    // Verifica se precisa bloquear o oponente
    for (let i = 0; i < quadradosValidos.length; i++) {
        const quadradoId = quadradosValidos[i];
        
        // Simula a jogada do oponente
        const simulacao = simularJogada(quadradoId, jogadorHumano);
        
        // Verifica se o oponente venceria com essa jogada
        if (simulacao.vitoria) {
            return quadradoId; // Bloqueia a jogada do oponente
        }
    }
    
    // Se não encontrar jogada estratégica, retorna null
    return null;
}

// Função para simular uma jogada e verificar o resultado
function simularJogada(quadradoId, jogador) {
    const quadrado = document.getElementById(quadradoId);
    const quadradoGrande = quadrado.parentNode;
    
    // Salva o estado atual
    const estadoAtual = {
        backgroundImage: quadrado.style.backgroundImage,
        textContent: quadrado.textContent
    };
    
    // Simula a jogada
    quadrado.style.backgroundImage = `url('${jogador.img_path}')`;
    quadrado.textContent = jogador.texto;
    
    // Verifica se a jogada resulta em vitória
    const vitoria = verificarSequenciaPequeno(jogador, quadradoGrande);
    
    // Restaura o estado anterior
    quadrado.style.backgroundImage = estadoAtual.backgroundImage;
    quadrado.textContent = estadoAtual.textContent;
    
    return { vitoria };
}

// Inicializa o jogo quando a página carrega
window.onload = function() {
    comecarJogo();
};
