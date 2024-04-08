import { useState, useEffect, useRef } from "react"
import { Routes, Route, Link } from 'react-router-dom'



export const Listado = ({ contactos, onCreate, onUpdate, onView, onDelete}) => {

    
    return (
        <div>
            <Link to="/agregar"> <button onClick={() => onCreate()}>AGREGAR</button></Link>
            <h2>Listar contactos</h2>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>TELEFONO</th>
                        <th>E-MAIL</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>    
                <tbody>
                    
                    {contactos.map(contacto => {
                        return(
                        <tr key={contacto.id} >
                            <td>{contacto.nombre}</td>
                            <td>{contacto.telefono}</td>
                            <td>{contacto.email}</td>
                            <td><Link to="../detalle/"><button onClick={() => onView(contacto.id)} >VER DETALLES</button></Link></td>
                            <td><Link to="../modificar"><button onClick={() => onUpdate(contacto.id)}> MODIFICAR</button></Link></td>
                            <td><button onClick={() => onDelete(contacto.id)}>BORRAR</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
