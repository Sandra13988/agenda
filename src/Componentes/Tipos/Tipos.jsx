import { useState } from 'react'
import { ListarTipos } from './Pages/ListarTipos'
import { AgregarTipos } from './Pages/AgregarTipos'
import { ModificarTipos } from './Pages/ModificarTipos'
import { Routes, Route } from 'react-router-dom'
import { useQueryListadoTipos } from '../../Queris/QueryTipo'

export function Tipos() {
  const defaultTipo = [
    {
      id: 0,
      name: "AMIGOS"
    },

    {
      id: 1,
      name: "TRABAJO"
    },

    {
      id: 2,
      name: "GIMNASIO"
    },
    {
      id: 3,
      name: "FAMILIA"
    },
  ];

  const [tipos, setTipos] = useState(defaultTipo)
  const [tipoModificar, setTipoModificar] = useState({})
  


  const añadirTipo = (nuevoTipo) => {
    nuevoTipo.id = tipos.length + 1;
    setTipos([...tipos, nuevoTipo])

  }

  const modificarTipo = (tipoModificar) => {

    setTipos(tiposPrevios => {
      return tiposPrevios.map(tipo => {
        if (tipo.id === tipoModificar.id) {
          return {
            ...tipo,
            name: tipoModificar.name
          }
        }
        return tipo;
      })
    })
    setTipoModificar(tipoModificar)
  }

  const getTipo = (id) => {
    const tipoEncontrado = tipos.find(tipo => tipo.id === id)
    return tipoEncontrado
  }


  const onDelete = (id) => {

    setTipos(tipos.filter(tipo => tipo.id !== id))
  }

  const onUpdate = (id) => {
    setTipoModificar(getTipo(id))
  }


  return (
    <>
    <Routes>
        <Route path="/" element={<ListarTipos tipos={tipos} onDelete={onDelete} onUpdate={onUpdate} añadirTipo={añadirTipo} />}/>
      

     
        <Route path="tipos/agregar" element={<AgregarTipos funcion={añadirTipo} />}/>
    

 
        <Route path="tipos/modificar/:id" element={<ModificarTipos funcion={modificarTipo} tipoModificar={tipoModificar} />}/>
    </Routes>

    </>
  )
}


