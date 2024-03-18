import { useEffect, useState } from 'react'
import { Formulario } from './Componentes/Formulario/Formulario'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   const [contactos, setContactos] = useState([{ id: 0, dni: "48557240P", nombre: "Sandra", telefono: "722192843", mail: "sandra@gmail.com", direccion: "La Cruz 26B", cp: "03158", localidad: "Catral" },
   { id: 1, dni: "48555550S", nombre: "Daniel", telefono: "722192666", mail: "daniel@gmail.com", direccion: "La Purisima 16", cp: "03158", localidad: "Catral" },
   { id: 2, dni: "48222250R", nombre: "Jose", telefono: "722192666", mail: "jose@gmail.com", direccion: "La Purisima 16", cp: "03360", localidad: "Callosa" }])

  
  const [contactoSeleccionadoDetalle, setContactoSeleccionadoDetalle] = useState(0)
  const [contactoSeleccionadoModificar, setContactoSeleccionadoModificar] = useState(0)
  const [datosModificados, setDatosModificados] = useState({})


 
  useEffect( () => {
    cambiarDatos(contactos, datosModificados)
  }, [datosModificados])

  const cambiarDatos = (contactos, datosModificados) =>{
    contactos.map(contacto => {
      if(contacto.id === datosModificados.id){
        contacto.dni = datosModificados.dni;
        contacto.nombre = datosModificados.nombre;
        contacto.telefono = datosModificados.telefono;
        contacto.mail = datosModificados.mail;
        contacto.direccion = datosModificados.direccion;
        contacto.cp = datosModificados.cp;
        contacto.localidad = datosModificados.localidad;
      }
    })
  }

  
  return (
    <>
      <Formulario contactos={contactos} setContacto={setContactos}/><br></br>
      <Listado contactos={contactos} setContactoSeleccionadoListar={setContactoSeleccionadoDetalle} setContactoSeleccionadoModificar={setContactoSeleccionadoModificar}/><br></br>
      <Detalle contactoSeleccionadoDetalle={contactos[contactoSeleccionadoDetalle]}/>
      <Modificar contactoSeleccionadoModificar={contactos[contactoSeleccionadoModificar]} setDatosModificados={setDatosModificados}/>
    </>
  )
}


export default App
