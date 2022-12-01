const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const BotomCompra = document.getElementById("BotomCompra")
const fragment = document.createDocumentFragment()
let Carrito = {}




document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        Carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});

cards.addEventListener("click", e => {
    addCarrito(e) 
   
});

items.addEventListener("click", e => {
    btnAccion(e)
})





const fetchData = async () => {
    try {
        const res = await fetch ("../api.json")
        const data = await res. json()
        pintarCards (data)
       // console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector("h5").textContent = producto.title
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src",producto.thumbnailUrl)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}

const addCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains("btn-dark"))
    if (e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1000
    })
} 


const setCarrito = objeto => {
const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    title: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1
}
if (Carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = Carrito[producto.id].cantidad + 1
}
Carrito[producto.id] = { ...producto }
pintarCarrito()

}
const pintarCarrito = () => {
    items.innerHTML = ''
     Object.values(Carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td")[0].textContent = producto.title
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent = producto.precio * producto.cantidad
        const clone = templateCarrito.cloneNode (true)
        fragment.appendChild(clone)
 })
    items.appendChild(fragment)

    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(Carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(Carrito).length === 0) {
        footer.innerHTML = ' <th scope="row" colspan="5">No ha seleccionado ningun servicio</th>'
        return

    }
    const nCantidad = Object.values(Carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(Carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)

    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        Carrito = {}
        pintarCarrito ()
    })
    const BotonFinalizar = document.getElementById("finalizar")
    BotonFinalizar.addEventListener("click", checkout)
    const Cancelar = document.getElementById("Cancelar")
    Cancelar.addEventListener("click",() => {
        Carrito = {}
        pintarCarrito ()
    })

}

const btnAccion = e => {
if (e.target.classList.contains('btn-info')) {
    const producto = Carrito[e.target.dataset.id]
    producto.cantidad++
    Carrito[e.target.dataset.id] = { ...producto }
    pintarCarrito()
}
if (e.target.classList.contains('btn-danger')) {
    const producto = Carrito[e.target.dataset.id]
    producto.cantidad--
    if (producto.cantidad === 0) {
        delete Carrito[e.target.dataset.id]
    } else {
        Carrito[e.target.dataset.id] = {...producto}
    }
    pintarCarrito()
e.stopPropagation()
}
}

function checkout() {
    
    const modalBody = document.getElementById('checkout')

    let total = Object.values(Carrito).reduce((acc,el)=> acc + (parseInt(el.precio) * el.cantidad),0)
  
    let div = document.createElement('div')
    div.innerHTML= ` <h2>El total de su compra es de $${total}</h2>`
    modalBody.appendChild(div)
    const FinalizarOp= document.getElementById("Finalizar_Operacion")
    FinalizarOp.addEventListener("click", () => {
        div.innerHTML="" 
    }
    );
    
 };
