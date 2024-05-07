import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"




export const Prueba = () => {

    useEffect(() => {


        let agendas = {
            "0": [
              {
                "id": 0,
                "nombre": "Sandra",
                "tipo": "TRABAJO",
                "dni": "48557240P",
                "sexo": "Mujer",
                "telefono": "722192843",
                "email": "sandra@gmail.com",
                "direccion": "La Cruz 26B",
                "cp": "03158",
                "localidad": "Catral"
              },
              {
                "id": 3,
                "nombre": "Vanessa",
                "tipo": "AMIGOS",
                "dni": "48557525O",
                "sexo": "Mujer",
                "telefono": "988558746",
                "email": "daniel@gmail.com",
                "direccion": "Cordoba 23",
                "cp": "03158",
                "localidad": "La Cruz"
              }
            ],
            "1": [
              {
                "id": 1,
                "nombre": "Daniel",
                "tipo": "AMIGOS",
                "dni": "48555550S",
                "sexo": "Hombre",
                "telefono": "722192666",
                "email": "daniel@gmail.com",
                "direccion": "La Purisima 16",
                "cp": "03158",
                "localidad": "Catral"
              },
              {
                "id": 2,
                "nombre": "Jose",
                "tipo": "GYM",
                "dni": "48222250R",
                "sexo": "Hombre",
                "telefono": "722192666",
                "email": "jose@gmail.com",
                "direccion": "La Purisima 16",
                "cp": "03360",
                "localidad": "Callosa"
              },
              {
                "id": 4,
                "nombre": "Vanessa",
                "tipo": "AMIGOS",
                "dni": "48557525O",
                "sexo": "Hombre",
                "telefono": "45646546",
                "email": "vanessa@gmail.com",
                "direccion": "Cordoba 23",
                "cp": "03158",
                "localidad": "Las Casicas"
              }
            ]
          }
        
        console.log('agendas')
        console.log(agendas)

        const miAgenda = [
            {
                "id": 0,
                "nombre": "Sandra",
                "tipo": "TRABAJO",
                "dni": "48557240P",
                "sexo": "Mujer",
                "telefono": "722192843",
                "email": "sandra@gmail.com",
                "direccion": "La Cruz 26B",
                "cp": "03158",
                "localidad": "Catral"
            }
        ]

        console.log('miAgenda')
        console.log(miAgenda)


        console.log('Agenda con mi agenda')
        agendas[1] = miAgenda
    
        console.log(agendas)
    
            
            
        


            


    }, [])
   
    

    return (
        <p>jose</p>
    )
}
