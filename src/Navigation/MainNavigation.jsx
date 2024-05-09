import { useState, useEffect } from 'react';
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
import { OlvidaPassword } from '../Componentes/Login/OlvidadPassword';

import { Login } from '../Componentes/Login/Login';
import { Registro } from '../Componentes/Login/Registro';

import { useContext } from 'react'
import { Autenticacion } from '../Contextos/contextLogin';

import { useQueryListadoUsuarios } from '../Queris/QueryUsuario';

import { NavegacionAdmin } from './NavegacionAdmin';
import { NavegacionUser } from './NavegacionUser';
import { NavegacionLogin } from './NavegacionLogin';






export const MainNavigation = () => {
    const { usuarioLogueado, setUsuarioLogueado } = useContext(Autenticacion)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { isLoading: isLoadingListadoUsuarios, isError: isErrorListadoUsuarios, error: errorListadoUsuarios, data: listadoUsuarios } = useQueryListadoUsuarios()
    const navegar = useNavigate()


    useEffect(()=>{
        if(!isLoggedIn){
            navegar("/")
            console.log("no tiene acceso")
        }
    },[isLoggedIn])





    const handleLogin = (valores) => {
        console.log(listadoUsuarios)
        const user = listadoUsuarios.record.find(u => u.email === valores.email && u.password === valores.password);
        console.log(user)
        if (user) {
            setIsLoggedIn(true);
            setUsuarioLogueado(user)
            console.log("Se ha conectado"+user.name)
            
            alert('Inicio de sesión correcto');
            navegar("/agenda")
        } else {
            alert('Fallo en el inicio de sesion');
            navegar("/")
        }

    };
            console.log(isLoggedIn)
            console.log(usuarioLogueado)

    let bodyClass = "estiloBody"; // Clase base común

    if (!isLoggedIn) {
        bodyClass += " login"; // Si no está autenticado, agrega la clase para el login
    } else {
        if (usuarioLogueado.rol === "Admin") {
            bodyClass += " admin"; // Si es un administrador, agrega la clase para el admin
        } else {
            bodyClass += " user"; // Si es un usuario normal, agrega la clase para el usuario
        }
    }


    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsuarioLogueado(null)
        navegar("/")
        console.log("Se ha desconectado")
        console.log(isLoggedIn)
        console.log(usuarioLogueado)
    };


    if (isLoadingListadoUsuarios) {
        return <h3>Cargando ...</h3>
    }


    if (isErrorListadoUsuarios || !listadoUsuarios) {
        return <h3>Ha habido un error .... {errorListadoUsuarios.message}</h3>
    }



    return (
        <>


            <div className={bodyClass}>
                {/* PERFIL DE LOGIN  */}
                <NavegacionLogin handleLogin={handleLogin}/>
          

                {/* PERFIL DE ADMIN */}
                {isLoggedIn && usuarioLogueado.rol === "Admin" && <NavegacionAdmin handleLogout={handleLogout} /> }



                {/* PERFIL DE USUARIO */}
                {isLoggedIn && usuarioLogueado.rol === "User" && <NavegacionUser handleLogout={handleLogout}/>}

                

            </div>


        </>
    )
}
