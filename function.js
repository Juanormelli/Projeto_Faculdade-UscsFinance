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