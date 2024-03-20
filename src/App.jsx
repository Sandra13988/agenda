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
 
  const [elementoSeleccionado, setElementoSeleccionado] = useState({})
 
 

  const condicionComponentes = () =>{
    if(numeroElementos>0){
      return (
        <>
      <Listado
        numeroContactos = {numeroElementos}
        contactos={contactos}
        borrarDato={borrarDato}
        setElementoSeleccionado={setElementoSeleccionado}
      />
      <br></br>
        <div>
          {JSON.stringify(contactos, null, 2)}
        </div>
 
      <Detalle
        elementoSeleccionado={elementoSeleccionado} 
        numeroElementos={numeroElementos}
      />
      <br></br>
      <Modificar 
        modificarDatos={modificarDatos}
        elementoSeleccionado={elementoSeleccionado} 
        
      />
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


  const agregarDatos = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto])
  }

  const modificarDatos = (datosModificados) =>{ // Una funcion que recoja contactos, los datos nuevos y los actualice
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

  const borrarDato = (id) =>{
    setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== id))
    setElementoSeleccionado({})
}





  return (
    <>
      <Formulario
        contactos={contactos}
        agregarDatos={agregarDatos}
      /><br></br>
      {condicionComponentes(numeroElementos)}

    </>
  )
}


export default App
