import { Routes, Route} from 'react-router-dom'
import { OlvidaPassword } from '../Componentes/Login/OlvidadPassword';
import { Login } from '../Componentes/Login/Login';
import { Registro } from '../Componentes/Login/Registro';
import { ComprobarOlvidaPassword } from '../Componentes/Login/ComprobarOlvidadPassword copy';




export const NavegacionLogin = ({ handleLogin }) => {


    return (
        <>

            <Routes >
                <Route path="/" element={<Login handleLogin={handleLogin} />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/comprobarOlvidaPassword" element={<ComprobarOlvidaPassword />} />
                {/* <Route path="/olvidaPassword" element={<OlvidaPassword />} /> */}
            </Routes>





        </>
    )
}
