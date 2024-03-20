import { useState, useEffect } from "react"

export const Modificar = ({ contactoSeleccionadoModificar, setDatosModificados}) => { 
    const [idNuevo, setIdNuevo] = useState(contactoSeleccionadoModificar.id)
    const [dniNuevo, setDniiNuevo] = useState(contactoSeleccionadoModificar.dni)
    const [nombreNuevo, setNombreNuevo] = useState(contactoSeleccionadoModificar.nombre)
    const [telefonoNuevo, setTelefonoNuevo] = useState(contactoSeleccionadoModificar.telefono)
    const [mailNuevo, setMailNuevo] = useState(contactoSeleccionadoModificar.mail)
    const [direccionNueva, setDireccionNueva] = useState(contactoSeleccionadoModificar.direccion)
    const [cpNuevo, setCpNuevo] = useState(contactoSeleccionadoModificar.cp)
    const [localidadNueva, setLocalidadNueva] = useState(contactoSeleccionadoModificar.localidad)

    useEffect(() => {
        setIdNuevo(contactoSeleccionadoModificar.id);
        setDniiNuevo(contactoSeleccionadoModificar.dni);
        setNombreNuevo(contactoSeleccionadoModificar.nombre);
        setTelefonoNuevo(contactoSeleccionadoModificar.telefono);
        setMailNuevo(contactoSeleccionadoModificar.mail);
        setDireccionNueva(contactoSeleccionadoModificar.direccion);
        setCpNuevo(contactoSeleccionadoModificar.cp);
        setLocalidadNueva(contactoSeleccionadoModificar.localidad);
    }, [contactoSeleccionadoModificar]);
    
    return(

       
        <div>
            <h2>Modificar contacto</h2>
            <form action="" onSubmit={e=>{
                e.preventDefault();
                
                setDatosModificados({id: idNuevo, dni: dniNuevo, nombre: nombreNuevo, telefono: telefonoNuevo, mail: mailNuevo, direccion: direccionNueva, cp: cpNuevo, localidad: localidadNueva})
            }}> 
                <label >ID: <input type="text" name="idNuevo" id="idNuevo" onChange={e =>{setIdNuevo(e.target.value)}} value={idNuevo}/></label><br></br>
                <label >DNI: <input type="text" name="dniNuevo" id="dniNuevo" onChange={e =>{setDniiNuevo(e.target.value)}} value={dniNuevo}/></label><br></br>
                <label >NOMBRE: <input type="text" name="nombreNuevo" id="nombreNuevo" onChange={e =>{setNombreNuevo(e.target.value)}} value={nombreNuevo}/></label><br></br>
                <label >TELEFONO: <input type="text" name="telefonoNuevo" id="telefonoNuevo" onChange={e =>{setTelefonoNuevo(e.target.value)}} value={telefonoNuevo}/></label><br></br>
                <label >E-MAIL: <input type="text" name="mailNuevo" id="mailNuevo" onChange={e =>{setMailNuevo(e.target.value)}} value={mailNuevo}/></label><br></br>
                <label >DIRECCION: <input type="text" name="direccionNueva" id="direccionNueva" onChange={e =>{setDireccionNueva(e.target.value)}} value={direccionNueva}/></label><br></br>
                <label >CP: <input type="text" name="cpNuevo" id="cpNuevo" onChange={e =>{setCpNuevo(e.target.value)}} value={cpNuevo}/></label><br></br>
                <label >LOCALIDAD: <input type="text" name="localidadNueva" id="localidadNueva" onChange={e =>{setLocalidadNueva(e.target.value)}} value={localidadNueva}/></label><br></br>
                <button>Enviar cambios</button>
            </form>
        </div>
    )
}