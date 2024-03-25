
import { useState } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import './App.css'
import { Formulario } from './Componentes/Formulario/Formulario'

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

  const elementos = [{name: "id"},{name: "dni"}, {name: "nombre"}, {name: "telefono"}, {name: "e-mail"}, {name: "cp"}, {name: "localidad"}]
  const boton = "Enviar"
  const titulo = "Formulario provisional"
  const [tipoFormulario, setTipoFormulario] = useState() //(modificar o crear)
      
 
  // useEffect( () => {
  //   cambiarDatos(contactos, datosModificados)
  // }, [datosModificados])

  const getContacto = (idRecibido) =>{
    return contactos.find(contacto => contacto.id === idRecibido)
  }

  
  
  const agregarDatos = ( undefined, nuevoContacto) => {
    setContactos([...contactos, nuevoContacto])
  }

  const modificarDatos = (contactoModificado) =>{ 

    const contactosPrueba = [...contactos]; // El [...contactos] copia el estado contactos en otra variable     
    contactosPrueba.map(contacto => {

      if(contacto.id === contactoModificado.id){
        contacto.dni = contactoModificado.dni;
        contacto.nombre = contactoModificado.nombre;
        contacto.telefono = contactoModificado.telefono;
        contacto.mail = contactoModificado.mail;
        contacto.direccion = contactoModificado.direccion;
        contacto.cp = contactoModificado.cp;
        contacto.localidad = contactoModificado.localidad;
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
        {/* <div>
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
 */}

        <div>
          {<Formulario
            funcion = {agregarDatos}
            elementos={elementos} 
            nombreBoton = {boton}
            titulo = {titulo}
          />}

        {<Formulario
            funcion = {modificarDatos}
            contactoModificar={contactoModificar}
            elementos={elementos} 
            nombreBoton = {boton}
            titulo = {titulo}
          />}
        </div>
      </div>
      


    </>
  )
}


export default App
