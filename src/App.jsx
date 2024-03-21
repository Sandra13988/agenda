import { useState } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
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
  const [contactoModificar, setContactoModificar] = useState({})
  const [contactoVer, setContactoVer] = useState({})
      
 
  // useEffect( () => {
  //   cambiarDatos(contactos, datosModificados)
  // }, [datosModificados])

  const getContacto = (idRecibido) =>{
    return contactos.find(contacto => contacto.id === idRecibido)
  }

  
  
  const agregarDatos = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto])
  }

  const modificarDatos = (contactoModificar, datosModificados) =>{ 

    const contactosPrueba = [...contactos];      
    contactosPrueba.map(contacto => {

      if(contacto.id === datosModificados.id && contacto.id === contactoModificar.id){
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

 

const onUpdate = (contacto) =>{
  setContactoModificar(getContacto(contacto))
}

const onView = (contacto) => {
  setContactoVer(getContacto(contacto))
}

const onDelete = (contacto) =>{
   
    setContactoVer({})
    setContactoModificar({})
    //resetInput();
    setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== contacto))

}
  // const resetInput = () =>{
  //   Array.from(document.querySelectorAll("input")).forEach(input => (input.value=""));
  // }


  return (
    <>
    {/* <pre>
    <p>{JSON.stringify(getContacto(2), null, 2)}</p>
  </pre> */}
      <div id="contenedor">
        <div>
          <Agregar
            contactos={contactos}
            agregarDatos={agregarDatos}
          />
        </div>
        <div>
          {contactos && <Listado
            contactos={contactos}
            onUpdate={onUpdate} //Boton para pasar los datos del contacto al formulario 
            onView={onView} //Boton para visualizar el contacto en la lista de detalles
            onDelete={onDelete}// Boton para borrar un contacto
          />}
        </div>
        <div>
          {contactos && <Modificar 
          contactoModificar={contactoModificar}
          modificarDatos={modificarDatos} //Boton que ejecuta la modificacion
            
          />}
        </div>
      
        <div>
          {contactos && <Detalle
            contactoVer={contactoVer} 
          />}
        </div>
      </div>
      

    </>
  )
}


export default App
