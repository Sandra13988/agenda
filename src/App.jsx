import { MainNavigation } from './Navigation/MainNavigation'
import './App.css'
import { TipoProvider } from './Contextos/contextoTipo'
import { AutenticacionUsuario } from './Contextos/contextLogin'


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
