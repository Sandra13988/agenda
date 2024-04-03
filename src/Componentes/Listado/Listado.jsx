import { useState, useEffect, useRef } from "react"

export const Listado = ({ contactos, onCreate, onUpdate, onView, onDelete}) => {

    
    return (
        <div>
            <button onClick={() => onCreate()}>AGREGAR</button>
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
                            <td><button onClick={() => onView(contacto.id)} >VER DETALLES</button></td>
                            <td><button onClick={() => onUpdate(contacto.id)}> MODIFICAR</button></td>
                            <td><button onClick={() => onDelete(contacto.id)}>BORRAR</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
