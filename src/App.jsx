import {useState} from 'react'
import {Listado} from './Componentes/Listado/Listado'
import {Detalle} from './Componentes/Detalle/Detalle'
import {Modificar} from './Componentes/Modificar/Modificar'
import './App.css'
import {Crear} from "./Componentes/Crear/Crear.jsx";

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
  const [contactoModificar, setContactoModificar] = useState({})


  const getContacto = (id) => { //Funcion que devuelve el contacto por id
    return contactos.find(contacto => {
      if (contacto.id === id) {
        return contacto
      }
    })
  }

  const handleUpdate = (id) => {

    if (contactoDetalle && contactoDetalle.id === id){
      if (confirm('Estas visualizando un contacto. Si modificas, perderás el contacto que estás visualizando. ¿Quieres continuar?')) {
        setContactoDetalle({})
      }
      else
        return;
    }

      const contacto  = getContacto(id);

      if (contacto !== undefined)
        setContactoModificar(contacto)

  }

  const onUpdate = (contacto) => {
    if (contacto.id !== undefined) {
      const contactosModificados = contactos.map(contactoTemp => {
        if (contacto.id === contactoTemp.id )
          return contacto;

        return contactoTemp;
      })

      setContactos(contactosModificados)
    }

  }

  const handleDelete = (id) => {
    if (confirm('¿Realmente deseas borrar el elemento?')){
      if (contactoDetalle.id === id)
        setContactoDetalle({})

      if (contactoModificar.id === id)
        setContactoModificar({})

      setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== id))
    }
  }

  const getNewId = () => {
    const ids = contactos.map(item => item.id);
    let newId = contactos.length;
    while (ids.includes(newId)) {
      newId++;
    }
    return newId;
  };

  const onCreate = (contacto) => {
    if (contacto.dni !== undefined){
      contacto.id = getNewId()
      setContactos([...contactos, contacto]);
    }
  }

  const handleView = (id) => {
    const contacto  = getContacto(id);

    if (contactoModificar && contactoModificar.id === id){
      if (confirm('Estas modificando este contacto. Para visualizarlo, perderás los cambios que hayas realizado. ¿Quieres continuar?')) {
        setContactoModificar({})
      }
      else
        return;
    }

    if (contacto.id !== undefined)
      setContactoDetalle(contacto)
  }



  return (
      <div id="contenedor">
          <Listado
            contactos={contactos}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onView={handleView}

          />

        <Crear
            onCreate={onCreate}
          />

        <Detalle
          dato={contactoDetalle}
        />

        <Modificar
          onUpdate={onUpdate}
          data={contactoModificar}
        />

      </div>
  )
}


export default App
