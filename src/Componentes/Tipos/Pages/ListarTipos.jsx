import { Link } from 'react-router-dom'

export const ListarTipos = ({tipos, onDelete, onUpdate, añadirTipo}) => {
    return(
        <>
        <div>
            <Link to="/tipos/agregar"> <button onClick={() => añadirTipo()}>AGREGAR</button></Link>
            <h3>LISTA DE TIPOS</h3>
            <table>
           
            <tbody>
                {tipos.map(tipo => {
                        return (
                        <tr key={tipo.id}>
                            <td >{tipo.name}</td>
                            <td ><Link to={`/tipos/modificar/${tipo.id}`}><button onClick={() => onUpdate(tipo.id)}>MODIFICAR</button></Link></td>
                            <td >{<button onClick={() =>onDelete(tipo.id)}>BORRAR</button>}</td>
                        </tr>
                        )
                    })}
            </tbody>
            </table>
            </div>
        </>
    )
} 