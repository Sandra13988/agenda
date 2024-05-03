import { MainNavigation } from './Navigation/MainNavigation'
import './App.css'
import { TipoProvider } from './Componentes/context'
import { AutenticacionUsuario } from './Componentes/contextLogin'


function App() {

  return (
    <>
     
        <AutenticacionUsuario>
          <TipoProvider>
            <MainNavigation />
          </TipoProvider>
        </AutenticacionUsuario>



    </>
  )
}
export default App
