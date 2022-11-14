//Proyecto Final

let shoppingCart = [];
let totalShoppingCart;
let container = document.getElementById("myproducts");
let discount = document.getElementById("descuento");
let buyButton = document.getElementById("buy");

let shirtListShowed = shirtList;

// Esta función se encarga de agregar la card de productos en el html, en base a la lista de arrays

function displayProds() {
    for (const product of shirtListShowed) {

        container.innerHTML += `
        <div class="card col-sm-4">
                <img src=${product.imgUrl} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.id}</h5>
                    <p class="card-text">${product.name}</p>
                    <p class="card-text">$ ${product.price}</p>
                    <button id="btn${product.id}" class="btn btn-primary">LO QUIERO!</button>
                </div>
        </div>
        `;

    }

    shirtListShowed.forEach(product => {

        document.getElementById(`btn${product.id}`).addEventListener("click", function () {
            addShoppingCart(product, true);
        });
    })
}

// Almacena el carrito en localStorage

function checkShoppingCart() {


    let storedCart = JSON.parse(localStorage.getItem("shoppingCart"));

    if (storedCart && storedCart.length >= 1) {

        for (const product of storedCart) {
            addShoppingCart(product, false)
        }

    }
}


checkShoppingCart();
displayProds();

function addShoppingCart(boughtProduct, displayAlert) {
    shoppingCart.push(boughtProduct);
    console.table(shoppingCart);

    if (displayAlert) {
        Swal.fire({
            title: boughtProduct.name,
            text: 'Se agregó al carrito',
            imageUrl: boughtProduct.imgUrl,
            imageWidth: 200,
            imageHeight: 200,
            color: '#aa14c0',
            imageAlt: boughtProduct.name,
            showConfirmButton: false,
            timer: 1500
        })
    }


    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${boughtProduct.id}</td>
            <td>${boughtProduct.name}</td>
            <td>${boughtProduct.price}</td>
            <td>
                <button id="removeButton" onClick="removeProductFromCart(event, ${boughtProduct.id})" class="btn btn-primary btn-search">
                    <i class="fa-solid fa-trash event-null"></i>
                </button>
            </td>
        </tr>
    `;
    totalShoppingCart = shoppingCart.reduce((accumulator, product) => accumulator + product.price, 0);
    let totalInformation = document.getElementById("total");
    totalInformation.innerText = "Total a pagar $: " + totalShoppingCart;

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

// Elimina el producto agregado al carrito
function removeProductFromCart(ev, id) {

    let line = ev.target.parentElement.parentElement;

    // let id = line.children[0].innerText;

    let index = shoppingCart.findIndex(product => product.id == id);

    shoppingCart.splice(index, 1);

    line.remove();
    totalShoppingCart = shoppingCart.reduce((accumulator, product) => accumulator + product.price, 0);
    total.innerText = "Total a pagar $: " + totalShoppingCart;
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

}

// Busca el producto por nombre

let inputName = document.getElementById("findButton");
inputName.addEventListener("click", function (e) {
    e.preventDefault();
    let userInput = document.getElementById('findInput').value;

    let found = shirtList.find((shirt) => shirt.name.toLowerCase() == userInput.toLowerCase());


    container.innerHTML = '';

    shirtListShowed = [found];

    displayProds();


});

// Limpia el filtro y vuelve a cargar todas las remeras
let refresh = document.getElementById("cleanButton");
refresh.addEventListener("click", function (e) {
    e.preventDefault();

    document.getElementById('findInput').value = '';

    container.innerHTML = '';

    shirtListShowed = shirtList;

    displayProds();


});

// Filtra los productos por precio
let inputPrice = document.getElementById("filterButton");
inputPrice.addEventListener("click", function (e) {
    e.preventDefault();

    let numberInput = document.getElementById('findInput').value;


    const filterPrice = shirtList.filter((shirt) => shirt.price <= numberInput);

    container.innerHTML = '';

    shirtListShowed = filterPrice;

    displayProds();

});

// Botón de descuento: Realiza un descuento de 10% al total

discount.addEventListener("click", function (e) {
    e.preventDefault();

    let discountResult = totalShoppingCart * 0.10;


    totalShoppingCart = totalShoppingCart - discountResult;

    let totalInformation = document.getElementById("total");
    totalInformation.innerText = "Total a pagar $: " + totalShoppingCart;


}, { once: true });

// Para finalizar la compra


buyButton.onclick = () => {
    if (shoppingCart.length == 0) {
        Swal.fire({
            title: 'No se agregaron productos al carrito',
            icon: 'error',
            color: '#aa14c0',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        shoppingCart = [];
        document.getElementById("tablabody").innerHTML = "";
        let totalInformation = document.getElementById("total");
        totalInformation.innerText = "Total a pagar $: ";
        Swal.fire({
            title: "Le llegará un mensaje para confirmar su compra",
            icon: 'success',
            color: '#aa14c0',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

// Fecha, locación y hora
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2bc9a03d84msh9fe34ede1b6cf23p1afb39jsn8141b88ec9bc',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

fetch('https://weatherapi-com.p.rapidapi.com/timezone.json?q=Argentina', options)
    .then(response => response.json())
    .then(response => showTimezone(response))
    .catch(err => console.error(err));


function showTimezone(resp) {

    const footerLocation = document.getElementById('location');

    footerLocation.innerHTML = `${resp.location.name}, ${resp.location.country} - ${resp.location.localtime}`;

}