import { MainNavigation } from './Navigation/MainNavigation'
import './App.css'
import { TipoProvider } from './Contextos/contextoTipo'
import { AutenticacionUsuario } from './Contextos/contextLogin'
import { Prueba } from './Prueba'
import { Seleccionado } from './Contextos/contextUsuarioSeleccionad'


function App() {

  return (
    <>
     
        <AutenticacionUsuario>
        <Seleccionado>
          <TipoProvider>
              {/* <Prueba/> */}
            <MainNavigation />
          </TipoProvider>
          </Seleccionado>
        </AutenticacionUsuario>



    </>
  )
}
export default App
