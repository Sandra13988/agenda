import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

export const Detalle = ({ contactoVer, innerRef, accion }) => {

    const [visible, setVisible] = useState()

    useEffect(() => {
        setVisible(accion);
    }, [accion]);


    //PREGUNTAR SI ES MEJOR GUARDAR VERCONTACTO EN EL LOCALSTORAGE 
    //ASI AUNQUE LE DES A F5 CREO QUE SE MANTIENE Y NO SE QUEDA
    //LA PAGINA VACÍA
    
    // useEffect(() => {
    //     comprobarContacto()
    // }, [contactoVer]);


    // const comprobarContacto = () =>{
    //     if(!contactoVer){
    //         return <Redirect to='/'  />
    //     }
    // }

    return (
        <>
            <div>
                <h2>Detalles</h2>
                <table  ref={innerRef}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DNI</th>
                            <th>NOMBRE</th>
                            <th>TELEFONO</th>
                            <th>MAIL</th>
                            <th>CP</th>
                            <th>LOCALIDAD</th>
                        </tr>
                    </thead>
                    {<tbody>
                        <tr>
                            <td>{contactoVer.id}</td>
                            <td>{contactoVer.dni}</td>
                            <td>{contactoVer.nombre}</td>
                            <td>{contactoVer.telefono}</td>
                            <td>{contactoVer.email}</td>
                            <td>{contactoVer.cp}</td>
                            <td>{contactoVer.localidad}</td>
                        </tr>

                    </tbody>}
                </table>

            </div>
            {/* <Link to="/"><input
                type="submit"
                value={"Volver"}
            /></Link> */}

        </>
    )
}
