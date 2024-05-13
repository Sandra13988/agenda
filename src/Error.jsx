import { useNavigate } from "react-router-dom"




export const Error = ({handleLogout}) => {
    const navegar  = useNavigate()

    return (
        <>
            <h2>SE HA PRODUCIDO UN ERROR</h2>
            <button type="button" onClick={() => navegar("/")}>Volver al login</button>

        </>
    )
}
