import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Autenticacion } from '../Contextos/contextLogin';
import { comprobarConectado } from '../Utiles/comprobarConectado';
export const Menu = ({ handleLogout }) => {

  const { usuarioLogueado, setUsuarioLogueado } = useContext(Autenticacion)

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };


  return (
    <>
      {comprobarConectado(usuarioLogueado)}
    <div id="encabezado">
   
      <div className="contenedorMenus">

        {/* //ADMIN */}
        {usuarioLogueado.rol === "Admin" &&
        <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/agenda`} ><li className='estiloMenu'>MENU</li></Link>
          {isOpen && (
            <div className="menu-content">
              <ul>
                <Link to={`/agenda`}><li>AGENDA</li></Link>
                <Link to={`/agenda/agregar`}><li>AGREGAR CONTACTO</li></Link>
                <Link to={`/tipos`}><li>TIPO</li></Link>
                <Link to={`/tipos/agregar`}><li>AGREGAR TIPO</li></Link>
                <Link to={`/usuarios`}><li>USUARIOS</li></Link>
                <Link to={`/usuarios/agregar`}><li>AGREGAR USUARIO</li></Link>
              </ul>
            </div>

          )}
        </div>}
        
        {usuarioLogueado.rol === "User" &&
        <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/agenda`}><li>MENU</li></Link>
          {isOpen && (
            <div className="menu-content">
              <ul>
                <Link to={`/agenda`}><li>AGENDA</li></Link>
                <Link to={`/agenda/agregar`}><li>AGREGAR CONTACTO</li></Link>
                <Link to={`/tipos`}><li>TIPO</li></Link>
                <Link to={`/tipos/agregar`}><li>AGREGAR TIPO</li></Link>
              </ul>
            </div>

          )}
        </div>}
        </div>
        {usuarioLogueado && <h2>Hola {usuarioLogueado.name}</h2>}
        <div className="contenedorMenus">
        {/* PERFIL */}
        {usuarioLogueado && <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/perfil`}><li><img src="https://cdn.hugeicons.com/icons/user-edit-01-stroke-rounded.svg" alt="user-edit-01" width="40" height="40" /></li></Link>
          {isOpen && (
            <div className="menu-content">
              <ul>
                <Link to={`/perfil/modificar`}><li>MODIFICAR PERFIL</li></Link>
                <Link to={`/`} onClick={() => handleLogout()}><li>DESCONECTAR</li></Link>
              </ul>
            </div>

          )}
        </div>}

        </div>
        </div>
       
      
    </>
  );
};

