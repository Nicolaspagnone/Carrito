const d = document,
ls = localStorage




export default function sendForm() {

    

    d.addEventListener("submit",(e)=>{
        const $loader = d.querySelector("#loader"),
                $form = d.querySelector(".form"),
                $resOk = d.querySelector("#sendOk"),
                $resError = d.querySelector("#sendError")

        e.preventDefault()
        $loader.classList.remove("loader-none")
        async function send() {

            try {

                let res = await fetch("https://formsubmit.co/ajax/brancopagnone@gmail.com",{
                    method:"POST",
                    body: new FormData(e.target)
                })
                if (!res.ok) {
                    const message = `<p>${res.status} - Ocurrio un problema</p>`;
                    throw new Error(message);
                  }else{
                    let data = await res.json()

                    console.log(data)
                    $loader.classList.add("loader-none")
                    $resOk.classList.remove("loader-none")
                    $form.reset()
                    
                    setTimeout(() => {
                        $resOk.classList.add("loader-none")
                    }, 6000);

                  }
  
            } catch (err) {
                    $loader.classList.add("loader-none")
                    $resError.innerHTML = err
                    $resError.classList.remove("loader-none")
                setTimeout(() => {
                    $resError.classList.add("loader-none")
                }, 6000);
                
                
            }
            
        }


        send()
    })
    
}


