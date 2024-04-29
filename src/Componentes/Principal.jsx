import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export const Principal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
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
    <div className="slide-down-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Link to={`/tipos`}><li>TIPOS</li></Link>
    {isOpen && (
      <div className="menu-content">
        <ul>
        <Link to={`/tipos/agregar`}><li>AGREGAR TIPO</li></Link>
        </ul>
      </div>
    )}
  </div>
  </div>
  </>
  );
};

