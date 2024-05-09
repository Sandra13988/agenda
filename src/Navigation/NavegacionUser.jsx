
import { Routes, Route } from 'react-router-dom'
import { Menu } from '../Componentes/Menu'
import { Agregar } from '../Componentes/Agenda/Pages/Agregar';
import { Listado } from '../Componentes/Agenda/Pages/Listado';
import { Modificar } from '../Componentes/Agenda/Pages/Modificar';
import { Detalle } from '../Componentes/Agenda/Pages/Detalle';
import { ListarTipos } from '../Componentes/Tipos/Pages/ListarTipos';
import { AgregarTipos } from '../Componentes/Tipos/Pages/AgregarTipos';
import { ModificarTipos } from '../Componentes/Tipos/Pages/ModificarTipos';
import { ModificarPerfil } from '../Componentes/Perfil/ModificarPerfil';
import { DetallePerfil } from '../Componentes/Perfil/DetallePerfil';
import { Error } from '../Error';
import { Fotter } from '../Componentes/Fotter';





export const NavegacionUser = ({ handleLogout }) => {



    return (
        <>
            {<div className='completo'>
                <header className='cabeceraUser'>
                    <Menu handleLogout={handleLogout} />
                </header>
                <main className='layCuerpo'>
                    <Routes>
                        <Route path="/perfil" element={<DetallePerfil />} />
                        <Route path="/perfil/modificar" element={<ModificarPerfil />} />
                        <Route path="/error" element={<Error />} />

                        {/* //AGENDA */}
                        <Route path="/agenda" element={<Listado />} />
                        <Route path="/agenda/agregar" element={<Agregar />} />
                        <Route path="/agenda/modificar/:id" element={<Modificar />} />
                        <Route path="/agenda/detalles/:id" element={<Detalle />} />

                        {/* //TIPOS */}
                        <Route path="/tipos" element={<ListarTipos />} />
                        <Route path="tipos/agregar" element={<AgregarTipos />} />
                        <Route path="tipos/modificar/:id" element={<ModificarTipos />} />
                    </Routes>
                </main>

                <fotter className="pie">
                    <Fotter/>
                </fotter>
              

            </div>}




        </>
    )
}
