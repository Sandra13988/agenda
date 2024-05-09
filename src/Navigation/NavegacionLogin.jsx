
import { Routes, Route} from 'react-router-dom'

import { OlvidaPassword } from '../Componentes/Login/OlvidadPassword';

import { Login } from '../Componentes/Login/Login';
import { Registro } from '../Componentes/Login/Registro';




export const NavegacionLogin = ({ handleLogin }) => {


    return (
        <>

            <Routes >
                <Route path="/" element={<Login handleLogin={handleLogin} />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/olvidaPassword" element={<OlvidaPassword />} />
            </Routes>





        </>
    )
}
