import { useEffect, useState } from 'react'
import { Formulario } from './Componentes/Formulario/Formulario'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const defaultContactos = [
    { id: 0, 
      dni: "48557240P", 
      nombre: "Sandra", 
      telefono: "722192843", 
      mail: "sandra@gmail.com", 
      direccion: "La Cruz 26B", 
      cp: "03158", 
      localidad: "Catral"
     },
    { id: 1, 
      dni: "48555550S", 
      nombre: "Daniel", 
      telefono: "722192666", 
      mail: "daniel@gmail.com", 
      direccion: "La Purisima 16", 
      cp: "03158", 
      localidad: "Catral" 
    },

    { id: 2, 
      dni: "48222250R", 
      nombre: "Jose", 
      telefono: "722192666", 
      mail: "jose@gmail.com", 
      direccion: "La Purisima 16", 
      cp: "03360", 
      localidad: "Callosa" 
    }
  ];
  
  const [contactos, setContactos] = useState(defaultContactos);
  const [contactoDetalle, setContactoDetalle] = useState({})
  const [contactoModiciar, setContactoModificar] = useState({})
 
 

  const condicionComponentes = () =>{
    if(numeroElementos>0){
      return (
        <>
      <div>
        <Listado
          numeroContactos = {numeroElementos}
          contactos={contactos}
          onDelete={borrarContacto}
          onUpdate={modificarContacto}
          onView={verContacto}
          
        />
      </div>
      

        {/* <div>
          {JSON.stringify(contactos, null, 2)}
        </div> */}
      <div>
        <Detalle
          dato={contactoDetalle} 
          numeroElementos={numeroElementos}
        />
      </div>
      
      <div>
        <Modificar 
          modificarDatos={modificarDatos}
          elementoSeleccionado={elementoSeleccionado} 
        />
      </div>
      </>
      )
    }else{
      return console.log("No hay elementos")
    }
  }
 
  const numeroElementos = contactos.length;
 
  // useEffect( () => {
  //   cambiarDatos(contactos, datosModificados)
  // }, [datosModificados])

  const getContacto = (id) =>{ //Funcion que devuelve el contacto por id
    contactos.map(contacto =>{
      if(contacto.id === id){
        return contacto
      }
    })

    
  }

  const verContacto = (id) =>{

    setContactoDetalle(getContacto(id)) //Añadir contacto seleccionado por el ID
  }

  const agregarDatos = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto])
  }

  const modificarDatos = (contacto, datosModificados) =>{ 
    
    const contactosPrueba = [...contactos];      
    contactosPrueba.map(contacto => {

      if(contacto.id === datosModificados.id){
        contacto.dni = datosModificados.dni;
        contacto.nombre = datosModificados.nombre;
        contacto.telefono = datosModificados.telefono;
        contacto.mail = datosModificados.mail;
        contacto.direccion = datosModificados.direccion;
        contacto.cp = datosModificados.cp;
        contacto.localidad = datosModificados.localidad;
      }
      setContactos(contactosPrueba)
    })
  }

  const borrarContacto = (id) =>{
    setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== id))
    setElementoSeleccionado({})
}



  return (
    <>
      <div id="contenedor">
        <div>
          <Formulario
            contactos={contactos}
            agregarDatos={agregarDatos}
          />
        </div>

        {condicionComponentes(numeroElementos)}
      </div>

    </>
  )
}


export default App
