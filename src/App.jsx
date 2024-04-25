
import { useState, useRef, useReducer } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import { Routes, Route, useParams } from 'react-router-dom'
import { Tipos } from './Componentes/Tipos/Tipos'


import './App.css'

function App() {

  const defaultContactos = [
    {
      id: 0,
      dni: "48557240P",
      nombre: "Sandra",
      telefono: "722192843",
      email: "sandra@gmail.com",
      direccion: "La Cruz 26B",
      cp: "03158",
      localidad: "Catral"
    },
    {
      id: 1,
      dni: "48555550S",
      nombre: "Daniel",
      telefono: "722192666",
      email: "daniel@gmail.com",
      direccion: "La Purisima 16",
      cp: "03158",
      localidad: "Catral"
    },

    {
      id: 2,
      dni: "48222250R",
      nombre: "Jose",
      telefono: "722192666",
      email: "jose@gmail.com",
      direccion: "La Purisima 16",
      cp: "03360",
      localidad: "Callosa"
    }
  ];
  
  const [contactos, setContactos] = useState(defaultContactos);
  const [contactoModificar, setContactoModificar] = useState({})
  const [contactoVer, setContactoVer] = useState({})
  const [accion, setAccion] = useState("nada")
  const {id} = useParams()


  
  const getContacto = (idRecibido) => { //Te devuelve el objeto contacto
    return contactos.find(contacto => contacto.id === idRecibido)
  }


  const modificarDatos = (contactoModificar) => {

    setContactos(contactosPrevio => {
      return contactosPrevio.map(contacto => {
        if (contacto.id === contactoModificar.id) {
          return {
            ...contacto,
            dni: contactoModificar.dni,
            nombre: contactoModificar.nombre,
            telefono: contactoModificar.telefono,
            mail: contactoModificar.mail,
            direccion: contactoModificar.direccion,
            cp: contactoModificar.cp,
            localidad: contactoModificar.localidad
          }
        }
        return contacto;
      })
    })

    setContactoModificar(contactoModificar)

  }


  const onDelete = (contacto) => {
    if (contacto === contactoVer.id && confirm("Está a punto de borrar un contacto que tiene en detalle, desea continuar?")) {
      setContactoVer({})
    }

   

    setContactoModificar({})
    setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== contacto))
    setAccion("nada")
  }




  return (
    <>

      <div id="contenedor">
        <Routes>
          <Route path="/" element={<Listado
            // onView={onView} //Boton para visualizar el contacto en la lista de detalles
            onDelete={onDelete}// Boton para borrar un contacto
          />} />



          <Route path="modificar/:id" element={<Modificar
            contactoEntrante={contactoModificar} //Contacto a modificar PASA
            contactos = {contactos}
            funcion={modificarDatos}
            accionModificar={accion === "modificar"}
          />} />


          
            <Route path="detalles/:id" element={<Detalle/>}/>
          

          
            <Route path="agregar" element={<Agregar/>}/>
          
        </Routes>

        <Tipos/>

    
      </div>


    </>
  )
}
export default App
