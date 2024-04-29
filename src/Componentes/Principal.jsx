import { Link } from 'react-router-dom'

export const Principal = () =>{
    return(
        <>
        <Link to={`/agenda`}><button>AGENDA</button></Link>
        <Link to={`/tipos`}><button>TIPOS</button></Link>
        </>
    )
}