
import { useState, useRef, useReducer } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import './App.css'
import { Formulario } from './Componentes/Formulario/Formulario'
import { Toast } from './Componentes/Toast/Toast'

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
  const inputRef = useRef(null) // Referencia para poner el foco en el primer campo de modificar cuando le das al boton
  const divRefDetalle = useRef(null) // Referencia para destacar el campo en uso
  const divRefFormAgregar = useRef(null)
  const divRefFormModificar = useRef(null)
  const divRefListado = useRef(null)
  const [iluminado, setIluminado] = useState()
  



  
  const elementos = [{ name: "id" }, { name: "dni" }, { name: "nombre" }, { name: "telefono" }, { name: "email" }, { name: "cp" }, { name: "localidad" }]

 //todo -> hay que limpiar el formulario de modificar en el momento que se le da a realizar cambios

  // useEffect( () => {
  //   cambiarDatos(contactos, datosModificados)
  // }, [datosModificados])

  //ESTO ES LA ACCION
  const showToast = (mensaje) =>{ // Funcion que recibe el mensaje y le asigna el SHOW y 3 segundos despues le asigna el HIDE
    dispatch({type: "SHOW", playload: mensaje })

    setTimeout(()=> {
      dispatch({type: "HIDE"})
    },3000)
}

const reducer = (state, action) =>{ //Funcion que recible el estado actual y la accion
    switch(action.type){
      case "SHOW":
        return {...state, mensaje: action.playload, visibilidad: true} //devuelve los estados que se le asignan al componente toast
      break;
      case "HIDE":
        return {...state, visibilidad: false}
      break;
      default:
        return state
      break;
    }
}
  const [state, dispatch] = useReducer(reducer, {mensaje: "", visibilidad: false}) // estado, disparador de la funcion ( funcion {parametros de inicio "", false"}) -->Peguntar porque no accede teniendolo arriba

  const getContacto = (idRecibido) => {
    return contactos.find(contacto => contacto.id === idRecibido)
  }

  const agregarDatos = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto])
  }

  const modificarDatos = (contactoModificar) => {
    if (contactoModificar.id == contactoVer.id && confirm("Está a punto de modificar un contacto que tiene en detalle, desea continuar?")) {
      setContactoVer({})
    }
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


  const onUpdate = (contacto) => {
    setContactoModificar(getContacto(contacto))
    inputRef.current.focus()
    iluminar(divRefFormModificar)
    
  }

  const onView = (contacto) => {
    setContactoVer(getContacto(contacto))
    iluminar(divRefDetalle)
  }

  const onDelete = (contacto) => {
    if (contacto === contactoVer.id && confirm("Está a punto de borrar un contacto que tiene en detalle, desea continuar?")) {
      setContactoVer({})
    }
      setContactoModificar({})
      setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== contacto))
      iluminar(divRefListado)
    }
  

    const iluminar = (ref) =>{ // Funcion que le pasa por parametros la referencia del div, comprueba si hay un div anterior iluminado
      if(iluminado){            //si lo hay, lo borra, pinta el nuevo div y lo setea en el estado
        iluminado.current.classList.remove("estiloNuevo")
      }
      ref.current.classList.add("estiloNuevo")
      setIluminado(ref)
    }

    

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

        <div ref={divRefListado}>
          {contactos && <Listado
            contactos={contactos}
            onUpdate={onUpdate} //Boton para pasar los datos del contacto al formulario 
            onView={onView} //Boton para visualizar el contacto en la lista de detalles
            onDelete={onDelete}// Boton para borrar un contacto
          />}
        </div>

        <div ref={divRefFormModificar}>
          {<Formulario
            contactoModificar={contactoModificar}
            elementos={elementos}
            funcion={modificarDatos}
            nombreBoton={"Modificar"}
            titulo={"Modificar contacto"}
            inputRef={inputRef}
          />}
        </div>

        <div ref={divRefDetalle}>
          {contactos && <Detalle
            contactoVer={contactoVer}

          />}
        </div>

        <div ref={divRefFormAgregar}>
          {<Formulario
            contactoModificar={{}}
            funcion={agregarDatos}
            elementos={elementos}
            nombreBoton={"Agregar"}
            titulo={"Agregar contacto"}
          />}
        </div>
        <div>
          {<Toast mensaje={state.mensaje} vilibilidad={state.vilibilidad}/>}
          
        </div>
      </div>

    </>
  )
}


export default App
