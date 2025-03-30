//Sempre bom criar a lista no começo do projeto
let listaSecreta = [];
let numeroLimite = 15;
let numeroSecreto = gerarAleatorio();
let tentativas = 1;
textoInicial();
limparCampo();

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function textoInicial(){
    exibirTexto('h1','Jogo do Número Secreto');
    exibirTexto('p','Escolha entre um número entre 1 e ' + numeroLimite);
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgtentativa = `Parabéns, você acertou o número secreto ${numeroSecreto}, com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('h1','Acertou!');
        exibirTexto('p', msgtentativa); 

        document.getElementById('reiniciar').removeAttribute('disabled');
        
    } else{
        if(chute > numeroSecreto){
            exibirTexto('p',`Errou, o número secreto é menor. Tentativa número ${tentativas}.`); 

        }else{
            exibirTexto('p',`Errou, o número secreto é maior. Tentativa número ${tentativas}.`); 

        }
        
        tentativas++;
        limparCampo();
    }
}

function gerarAleatorio(){
    let verificarLista = parseInt(Math.random() * numeroLimite +1);
   // let qtdeElementosLista = listaSecreta.length;

    if (listaSecreta.length == numeroLimite){
        listaSecreta = [];
    }

    if (listaSecreta.includes(verificarLista)){
        return gerarAleatorio();
    } else {
        listaSecreta.push(verificarLista);
        console.log(listaSecreta);
        return verificarLista
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarAleatorio();
    tentativas = 1;
    textoInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}