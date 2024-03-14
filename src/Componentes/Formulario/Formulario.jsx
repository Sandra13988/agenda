import { useState } from "react";
export const Formulario = () => { 

    const [id, setId] = useState("");
    const [dni, setDNI] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [CP, setCP] = useState("");
    const [localidad, setLocalidad] = useState("");

    const[contacto, setContaco] = useState({id, dni, nombre, telefono, mail, direccion, CP, localidad})

    return(
        <form action="" method="">
            <label>ID: <input type="text" id="id" name="id"/></label><br></br>
            <label>DNI: <input type="text" id="dni" name="dni"/></label><br></br>
            <label>Nombre: <input type="text" id="nombre" name="nombre"/></label><br></br>
            <label>Telefono: <input type="text" id="telefono" name="telefono"/></label><br></br>
            <label>E-mail: <input type="text" id="mail" name="mail"/></label><br></br>
            <label>Direccion: <input type="text" id="direccion" name="direccion"/></label><br></br>
            <label>CP: <input type="text" id="cp" name="cp"/></label><br></br>
            <label>Localidad: <input type="text" id="localidad" name="localidad"/></label><br></br>
            <button onClick={() => a}>Enviar</button>
        </form>
    )
}