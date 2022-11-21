const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const telefono = document.getElementById("teléfono")
const mensaje = document.getElementById("mensaje")
const boton = document.getElementById("BotonDatos")


boton.onclick = () => {
    const Usuario = {
        Nombre: nombre.value,
        Correo: correo.value,
        Telefono: telefono.value,
        Mensaje: mensaje.value
    }
    Swal.fire({
        title: "Bienvenido",
        text: "Hola $(nombre.value). ¿Desea enviar este mensaje?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Su menjase no ha sido enviado.',
        
          )
        }
      })
     localStorage.setItem("InfoUsuario", JSON.stringify(Usuario))
}








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


