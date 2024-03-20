import { useEffect, useState } from "react";

export const Formulario = ({agregarDatos}) => { 
        
    return(
        <div>
            <h2>Insertar contacto</h2>
            <form action="" method="" onSubmit={e=>{
                e.preventDefault();
                const nuevoContacto = {
                    id: e.target.id.value, 
                    dni: e.target.dni.value, 
                    nombre: e.target.nombre.value,
                    telefono: e.target.telefono.value,
                    mail: e.target.mail.value,
                    direccion: e.target.direccion.value,
                    cp: e.target.cp.value,
                    localidad: e.target.localidad.value
                }
                agregarDatos(nuevoContacto)
               // setContacto([...contactos, nuevoContacto])
            }}>
                        
                <label>ID: <input type="text" id="id" name="id"/></label><br></br>
                <label>DNI: <input type="text" id="dni" name="dni"/></label><br></br>
                <label>Nombre: <input type="text" id="nombre" name="nombre"/></label><br></br>
                <label>Telefono: <input type="text" id="telefono" name="telefono"/></label><br></br>
                <label>E-mail: <input type="text" id="mail" name="mail"/></label><br></br>
                <label>Direccion: <input type="text" id="direccion" name="direccion"/></label><br></br>
                <label>CP: <input type="text" id="cp" name="cp"/></label><br></br>
                <label>Localidad: <input type="text" id="localidad" name="localidad"/></label><br></br>
                <button>Enviar</button>
            </form>
        </div>
    )
}
