import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
        console.log(listadoUsuarios);  // Esto debería mostrar un array de usuarios ahora
    
        // Verifica que listadoUsuarios no sea undefined o vacío
        if (listadoUsuarios && listadoUsuarios.length > 0) {
            const user = listadoUsuarios.find(u => u.email === valores.email && u.password === valores.password);
            console.log(user);
    
            if (user) {
                setIsLoggedIn(true);
                setUsuarioLogueado(user);
                console.log("Se ha conectado " + user.name);
                alert('Inicio de sesión correcto');
                navegar("/agenda");
            } else {
                alert('Fallo en el inicio de sesión');
                navegar("/");
            }
        } else {
            console.error('Listado de usuarios no disponible');
            alert('No se pudo obtener la lista de usuarios');
        }
    };
    
    

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
