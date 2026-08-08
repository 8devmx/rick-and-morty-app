**Ingeniería de Requisitos de Software — Proyecto Integrador (Actividad Global)** **Versión:** 1.1 | **Fecha:** 05/08/2026 | **Estado:** Borrador base — a completar por cada equipo  
   
---

#  Los Kungfundidos

Equipo integrado por:
- Faustino Loeza Perez
- Keneth Hazael Torres Casanova 
- David Chan Canul
- Keith Badal Vázquez



## **1\. Resumen ejecutivo**

**Producto:** Rick & Morty Character Explorer — una aplicación web que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/) para permitir a los usuarios explorar, buscar, filtrar y mostrar información sobre personajes, episodios y ubicaciones del universo de la serie.  
   
**Por qué existe:** Los fans de la serie no tienen una forma sencilla y visualmente atractiva de explorar el extenso catálogo de personajes y episodios sin depender de wikis desordenadas. Esta app resuelve eso con una interfaz ligera, rápida y enfocada en la exploración.  
   
**Restricción tecnológica del curso:** El producto se construirá **únicamente con HTML, CSS y JavaScript Vanilla** — sin frameworks (React, Vue, Angular), sin librerías de UI, sin build tools (Webpack/Vite). El objetivo pedagógico es que la calidad del proyecto se sostenga en la ingeniería de requisitos, no en la sofisticación del stack.  
   
---

## **2\. Problema y objetivo**

**Problema:** No existe una herramienta ágil, gratuita y centrada en el usuario para consultar de forma cruzada personajes, episodios y ubicaciones de Rick and Morty, con capacidad de guardar favoritos para consulta posterior.  
   
**Objetivo del producto:** Ofrecer una experiencia de exploración rápida (búsqueda y filtros con respuesta perceptible en \<2s) que permita a cualquier usuario encontrar información específica del universo de la serie sin fricción, y conservar sus personajes favoritos entre sesiones.  
   
---

## **3\. Stakeholders y usuarios objetivo**

> Cada equipo debe realizar al menos una sesión de elicitación (entrevista, cuestionario o taller) con representantes de estos perfiles antes de cerrar la sección 5\. No se acepta "asumimos que el usuario quiere...".  
 

| Perfil | Rol en el proyecto | Necesidad principal | Asignado |
| :---- | :---- | :---- | :---- |
| **Product Owner** (docente o compañero asignado) | Define visión y prioridades de negocio | Que el producto sea usable y fiel al alcance acordado | Profesor |
| **Fan casual** | Usuario final | Buscar y reconocer personajes rápido, sin registrarse | David |
| **Coleccionista/trivia enthusiast** | Usuario final avanzado | Filtrar por status, especie, origen; guardar listas propias | Hazael |
| **Equipo de desarrollo (ustedes)** | Implementadores | Requisitos claros, priorizados y sin ambigüedad | Hazael, Keith, Faustino, David |

   
---

## **4\. Alcance**

### **Dentro del alcance (v1)**

\-   	Consumo de los endpoints `character`, `location` y `episode` de la API de Rick and Morty.  
**\-    Character**  
\-       Búsqueda de personajes por nombre.  
\-   	Filtros por status (Alive, Dead, unknown), especie(Human, Alien, Humanoid, unknown, Poopybutthole, Mythological, Creature , Animal , Robot, Cronenberg, Disease) y género(Female, Male, Genderless, Unknown).  
\-   	Vista de detalle de personaje (incluyendo episodios en los que aparece).  
\-   	Sistema de favoritos persistente en el navegador (`localStorage`).  
\-   	Paginación o scroll incremental sobre los resultados.  
\-   	Diseño responsivo (mínimo: móvil y escritorio).  
**\-    Location**  
\-   	Búsqueda de ubicaciones por nombre.  
\-   	Filtros por type, dimensión  
\-   	Se requiere vista de detalle de la location  
\-   	Sistema de favoritos persistente en el navegador (`localStorage`).  
**\-    Episodes**  
\-   	Búsqueda de episodios por nombre.  
\-   	Filtros por episode code(S01E01)  
\-   	Se requiere vista de detalle de la episodio  
\-   	Sistema de favoritos persistente en el navegador (`localStorage`).

### **Fuera del alcance (v1) — explícito para evitar scope creep**

\-   	Cuentas de usuario / autenticación real o backend propio.  
\-   	Edición o creación de datos (la API es de solo lectura).  
\-   	Sincronización de favoritos entre dispositivos (queda limitado al navegador local).  
\-   	Soporte offline / PWA (a menos que un equipo lo proponga como *stretch goal* y lo justifique).  
   
---

## **5\. Requisitos funcionales**

> **Plantilla de ejemplo — cada equipo debe ajustar, ampliar y trazar estos requisitos a la técnica de elicitación que los originó.**  
 

| ID | Historia de usuario | Prioridad (MoSCoW) | Origen (elicitación) |
| :---- | :---- | :---- | :---- |
| RF-01 | Como fan casual, quiero buscar un personaje por nombre para encontrarlo sin navegar por listas largas. | Must | Entrevista – Fan casual |
| RF-02 | Como coleccionista, quiero filtrar personajes por status, especie y género para acotar resultados relevantes. | Must | Entrevista – Coleccionista |
| RF-03 | Como usuario, quiero ver el detalle de un personaje (imagen, origen, ubicación actual, episodios) para conocer su contexto. | Must | Cuestionario |
| RF-04 | Como usuario, quiero marcar personajes como favoritos y que persistan al recargar la página. | Should | Taller con Product Owner |
| RF-05 | Como usuario, quiero navegar entre páginas de resultados sin perder mis filtros activos. | Should | Observación de prototipo |
| RF-06 | Como usuario, quiero ver un listado de episodios y, al seleccionar uno, ver qué personajes aparecen en él. | Could | Entrevista – Coleccionista |
| RF-07 | Como usuario, quiero un modo de "personaje aleatorio" para descubrir contenido nuevo. | Won't (v1) | Backlog futuro |
| RF-08 | Como fan casual, quiero buscar una ubicación por nombre para encontrar rápidamente el lugar que me interesa. | Must | Entrevista – Fan casual |
| RF-09 | Como coleccionista, quiero filtrar ubicaciones por type y dimensión para acotar resultados relevantes. | Should | Entrevista – Coleccionista |
| RF-10 | Como usuario, quiero ver el detalle de una ubicación (nombre, tipo, dimensión y residentes) para conocer su contexto. | Must | Cuestionario |
| RF-11 | Como usuario, quiero marcar ubicaciones como favoritas y que persistan al recargar la página. | Should | Taller con Product Owner |
| RF-12 | Como fan casual, quiero buscar un episodio por nombre para encontrarlo sin navegar por listas largas. | Must | Entrevista – Fan casual |
| RF-13 | Como coleccionista, quiero filtrar episodios por su código (ej. S01E01) para localizar uno específico. | Should | Entrevista – Coleccionista |
| RF-14 | Como usuario, quiero ver el detalle de un episodio (nombre, fecha de emisión y personajes que aparecen) para conocer su contenido. | Must | Cuestionario |
| RF-15 | Como usuario, quiero marcar episodios como favoritos y que persistan al recargar la página. | Should | Taller con Product Owner |

   
---

## **6\. Requisitos no funcionales**

| ID | Requisito | Categoría |
| :---- | :---- | :---- |
| RNF-01 | El stack debe limitarse a HTML5, CSS3 y JavaScript Vanilla (ES6+), sin frameworks ni build tools. | Restricción técnica |
| RNF-02 | Los resultados de búsqueda/filtro deben renderizarse en menos de 2 segundos en condiciones normales de red. | Rendimiento |
| RNF-03 | La aplicación debe manejar con gracia caídas o lentitud de la API pública (mensajes de error claros, no pantallas en blanco). | Confiabilidad |
| RNF-04 | El diseño debe ser responsivo: usable en viewport de 360px hasta 1920px de ancho. | Usabilidad |
| RNF-05 | Los favoritos deben persistir en `localStorage` sin pérdida de datos entre recargas. | Persistencia |
| RNF-06 | El código debe ser compatible con las últimas dos versiones de Chrome, Firefox y Safari. | Compatibilidad |
| RNF-07 | Se debe respetar el rate-limiting de la API pública (evitar llamadas redundantes; usar debounce en búsqueda). | Rendimiento / dependencia externa |

   
---

## **7\. Restricciones y supuestos**

**Restricciones:**  
   
\-   	Equipo de 5 integrantes.  
\-   	Entrega final en **5 semanas** a partir del 01/08/2026 (ver cronograma, sección 9).  
\-   	Revisiones semanales obligatorias los **sábados de 8:00 a 11:00 a.m.**  
\-   	Dependencia total de la disponibilidad de `https://rickandmortyapi.com/api` — no hay control sobre su uptime.  
   
**Supuestos:**  
   
\-   	La API no cambiará su esquema de datos durante las 5 semanas del proyecto.  
\-   	Todos los integrantes tienen acceso a un navegador moderno para pruebas.  
\-   	No se requiere despliegue en un dominio propio; puede entregarse vía GitHub Pages o similar.  
   
---

## **8\. Criterios de aceptación (ejemplos, uno por cada RF "Must")**

\-   	**RF-01:** Dado que el usuario escribe un nombre parcial en el buscador, cuando existan coincidencias en la API, entonces se muestran en menos de 2s sin recargar la página.  
\-   	**RF-02:** Dado que el usuario selecciona un filtro de status, cuando se aplica, entonces solo se listan personajes que cumplen ese criterio y el filtro persiste al paginar.  
\-   	**RF-03:** Dado que el usuario hace clic en un personaje, cuando se abre el detalle, entonces se muestran nombre, imagen, status, especie, origen, ubicación actual y lista de episodios.  
>    
> Cada equipo debe completar los criterios de aceptación de **todos** sus requisitos "Must" y "Should" antes de la revisión de la Semana 4\.  
   
---

## **9\. Cronograma y revisiones (5 semanas)**

Revisiones todos los **sábados, 8:00–11:00 a.m.**  
 

| Semana | Fecha de revisión | Entregable esperado en la revisión |
| :---- | :---- | :---- |
| Semana 1 | **Sábado 01/08/2026** | Kickoff: elicitación inicial completada (mínimo 1 técnica aplicada), borrador de secciones 1–4 del PRD |
| Semana 2 | **Sábado 08/08/2026** | PRD completo (secciones 5–8) con requisitos priorizados y trazables |
| Semana 3 | **Sábado 15/08/2026** | Avance funcional: búsqueda \+ filtros \+ detalle de personaje operativos |
| Semana 4 | **Sábado 22/08/2026** | Favoritos \+ persistencia \+ manejo de errores de API; validación contra criterios de aceptación |
| Semana 5 | **Sábado 29/08/2026** | **Entrega final:** producto completo, PRD actualizado (changelog), demo en vivo |

   
---

## **10\. Métricas de éxito**

\-   	% de requisitos "Must" implementados y validados al cierre (meta: 100%).  
\-   	Tiempo de respuesta de búsqueda/filtro (meta: \<2s).  
\-   	Cero errores no controlados visibles al usuario ante fallas de la API.  
\-   	Trazabilidad completa: cada requisito del PRD final debe poder rastrearse a (a) su técnica de elicitación y (b) su criterio de aceptación validado.  
   
---

## **11\. Anexos**

**Referencia rápida de la API (rickandmortyapi.com):**  
   
\-   	`GET /api/character` — lista de personajes (soporta `?name=`, `?status=`, `?species=`, `?gender=`, `?page=`)  
\-   	`GET /api/character/{id}` — detalle de personaje  
\-   	`GET /api/location` — lista de ubicaciones  
\-   	`GET /api/episode` — lista de episodios (soporta `?name=`, `?episode=`)  
   
**Glosario:**  
   
\-   	**PRD:** Product Requirements Document — documento que especifica qué debe hacer el producto y por qué.  
\-   	**MoSCoW:** técnica de priorización (Must/Should/Could/Won't).  
\-   	**Criterio de aceptación:** condición verificable que determina si un requisito se cumplió.  
   
   
*Este documento es la base fija del proyecto (alcance tecnológico y cronograma). Las secciones 3, 5, 6 y 8 deben ser completadas y ampliadas por cada equipo con base en su propio proceso de elicitación — no se acepta copiar los ejemplos tal cual.*  
   
