
import { useState, useRef, useReducer } from 'react'
import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import { Toast } from './Componentes/Toast/Toast'
import { Routes, Route } from 'react-router-dom'
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
    
      case "HIDE":
        return { ...state, visibilidad: false }
      
      default:
        return state
     
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
  }

  const onUpdate = (contacto) => {
    setContactoModificar(getContacto(contacto))
    setAccion("modificar")
    
  }

  const onView = (contacto) => {
    setContactoVer(getContacto(contacto))
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
    showToast("Contacto borrado")
    setAccion("nada")
  }




  return (
    <>

      <div id="contenedor">
        <Routes>
          <Route path="/" element={<Listado
            contactos={contactos}
            onCreate={onCreate}//Boton para que aparezca el formulario de crear
            onUpdate={onUpdate} //Boton para pasar los datos del contacto al formulario 
            onView={onView} //Boton para visualizar el contacto en la lista de detalles
            onDelete={onDelete}// Boton para borrar un contacto
          />} />



          <Route path="/modificar/:id" element={<Modificar
            contactoEntrante={contactoModificar} //Contacto a modificar PASA
            contactos = {contactos}
            funcion={modificarDatos}
            showToast={showToast}
            accionModificar={accion === "modificar"}
          />} />


          
            <Route path="/detalles/:id" element={<Detalle
              contactoVer={contactoVer}
              contactos = {contactos}
              innerRef={refVistar}
              accion={accion === "detallar"}
            />}/>
          

          
            <Route path="/agregar" element={<Agregar
              funcion={agregarDatos}
              showToast={showToast}
              accionAgregar={accion === "agregar"}
            />}/>
          
        </Routes>

        <Tipos/>

        {<Toast mensaje={state.mensaje} visibilidad={state.visibilidad} />}
      </div>


    </>
  )
}
export default App
