
//La recuperation des elements
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const pass1 = document.querySelector('#pass1');
const pass2 = document.querySelector('#pass2');

//evenements
form.addEventListener('submit',e=>{
    //Empêcher le traitement ce faire pour verifier les contraintes
    e.preventDefault();

    form_verify();
})

//Fonction
function form_verify(){
    //Obtenu toute les valeur des inputs en coupants les espaces a gauches et a droite
    const userValue = username.value.trim();
    const emailValue = email.value.trim();
    const pass1Value = pass1.value.trim();
    const pass2Value = pass2.value.trim();

    //Verification du nom d'utilisateur
    if(userValue === ""){
        let message = "username ne peut pas être vide";
        setError(username,message);
    }else if(!userValue.match(/^[a-zA-Z]/)){
        let message = "username doit commencer par une lettre";
        setError(username,message)
    }else{
        let letterNum = userValue.length;
        if(letterNum < 3){
            let message = "username doit avoir au moins 3 caractères";
            setError(username,message);
        } else {
            setSuccess(username);
        }
    }

    //email verfication
    if(emailValue === ""){
        let message = "email ne peut pas être vide";
        setError(email,message);
    }else if(!email_verify(emailValue)){
        let message = "Email non valide";
        setError(email,message);
    }else{
        setSuccess(email);
    }

    //Verification des password1
    if(pass1Value === ""){
        let message = "mot de passe ne peut pas être vide";
        setError(pass1,message); 
    }else if(!password_verify(pass1Value)){
        let message = "Le mot de passe est trop faible (8 à 12 caractès)";
        setError(pass1,message);
    }else{
        setSuccess(pass1); 
    }

    //Verification des password2
    if(pass2Value === ""){
        let message = "mot de passe confirm ne peut pas être vide";
        setError(pass2,message); 
    }else if(pass1Value !== pass2Value){
        let message = "Les mots de passe ne correspondent pas !!!";
        setError(pass2,message); 
    }else{
        setSuccess(pass2)
    }




}



function setError(elem,message){
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');

    //Ajout du message d'erreur
    small.innerText = message

    //Ajout de la classe error
    formControl.className = "form-control error";
}

//Fonction appeler lorsque le champ est valide
function setSuccess(elem){
    const formControl = elem.parentElement;
    formControl.className = "form-control success";
}


//Function pour verifier l'adresse email
function email_verify(email){
    /* Expresdsion pour verifier l'adresse email
    * mary_traore.22-t@gmail.com
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    */
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

//Function pour verifier le mot de passe
function password_verify(pass1){
    return /^(?=.*[0-9])(?=.*[!.@#$%^&*])[a-zA-Z0-9!.@#$%^&*]{8,12}$/.test(pass1);
}






/*------------------------------Expresion js2--------------------------*/

// let myForm = document.getElementById('myForm');

// myForm.addEventListener('submit', function(e){
    
//     let myInput = document.getElementById('user');
//     let myRegex = /^[a-zA-Z-\s]+$/;

//     if(myInput.value.trim() == ""){
//         let myError = document.getElementById('error');
//         myError.innerHTML = "Le champs username est requis";
//         myError.style.color = 'red';
//         e.preventDefault();
//     }else if(myRegex.test(myInput.value == false)){
//         let myError = document.getElementById('error');
//         myError.innerHTML = "Le nom doit comporter des lettres, des tirets uniquement";
//         myError.style.color = 'red';
//         e.preventDefault();
//     }
// });
