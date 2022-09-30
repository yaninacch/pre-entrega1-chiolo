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

