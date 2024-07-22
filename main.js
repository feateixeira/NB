var valores = [];
let results = {};

function principal() {
    //pega os valores dos inputs de nome e endereço
    let name = document.getElementById('name').value;
    let value = document.getElementById('value').value;

    //pega o valor do radio
    let nb = document.querySelector('input[name=nb]:checked').value;
    addToResults(nb);

    //pega o valor do select
    let selectedDrinks = valores.map(item => item.label);

    //pega os valores do checkbox(BATATA)
    let potato = document.getElementsByName('potato')
    let potatoSelecionados=[]
    for(var i=0;i<potato.length;i++){
        if(potato[i].checked){
            potatoSelecionados.push(potato[i].value);
            addToResults(potato[i].value);
        } 
    }

    //pega o valor do input de pagamento
    let pay = document.getElementById('payment');
    let valuePay = pay.options[pay.selectedIndex].value;

    //pega o valor do textarea description
    let descrition = document.getElementById("text_area").value;
    
    //pega os valores do checkbox(MOLHOS)
    let molhos = document.getElementsByName("molho")
    let molhoSelecionados=[]
    for(var i=0;i<molhos.length;i++){
        if(molhos[i].checked){
            molhoSelecionados.push(molhos[i].value);
            addToResults(molhos[i].value);
        }
    }


        let addPedido = "<tr><td>" +"- " + nb + " " + molhoSelecionados + " " + "</td></tr>";
        let addPt = "<tr><td>" + potatoSelecionados+ " " + "</td></tr>";
        let addObs = "<tr><td>" + descrition + "</td></tr>";
        let addDrink = "<tr><td>" + selectedDrinks.join(", ") + "</td></tr>";
        
        let tb_up = document.getElementById('table_up');
        document.getElementById('table_up').innerHTML += name;
        tb_up.classList.add('line');

        document.getElementById('table').innerHTML += addPedido + addObs + addPt + addDrink;
        
        let tb = document.getElementById('table_value');
        if(value == "") {
            document.getElementById('table_value').innerHTML +=""
        } else {
            document.getElementById('table_value').innerHTML += "Total: " + parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2}) + " " + valuePay;
        }
        tb.classList.add('line_down')
    
    updateTable();
};

//funcao que limpa os campos para o proximo pedido
function eraseText() {
    document.getElementById('name').value= "";
    document.getElementById('text_area').value= "";
    document.getElementById('payment').value = "";
    document.getElementById('value').value = "";
    

//desmarca o input type radio
    let nb = document.getElementsByName('nb');
    for(var i=0;i<nb.length;i++)
        nb[i].checked = false;

//desmarca o input type checkbox
    let molho = document.getElementsByName('molho');
    for(var i=0;i<molho.length;i++)
        molho[i].checked = false;

    let pt = document.getElementsByName('potato');
    for(var i=0;i<pt.length;i++)
        pt[i].checked = false;

};

//funcao que limpa a tabela apos a impressao
function clearTable(){
    let table_up = document.getElementById('table_up')
    table_up.innerHTML = '';
    let table = document.getElementById('table')
    table.innerHTML = '';
    let table2 = document.getElementById('table_value')
    table2.innerHTML = '';
}

function dataAtual() {
    return getDate() + "/" + getMonth() + "/" + getFullYear()() + "/" + getHours() + "/" + getMinutes()();
};

//criacao do menu hamburguer
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
function collectValues() {
    let nb = document.querySelector('input[name=nb]:checked').value;
    addToResults(nb);

let potato = document.getElementsByName('potato');
for (var i = 0; i < potato.length; i++) {
    if (potato[i].checked) {
        addToResults(potato[i].value);
    }
}

let molhos = document.getElementsByName("molho");
for (var i = 0; i < molhos.length; i++) {
    if (molhos[i].checked) {
        addToResults(molhos[i].value);
    }
}

    updateTable();
}

function addToResults(item) {
    if (results[item]) {
        results[item]++;
    } else {
        results[item] = 1;
    }
}

function updateTable() {
    let tbody = document.querySelector("#resultsTable tbody");
    tbody.innerHTML = "";

    for (let item in results) {
        let row = document.createElement("tr");

        let itemCell = document.createElement("td");
        itemCell.textContent = item;

        let quantityCell = document.createElement("td");
        quantityCell.textContent = results[item] + "x";

        row.appendChild(itemCell);
        row.appendChild(quantityCell);

        tbody.appendChild(row);
    }
}

function downloadXML() {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<items>\n';
    for (let item in results) {
        xmlContent += `  <item>\n    <name>${item}</name>\n    <quantity>${results[item]}</quantity>\n  </item>\n`;
    }
    xmlContent += '</items>';

    let blob = new Blob([xmlContent], { type: 'application/xml' });
    let url = URL.createObjectURL(blob);

    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    let filename = `Nabrasa_${year}-${month}-${day}_${hours}-${minutes}.xml`;

    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}