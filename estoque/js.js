const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
});

let openModalButton = document.querySelector("#open-modal");
let closeModalButton = document.querySelector("#close-modal");
let modal = document.querySelector("#modal");
let fade = document.querySelector("#fade");
        
const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
    };
          
    [openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
    });
        
//-----------------------------------------------------------------------------------------------------------
// Function to validate product input fields
function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value.trim();
    let codigo = document.getElementById(idCodProduto).value.trim();
    let qtidade = parseInt(document.getElementById(idQtidadeProduto).value.trim());

    if (!nome) {
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    } else if (!codigo) {
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    } else if (isNaN(qtidade) || qtidade <= 0) {
        alert("Quantidade do produto deve ser um número maior que zero.");
    } else {
        cadastrarProduto(nome, codigo, qtidade);
    }
}

function cadastrarProduto(produto, codig, qtidade) {
    let novoProduto = {nome: produto, codigo: codig, quantidade: qtidade};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // No products registered yet
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Add new product
        localStorage.setItem("produtos", JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso " + qtidade + " unidades do produto " + produto + "!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

function atualizarTotalEstoque(idCampo) {
    const campo = document.getElementById(idCampo);
    
    let totalEstoque = parseInt(campo.innerHTML);
    if (isNaN(totalEstoque)) totalEstoque = 0;
    
    totalEstoque++;
    
    campo.innerHTML = totalEstoque;
    localStorage.setItem("totalEstoque", totalEstoque);
}

function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque === null) totalEstoque = 0; // Se não houver valor, inicializar como 0
        document.getElementById(idCampo).innerHTML = totalEstoque;
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        let tabelaBody = document.querySelector("#tabelaEstoque tbody");

        if (produtos == null) {
            let row = tabelaBody.insertRow();
            let cell = row.insertCell(0);
            cell.colSpan = 4; // Adjusted for Edit button
            cell.textContent = "Ainda não há nenhum item no estoque";
        } else {
            produtos = JSON.parse(produtos);
            produtos.forEach((produto, index) => {
                let row = tabelaBody.insertRow();
                let cellNome = row.insertCell(0);
                let cellCodigo = row.insertCell(1);
                let cellQuantidade = row.insertCell(2);
                let cellAcoes = row.insertCell(3);

                cellNome.textContent = produto.nome;
                cellCodigo.textContent = produto.codigo;
                cellQuantidade.textContent = produto.quantidade;

                let editButton = document.createElement('button');
                editButton.textContent = "Editar";
                editButton.className = "btn btn-edit";
                editButton.onclick = () => editarProduto(index);
                cellAcoes.appendChild(editButton);

                let deleteButton = document.createElement('button');
                deleteButton.textContent = "Excluir";
                deleteButton.className = "btn btn-delete";
                deleteButton.onclick = () => excluirProduto(index);
                cellAcoes.appendChild(deleteButton);
            });
        }
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
    }
}

function editarProduto(index) {
    let produtos = JSON.parse(localStorage.getItem("produtos"));
    let produto = produtos[index];

    let novoNome = prompt("Editar nome do produto:", produto.nome);
    let novoCodigo = prompt("Editar código do produto:", produto.codigo);
    let novaQuantidade = parseInt(prompt("Editar quantidade do produto:", produto.quantidade));

    if (novoNome && novoCodigo && !isNaN(novaQuantidade) && novaQuantidade > 0) {
        produtos[index] = {nome: novoNome, codigo: novoCodigo, quantidade: novaQuantidade};
        localStorage.setItem("produtos", JSON.stringify(produtos));
        alert("Produto atualizado com sucesso!");
        location.reload();
    } else {
        alert("Dados inválidos. A edição foi cancelada.");
    }
}

function excluirProduto(index) {
    let produtos = JSON.parse(localStorage.getItem("produtos"));

    if (confirm("Tem certeza que deseja excluir este produto?")) {
        produtos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        alert("Produto excluído com sucesso!");
        location.reload();
    }
}

window.onload = function() {
    carregarTotalEstoque("totalEstoque");
    listarEstoque(); // Presumindo que você também chama a função listarEstoque
};
