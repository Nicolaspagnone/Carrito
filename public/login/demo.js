const mysql = require("mysql")

const conexion = mysql.createConnection({
    host: `localhost`,
    database: `usuarios_db`,
    user: `root`,
    password: `branco`
})

conexion.connect((err)=>{
    if(err){
        throw err
    }else{
        console.log("Conexion Exitosa!")
    }
})

     function userValidation(email,password){

        conexion.query(`SELECT * FROM users WHERE email = "${email}"`, (err,result,fields)=>{
    
            if(err){
                throw err
                
            }else{

                if(result.length === 0) return console.log("El usuario no existe en la base de datos")

                result.forEach(e => {
                   
                        if(email === e.email && password === e.clave){
        
                            console.log("Iniciando sesion..")
                            
                        }else{
                            console.error("La clave es incorrecta")
                        }
                })
            }
        }) 
    }

    userValidation("brancopagnone@gmail.com","branco123")



conexion.end()

