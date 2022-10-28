//Tercera Pre Entrega

const carrito = [];
let totalCarrito;
let contenedor = document.getElementById("misprods");

let listaRemerasShowed = listaRemeras;

function renderizarProds() {
    for (const producto of listaRemerasShowed) {
        console.log(producto)
        contenedor.innerHTML += `<div class="card col-sm-4">
                <img src=${producto.imgUrl} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.name}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">LO QUIERO!</button>
                </div>
            </div>
        `;

    }

    listaRemerasShowed.forEach(producto => {
        console.log(`btn${producto.id}`)
        document.getElementById(`btn${producto.id}`).addEventListener("click", function () {
            agregarAlCarrito(producto);
        });
    })
}

console.log(listaRemeras)

function verificarCarrito() {
    console.log(JSON.parse(localStorage.getItem("carrito")));

    let storedCarrito = JSON.parse(localStorage.getItem("carrito"));

    if( storedCarrito && storedCarrito.length >= 1 ) {
        
        for (const producto of storedCarrito) {
            agregarAlCarrito(producto)
        }

    }
}


verificarCarrito();
renderizarProds();

function agregarAlCarrito(productoComprado) {
    carrito.push(productoComprado);
    console.table(carrito);
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoComprado.id}</td>
            <td>${productoComprado.name}</td>
            <td>${productoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar $: " + totalCarrito;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}



// Find y Filter

let inputName = document.getElementById("findButton");
inputName.addEventListener("click", function (e) {
    e.preventDefault();
    let userInput = document.getElementById('findInput').value;

    let found = listaRemeras.find((remera) => remera.name.toLowerCase() == userInput.toLowerCase());


    contenedor.innerHTML = '';

    listaRemerasShowed = [found];

    renderizarProds();



    console.log("hice click", userInput, found);
});

let refresh = document.getElementById("cleanButton");
refresh.addEventListener("click", function (e) {
    e.preventDefault();

    contenedor.innerHTML = '';

    listaRemerasShowed = listaRemeras;

    renderizarProds();


});

let inputPrice = document.getElementById("filterButton");
inputPrice.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("funciona");
    let numberInput = document.getElementById('findInput').value;
    console.log(numberInput);

    const filterPrice = listaRemeras.filter((remera) => remera.precio <= numberInput);

    contenedor.innerHTML = '';

    listaRemerasShowed = filterPrice;

    renderizarProds();

});

// Botón de descuento

let descount = document.getElementById("descuento");
descount.addEventListener("click", function (e) {
    e.preventDefault();

    let descountResult = totalCarrito * 0.10;
   
    console.log(descountResult);

    
    totalCarrito = totalCarrito - descountResult;

    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar $: " + totalCarrito;
     

}, { once: true });


