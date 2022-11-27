
const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const telefono = document.getElementById("telefono")
const mensaje = document.getElementById("mensaje")
const boton = document.getElementById("BotonDatos")
let inputs = document.getElementsByClassName ("Formulario_Input")



boton.addEventListener("click",Validar);


function Validar() {
    if (nombre === "" || correo === "" || telefono === "" || mensaje === "" ) {
      alert("Todos los campos son obligatorios");
      return false; 
  }}