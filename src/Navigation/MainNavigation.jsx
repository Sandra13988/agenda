import { Principal } from '../Componentes/Principal'
import { Routes, Route } from 'react-router-dom'
import { Agregar } from '../Componentes/Agenda/Pages/Agregar';
import { Listado } from '../Componentes/Agenda/Pages/Listado';
import { Modificar } from '../Componentes/Agenda/Pages/Modificar';
import { Detalle } from '../Componentes/Agenda/Pages/Detalle';
import { ListarTipos } from '../Componentes/Tipos/Pages/ListarTipos';
import { AgregarTipos } from '../Componentes/Tipos/Pages/AgregarTipos';
import { ModificarTipos } from '../Componentes/Tipos/Pages/ModificarTipos';


export const MainNavigation = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Principal />} />
                
                <Route path="/agenda" element={<Listado />} />   
                <Route path="/agenda/agregar" element={<Agregar />} />
                <Route path="/agenda/modificar/:id" element={<Modificar />} />
                <Route path="/agenda/detalles/:id" element={<Detalle />} />


                <Route path="/tipos" element={<ListarTipos />} />
                <Route path="tipos/agregar" element={<AgregarTipos />} />
                <Route path="tipos/modificar/:id" element={<ModificarTipos />} />

            </Routes>

        </>
    )
}
