This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Backend de la base de datos

## Stack General
- Base de datos: Postgres y Javascript
- Sitio web: Next.js

## Configuración de la Base de Datos
Para comenzar con el proyecto, primero necesitas configurar la base de datos. Asegúrate de tener instalados los siguientes componentes:
- Postgres
- Java 1.8 o superior
- pgAdmin 4

Luego, dentro de pgAdmin, crea las tablas de la base de datos utilizando los siguientes queries SQL:

```sql
-- Tabla 1: user
CREATE TABLE IF NOT EXISTS public."user"
(
    id SERIAL PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password text NOT NULL
);
```


## Configuración del Entorno de Desarrollo
Después de haber configurado la base de datos, es necesario preparar tu entorno de desarrollo. Asegúrate de tener instalados los siguientes componentes:

Dentro de la carpeta "knowx", ejecuta el siguiente comando en la terminal para instalar las dependencias:
```bash
npm install
```

Para cargar variables del entorno .env
```bash
npm install pg dotenv
```

En la terminal instala bcrypt para poder encriptar las contraseñas
```bash
npm install bcryptjs pg
```

Considera lo siguiente:
- En el caso de que hayas agregado una contraseña en la base de datos, entra al archivo .env y actualiza la contraseña en "DB_PASSWORD = password"
- En el caso de que no haya un enviorment, crea un archivo con lo siguiente:
```sql
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_DATABASE=knowx
```

Cada vez que se quiera correr la pagina web, dentro de la carpeta "knowx", ejecutar el siguiente comendo:
```bash
npm run dev
```

- Si deseas trabajar con un Local Port Forwarding, utiliza la siguiente [documentación](https://code.visualstudio.com/docs/editor/port-forwarding)





