import { useEffect, useState } from 'react'
import { Formulario } from './Componentes/Formulario/Formulario'
import { Listado } from './Componentes/Listado/Listado'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   const [contactos, setContactos] = useState([{ id: 1, dni: "48557240P", nombre: "Sandra", telefono: "722192843", mail: "sandra@gmail.com", direccion: "La Cruz 26B", CP: "03158", Localidad: "Catral" },
   { id: 2, dni: "48555550S", nombre: "Daniel", telefono: "722192666", mail: "daniel@gmail.com", direccion: "La Purisima 16", CP: "03158", Localidad: "Catral" },
   { id: 3, dni: "48222250R", nombre: "Jose", telefono: "722192666", mail: "jose@gmail.com", direccion: "La Purisima 16", CP: "03360", Localidad: "Callosa" }])

  return (
    <>
      <Formulario contactos={contactos} setContacto={setContactos}/><br></br>
      <Listado contactos={contactos}/>
    </>
  )
}

export default App
