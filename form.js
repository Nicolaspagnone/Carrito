const d = document,
ls = localStorage




export default function sendForm() {

    

    d.addEventListener("submit",(e)=>{
        const $loader = d.querySelector("#loader"),
                $form = d.querySelector(".form")
        e.preventDefault()
        $loader.classList.remove("loader-none")
        
        async function send() {

            try {

                let res = await fetch("https://formsubmit.co/ajax/brancopagnone@gmail.com",{
                    method:"POST",
                    body: new FormData(e.target)
                })
                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                  }else{
                    let data = await res.json()

                    console.log(data)
                    $loader.classList.add("loader-none")
                    $form.reset()
                    

                  }
                

                
                
            } catch (err) {

                console.log(err)
                
            }
            
        }


        send()
    })
    
}