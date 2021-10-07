const d = document,
$carrito = d.querySelector("#carrito"),
$mostrarCarritoBody = d.querySelector(".mostrar-carrito-body"),
$mostrarCarritoFooter = d.querySelector(".mostrar-carrito-footer h3"),
ls = localStorage


export function ponerCarrito(carrito) {
    ls.setItem("carrito",JSON.stringify(carrito))
    $carrito.innerHTML = `<img src="./img/carros2.png" alt="Carrito"> <p> ${carrito.length} </p>
    <a href="./carrito.html"><button id="btnMostrarCarrito">Finalizar</button></a>
    <button id="vaciarCarrito">Vaciar</button>`   
}

function actualizarCarrito(carrito) {
    ls.setItem("carrito",JSON.stringify(carrito))
    $carrito.innerHTML = `<img src="./img/carros2.png" alt="Carrito"> <p> ${carrito.length} </p>
    <a href="./carrito.html"><button id="btnMostrarCarrito">Finalizar</button></a>
    <button id="vaciarCarrito">Vaciar</button>`  
    console.log(carrito)
   
}

export function vaciarCarrito(carrito) {

    localStorage.removeItem('carrito');
    carrito = []
    ls.setItem("carrito",JSON.stringify(carrito))
    $carrito.innerHTML = `<img src="./img/carros2.png" alt="Carrito"> <p> ${carrito.length} </p>
    <a href="./carrito.html"><button id="btnMostrarCarrito">Finalizar</button></a>
    <button id="vaciarCarrito">Vaciar</button>`
    window.location.href = "./index.html"   
}

export function cargarCarrito(e,carrito) {
   let nextSibling = e.target.nextElementSibling
   let consulta = carrito.some((el) => el.includes(e.target.id))
   let filtrar = carrito.filter((el) => el.includes(e.target.id))
   
   if (consulta) {
    filtrar[0][3] += 1
    let $lastResponse = `<p style="color:green">Ahora tenes <b>${filtrar[0][3]}</b> ${e.target.id} en el carrito</p>`
    nextSibling.innerHTML = $lastResponse
       actualizarCarrito(carrito)    
       
   }else{
    let $firstResponse = `<p style="color:green">El producto ${e.target.id} se agrego al carrito</p>`
    nextSibling.innerHTML = $firstResponse
       carrito.push([e.target.id,e.target.getAttribute("data-model"),e.target.getAttribute("data-price"),1]) 
       actualizarCarrito(carrito)    

   }
}

let total = 0

export function mostrarCarrito(carrito) {

    let location = window.location.pathname
    if (location === "/carrito.html") {
     
    if(carrito.length === 0){

        // $mostrarCarritoBody.insertAdjacentHTML("afterend",`<div class="div-carritoVacio"> <div><h2>Su carrito esta vacio</h2><img src="./img/carritoVacio.png"></div></div>`)
        $mostrarCarritoBody.innerHTML = `<div class="div-carritoVacio"> <div><h2>Su carrito esta vacio</h2><img src="./img/carritoVacio.png"></div></div>`
        $mostrarCarritoFooter.innerHTML = `TOTAL: $${total}`

    }else{  

    carrito.forEach(e => {
    let subtotal = e[2] * e[3]
    $mostrarCarritoBody.insertAdjacentHTML("beforeend",`<tr id="${e[0]}-tr"><td>${e[0]} - ${e[1]}</td>
    <td><p>${e[3]}  </p><button class="sumar" data-id="${e[0]}">+</button><button class="restar" data-id="${e[0]}">-</button></td>
    <td>$${e[2]}</td>
    <td>$${subtotal}</td></tr>`)
    total += subtotal
    });

    $mostrarCarritoFooter.innerHTML = `TOTAL: $${total}`

}  
}
}

export function sumarProducto(e,carrito,id) {
    let filtrar = carrito.filter((el) => el.includes(id))
    let $llave = d.querySelector(`#${id}-tr`)
    filtrar[0][3] += 1
    let subtotal = parseInt(filtrar[0][2]) * parseInt(filtrar[0][3])
    $llave.innerHTML = `<td>${filtrar[0][0]} - ${filtrar[0][1]}</td>
    <td><p>${filtrar[0][3]}  </p><button class="sumar" data-id="${filtrar[0][0]}">+</button><button class="restar" data-id="${filtrar[0][0]}">-</button></td>
    <td>$${filtrar[0][2]}</td>
    <td>$${subtotal}</td>`
    total += parseInt(filtrar[0][2])
    $mostrarCarritoFooter.innerHTML = `TOTAL: $${total}`

    console.log(filtrar[0][3], id)
    actualizarCarrito(carrito)   
    

}

export function restarProducto(e,carrito,id) {   
    let filtrar = carrito.filter((el) => el.includes(id))
    let $llave = d.querySelector(`#${id}-tr`)

    if(filtrar[0][3] > 0){
    filtrar[0][3] -= 1
    let subtotal = parseInt(filtrar[0][2]) * parseInt(filtrar[0][3])
    $llave.innerHTML = `<td>${filtrar[0][0]} - ${filtrar[0][1]}</td>
    <td><p>${filtrar[0][3]}  </p><button class="sumar" data-id="${filtrar[0][0]}">+</button><button class="restar" data-id="${filtrar[0][0]}">-</button></td>
    <td>$${filtrar[0][2]}</td>
    <td>$${subtotal}</td>`
    total -= parseInt(filtrar[0][2])
    $mostrarCarritoFooter.innerHTML = `TOTAL: $${total}`
    
        
    }
    if(filtrar[0][3] == 0){
       carrito =  carrito.filter(e => e[3] > 0 )
       
       $llave.innerHTML = null

       if(carrito.length === 0) mostrarCarrito(carrito)
        

    }
    
    actualizarCarrito(carrito)    
}

