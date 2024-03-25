import { useState, useEffect } from "react"


export const Formulario = ({ funcion, contactoEntrante, elementos, nombreBoton, titulo }) => {

    const [contacto, setContacto] = useState(contactoEntrante)

    const handleOnSubmit = () =>{
        //Paso la funcion por prop y modifico contacto
        //const datosNuevos = {id: idNuevo, dni: dniNuevo, nombre: nombreNuevo, telefono: telefonoNuevo, mail: mailNuevo, direccion: direccionNueva, cp: cpNuevo, localidad: localidadNueva}
        //modificarDatos(contactoModificar, datosNuevos)
        e.preventDefault();  
        funcion(contacto)
    }

    const handleOnChange = (e) =>{
        //onChange={e =>{setIContacto(e.target.value)}} value={idNuevo} -> Asi es como estaba
        //Repasas contacto y donde encuentres el name (por ejemplo id) le colocas el valor nuevo
        setContacto({
            ...contacto,
            [e.target.name]: e.target.value
        })

    }

    return (

        

<div>
    <h2>{titulo}</h2>
    <form action="" onSubmit={handleOnSubmit}>

        {elementos.map(elemento =>{
            return(                                                                                         
            <div key={}> 
                <label htmlFor={elemento.name}></label>
                <label >{elemento.name}: <input type="text" onChange={handleOnChange} value={elemento.name}/></label><br></br>
            </div>
            )

        })}
        {/* <label >ID: <input type="text" name="idNuevo" id="idNuevo" onChange={e =>{setId(e.target.value)}} value={id}/></label><br></br>
                <label >DNI: <input type="text" name="dniNuevo" id="dniNuevo" onChange={e =>{setDni(e.target.value)}} value={dni}/></label><br></br>
                <label >NOMBRE: <input type="text" name="nombreNuevo" id="nombreNuevo" onChange={e =>{setNombre(e.target.value)}} value={nombre}/></label><br></br>
                <label >TELEFONO: <input type="text" name="telefonoNuevo" id="telefonoNuevo" onChange={e =>{setTelefono(e.target.value)}} value={telefono}/></label><br></br>
                <label >E-MAIL: <input type="text" name="mailNuevo" id="mailNuevo" onChange={e =>{setMail(e.target.value)}} value={mailNuevo}/></label><br></br>
                <label >DIRECCION: <input type="text" name="direccionNueva" id="direccionNueva" onChange={e =>{setDireccion(e.target.value)}} value={direccion}/></label><br></br>
                <label >CP: <input type="text" name="cpNuevo" id="cpNuevo" onChange={e =>{setCp(e.target.value)}} value={cp}/></label><br></br>
                <label >LOCALIDAD: <input type="text" name="localidadNueva" id="localidadNueva" onChange={e =>{setLocalidad(e.target.value)}} value={localidad}/></label><br></br> */}
        <button>{nombreBoton}</button>
    </form>
</div>
        
    )
}
