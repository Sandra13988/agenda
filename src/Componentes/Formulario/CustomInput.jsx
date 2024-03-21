


export const CustomInput = ({label, name, onchange, value, type }) => {
  const id = Math.floor(Math.random() * 10000) + '-' + name;
  return <div>
    <label htmlFor={id}>{label}: </label>
    <input type="text" name={name} id={id} onChange={onchange} value={value}/>
  </div>
}
