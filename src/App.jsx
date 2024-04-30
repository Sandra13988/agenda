import { MainNavigation } from './Navigation/MainNavigation'
import './App.css'
import { TipoProvider } from './Componentes/context'

function App() {

  return (
    <>
    <TipoProvider>
      <MainNavigation/>
    </TipoProvider>
   

    </>
  )
}
export default App
