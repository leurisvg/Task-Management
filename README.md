# Task Management

Esta es una aplicación web frontend desarrollada con Angular 17 que simula la gestión de usuarios y tareas. La aplicación utiliza autenticación con JWT, realiza solicitudes HTTP para datos mockeados, emplea Angular Material para el diseño CSS y es responsiva. Se utilizan entornos de Angular para compilar a diferentes ambientes (dev, qa, prod) y Jest para las pruebas unitarias.

## Instalación

1. Clonar el repositorio:

```
  git clone https://github.com/leurisvg/task-management.git
```

2. Instalar las dependencias:

```
  npm install
```

3. Correr el servidor de desarrollo:

```
  ng serve
```

4. Open the App:

Abre el navegador web y navega a http://localhost:4200 para visualizar la app.

## Configuración de Entornos

La aplicación utiliza diferentes configuraciones para los entornos de desarrollo, QA y producción. Estos entornos se gestionan a través de los archivos en la carpeta src/environments.

- src/environments/environment.development.ts: Entorno de desarrollo.
- src/environments/environment.qa.ts: Entorno de QA.
- src/environments/environment.prod.ts: Entorno de producción.

## Compilar para Diferentes Ambientes

### Desarrollo

```
  ng serve
```

### QA

```
  npm run build:qa
```

### Producción

```
  npm run build:prod
```

### Pruebas Unitarias

Las pruebas se encuentran en los archivos con extensión .spec.ts.

Para ejecutar las pruebas unitarias corra el siguiente comando:

```
  npm run test
```

Al ejecutar las pruebas, se generará un reporte en la terminal con la cantidad de pruebas ejecutadas, aprobadas y fallidas.

Para ver el reporte de los test y saber el porcentaje del código cubierto por los test corra el siguiente comando:

```
  npm run test:coverage
```
