
export const Formulario = ({elementos, titulo, nombreBoton}) =>{
    return(
        <div>
            <h2>{titulo}</h2>
            <form action="" method="">
                
                {elementos.map(elemento => {
                    return (
                        <label key={elemento}>{elemento + ": "}<input type="text" name={elemento} id={elemento} /><br /></label>
                    )
                })}

                <button>{nombreBoton}</button>
            </form>
        </div>
    )
}
