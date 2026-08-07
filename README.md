# Rick & Morty Character Explorer

## Ingeniería de Requisitos de Software — Proyecto Integrador

**Versión:** 1.0  
**Fecha:** 01/08/2026  
**Estado:** Avance en desarrollo — elicitación pendiente de completar

---

- Integrantes del equipo

- Luis Antonio Nazario Avalos
- Octavio Alejandro Pérez Pech
- Marcelino Celestino De Feria
- Jesús David Pérez Artiles

## 1. Resumen ejecutivo

### Producto

**Rick & Morty Character Explorer** es una aplicación web orientada a la exploración de personajes, episodios y ubicaciones del universo de Rick and Morty.

El proyecto tiene como objetivo utilizar la API pública de Rick and Morty para permitir a los usuarios buscar, filtrar y consultar información de los personajes de una manera sencilla y visual.

### Problema

Los fans de la serie no cuentan con una forma sencilla y visualmente atractiva de explorar el extenso catálogo de personajes y episodios sin depender de wikis desordenadas.

La aplicación busca ofrecer una interfaz ligera, rápida y enfocada en la exploración.

### Restricción tecnológica

El proyecto se desarrollará únicamente utilizando:

- HTML5
- CSS3
- JavaScript Vanilla (ES6+)

No se utilizarán frameworks como React, Vue o Angular, librerías de interfaz de usuario ni herramientas de construcción como Webpack o Vite.

---

## 2. Problema y objetivo

### Problema

Se requiere una herramienta gratuita, ágil y centrada en el usuario que permita consultar información relacionada con personajes, episodios y ubicaciones de Rick and Morty.

### Objetivo del producto

Desarrollar una aplicación web que permita explorar de manera sencilla la información del universo de Rick and Morty mediante herramientas de búsqueda, filtros y visualización de personajes.

En versiones posteriores del desarrollo se contempla incorporar funcionalidades como favoritos persistentes, paginación, consulta de episodios y consumo completo de la API.

---

## 3. Stakeholders y usuarios objetivo

> **Estado de esta sección:** Pendiente de completar mediante el proceso de elicitación del equipo.

El equipo realizará al menos una técnica de elicitación para obtener información de usuarios representativos y determinar sus necesidades reales.

### Stakeholders considerados inicialmente

| Perfil | Rol en el proyecto | Necesidad general |
|---|---|---|
| Product Owner | Define la visión y prioridades del producto | Que el producto cumpla con el alcance acordado |
| Fan casual | Usuario final | Encontrar información de personajes de manera rápida |
| Coleccionista / fan avanzado | Usuario final avanzado | Consultar y filtrar información más específica |
| Equipo de desarrollo | Implementadores | Contar con requisitos claros y verificables |

### Técnica de elicitación

**Pendiente.**

Una vez realizada la elicitación, esta sección será actualizada con:

- Técnica utilizada.
- Perfil de los participantes.
- Preguntas realizadas.
- Hallazgos obtenidos.
- Requisitos derivados de los resultados.

---

## 4. Alcance

### Dentro del alcance del producto

Se contempla desarrollar:

- Consulta de personajes.
- Búsqueda de personajes por nombre.
- Filtros por estado, especie y género.
- Visualización de información de los personajes.
- Consulta de episodios.
- Consulta de ubicaciones.
- Sistema de personajes favoritos.
- Persistencia de favoritos mediante `localStorage`.
- Paginación o carga incremental.
- Diseño responsivo para dispositivos móviles y escritorio.

### Fuera del alcance

No se contempla inicialmente:

- Autenticación de usuarios.
- Backend propio.
- Modificación de información de la API.
- Sincronización de favoritos entre dispositivos.
- Funcionamiento completamente offline.

---

## 5. Requisitos funcionales

Los siguientes requisitos representan el estado actual del proyecto y serán ajustados después de realizar el proceso de elicitación.

| ID | Requisito | Prioridad | Estado actual |
|---|---|---|---|
| RF-01 | El usuario podrá buscar personajes por nombre. | Must | Implementado en el avance |
| RF-02 | El usuario podrá filtrar personajes por estado, especie y género. | Must | Parcial: filtro por estado implementado |
| RF-03 | El usuario podrá visualizar información de un personaje, incluyendo imagen, estado, especie, ubicación y episodios. | Must | Parcialmente implementado |
| RF-04 | El usuario podrá guardar personajes como favoritos y conservarlos al recargar la página. | Should | Pendiente |
| RF-05 | El usuario podrá navegar entre diferentes páginas de resultados sin perder sus filtros. | Should | Pendiente |
| RF-06 | El usuario podrá consultar episodios y visualizar los personajes que aparecen en ellos. | Could | Pendiente |

### RF-01 — Búsqueda de personajes

Actualmente existe un campo de búsqueda que permite filtrar los personajes mostrados de acuerdo con el texto ingresado por el usuario.

### RF-02 — Filtros

Actualmente se encuentran implementados los siguientes filtros por estado:

- Todos
- Alive
- Dead
- Unknown

Los filtros por especie y género permanecen pendientes.

### RF-03 — Información de personajes

Actualmente las tarjetas muestran:

- Nombre.
- Imagen.
- Estado.
- Especie.
- Última ubicación conocida.
- Episodio asociado.

La vista completa de detalle permanece en desarrollo.

---

## 6. Requisitos no funcionales

| ID | Requisito | Categoría | Estado |
|---|---|---|---|
| RNF-01 | El proyecto debe desarrollarse utilizando HTML5, CSS3 y JavaScript Vanilla. | Restricción técnica | Cumplido |
| RNF-02 | Las búsquedas y filtros deberán responder de manera rápida al usuario. | Rendimiento | En desarrollo |
| RNF-03 | La aplicación deberá mostrar mensajes claros cuando exista un problema al obtener información. | Confiabilidad | Pendiente |
| RNF-04 | La interfaz deberá adaptarse a dispositivos móviles y de escritorio. | Usabilidad | Implementado parcialmente |
| RNF-05 | Los favoritos deberán conservarse utilizando `localStorage`. | Persistencia | Pendiente |
| RNF-06 | La aplicación deberá funcionar en navegadores modernos. | Compatibilidad | Pendiente de validación |
| RNF-07 | Se deberán evitar solicitudes innecesarias a la API y utilizar `debounce` en la búsqueda cuando se implemente el consumo dinámico. | Rendimiento | Pendiente |

### Diseño responsivo

El avance actual incluye estilos responsivos que modifican la distribución de los personajes, filtros y navegación dependiendo del tamaño de la pantalla.

---

## 7. Restricciones y supuestos

### Restricciones

- Uso exclusivo de HTML, CSS y JavaScript Vanilla.
- Dependencia de la API pública de Rick and Morty.
- El desarrollo deberá cumplir con las fechas establecidas para las revisiones del proyecto.
- No se desarrollará un backend propio en la primera versión.

### Supuestos

- La API de Rick and Morty mantendrá disponible su información durante el desarrollo.
- Los usuarios utilizarán navegadores modernos.
- La aplicación podrá ejecutarse directamente desde un navegador.
- El proyecto podrá publicarse posteriormente mediante GitHub Pages o una alternativa similar.

---

## 8. Criterios de aceptación

Los siguientes criterios corresponden al avance actual y podrán modificarse después del proceso de elicitación.

### RF-01 — Buscar personajes por nombre

**Dado** que el usuario se encuentra en la sección de personajes,  
**cuando** escribe un nombre o parte de un nombre en el campo de búsqueda,  
**entonces** la aplicación debe mostrar únicamente los personajes que coincidan con el texto ingresado.

**Estado:** Implementado en el avance actual.

### RF-02 — Filtrar personajes por estado

**Dado** que el usuario visualiza la lista de personajes,  
**cuando** selecciona un filtro de estado (Alive, Dead o Unknown),  
**entonces** la aplicación debe mostrar únicamente los personajes correspondientes al estado seleccionado.

**Estado:** Implementado parcialmente.

Los filtros por especie y género permanecen pendientes.

### RF-03 — Mostrar información del personaje

**Dado** que un personaje aparece en los resultados,  
**cuando** se genera su tarjeta,  
**entonces** deben mostrarse como mínimo su nombre, imagen, estado, especie, ubicación y episodio asociado.

**Estado:** Implementado parcialmente.

### RF-04 — Favoritos

**Dado** que el usuario selecciona un personaje como favorito,  
**cuando** recarga la aplicación,  
**entonces** el personaje deberá continuar almacenado como favorito.

**Estado:** Pendiente.

### RF-05 — Navegación de resultados

**Dado** que existen múltiples páginas de resultados,  
**cuando** el usuario cambia de página,  
**entonces** los filtros seleccionados deberán mantenerse activos.

**Estado:** Pendiente.

---

## 9. Estado actual del desarrollo

### Funcionalidades implementadas

Actualmente el proyecto cuenta con:

- Estructura inicial de la aplicación en HTML.
- Estilos generales mediante CSS.
- Diseño responsivo.
- Navegación visual.
- Campo de búsqueda.
- Búsqueda local de personajes por nombre.
- Filtro de personajes por estado.
- Tarjetas de personajes.
- Visualización de nombre, imagen, estado, especie, ubicación y episodio.
- Mensaje cuando no existen resultados para una búsqueda o filtro.

### Funcionalidades pendientes

Se encuentran pendientes:

- Consumo dinámico de la API mediante JavaScript.
- Obtención de personajes directamente desde la API.
- Filtro por especie.
- Filtro por género.
- Vista completa del detalle de un personaje.
- Sistema de favoritos.
- Persistencia mediante `localStorage`.
- Paginación.
- Consulta funcional de episodios.
- Consulta funcional de ubicaciones.
- Manejo de errores de la API.
- Implementación de `debounce`.
- Validación de compatibilidad entre navegadores.

---

## 10. Avance técnico

### HTML

Se encuentra desarrollada la estructura inicial de la interfaz, incluyendo:

- Encabezado.
- Navegación.
- Buscador.
- Botones de filtros.
- Contenedor de personajes.
- Pie de página.

### CSS

Se cuenta con estilos para:

- Encabezado y navegación.
- Campo de búsqueda.
- Filtros.
- Tarjetas de personajes.
- Estados de los personajes.
- Diseño responsivo.
- Adaptación de la interfaz para dispositivos móviles.

### JavaScript

Actualmente JavaScript permite:

- Renderizar personajes.
- Buscar personajes por nombre.
- Filtrar personajes por estado.
- Combinar búsqueda y filtro.
- Mostrar un mensaje cuando no existen coincidencias.

Actualmente los datos utilizados para los personajes se encuentran definidos localmente en JavaScript. El consumo dinámico de la API permanece pendiente.

---

## 11. Próximos pasos

1. Realizar la técnica de elicitación.
2. Documentar los resultados obtenidos.
3. Actualizar stakeholders y perfiles de usuario.
4. Ajustar los requisitos funcionales según los resultados.
5. Establecer la trazabilidad entre elicitación y requisitos.
6. Completar los criterios de aceptación.
7. Implementar el consumo dinámico de la API.
8. Agregar los filtros restantes.
9. Implementar la vista de detalle.
10. Desarrollar favoritos y persistencia mediante `localStorage`.

---

## API de referencia

El proyecto utilizará la API pública de Rick and Morty.

Endpoints contemplados:

- `GET /api/character`
- `GET /api/character/{id}`
- `GET /api/location`
- `GET /api/episode`

---

## Nota sobre el avance

Este documento representa el estado actual del proyecto y será actualizado conforme avance el desarrollo y se complete el proceso de elicitación.

Los requisitos y criterios de aceptación podrán ser ajustados de acuerdo con los resultados obtenidos mediante la técnica de elicitación realizada por el equipo.