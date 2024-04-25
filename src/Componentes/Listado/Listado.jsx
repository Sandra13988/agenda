import { useState, useEffect, useRef } from "react"
import { Routes, Route, Link } from 'react-router-dom'
import { useQueryListadoContactos } from "../../Queris/QueryAgenda"


export const Listado = ({ onDelete }) => {

    const { isLoading: isLoadingListado, isError: isErrorListado, error: errorListado, data: listado} = useQueryListadoContactos()
    // console.log(listado)
    // console.log(listado.record)

    if(isLoadingListado){
        return <h3>Cargando...</h3>
    }

    if(isErrorListado || !listado){
        return <h3>Ha habido un error .... {errorListado.message}</h3>
    }
    return (
        <div>
            <Link to="/agregar"> <button >AGREGAR</button></Link>
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
      
                   {listado.record.map(contacto => {
                        return (
                            <tr key={contacto.id} >
                                <td>{contacto.nombre}</td>
                                <td>{contacto.telefono}</td>
                                <td>{contacto.email}</td>
                                <td><Link to={`/detalles/${contacto.id}`}><button>VER DETALLES</button></Link></td>
                                <td><Link to={`/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                                <td><button onClick={() => onDelete(contacto.id)}>BORRAR</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}



