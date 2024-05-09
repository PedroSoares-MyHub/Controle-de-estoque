/*
    Trabalho de Programação 3 realizado pelos alunos
    Breno Henrique
    Kaique Oliveira Santos
    Pedro Soares
    Tiago Oliveira Lemos Carvalho
*/

// funcao onclick dos links da barra de navegacao
// abre a section desejada pelo usuario

document.querySelectorAll('nav a').forEach(link => {
    link.onclick = () => {
        document.querySelectorAll('section').forEach(section => section.style.display = 'none');
        const sectionExibida = link.getAttribute('section');

        if (sectionExibida === 'estoque') {
            carregarSelectProdutos();
            atualizarEstoque();
        }

        if (sectionExibida === 'categoria')
            atualizarCategorias();

        if (sectionExibida === 'produto') {
            carregarSelectCategorias();
            atualizarProdutos();
        }

        document.querySelector('section#' + sectionExibida).style.display = 'block';
    }
})

// funcoes usadas na section estoque

class ProdutoEstoque {  // definicao do tipo de dado a ser utilizado nessa secao
    constructor(idProduto) {
        this.idProduto = idProduto;
        this.quantidadeEstoque = 0;
    }
}

let estoque = [];     // lista dos produtos e suas respectivas quantidades em estoque
let produtoEstoqueSelecionado;

function buscarProdutoEstoque(idProduto) {  // busca um produto no estoque com base no id do produto
    return estoque.find(produtoEstoque => produtoEstoque.idProduto === idProduto);
}

function carregarSelectProdutos() {     // insere os produtos existentes no select da secao estoque
    const selectProdutos = document.querySelector('section#estoque select#produtos');
    produtos.forEach(produto => {
        const novaOption = document.createElement('option');
        novaOption.setAttribute('value', produto.id);
        novaOption.innerText = produto.nome
        selectProdutos.appendChild(novaOption);
    });

    selectProdutos.selectedIndex = "-1";    // nao deixa nenhum produto selecionado por padrao
}

function setInputEstoque() {            // insere os valores do produto selecionado no input
    const ls = linhaSelecionada('estoque');
    document.querySelector('section#estoque select').selectedIndex = ls.rowIndex - 1;
    document.querySelector('section#estoque input').value = produtoEstoqueSelecionado.quantidadeEstoque;
}

function atualizarEstoque() {  // recarrega a tabela com base no vetor estoque[]
    const linhas = document.querySelectorAll('table#estoque > tbody > tr'); // selecionada cada uma das linhas antigas que estao na tabela
    linhas.forEach(linha => linha.remove());                // apaga as linhas

    estoque.forEach(produtoEstoque => {                               // iteracao em cada um dos produtos do vetor estoque[]
        const corpoTabela = document.querySelector('table#estoque tbody');    // seleciona o corpo da tabela

        const novaLinha = document.createElement('tr');         // cria uma linha a ser inserida no corpo da tabela

        for (const propriedade in produtoEstoque) {                    // iteracao em cada propriedade do produto selecionado
            const novaCelula = document.createElement('td');    // criacao de uma nova celula

            if (propriedade === 'idProduto') {
                novaCelula.innerText = buscarProduto(parseInt(produtoEstoque[propriedade])).nome;
            } else {
                novaCelula.innerText = produtoEstoque[propriedade];        // insercao de cada propriedade no produto selecionado atualmente
            }
        novaLinha.appendChild(novaCelula);                  // insercao da nova celula na linha que esta sendo criada

        novaLinha.onclick = () => {                             // insere na limha a funcao onclick que faz com que, quando a linha seja selecionada quando clicada
            limparSelecao('estoque');

            novaLinha.classList.add('selecionada');
            produtoEstoqueSelecionado = estoque[novaLinha.rowIndex - 1];
            
            setInputEstoque();
        }
        corpoTabela.appendChild(novaLinha);                     // insere a linha gerada no corpo da tabela
    }
    });
}

function adicionarAoEstoque() {
    const quantidade = parseInt(document.querySelector('section#estoque input#quantidade').value);

    if (!linhaSelecionada('estoque')) {
        alert('Nenhuma categoria selecionada para editar.');
        return;
    }

    console.log(quantidade);
    if (!quantidade) {
        alert('Nenhum valor inserido.');
        return;
    }

    if (quantidade <= 0) {
        alert('Valor inserido invalido');
        return;
    }

    produtoEstoqueSelecionado.quantidadeEstoque += quantidade;
    atualizarEstoque();                                    // recarrega a tabela, exibindo o produto atualizado
    document.querySelector('section#estoque input#quantidade').value = "";
}

function editarEstoque() {
    const quantidade = parseInt(document.querySelector('section#estoque input#quantidade').value);

    if (!linhaSelecionada('estoque')) {
        alert('Nenhuma categoria selecionada para editar.');
        return;
    }

    console.log(quantidade);
    if (!quantidade) {
        alert('Nenhum valor inserido.');
        return;
    }

    if (quantidade <= 0) {
        alert('Valor inserido invalido');
        return;
    }

    produtoEstoqueSelecionado.quantidadeEstoque = quantidade;
    atualizarEstoque();                                    // recarrega a tabela, exibindo o produto atualizado
    document.querySelector('section#estoque input#quantidade').value = "";
}

function removerDoEstoque() {
    const quantidade = parseInt(document.querySelector('section#estoque input#quantidade').value);

    if (!linhaSelecionada('estoque')) {
        alert('Nenhuma produto selecionado para remover.');
        return;
    }

    console.log(quantidade);
    if (!quantidade) {
        alert('Nenhum valor inserido.');
        return;
    }

    if (quantidade <= 0) {
        alert('Valor inserido invalido');
        return;
    }

    if (produtoEstoqueSelecionado.quantidadeEstoque < quantidade) {
        alert("Ha apenas " + produtoEstoqueSelecionado.quantidadeEstoque + " produtos no estoque.");
        return;
    }

    produtoEstoqueSelecionado.quantidadeEstoque -= quantidade;
    atualizarEstoque();                                    // recarrega a tabela, exibindo o produto atualizado
    document.querySelector('section#estoque input#quantidade').value = "";
}

function venderProduto() {      // por enquanto, realiza a mesma tarefa que a funcao removerDoEstoque()
                                // futuramente, quando tiver front-end, registrara a venda de forma adequada
    const quantidade = parseInt(document.querySelector('section#estoque input#quantidade-venda').value);

    if (!linhaSelecionada('estoque')) {
        alert('Nenhum produto selecionada paro vender.');
        return;
    }

    console.log(quantidade);
    if (!quantidade) {
        alert('Nenhum valor inserido.');
        return;
    }

    if (quantidade <= 0) {
        alert('Valor inserido invalido');
        return;
    }

    if (produtoEstoqueSelecionado.quantidadeEstoque < quantidade) {
        alert("Ha apenas " + produtoEstoqueSelecionado.quantidadeEstoque + " produtos no estoque.");
        return;
    }

    produtoEstoqueSelecionado.quantidadeEstoque -= quantidade;
    atualizarEstoque();                                    // recarrega a tabela, exibindo o produto atualizado
    document.querySelector('section#estoque input#quantidade').value = "";
}


// funcoes usadas na section categoria

var proxIdCategoria = 1;

class Categoria {
    constructor(nome) {
        this.id = proxIdCategoria++;
        this.nome = nome;
    }
}

const categorias = [];
let categoriaSelecionada;

function buscarCategoria(id) {
    return categorias.find(categoria => categoria.id === id);
}

function inputCategoria() {
    return document.querySelector('section#categoria input').value;
}

function adicionarCategoria() {
    const nomeCategoria = inputCategoria();
    if (nomeCategoria != "")
        categorias.push(new Categoria(nomeCategoria));

    atualizarCategorias();
}

function atualizarCategorias() {  // recarrega a tabela com base no vetor categorias[]
    const linhas = document.querySelectorAll('section#categoria > table > tbody > tr'); // selecionada cada uma das linhas que estao na tabela
    linhas.forEach(linha => linha.remove());                // apaga as linhas

    categorias.forEach(categoria => {                               // iteracao em cada um dos produtos do vetor produtos[]
        const corpoTabela = document.querySelector('section#categoria tbody');    // seleciona o corpo da tabela
        const novaLinha = document.createElement('tr');         // cria uma linha a ser inserida no corpo da tabela

        for (const propriedade in categoria) {                    // iteracao em cada propriedade do produto selecionado
            const novaCelula = document.createElement('td');    // criacao de uma nova celula
            novaCelula.innerText = categoria[propriedade];        // insercao de cada propriedade no produto selecionado atualmente
            novaLinha.appendChild(novaCelula);                  // insercao da nova celula na linha que esta sendo criada
        }

        novaLinha.onclick = () => {                             // insere na limha a funcao onclick que faz com que, quando a linha seja selecionada quando clicada
            limparSelecao('categorias');

            novaLinha.classList.add('selecionada');
            categoriaSelecionada = buscarCategoria(categoria.id);
            
            document.querySelector('section#categoria input').value = categoria.nome;                    // preenche os inputs com os dados da linha selecionada
        }
        corpoTabela.appendChild(novaLinha);                     // insere a linha gerada no corpo da tabela
    });
}

function editarCategoria() {
    const inputNovoNome = document.querySelector('section#categoria input');

    if (!linhaSelecionada('categorias')) {
        alert('Nenhuma categoria selecionada para editar.');
        return;
    }

    if (!inputNovoNome.value) {
        alert('Nao eh possivel deixar uma categoria sem nome.');
        return;
    }

    categoriaSelecionada.nome = inputNovoNome.value;              // altera o produto selecionado
    atualizarCategorias();                                    // recarrega a tabela, exibindo o produto atualizado
    inputNovoNome.value = "";
}

function excluirCategoria() {
    if (!linhaSelecionada('categorias')) {
        alert('Nenhuma categoria selecionada para excluir.');
        return;
    }

    mensagem = "Ao excluir uma categoria, TODOS OS PRODUTOS que pertencem a essa categoria serao excluidos. Deseja continuar?";
    if (!confirm(mensagem))
        return;

    const indiceCategoria = linhaSelecionada('categorias').rowIndex - 1;
    const idCategoria = categorias[indiceCategoria].id;
    console.log(idCategoria);
    produtos = produtos.filter(produto => produto.idCategoria != idCategoria);  // exclui os produtos que pertencem a categoria excluida
    console.log(produtos);
    categorias.splice(indiceCategoria, 1);                      // remove o produto do vetor categorias[], que fica com um 'vazio' em seu lugar
    categorias.filter(n => n);                                // remove o 'lugar vazio' deixado pelo produto excluido
    limparSelecao('categorias');
    atualizarCategorias();
    limparInput('categoria');
}

// funcoes usadas na section produto

var proxIdProduto = 1;

class Produto {         // definicao da estrutura de dados, do objeto a ser utilizado
    constructor(nome, idCategoria, custo) {
        this.id = proxIdProduto++;
        this.nome = nome;
        this.idCategoria = idCategoria;
        this.custo = custo;
    }
}

var produtos = [];    // Armazena todos os produtos ja cadastrados no sistema. Funciona como um "banco de dados" provisorio (devido à falta momentanea de um back-end)
var produtoSelecionado;

function buscarProduto(id) {
    return produtos.find(produto => produto.id === id);
}

function carregarSelectCategorias() {
    const selectCategorias = document.querySelector('section#produto select#categorias');
    const options = document.querySelectorAll('section#produto select#categorias option');
    options.forEach(option => option.remove());     // limpa as options preexistentes no select

    categorias.forEach(categoria => {       // cria novas options dinamicamente e as insere no select
        const novaOption = document.createElement('option');
        novaOption.setAttribute('value', categoria.id);
        novaOption.innerText = categoria.nome
        selectCategorias.appendChild(novaOption);
    });

    selectCategorias.selectedIndex = "-1";
}

function custoValido() { 
    return !isNaN(parseFloat(document.querySelector('input#custo').value)); // verifica se os valor inserido no campo custo eh numerico
}

function setInputs(produto) {   // insere nos inputs dados extraidos de um objeto 'produto' fornecido
    document.querySelector('section#produto select#categorias').selectedIndex = produto.idCategoria - 1;
    document.querySelector('section#produto input#produto').value = produto.nome;
    document.querySelector('section#produto input#custo').value = produto.custo;
}

function atualizarProdutos() {  // recarrega a tabela com base no vetor produtos[]
    const linhas = document.querySelectorAll('table#produtos > tbody > tr'); // selecionada cada uma das linhas que estao na tabela
    linhas.forEach(linha => linha.remove());                // apaga as linhas

    produtos.forEach(produto => {                               // iteracao em cada um dos produtos do vetor produtos[]
        const corpoTabela = document.querySelector('table#produtos tbody');    // seleciona o corpo da tabela
        const novaLinha = document.createElement('tr');         // cria uma linha a ser inserida no corpo da tabela

        for (const propriedade in produto) {                    // iteracao em cada propriedade do produto selecionado
            const novaCelula = document.createElement('td');    // criacao de uma nova celula

            if (propriedade === 'idCategoria') {
                novaCelula.innerText = buscarCategoria(produto[propriedade]).nome;
            } else {
                novaCelula.innerText = produto[propriedade];        // insercao de cada propriedade no produto selecionado atualmente
            }

            if (propriedade === 'id')
                novaCelula.style.display = 'none';              // oculta a celula, nao convem exibir o id do produto ao usuario

            novaLinha.appendChild(novaCelula);                  // insercao da nova celula na linha que esta sendo criada
        }

        novaLinha.onclick = () => {                             // insere na limha a funcao onclick que faz com que, quando a linha seja selecionada quando clicada
            limparSelecao('produtos');

            novaLinha.classList.add('selecionada');
            produtoSelecionado = produto; 
            document.querySelector('section#estoque select#produtos').selectedIndex = novaLinha.rowIndex - 1;
            
            setInputs(produtoSelecionado);                      // preenche os inputs com os dados da linha selecionada
        }
        corpoTabela.appendChild(novaLinha);                     // insere a linha gerada no corpo da tabela
    });
}

function adicionarProduto() {
    limparSelecao('produtos');
    
    if (!custoValido()) {
        alert('Valor "custo" invalido.');
        return;
    }

    const novoProduto = getInput('produto');

    produtos.push(novoProduto);     // insere um novo produto no vetor produtos[] com base nos dados inseridos nos inputs
    atualizarProdutos();

    limparInput('produto');

    estoque.push(new ProdutoEstoque(novoProduto.id))
}

function editarProduto() {
    if (document.querySelector('section#produto select#categorias').selectedIndex === "-1") {
        alert('Nenhuma categoria selecionada.');
        return;
    }

    if (!linhaSelecionada('produtos')) {
        alert('Nenhum produto selecionado para editar.');
        return;
    }

    const novoNome = document.querySelector('section#produto input#produto').value;
    const novoCusto = document.querySelector('section#produto input#custo').value;

    if (!novoNome) {
        alert('Nao eh possivel deixar um produto sem nome.');
        return;
    }

    if (!novoCusto) {
        alert('Nao eh possivel deixar um produto sem custo.');
        return;
    }

    produtos[linhaSelecionada('produtos').children[0].innerText - 1] = getInput('produto');                  // altera o produto selecionado
    console.log(produtoSelecionado);
    atualizarProdutos();                                    // recarrega a tabela, exibindo o produto atualizado
    limparInput('produto');

}

function excluirProduto() {
    if (!linhaSelecionada('produtos')) {
        alert('Nenhum produto selecionado para excluir.');
        return;
    }

    const indiceProduto = linhaSelecionada('produtos').rowIndex - 1;
    estoque.filter(produtoEstoque => produtoEstoque.idProduto != produtoSelecionado.id);    // exclui o produto do estoque
    produtos.splice(indiceProduto, 1);                      // remove o produto do vetor produtos[], que fica com um 'vazio' em seu lugar
    produtos.filter(n => n);                                // remove o 'lugar vazio' deixado pelo produto excluido
    limparSelecao('produtos');
    atualizarProdutos();
    limparInput('produto');
}


// funcoes usadas em todas as sections

function getInput(section) {
    if (section === 'categoria')
        return document.querySelector('section#categoria input').value;

    if (section === 'produto') {
        const nome = document.querySelector('input#produto').value;
        const idCategoria = categorias[document.querySelector('section#produto select#categorias').selectedIndex].id;
        const custo = document.querySelector('input#custo').value;
    
        return new Produto(nome, idCategoria, custo);
    }
}

function limparInput(section) {
    if (section === 'categoria')
        document.querySelector('section#categoria input').value = "";

    if (section === 'produto') {
        document.querySelectorAll('section#produto input').forEach(input => input.value = "");
        document.querySelector('section#produto select#categorias').selectedIndex = "-1";
    }
}

function linhaSelecionada(tabela) {   // retorna a linha selecionada atualmente na tabela
    return document.querySelector('table#' + tabela +' tr.selecionada');
}

function limparSelecao(tabela) {  // faz com que nenhuma linha da tabela esteja selecionada
    document.querySelectorAll('table#' + tabela + ' tbody > tr').forEach(linha => linha.classList.remove('selecionada'));

    if (tabela == 'categoria')
        categoria = undefined;

    if (tabela == 'produtos')
        produtoSelecionado = undefined;
}