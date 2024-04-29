import { Principal } from '../Componentes/Principal'
import { Agenda } from "../Componentes/Agenda/Agenda";
import { Tipos } from "../Componentes/Tipos/Tipos";
import { Routes, Route } from 'react-router-dom'


export const MainNavigation = () => {

  return (
    <>
    <Routes>
        <Route path="/" element={<Principal/>}/>

        <Route path="agenda/" element={<Agenda/>}/>
      
        <Route path="tipos/" element={<Tipos/>}/>
    </Routes>

    </>
  )
}
