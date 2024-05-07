import { MainNavigation } from './Navigation/MainNavigation'
import './App.css'
import { TipoProvider } from './Contextos/contextoTipo'
import { AutenticacionUsuario } from './Contextos/contextLogin'
import { Prueba } from './Prueba'


function App() {

  return (
    <>
     
        <AutenticacionUsuario>
          <TipoProvider>
              {/* <Prueba/> */}
            <MainNavigation />
          </TipoProvider>
        </AutenticacionUsuario>



    </>
  )
}
export default App
