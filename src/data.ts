export const data = [
    { id: 0, 
      dni: "48557240P", 
      nombre: "Sandra", 
      telefono: "722192843", 
      mail: "sandra@gmail.com", 
      direccion: "La Cruz 26B", 
      cp: "03158", 
      localidad: "Catral"
     },
    { id: 1, 
      dni: "48555550S", 
      nombre: "Daniel", 
      telefono: "722192666", 
      mail: "daniel@gmail.com", 
      direccion: "La Purisima 16", 
      cp: "03158", 
      localidad: "Catral" 
    },

    { id: 2, 
      dni: "48222250R", 
      nombre: "Jose", 
      telefono: "722192666", 
      mail: "jose@gmail.com", 
      direccion: "La Purisima 16", 
      cp: "03360", 
      localidad: "Callosa" 
    }
  ];

export function getContactoById(id: number) {
    return data.find(d => d.id === id)
}

export function updateConactoById(id: number, contacto) {
    //@ts-ignore
    data = data.map(c => c.id !== id ? c : contacto)
    
}
