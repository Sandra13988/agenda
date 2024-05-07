import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Menu } from '../Componentes/Menu'
import { Agregar } from '../Componentes/Agenda/Pages/Agregar';
import { Listado } from '../Componentes/Agenda/Pages/Listado';
import { Modificar } from '../Componentes/Agenda/Pages/Modificar';
import { Detalle } from '../Componentes/Agenda/Pages/Detalle';
import { ListarTipos } from '../Componentes/Tipos/Pages/ListarTipos';
import { AgregarTipos } from '../Componentes/Tipos/Pages/AgregarTipos';
import { ModificarTipos } from '../Componentes/Tipos/Pages/ModificarTipos';
import { ListarUsuarios } from '../Componentes/Usuarios/Pages/ListarUsuarios';
import { AgregarUsuarios } from '../Componentes/Usuarios/Pages/AgregarUsuarios';
import { ModificarUsuarios } from '../Componentes/Usuarios/Pages/ModificarUsuarios';
import { DetalleUsuario } from '../Componentes/Usuarios/Pages/DetalleUsuario';
import { ModificarPerfil } from '../Componentes/Perfil/ModificarPerfil';
import { DetallePerfil } from '../Componentes/Perfil/DetallePerfil';
import { Error } from '../Error';

import { Login } from '../Componentes/Login/Login';
import { Registro } from '../Componentes/Login/Registro';

import { useContext } from 'react'
import { Autenticacion } from '../Contextos/contextLogin';

import { useQueryListadoUsuarios } from '../Queris/QueryUsuario';





export const NavegacionAdmin = ({handleLogout}) => {


    return (
        <>
            {<div className='completo'>

               <header>
                <Menu handleLogout={handleLogout} />
               </header>
                

                <main className='layCuerpo'>
                <Routes >
                    {/* //PERFIL */}
                    <Route path="/perfil" element={<DetallePerfil />} />
                    <Route path="/perfil/modificar" element={<ModificarPerfil />} />
                    <Route path="/error" element={<Error />} />


                    {/* //USUARIOS */}
                    <Route path="/usuarios/" element={<ListarUsuarios />} />
                    <Route path="/usuarios/agregar" element={<AgregarUsuarios />} />
                    <Route path="/usuarios/modificar/:id" element={<ModificarUsuarios />} />
                    <Route path="/usuarios/detalles/:id" element={<DetalleUsuario />} />

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

                <fotter>
                <h2>Este será el footer</h2>
                </fotter>


            </div>}




        </>
    )
}
