const button = document.getElementById('perfilar');
const firstname = document.getElementById('nome');
const def = document.getElementById('deficiencia');
const age = document.getElementById('idade');
const child = document.getElementById('crianca')

function setCache(fila)
{
    localStorage.setItem('fila', JSON.stringify(fila));
}

function getCache()
{
    return JSON.parse(localStorage.getItem('fila'));
}

function gerenciarListas()
{
    const idade = Number(age.value.trim());
    const crianca = child.value.trim();
    const nome = firstname.value.trim();
    const debil = def.checked;
    if (idade === 0 || idade < 16)
    {
        const erro = document.getElementById('erro')
        erro.textContent = `
        Idade ${idade} inferior para perfilar. Por favor solicite
        para ser acompanhado por um responsável maior de idade!`;
        setTimeout(() => {
            document.getElementById('erro').textContent = '';
        }, 8000)
        return ;
    }
    if (idade >= 50 || (idade <= 50 && crianca))
        Filaprioridade(nome, idade, crianca);
    else if (idade >= 16 && idade <= 50)
        Filanormal(idade, nome)
    else if (idade >= 16 && debil)
        Filadebil(idade, nome, debil)
    render();
}

function Filaprioridade(idade, nome, crianca)
{
    const fila = {"idade": idade, "nome":nome, "crianca": crianca}
    setCache(fila);

}

function Filanormal(idade, nome)
{
    const fila = {"idade": idade, "nome": nome};
    setCache(fila);
}

function Filadebil(idade, nome, debil)
{
    const fila = {"idade": idade, "nome": nome, "debil": debil}
    setCache(fila);
}

function render()
{
    const file = getCache();
}

button.addEventListener('click', gerenciarListas);

