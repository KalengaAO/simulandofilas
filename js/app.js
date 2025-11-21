const form = document.getElementById('formPessoa')
const fnormal = []
const fprioridade = []
const falta = []
const contador = 0;

function setCache(fila) {
    localStorage.setItem('filas', JSON.stringify(fila));
}

function getCache() {
    return JSON.parse(localStorage.getItem('filas'));
}

function addPessoas(nome, idade, debil, crianca) {
    return {
        nome,
        idade,
        debil,
        crianca,
        "hora": new Date().toLocaleTimeString()
    };
}

function classificarPessoa(pessoa) {
    const filas = getCache() || { fnormal: [], fprioridade: [], falta: [] };

    if (pessoa.debil)
        if (filas.fnormal.length >= 2)
            filas.falta.push(pessoa);
        else
            filas.fnormal.push(pessoa);
    else if (pessoa.idade >= 50 || pessoa.crianca)
        if (filas.fnormal.length >= 3)
            filas.fprioridade.push(pessoa)
        else
            filas.fnormal.push(pessoa);
    else
        filas.fnormal.push(pessoa);
    setCache(filas);
}

function inserirPessoas(event) {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const idade = Number(form.idade.value);
    const debil = form.deficiencia.checked;
    const crianca = form.crianca.checked;
    if (idade < 16) {
        alert(`Idade ${idade} inferior!`);
        return;
    }
    const pessoa = addPessoas(nome, idade, debil, crianca);
    classificarPessoa(pessoa);
    form.nome.value = ''
    form.idade.value = ''
    render();
}

function criarCardPessoa(pessoa, posicao, tipo) {
    const div = document.createElement('div');
    div.className = `pessoa ${tipo}`;
    div.innerHTML = `
        <p><strong>${posicao}.</strong> (${pessoa.nome} 
        - ${pessoa.idade} anos) Hora de entrada: ${pessoa.hora}</p>
    `;

    div.addEventListener('mouseenter', () => {
        div.classList.add('posicaoReal');
        div.setAttribute('title', `Na fila normal: posição ${posicao}`);
    });
    div.addEventListener('mouseleave', () => {
        div.classList.remove('posicaoReal');
        div.removeAttribute('title');
    });
    return div;
}

function calcularPosicaoReal(tipo, index) {
    if (tipo === 'prioridade') {
        return (index + 1) * 3 + 1;
    }
    if (tipo === 'alta') {
        return (index + 1) * 2 + 1;
    }
    return index + 1;
}

function render() {
    const filas = getCache()
    if (!filas)
        return;
    const normalDiv = document.getElementById('filaNormal');
    const prioridadeDiv = document.getElementById('filaPrioridade');
    const altaDiv = document.getElementById('filaAlta');

    normalDiv.innerHTML = '';
    prioridadeDiv.innerHTML = '';
    altaDiv.innerHTML = '';

    filas.fnormal.forEach((pessoa, index) => {
        const el = criarCardPessoa(pessoa, index + 1, 'normal');
        normalDiv.appendChild(el);
    });

filas.fprioridade.forEach((pessoa, index) => {
    const posicaoReal = calcularPosicaoReal('prioridade', index);
    const el = criarCardPessoa(pessoa, posicaoReal, 'prioridade');
    prioridadeDiv.appendChild(el);
});

filas.falta.forEach((pessoa, index) => {
    const posicaoReal = calcularPosicaoReal('alta', index);
    const el = criarCardPessoa(pessoa, posicaoReal, 'alta');
    altaDiv.appendChild(el);
});
}

render(getCache())

form.addEventListener('submit', inserirPessoas);
