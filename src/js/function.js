function openModal(modalName){
    let modal = document.getElementById(modalName);

    if(modalName == 'undefined' || modalName === null){
        return
    }
    modal.style.display = "flex";

}

function closeModal(modalName){
    
    let modal = document.getElementById(modalName);
    
    if(modalName == 'undefined' || modalName === null){
        return
    }
    document.getElementById("modal-new").innerHTML = "";

    modal.style.display = "none";
}

function makeButtonActiveOut(btn, btnoff){
    let btnOn = document.getElementById(btn);
    let btnOff = document.getElementById(btnoff)

    if(btn === 'saida'){
        btnOn.style.backgroundColor="rgba(204, 51, 51, 0.1)" ;
        btnOff.style.backgroundColor='';
    }
    
    
}
function makeButtonActiveIn(btn, btnoff){
    let btnOff = document.getElementById(btnoff);
    let btnOn = document.getElementById(btn)

    if(btn){
        btnOn.style.backgroundColor="rgb(51, 204, 149, .1)" ;
        btnOff.style.backgroundColor='';
    }    
}


async function getTransactions(){
    const transactions =await fetch("http://localhost:3336/transaction",{method: 'GET'}).then(resp=>{return resp.json()})
    console.log(transactions)
    return transactions
}




async function show() {
    const data = await getTransactions()
    let tab = 
        `<thead>
        <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th> Actions</th>
            

        </tr>
    </thead>`;
    
    
    for (let r of data) {
        tab += `<tr> 
    <td>${r.title} </td>
    <td class="${r.transactionType}">R$ ${r.value.toFixed(2)}</td>
    <td>${r.description}</td> 
    <td><button class="btn-delete" onclick="deleteTransaction('${r._id}')">D</button> <button class="btn-att" onclick="updateTransactionModalSet('${r._id}')">U</button></td>            
    </tr>`;
    }
   
    document.getElementById("transactions-table").innerHTML = tab;
}


async function deleteTransaction(_id){
    console.log(_id)
    if (confirm("Realmente deseja excluir o registro?")) {
        const delTransaction =await fetch(`http://localhost:3336/transaction/deletetransaction/${_id}`,{method: 'DELETE'} ).then(resp=>{return resp.json()})
        location.reload()
        return delTransaction
      } else {
        
      }
    
}


function registerNewTransaction(){
    const title = document.getElementById("transaction-title").value;
    const value = document.getElementById("transaction-value").value
    const type = document.querySelector('input[name="Option"]:checked').value;
    const description = document.getElementById("transaction-description").value
    const date = new Date()

    

    const input = {
        title: title,
        value: value,
        typeOfTransaction: type,
        description: description,
        date: date


    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    }
    const register = fetch("http://localhost:3336/transaction/createtransaction",requestOptions).then(response=>{return response.json()})

    location.reload()

    return register

}


async function calculateTransactions(){
    const data = await getTransactions()

    let deposit = 0
    let withdraw = 0
    for (let r of data){
        if (r.transactionType === 'deposit'){
            deposit= deposit+ r.value;
        }
        if (r.transactionType === 'withdraw'){
            withdraw+=r.value;
        }
    }
 


    document.getElementById("summary-deposit").innerHTML=`R$ ${deposit.toFixed(2)}`
    document.getElementById("summary-withdraw").innerHTML=`R$ ${withdraw.toFixed(2)}` 
    document.getElementById("summary-geral").innerHTML=`R$ ${(deposit - withdraw).toFixed(2)}`
    
    



}


async function updateTransactionModalSet(id){
    document.getElementById("modal-new").innerHTML = "<div><div/>";

    const data = await getTransactions()
    const date = new Date()
    let input = {
        title:"" ,
        value: "",
        typeOfTransaction: "",
        description: "",
        date: date



    }

    for (let r of data ){
        if (r._id ===id){
            input.title = r.title
            input.value = r.value
            input.typeOfTransaction = r.typeOfTransaction
            input.description=r.description
            
        }
    }


    const modal =`<div id="modal-update" class="modal">
    <div class="modal-content">
    <button
    type="button"
    class="close"
    onclick="closeModal('modal-update')"
    >
    <img src="./public/close.png" class="img-close" alt="Close" />
  </button>
    

        <h2>Cadastrar Transação</h2>
        <input id="transaction-title-update" class="modal-input" placeholder="Titulo" required value="${input.title}"/>
        <input id="transaction-value-update" type="number" class="modal-input" required placeholder="valor" value="${input.value}"/>
       
        <input id="transaction-type" type="radio" name="Option" value="deposit" required /> Entrada
        <input id="transaction-type" type="radio"  name="Option" value="withdraw" required/> Saida 
                             
        <input id="transaction-description-update" class="modal-input" placeholder="Descrição" required value="${input.description}"/>
        <button type="submit" onclick="updateTransaction('${id}')">Cadastrar</button>
    
</div>
</div>`;


document.getElementById("modal-new").innerHTML = modal;



openModal("modal-update")






}


async function updateTransaction(id){
    console.log(id)

    const title = document.getElementById("transaction-title-update").value;
    const value = document.getElementById("transaction-value-update").value
    const type = document.querySelector('input[name="Option"]:checked').value;
    const description = document.getElementById("transaction-description-update").value
    const date = new Date()

    

    const input = {
        title: title,
        value: value,
        typeOfTransaction: type,
        description: description,
        date: date


    }

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    }
    const update = fetch(`http://localhost:3336/transaction/updatetransaction/${id}`,requestOptions).then(response=>{return response.json()})

    location.reload()

    return update


}


