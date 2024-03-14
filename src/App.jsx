import { useState } from 'react'
import { Formulario } from './Componentes/Formulario/Formulario'
import { Listado } from './Componentes/Listado/Listado'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Formulario/><br></br>
      <Listado/>
    </>
  )
}

export default App
