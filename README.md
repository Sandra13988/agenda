# 📒 Agenda de Contactos

## 🚀 Descripción  
Esta es una aplicación web desarrollada en **React** que permite gestionar una agenda de contactos.  
Existen dos tipos de usuarios:  
- **Administrador**: Tiene acceso a todas las agendas de los usuarios.  
- **Usuario Normal**: Solo puede gestionar su propia agenda.  

Los usuarios pueden:  
✅ **Añadir, editar y eliminar contactos.**  
✅ **Gestionar diferentes tipos de contactos.**  
✅ **Acceder a sus contactos de forma rápida y sencilla.**  

## 🛠️ Tecnologías Utilizadas  
- **Frontend**: React, Tailwind CSS  
- **Formulario**: Formik  
- **Validaciones**: Yup  
- **Manejo de Estado**: React Query  
- **Almacenamiento**: JSONBin (para guardar los datos de los contactos)  

## 📥 Instalación y Configuración  

1️⃣ Clonar el repositorio  
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

2️⃣ Instalar Dependencias
npm install
3️⃣ Iniciar el Proyecto
npm start

📂 Gestión de Datos con JSONBin
En lugar de utilizar una base de datos tradicional, los datos de los contactos se almacenan en JSONBin, un servicio que permite guardar y recuperar datos en formato JSON a través de una API.

🔗 Configuración de JSONBin
Crear una cuenta en JSONBin: https://jsonbin.io/
Generar un bin para almacenar los datos.
Obtener la clave de acceso (API Key) desde la configuración de JSONBin.
Configurar la API Key en el código.

{
  "usuarios": [
    {
      "id": 1,
      "usuario": "admin",
      "pass": "admin123",
      "correo": "admin@email.com",
      "rol": "admin"
    },
    {
      "id": 2,
      "usuario": "usuario1",
      "pass": "user123",
      "correo": "usuario@email.com",
      "rol": "usuario"
    }
  ],
  "contactos": [
    {
      "id": 101,
      "usuarioId": 2,
      "nombre": "Juan Pérez",
      "telefono": "123456789",
      "email": "juan@email.com",
      "tipo": "Trabajo"
    },
    {
      "id": 102,
      "usuarioId": 2,
      "nombre": "María López",
      "telefono": "987654321",
      "email": "maria@email.com",
      "tipo": "Amigos"
    }
  ],
  "tipos_contacto": [
    {
      "id": 1,
      "nombre": "Trabajo"
    },
    {
      "id": 2,
      "nombre": "Familia"
    },
    {
      "id": 3,
      "nombre": "Amigos"
    }
  ]
}

📌 Funcionalidades
✅ Inicio de sesión con validación de roles.
✅ Gestión de contactos (crear, editar, eliminar).
✅ Clasificación de contactos por categorías (Trabajo, Familia, Amigos, etc.).
✅ Almacenamiento de datos en JSONBin mediante peticiones HTTP.

✨ Contribuciones
Si deseas contribuir a este proyecto, ¡eres bienvenido/a! Puedes abrir un issue o enviar un pull request.

📄 Licencia
Este proyecto está bajo la licencia MIT.

🚀 Desarrollado con ❤️ por Sandra Rubio Sánchez
