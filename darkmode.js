const d = document,
$aDarkmode = d.querySelector("#imgDarkmode"),
$header = d.querySelector("header"),
$container = d.querySelector(".container"),
$contMain = d.querySelector(".cont-main"),
$footer = d.querySelector(".footer"),
$mostrarCarritoHead = d.querySelector(".mostrar-carrito-head"),
$mostrarCarritoBody = d.querySelector(".mostrar-carrito-body"),
$mostrarCarritoFooter = d.querySelector(".mostrar-carrito-footer"),
ls = localStorage,
location = window.location.pathname

function darkModeOn() {
    $aDarkmode.src = "./img/sun.png"
    $header.classList.add("darkHeader")
    $container.classList.add("darkContainer")
    $contMain.classList.add("darkA")
    $footer.classList.add("darkFooter")
    d.querySelectorAll("div.divLLave").forEach(e => e.classList.add("darkItem"))
    if (location === "/carrito.html" || location === "/Carrito/carrito.html") {
        $mostrarCarritoHead.classList.add("mostrar-carrito-darkhead")
        $mostrarCarritoBody.classList.add("mostrar-carrito-darkbody")
        $mostrarCarritoFooter.classList.add("mostrar-carrito-darkfooter")
    }
    ls.setItem("darkmode","on")
}

function darkModeOff() {
    $aDarkmode.src = "./img/moon.png"
    $header.classList.remove("darkHeader")
    $container.classList.remove("darkContainer")
    $contMain.classList.remove("darkA")
    $footer.classList.remove("darkFooter")
    d.querySelectorAll("div.divLLave").forEach(e => e.classList.remove("darkItem"))
    if (location === "/carrito.html" || location === "/Carrito/carrito.html") {
    $mostrarCarritoHead.classList.remove("mostrar-carrito-darkhead")
    $mostrarCarritoBody.classList.remove("mostrar-carrito-darkbody")
    $mostrarCarritoFooter.classList.remove("mostrar-carrito-darkfooter")
    }
    ls.setItem("darkmode","off")
}



export function darkModeClick() {

    d.addEventListener("click",e=>{
        let darkmode = ls.getItem("darkmode")
        if (e.target.matches("#imgDarkmode")) {
            e.preventDefault()
            if (darkmode == "off") {
                darkModeOn()
            }else{
                darkModeOff()
            }
        }
    })

}

export function darkMode() {
    let darkmode = ls.getItem("darkmode")
    if (darkmode == "off") {
        darkModeOff()
    }else{
        darkModeOn()
    }
}