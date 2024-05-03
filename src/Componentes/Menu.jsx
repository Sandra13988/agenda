import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Autenticacion } from '../Contextos/contextLogin';
export const Menu = ({handleLogout}) => {
  const  {usuarioLogueado, setUsuarioLogueado} = useContext(Autenticacion)

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };


  return (
    <>
      <h2>Hola {usuarioLogueado.name}</h2>
      <div id="contenedorMenus">
      <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/agenda`}><li>AGENDA</li></Link>
          {isOpen && (
            <div className="menu-content">
              <ul>
                <Link to={`/agenda/agregar`}><li>AGREGAR CONTACTO</li></Link>
              </ul>
            </div>

          )}
        </div>
        {usuarioLogueado.rol === "User" && <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/tipos`}><li>TIPOS</li></Link>
          {isOpen && (
            <div className="menu-content">
              <ul>
                <Link to={`/tipos/agregar`}><li>AGREGAR TIPO</li></Link>
              </ul>
            </div>

          )}
        </div>}
        {usuarioLogueado.rol === "Admin" && <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/usuarios`}><li>USUARIOS</li></Link>
          {isOpen && (
            <div className="menu-content">
              <ul>
                <Link to={`/usuarios/agregar`}><li>AGREGAR USUARIO</li></Link>
              </ul>
            </div>

          )}
        </div>}
        <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to={`/`} onClick={() => handleLogout()}><li>LOGOUT</li></Link>
        </div>
      </div>
    </>
  );
};

