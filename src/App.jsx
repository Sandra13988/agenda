

import { Agregar } from './Componentes/Agregar/Agregar'
import { Listado } from './Componentes/Listado/Listado'
import { Detalle } from './Componentes/Detalle/Detalle'
import { Modificar } from './Componentes/Modificar/Modificar'
import { Routes, Route } from 'react-router-dom'
import { Tipos } from './Componentes/Tipos/Tipos'


import './App.css'

function App() {

  return (
    <>

      <div id="contenedor">
        <Routes>
          <Route path="/" element={<Listado />} />

          <Route path="modificar/:id" element={<Modificar />} />

          <Route path="detalles/:id" element={<Detalle />} />

          <Route path="agregar" element={<Agregar />} />
        </Routes>

        <Tipos />


      </div>
   

    </>
  )
}
export default App
