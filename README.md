# 🏗️ InfraDraw Backend

Bienvenido al backend de **InfraDraw**, una plataforma para crear, visualizar y compartir arquitecturas de software de manera colaborativa y eficiente.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

## 🚀 Descripción

Este proyecto está construido con [NestJS](https://nestjs.com/), un framework progresivo para Node.js, y utiliza MongoDB como base de datos principal. Permite gestionar tableros (boards) y componentes, facilitando la representación visual de arquitecturas de microservicios.

## ✨ Características

- Gestión de tableros y componentes.
- API RESTful robusta y validada.
- Estadísticas de uso y actividad.
- Paginación y búsqueda avanzada.
- Soporte para despliegue en Docker.
- Código limpio, modular y fácil de mantener.

## 🛠️ Instalación

```bash
git clone https://github.com/Paulo-Ariel-Pareja/InfraDraw-backend.git
cd infradraw-backend
npm install
```

Copia el archivo de ejemplo de variables de entorno y ajústalo según tus necesidades:

```bash
cp .example.env .env
```

Si quieres, puedes ejecutar el frontend siguiendo los pasos del README.md del front, aqui el repositorio:

```bash
https://github.com/Paulo-Ariel-Pareja/InfraDraw-frontend
```

## 🏃‍♂️ Ejecución

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

### Docker

```bash
docker-compose up --build
```

## 📦 Estructura del Proyecto

```
src/
  ├── app.module.ts
  ├── board/
  ├── component/
  ├── common/
  ├── config/
  ├── sequence-diagram/
  └── stats/
  └── user/
```

## 📊 Endpoints principales

- `GET /api/board` — Listado de tableros
- `GET /api/component` — Listado de componentes
- `GET /api/sequence-diagram` — Listado de diagramas de sequencia
- `GET /api/stats` — Estadísticas generales
- `POST /api/user/login` — Autenticarse

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

¡Contribuciones y sugerencias son bienvenidas! ⭐  
¿Dudas? Abre un issue o contacta a [Paulo Ariel Pareja](mailto:info@paulopareja.com.ar)