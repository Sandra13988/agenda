
import { useState, useRef } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import './App.css'
import { Formulario } from './Componentes/Formulario/Formulario'

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
  const [contactoBorrar, setContactoBorrar] = useState({})
  const [contactoVer, setContactoVer] = useState({})
  

  const elementos = [{ name: "id" }, { name: "dni" }, { name: "nombre" }, { name: "telefono" }, { name: "email" }, { name: "cp" }, { name: "localidad" }]

  // useEffect( () => {
  //   cambiarDatos(contactos, datosModificados)
  // }, [datosModificados])

  const getContacto = (idRecibido) => {
    return contactos.find(contacto => contacto.id === idRecibido)
  }



  const agregarDatos = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto])
  }

  const modificarDatos = (contactoModificar) => {
    if (contactoModificar.id == contactoVer.id && confirm("Está a punto de modificar un contacto que tiene en detalle, desea continuar?")) {
      setContactoVer({})
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
    }
  }


  const recogeVariable = (variable) => {
    console.log(variable.nombre)
  }


  const onUpdate = (contacto) => {
    setContactoModificar(getContacto(contacto))
    console.log(contactoModificar)
  }

  const onView = (contacto) => {
    setContactoVer(getContacto(contacto))
  }

  const onDelete = (contacto) => {
    if (contacto === contactoVer.id && confirm("Está a punto de borrar un contacto que tiene en detalle, desea continuar?")) {
      setContactoVer({})
      setContactoModificar({})
      //resetInput();
      setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== contacto))
    }
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
        {/* 
        <div>
        <Agregar
            contactos={contactos}
            agregarDatos={agregarDatos}
        />

        {<Formulario
            funcion = {agregarDatos}
            elementos={elementos} 
            nombreBoton = {boton}
            titulo = {titulo}
        />}

        {contactos && <Modificar 
          contactoModificar={contactoModificar}
          modificarDatos={modificarDatos} //Boton que ejecuta la modificacion    
        />} 

        </div>
        */}

        <div>
          {contactos && <Listado
            contactos={contactos}
            onUpdate={onUpdate} //Boton para pasar los datos del contacto al formulario 
            onView={onView} //Boton para visualizar el contacto en la lista de detalles
            onDelete={onDelete}// Boton para borrar un contacto
          />}
        </div>

        <div>
          {<Formulario
            contactoModificar={contactoModificar}
            elementos={elementos}
            funcion={modificarDatos}
            nombreBoton={"Modificar"}
            titulo={"Modificar contacto"}
          />}
        </div>

        <div>
          {contactos && <Detalle
            contactoVer={contactoVer}

          />}
        </div>

        <div>
          {<Formulario
            contactoModificar={{}}
            funcion={agregarDatos}
            elementos={elementos}
            nombreBoton={"Agregar"}
            titulo={"Agregar contacto"}
          />}
        </div>
      </div>

    </>
  )
}


export default App
