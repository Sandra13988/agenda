
import { ListarTipos } from './Pages/ListarTipos'
import { AgregarTipos } from './Pages/AgregarTipos'
import { ModificarTipos } from './Pages/ModificarTipos'
import { Routes, Route } from 'react-router-dom'


export function Tipos() {

  return (
    <>
    <Routes>
        <Route path="/" element={<ListarTipos/>}/>
      
        <Route path="tipos/agregar" element={<AgregarTipos/>}/>
    
        <Route path="tipos/modificar/:id" element={<ModificarTipos/>}/>
    </Routes>

    </>
  )
}


