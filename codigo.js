import {ponerCarrito,vaciarCarrito,cargarCarrito,mostrarCarrito,sumarProducto,restarProducto} from "./carrito.js"
import {darkMode,darkModeClick} from "./darkmode.js"

const d = document,
$main = d.querySelector(".main"),
$divItems = d.querySelector(".divItems"),
ls = localStorage


if (!(JSON.parse(ls.getItem("carrito")) instanceof Array)) {
    ls.removeItem("carrito")
}

if (ls.getItem("carrito") == null) {
    let carrito = []
    ls.setItem("carrito",JSON.stringify(carrito)) 
}

if (ls.getItem("darkmode") == null) {
    ls.setItem("darkmode","off") 
}
let carrito = JSON.parse(ls.getItem("carrito"))

d.addEventListener("DOMContentLoaded", e =>{

    d.querySelectorAll("[data-include]").forEach(el => getHTML(el,el.getAttribute("data-include")))

    ponerCarrito(carrito)

    returnLlaves()

    darkMode()
    darkModeClick()

    mostrarCarrito(carrito)

})


// Traer Contenido de las paginas
async function getPages(url) {
    let $res = await axios(url)
    let $data = await $res.data
    $main.innerHTML = $data
    
}

// Inclutir Componentes
async function getHTML(e,url) {
    try {
        let $res = await axios(url)
        let $data = await $res.data
        e.outerHTML = $data
        
    } 
    catch (err) {
        console.log(err.response.status)    
}
}

d.addEventListener("click", e =>{

    if (e.target.matches(".menu a")) {
        let url = e.target.href
        if (e.target.id === "aIndex") {
            
            console.log("hola")
    }else{
        e.preventDefault()
        getPages(url)  
     }
    }

 if (e.target.matches(".divItems button")) {

    carrito = JSON.parse(ls.getItem("carrito"))
    cargarCarrito(e,carrito)

 }

 if (e.target.matches("#vaciarCarrito")) {

    vaciarCarrito(carrito)
}

if (e.target.matches(".sumar")) {

    carrito = JSON.parse(ls.getItem("carrito"))
   let id = e.target.getAttribute("data-id")
   sumarProducto(e,carrito,id)
}

if (e.target.matches(".restar")) {

    carrito = JSON.parse(ls.getItem("carrito"))
    let id = e.target.getAttribute("data-id")
    restarProducto(e,carrito,id)
 }

})



const llaves = {

    Llave1: ["Llave 1","Modelo A", 150],
    Llave2: ["Llave 2","Modelo B", 250],
    Llave3: ["Llave 3","Modelo C", 380],
    Llave4: ["Llave 4","Modelo D", 420],
    Llave5: ["Llave 5","Modelo E", 450],
    Llave6: ["Llave 6","Modelo F", 500],
    Llave7: ["Llave 7","Modelo G", 530],
    Llave8: ["Llave 8","Modelo H", 580],
    Llave9: ["Llave 9","Modelo I", 620],
    Llave10: ["Llave 10","Modelo J", 730],
    Llave11: ["Llave 11","Modelo L", 880],
    Llave12: ["Llave 12","Modelo M", 920]
 
}


function returnLlaves() {
    let location = window.location.pathname
    if (location === "/" || location === "/index.html" || location === "/Carrito-de-Compras/index.html" || location === "/Carrito-de-Compras/") {
        
  
    let $fragment = d.createDocumentFragment()

    for (const key in llaves) {
        let $divLlave = d.createElement("div")
        $divLlave.className = "divLLave"
        $divLlave.innerHTML = `
        <img src="./img/llave.png" alt="llave" > 
        <b>${key}:</b> ${llaves[key][0]}<br>
        <b>Modelo:</b> ${llaves[key][1]}<br>
        <b>Precio:</b> ${llaves[key][2]}<br>
        <button type="submit" id="${key}"
        data-model="${llaves[key][1]}" data-price="${llaves[key][2]}">Comprar</button>
        <p></p>`
        $fragment.appendChild($divLlave)
        
    }
    $divItems.appendChild($fragment)

}
}







