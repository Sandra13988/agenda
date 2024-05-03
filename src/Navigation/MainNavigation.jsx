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

import { Login } from '../Componentes/Login/Login';
import { Registro } from '../Componentes/Login/Registro';

import { useContext } from 'react'
import { Autenticacion } from '../Contextos/contextLogin';

import { useQueryListadoUsuarios } from '../Queris/QueryUsuario';




export const MainNavigation = () => {
    const { usuarioLogueado, setUsuarioLogueado } = useContext(Autenticacion)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { isLoading: isLoadingListadoUsuarios, isError: isErrorListadoUsuarios, error: errorListadoUsuarios, data: listadoUsuarios } = useQueryListadoUsuarios()
    const navegar = useNavigate()

    const handleLogin = (valores) => {
        console.log(listadoUsuarios)
        const user = listadoUsuarios.record.find(u => u.email === valores.email || u.password === valores.password);
        console.log(user)
        if (user) {
            setIsLoggedIn(true);
            setUsuarioLogueado(user)

            alert('Inicio de sesión correcto');
            navegar("/menu")
        } else {
            alert('Fallo en el inicio de sesion');
            navegar("/")
        }

    };
  

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsuarioLogueado(null)
        navegar("/")
    };

  
    if (isLoadingListadoUsuarios) {
        return <h3>Cargando ...</h3>
    }


    if (isErrorListadoUsuarios || !listadoUsuarios) {
        return <h3>Ha habido un error .... {errorListadoUsuarios.message}</h3>
    }


    return (
        <>
            {/* //HAY QUE PROBAR SI FUNCIONA ASI */}

            {<Routes>
                {/* //GENERAL */}
                <Route path="/" element={<Login handleLogin={handleLogin} />} />
                <Route path="/registro" element={<Registro/>} />
            </Routes>}

            {isLoggedIn && usuarioLogueado &&<Routes>
                {/* //GENERAL */}
                <Route path="/menu" element={<Menu />} />
            </Routes>}


            {/* //USUARIOS */}

            {isLoggedIn && usuarioLogueado  &&<Routes>
                <Route path="/usuarios/" element={<ListarUsuarios />} />
                <Route path="/usuarios/agregar" element={<AgregarUsuarios />} />
                <Route path="/usuarios/modificar/:id" element={<ModificarUsuarios />} />
                <Route path="/usuarios/detalles/:id" element={<DetalleUsuario />} />
            </Routes>}


            {isLoggedIn && usuarioLogueado  &&<Routes>
                {/* //AGENDA */}
                <Route path="/agenda" element={<Listado />} />
                <Route path="/agenda/agregar" element={<Agregar />} />
                <Route path="/agenda/modificar/:id" element={<Modificar />} />
                <Route path="/agenda/detalles/:id" element={<Detalle />} />
            </Routes>}

            {isLoggedIn && usuarioLogueado &&<Routes>
                {/* //TIPOS */}
                <Route path="/tipos" element={<ListarTipos />} />
                <Route path="tipos/agregar" element={<AgregarTipos />} />
                <Route path="tipos/modificar/:id" element={<ModificarTipos />} />
            </Routes>}

        </>
    )
}
