

import { Agregar } from './Pages/Agregar'
import { Listado } from './Pages/Listado'
import { Detalle } from './Pages/Detalle'
import { Modificar } from './Pages/Modificar'
import { Routes, Route } from 'react-router-dom'
import { Tipos } from '../Tipos/Tipos'


export function Agenda() {

  return (
    <>

      <div id="contenedor">
        <Routes>
          <Route path="/" element={<Listado />} />

          <Route path="modificar/:id" element={<Modificar />} />

          <Route path="detalles/:id" element={<Detalle />} />

          <Route path="agregar" element={<Agregar />} />
        </Routes>

      


      </div>
   

    </>
  )
}