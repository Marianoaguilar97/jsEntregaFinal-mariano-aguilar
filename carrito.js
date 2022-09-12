//selec de elem

const productosEl = document.querySelector(".productos");
const carritoEl = document.querySelector(".productosCarrito");
const carritoTotal = document.querySelector(".total");

//rederizado productos
const viajes = []
function renderProductos () {
    viajes.forEach( (viaje) => {
        productosEl.innerHTML += ` 
        <div class="seccionEncuadrado--mediano">
        <div class="seccion--encuadradoImagen" title="Caribe"><img src="${viaje.imgSrc}" alt="caribe" class="imgEncuadrado"></div>
        <h2>${viaje.nombre}</h2>
        <p>${viaje.fecha}</p>
        <p>${viaje.descripcion}
        </p>
        <h3>precio: $${viaje.precio}</h3>
        <h4 onclick="AgregarCarrito(${viaje.id})" >Sumar al carrito</h4>
    </div>
    `;
    });
}

//array carrito
let carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];
actualizarCarrito();

//agregar al carro
function AgregarCarrito (id) {
    //validacion si ya existe item en carrito
    if(carrito.some( (item) => item.id === id)) {
        cambiarCantidadUnidades("plus", id);
        Toastify({
  
          text: "Se agrego al carrito con éxito",
          
          duration: 3000
          
          }).showToast();

    }
    else {
        const item = viajes.find( (viaje) => viaje.id === id );
    carrito.push({
        ...item,
        numeroDeUnidades: 1,
    });
    actualizarCarrito();
    }
}

//funcion de actualizar carrito
function actualizarCarrito(){
    renderItemsCarrito();
    renderTotal()
    //guardado carrito
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
}
// calcular y renderizar total
function renderTotal() {
    let precioTotal = 0, 
    itemsTotal = 0;

    carrito.forEach( (item) => {
        precioTotal += item.precio * item.numeroDeUnidades
        itemsTotal += item.numeroDeUnidades;
    });

    carritoTotal.innerHTML = `
    <h3>Precio Total: $${precioTotal} (Items:${itemsTotal} )</h4>
    `
}

//renderizado item carrito
function renderItemsCarrito(){
    carritoEl.innerHTML = ""; //vaciado de EL carrito
    carrito.forEach( (item) => {
        carritoEl.innerHTML += `
        <hr class="my-4">
      
                          <div class="row mb-4 d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                              <img src="${item.imgSrc}" class="img-fluid rounded-3" alt="${item.nombre}">
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                              <h6 class="text-muted">Viaje</h6>
                              <h6 class="text-black mb-0">${item.nombre}</h6>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3 d-flex">
                              <button class="btn btn-link px-2" onclick="cambiarCantidadUnidades('minus', ${item.id})">
                                <i class="fas fa-minus"></i>
                              </button>
      
                              <div style=" margin: 10px 5px;">${item.numeroDeUnidades}</div>
      
                              <button class="btn btn-link px-2" onclick="cambiarCantidadUnidades('plus', ${item.id})" >
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 class="mb-0">Precio unitario:\n $${item.precio}</h6>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end" >
                              <a href="#!" class="text-muted" onclick= "removerItemsCarrito(${item.id})"><i class="fas fa-times"></i></a>
                            </div>
                          </div>
                          `
    })
}

// remover items del carrito
function removerItemsCarrito(id) {
    carrito = carrito.filter( (item) => item.id !== id);
    actualizarCarrito();
    Toastify({
  
      text: "Se removio el producto de el carrito con éxito",
      
      duration: 3000
      
      }).showToast();
}

// funcion cambiar numero de unidades
function cambiarCantidadUnidades(accion, id){
    carrito = carrito.map( (item) => {
        let numeroDeUnidades = item.numeroDeUnidades;
        if (item.id === id){
            if (accion === "minus" && numeroDeUnidades > 1) {
                numeroDeUnidades--;
            } else if (accion === "plus" && numeroDeUnidades < item.lugares) {
                numeroDeUnidades++;
             }
        }
        return {
          ...item,
          numeroDeUnidades,
        };
    })
    actualizarCarrito()
}

// Vaciado carrito

const botonVaciado = document.querySelector(".boton--vaciado")

function vaciadoCarrito (){
  carrito= []
  carritoEl.innerHTML = "";
  Toastify({
  
    text: "Se vacio su carrito con exito",
    
    duration: 3000
    
    }).showToast();
}
 
botonVaciado.addEventListener("click", vaciadoCarrito)

// Alertas

const alertaCompra = () => {
  Toastify({
  
    text: "Su compra fue realizada con éxito, en la brevedad sera contactado",
    
    duration: 3000
    
    }).showToast();
}

const botonCompra = document.querySelector(".boton--compra")
botonCompra.addEventListener("click", alertaCompra)

//fetch de datos

fetch("data.Json")
.then((Response) => Response.json())
.then((data) => 
{
     for( const viaje of data){
      viajes.push(viaje)
     }
     renderProductos(viajes)
      
})

