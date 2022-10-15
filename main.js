//Segunda pre-entrega: Agregué objetos, arrays y métodos

const listaRemeras = [
    {
        id: 1,
        name: "Remera batik",
        precio: 1500
    },
    {
        id: 2,
        name: "Remera rocker",
        precio: 1200
    },
    {
        id: 3,
        name: "Remera manga larga",
        precio: 2300
    }];


let inputName = prompt("Ingrese el nombre del producto");

let found = listaRemeras.find((remera) => remera.name.toLowerCase() == inputName.toLowerCase());
console.log(found);

if(found){
    alert("Tenemos en stock");
    console.log(found);
}else{
    alert("La remera no se encuentra en stock")
    console.log("La remera no se encuentra en stock");
}

let inputPrecio = parseInt(prompt("Filtrar por precio hasta: "));

const listaPrecio = listaRemeras.filter((remera) => remera.precio < inputPrecio);
console.log(listaPrecio); 

//Primera pre-entrega

let total = 0;

let confirmedPurchase = false;


for (let i = 1; i <= 3; i++) {
    console.log(total)
    let product = prompt("Ingrese el nombre del producto para añadir al carrito \n Remera batik \n Remera rocker \n Remera manga larga");


    if (product) {
        if (product.toLowerCase() == 'remera batik') {
            total = total + 1500;
            alert("Precio:$1500. Total a pagar $ " + total);
            console.log(total);
        }
        if (product.toLowerCase() == "remera rocker") {
            total = total + 1200;
            alert("Precio:$1200. Total a pagar $ " + total);
            console.log(total);
        }
        if (product.toLowerCase() == "remera manga larga") {
            total = total + 2300;
            alert("Precio:$2300. Total a pagar $ " + total);
            console.log(total);
        }

        confirmedPurchase = true;

    } else {
        alert('Compra cancelada');
        confirmedPurchase = false;
        break;
    }

}




if (confirmedPurchase) {

    let descuento = parseFloat(prompt("Ingrese el total a pagar para solicitar descuento"));

    let descCalculado = calcularDescuento(total);
    console.log("El descuento es de $" + descCalculado);
    alert("El descuento es de $" + descCalculado)


    let precioDesc = calcularTotal(total, descCalculado);
    console.log("El precio con el descuento es de $" + precioDesc);
    alert("El precio total con el descuento es de $" + precioDesc);

}

function calcularDescuento(precio) {
    return precio * 0.20;
}

function calcularTotal(precio, descuento) {
    return precio - descuento;
}



