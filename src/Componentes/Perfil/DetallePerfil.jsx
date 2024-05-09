import { Link, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react'
import { Autenticacion } from '../../Contextos/contextLogin';



export const DetallePerfil = () => {

    const { usuarioLogueado } = useContext(Autenticacion)

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
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
                    </tr>
                </thead>
                {<tbody>
                    <tr>
                        <td>{usuarioLogueado.id}</td>
                        <td>{usuarioLogueado.name}</td>
                        <td>{usuarioLogueado.email}</td>
                        <td>
                            {showPassword ? (
                                usuarioLogueado.password
                            ) : (
                                '*'.repeat(usuarioLogueado.password.length)
                            )}

                        </td>
                        <td> <span onClick={togglePasswordVisibility}>
                            {showPassword ? <img src="https://cdn.hugeicons.com/icons/view-off-stroke-rounded.svg" alt="view-off" width="24" height="24" /> : <img src="https://cdn.hugeicons.com/icons/eye-stroke-rounded.svg" alt="eye" width="24" height="24" />}
                        </span></td>
                    </tr>

                </tbody>}
            </table>


            <div>
                <Link to="/perfil/modificar"><input
                    type="submit"
                    value={"Modificar"}
                /></Link>
                
                <Link to="/agenda"><input
                    type="submit"
                    value={"Volver"}
                /></Link>
            </div>
        </div>

    )
}
