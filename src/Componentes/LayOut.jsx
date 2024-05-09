import { MainNavigation } from "../Navigation/MainNavigation"
import { Menu } from "./Menu"
import { Fotter } from "./Fotter"
import { useContext, useState } from "react";
import { Autenticacion } from "../Contextos/contextLogin";



export const LayOut = () => {

    const { usuarioLogueado } = useContext(Autenticacion)

   

    let bodyClass = "estiloBody"; // Clase base común

    if (!usuarioLogueado) {
        bodyClass += " login"; // Si no está autenticado, agrega la clase para el login
    } else {
        if (usuarioLogueado.rol === "Admin") {
            bodyClass += " admin"; // Si es un administrador, agrega la clase para el admin
        } else {
            bodyClass += " user"; // Si es un usuario normal, agrega la clase para el usuario
        }
    }

    return (
        <>
            

            <div className={bodyClass}>
                <header className="cabezaLay">
                <Menu />
                </header>

                <main className="cuerpoLay">
                    <MainNavigation />
                </main>

                <fotter className="pieLay">
                    <Fotter />
                </fotter>
            </div>

        </>
    )
}
