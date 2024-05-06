import { Link, useParams } from 'react-router-dom'

import { useContext } from 'react'
import { Autenticacion } from '../../Contextos/contextLogin';

export const DetallePerfil = () => {

    const { usuarioLogueado } = useContext(Autenticacion)


    return (
       
            <div className='mainContenido'>
                <h2>Perfil</h2>
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>MAIL</th>
                            <th>PASSWORD</th>
                            <th>PERMISO</th>
                        </tr>
                    </thead>
                    {<tbody>
                        <tr>
                            <td>{usuarioLogueado.id}</td>
                            <td>{usuarioLogueado.nombre}</td>
                            <td>{usuarioLogueado.email}</td>
                            <td>{usuarioLogueado.password}</td>
                            <td>{usuarioLogueado.permiso}</td>
                        </tr>

                    </tbody>}
                </table>

            
            <Link to="/perfil/modificar"><input
                type="submit"
                value={"Modificar"}
            /></Link>
            <Link to="/menu"><input
                type="submit"
                value={"Volver"}
            /></Link>
        </div>
       
    )
}