let inputs = document.getElementsByClassName ("Formulario_Input");
for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener ( "keyup", function () {
if (this.value.length>=1) {
    this.nextElementSibling.classList.add("Fijar");
} else {
    this.nextElementSibling.classList.remove("Fijar");
}
    });
    
}