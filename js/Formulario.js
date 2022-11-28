const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const telefono = document.getElementById("telefono")
const mensaje = document.getElementById("mensaje")
const boton = document.getElementById("BotonDatos")
let inputs = document.getElementsByClassName ("Formulario_Input")

for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener ( "keyup", function () {
if (this.value.length>=1) {
    this.nextElementSibling.classList.add("Fijar");
} else {
    this.nextElementSibling.classList.remove("Fijar");
}
    });
    
}
let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;



function validar() {
if (nombre.value === "" || correo.value === "" || telefono.value === "" || mensaje.value === "") {
  Swal.fire ("Es necesario completar todos los campos")
  return false;

  }
  else if (isNaN(telefono.value)) {
    Swal.fire("El teléfono ingresado no es un número")
    return false;
  } 
  else if (expReg.test(correo.value)) {
    Swal.fire("El mail no es correcto")
    return false;
  } else {
    return true;
  }
}
  



boton.onclick = () => {
    let formulario = document.getElementById("Form");
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      if (validar()) {
        const Usuario = {
          Nombre: nombre.value,
          Correo: correo.value,
          Telefono: telefono.value,
          Mensaje: mensaje.value
        }
        Swal.fire({
          title: "Bienvenido",
          text: "¿Desea enviar este mensaje?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Enviar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Su menjase ha sido enviado.',
            ) 
          } else {
              Swal.fire(
                  'Su mensaje no ha sido enviado.',
                )  
          }
        })
        localStorage.setItem("InfoUsuario", JSON.stringify(Usuario))
        formulario.reset();
      }}
    )}

