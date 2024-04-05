
import { useState, useRef, useReducer } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import { Toast } from './Componentes/Toast/Toast'
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
  const [iluminado, setIluminado] = useState()

  const divRefDetalle = useRef(null) // Referencia para destacar el campo en uso
  const divRefAgregar = useRef(null)
  const divRefModificar = useRef(null)
  const divRefListado = useRef(null)
  const refVistar = useRef(null)
  

  const elementos = [{ name: "dni" }, { name: "nombre" }, { name: "telefono" }, { name: "email" }, { name: "cp" }, { name: "localidad" }]


  //ESTO ES LA ACCION
  const showToast = (mensaje) => { // Funcion que recibe el mensaje y le asigna el SHOW y 3 segundos despues le asigna el HIDE
    dispatch({ type: "SHOW", playload: mensaje })

    setTimeout(() => {
      dispatch({ type: "HIDE" })
    }, 3000)
  }

  const reducer = (state, action) => { //Funcion que recible el estado actual y la accion
    switch (action.type) {
      case "SHOW":
        return { ...state, mensaje: action.playload, visibilidad: true } //devuelve los estados que se le asignan al componente toast
        break;
      case "HIDE":
        return { ...state, visibilidad: false }
        break;
      default:
        return state
        break;
    }
  }
  //ShowToast ejecuta el dispatch y reducer lo clasifica entre show y hide
  const [state, dispatch] = useReducer(reducer, { mensaje: "", visibilidad: false }) // estado, disparador de la funcion ( funcion {parametros de inicio "", false"}) -->Peguntar porque no accede teniendolo arriba

  const getContacto = (idRecibido) => { //Te devuelve el objeto contacto
    return contactos.find(contacto => contacto.id === idRecibido)
  }

  const agregarDatos = (nuevoContacto) => {
    nuevoContacto.id = contactos.length + 1;
    setContactos([...contactos, nuevoContacto])

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

  const onCreate = () => {
    setAccion("agregar")
    iluminar(divRefAgregar)
    // inputRefAgregar.current.focus() pasado al componente formulario
  }

  const onUpdate = (contacto) => {
    setContactoModificar(getContacto(contacto))
    iluminar(divRefModificar)
    setAccion("modificar")
    // inputRefModificar.current.focus() pasado al componente formulario

  }

  const onView = (contacto) => {
    setContactoVer(getContacto(contacto))
    iluminar(divRefDetalle)
    setAccion("detallar")

  }

  const onDelete = (contacto) => {
    if (contacto === contactoVer.id && confirm("Está a punto de borrar un contacto que tiene en detalle, desea continuar?")) {
      setContactoVer({})
    }

    if (contacto === contactoModificar.id && confirm("Está a punto de borrar un contacto que tiene en detalle, desea continuar?")) {
      setContactoModificar({})
    }
  
    setContactoModificar({})
    setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== contacto))
    iluminar(divRefListado)
    showToast("Contacto borrado")
    setAccion("nada")
  }


  const iluminar = (ref) => { // Funcion que le pasa por parametros la referencia del div, comprueba si hay un div anterior iluminado
    if (iluminado) {            //si lo hay, lo borra, pinta el nuevo div y lo setea en el estado
      iluminado.current.classList.remove("estiloNuevo")
    }
    ref.current.classList.remove("escondido")
    ref.current.classList.add("estiloNuevo")
    setIluminado(ref)
  }

  return (
    <>
      <div id="contenedor">
        
        <div ref={divRefListado}>
          {contactos && <Listado
            contactos={contactos}
            onCreate={onCreate}//Boton para que aparezca el formulario de crear
            onUpdate={onUpdate} //Boton para pasar los datos del contacto al formulario 
            onView={onView} //Boton para visualizar el contacto en la lista de detalles
            onDelete={onDelete}// Boton para borrar un contacto
          />}
        </div>

        <div ref={divRefModificar}> 
          {<Modificar 
            contactoEntrante={contactoModificar} //Contacto a modificar PASA
            // contactos = {contactos} //Array de contactos PASA
            // elementos={elementos} // Se quitará en cuanto este formik
            funcion={modificarDatos}
            // nombreBoton={"Modificar"} // Se añadirá en prop de formik
            // titulo={"Modificar contacto"} // Se añadirá en prop de formik
            showToast={showToast}
            // mensaje ={"Contacto modificado"}// Pasar a formik
            accionModificar={accion === "modificar"}
          />}
        </div>

        <div ref={divRefDetalle}>
          {<Detalle
            contactoVer={contactoVer}
            innerRef={refVistar}
            accion={accion === "detallar"}
          />}
        </div>

        <div ref={divRefAgregar}>
          {<Agregar
            // contactos = {contactos} //Array de contactos PASA
            // elementos={elementos} // Se quitará en cuanto este formik
            funcion={agregarDatos}
            // nombreBoton={"Modificar"} // Se añadirá en prop de formik
            // titulo={"Modificar contacto"} // Se añadirá en prop de formik
            showToast={showToast}
            // mensaje ={"Contacto modificado"}// Pasar a formik
            accionAgregar={accion === "agregar"}
          />}
        </div>

        {<Toast mensaje={state.mensaje} visibilidad={state.visibilidad} />}

      </div>

    </>
  )
}


export default App
