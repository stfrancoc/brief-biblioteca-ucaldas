# Especificación Formal — Sistema de Préstamo de Libros

> **Autor:** [Jeison Steven Franco - Brahyan Cartagena]
> **Fecha:** [05/05/2026]
> **Versión:** 1.0
> **Brief de origen:** Correo de Diana Restrepo, Coordinadora de Biblioteca

> Lo que está entre corchetes `[...]` es lo que tú debes escribir.

---

## 1. Propósito del sistema

[
Es un sistema de gestion de prestamos de libros de la biblioteca, esta diseñado para llevar el control de los prestamos de libros, el sistema esta diseñado para que puedan consultar el catalogo de libros disponibles y su estado de prestamo,tomar prestamos, devolver, renovar y consultar el historial de prestamos de libros, notificar sobre prestamos vencidos y calcular las multas y multas acumuladas por retraso, que estudiantes tienen prestamos vigentes y su estado de los mismos, permitiendo manejar libros con varios ejemplares. con reglas de negocio que permiten gestionar los prestamos de libros de la biblioteca. 
]

---

## 2. Alcance

**Incluido en esta versión:**

- [
- consultar el catalogo de libros disponibles y su estado de prestamo
- consultar la disponibilidad de ejemplares por libro
- registrar un prestamo de libro para un estudiante
- registrar la devolucion de un libro y calcular multa por retraso
- renovar prestamos vigentes cuando se cumplan las condiciones
- consultar el historial de prestamos de un estudiante
- consultar los prestamos vigentes de estudiantes
- consultar los prestamos vencidos
- manejar libros con multiples ejemplares independientes
- diferenciar estudiantes de pregrado y posgrado
- calcular multas automaticas al devolver libros atrasados
- bloquear prestamos cuando un estudiante tiene multas pendientes o prestamos vencidos
- datos en memoria
]

**Explícitamente fuera del alcance:**

- [
- profesores investigadores y sus reglas de prestamo
- desarrollo de un frontend o interfaz grafica
- la base de datos real solo persistencia en memoria en esta version
- autenticacion y autorizacion de usuarios
- pagos reales de multas o integracion con pasarela de pagos
- gestion de ubicaciones fisicas de los libros fuera del catalogo
- reservas formales con cola de espera persistente
- notificaciones push, correos electronicos o alertas externas
]

---

## 3. Modelo de datos

### Entidad: Libro
[
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico del libro
| 'titulo'  | string   | si          | titulo 
| 'autor'   | string   | si          | autor 
| 'isbn'    | string   | si          | numero de isbn del libro 
| 'editorial'| string   | si          | editorial 
| 'año_publicacion'| number   | si          | año de publicacion 
| 'genero'  | string   | si          | genero 
| 'numero_ejemplares'| number   | si          | numero de ejemplares 
| 'alta_demanda' | boolean | si | si el libro es de alta demanda
]

### Entidad: Ejemplar

[
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico del ejemplar
| 'libro_id'| string   | si          | identificador unico del libro al que pertenece
| 'estado'  | string   | si          | estado del ejemplar
]


### Entidad: Estudiante

[Tabla de campos
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico del estudiante
| 'nombre'  | string   | si          | nombre del estudiante
| 'programa'| string   | si          | programa academico del estudiante
| 'semestre'| number   | si          | semestre del estudiante
| 'tipo'    | string   | si          | tipo de estudiante
| 'limite_prestamos'| number   | si          | limite de prestamos del estudiante
| 'multas_pendientes'| number   | si          | multas pendientes del estudiante
]

### Entidad: Préstamo

[
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico del prestamo
| 'estudiante_id'| string | si       | identificador unico del estudiante
| 'ejemplar_id'| string | si         | identificador unico del ejemplar
| 'fecha_prestamo'| string   | si    | fecha en que se realizo el prestamo
| 'fecha_devolucion_esperada'| string | si  | fecha en que se esperaba la devolucion del libro
| 'fecha_devolucion_real'| string  | si   | fecha en que se realizo la devolucion del libro
| 'estado'  | string | si  | estado del prestamo
| 'renovaciones' | number | si | numero de renovaciones realizadas
]


### Entidad: Multa

[Tabla de campos
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico de la multa
| 'prestamo_id'| string | si       | identificador unico del prestamo
| 'monto'   | number   | si          | monto de la multa
| 'fecha_pago'| string | si          | fecha en que se realizo el pago
| 'estado'  | string   | si          | estado de la multa  (pendiente , pagada)

]

### Diagrama de relaciones

```
[

Libro 1 --- N Ejemplar
Estudiante 1 --- N Prestamo
Ejemplar 1 --- N Prestamo 
Prestamo 0..1 --- 0..1 Multa

]
```

---

## 4. Endpoints REST

| Método | Ruta | Propósito | Body / Query | Respuesta éxito | Códigos error posibles |
|---|---|---|---|---|---|
| `GET` | `/libros` | Listar catálogo de libros | `?genero=`, `?autor=`, `?disponible=` | `200` con lista | `400` |
| `GET` | `/libros/:id` | Detalle de un libro | - | `200` con objeto | `404` |
| `GET` | `/libros/:id/ejemplares` | Listar ejemplares de un libro | - | `200` con lista | `404` |
| `GET` | `/estudiantes/:id/prestamos` | Consultar préstamos de un estudiante | - | `200` con lista | `404` |
| `GET` | `/prestamos/vigentes` | Consultar préstamos vigentes | - | `200` con lista | - |
| `GET` | `/prestamos/vencidos` | Consultar préstamos vencidos | - | `200` con lista | - |
| `POST` | `/prestamos` | Crear préstamo | `{ estudiante_id, ejemplar_id }` | `201` con préstamo creado | `400`, `404`, `409` |
| `PATCH` | `/prestamos/:id/devolver` | Registrar devolución | `{ fecha_devolucion_real }` | `200` con préstamo actualizado | `400`, `404` |
| `PATCH` | `/prestamos/:id/renovar` | Renovar préstamo | - | `200` con préstamo actualizado | `400`, `404`, `409` |
| `GET` | `/estudiantes/:id/historial` | Historial de préstamos y multas | - | `200` con historial | `404` |



---

## 5. Reglas de negocio

### RN1 — [nombre corto de la regla]

- **Trigger:** [cuándo se evalúa]
- **Condición:** [qué se valida exactamente, en términos precisos]
- **Acción si cumple:** [qué hace el sistema]
- **Acción si no cumple:** [código HTTP, mensaje, qué retorna]

**Ejemplo:**

### RN1 — Límite de préstamos por tipo de estudiante

- **Trigger:** al recibir `POST /prestamos`.
- **Condición:**
  - Estudiante de pregrado: máximo 3 préstamos con `estado = "activo"`.
  - Estudiante de posgrado: máximo 5 préstamos con `estado = "activo"`.
- **Acción si cumple:** continuar con el flujo de creación.
- **Acción si no cumple:** retornar `409 Conflict` con `{error: "limite_prestamos_alcanzado", limite: N, actuales: M}`.

### RN2 — Bloqueo por préstamos vencidos o multas pendientes

- **Trigger:** al recibir `POST /prestamos`.
- **Condición:** el estudiante no debe tener préstamos con `estado = "vencido"` ni `multas_pendientes > 0`.
- **Acción si cumple:** permitir la creación del préstamo.
- **Acción si no cumple:** retornar `409 Conflict` con `{ error: "bloqueo_por_deudas", motivo: "prestamo_vencido_o_multas" }`.

### RN3 — Plazo de préstamo según tipo de libro

- **Trigger:** al crear un préstamo (`POST /prestamos`).
- **Condición:** si el libro es de `alta_demanda = true`, el préstamo dura 3 días; si no, dura 15 días.
- **Acción si cumple:** establecer `fecha_devolucion_esperada` según el tipo del libro.
- **Acción si no cumple:** retornar `400 Bad Request` si el campo `alta_demanda` no está definido.

### RN4 — Renovación solo si no hay espera por el libro

- **Trigger:** al recibir `PATCH /prestamos/:id/renovar`.
- **Condición:** el préstamo debe estar `activo` y no debe existir una espera explícita para el mismo libro. En esta versión, se valida que el ejemplar no sea de alta demanda con otro préstamo vencido en cola.
- **Acción si cumple:** extender la `fecha_devolucion_esperada` por el mismo plazo original y aumentar `renovaciones`.
- **Acción si no cumple:** retornar `409 Conflict` con `{ error: "renovacion_no_permitida", motivo: "espera_otro_estudiante" }`.

### RN5 — Ejemplar no disponible para préstamo

- **Trigger:** al recibir `POST /prestamos`.
- **Condición:** el ejemplar debe existir y tener `estado = "disponible"`.
- **Acción si cumple:** cambiar el estado del ejemplar a `prestado` y crear el préstamo.
- **Acción si no cumple:** retornar `409 Conflict` con `{ error: "ejemplar_no_disponible" }`.

### RN6 — Cálculo de multa al devolver un préstamo atrasado

- **Trigger:** al recibir `PATCH /prestamos/:id/devolver`.
- **Condición:** si `fecha_devolucion_real` es posterior a `fecha_devolucion_esperada`.
- **Acción si cumple:** calcular multa como `2000 * días_de_retraso`, crear/actualizar la multa asociada y sumar el monto a `multas_pendientes` del estudiante.
- **Acción si no cumple:** marcar el préstamo como `devuelto` sin generar multa.


---


## 6. Decisiones tomadas (lo que el correo no dice)

### D1 — [Decisión que tomaste]

- **Contexto:** [qué hueco había]
- **Decisión:** [qué decidiste]
- **Justificación:** [por qué esta decisión y no otra]

**Ejemplo:**

### D1 — Modelo de libro y ejemplar separados

- **Contexto:** el correo menciona libros con varios ejemplares, pero no define la estructura de datos.
- **Decisión:** representar `Libro` como entidad general y `Ejemplar` como entidad física independiente.
- **Justificación:** permite controlar la disponibilidad de cada unidad física y asegura que un ejemplar prestado no pueda prestarse simultáneamente.

### D2 — Uso de `alta_demanda` como campo booleano

- **Contexto:** el correo describe libros de reserva / alta demanda sin un campo técnico explícito.
- **Decisión:** agregar `alta_demanda` en la entidad `Libro`.
- **Justificación:** facilita determinar el plazo de préstamo y aplicar la regla de 3 días contra 15 días.

### D3 — Fechas en formato ISO 8601

- **Contexto:** el correo no señala el formato de fecha a utilizar.
- **Decisión:** usar ISO 8601 (`YYYY-MM-DD`) para todas las fechas.
- **Justificación:** es un estándar REST claro, fácil de validar y consistente entre endpoints.

### D4 — Estados concretos para préstamos

- **Contexto:** el correo habla de préstamos vigentes, vencidos y devueltos.
- **Decisión:** usar los estados `activo`, `vencido` y `devuelto`.
- **Justificación:** hace la lógica de bloqueo, listado e historial más precisa y evita ambigüedades.

### D5 — Multas pendientes bloquean nuevos préstamos

- **Contexto:** el correo señala que un estudiante con multas pendientes no puede pedir más libros.
- **Decisión:** tratar `multas_pendientes > 0` como condición de bloqueo en `POST /prestamos`.
- **Justificación:** refleja el comportamiento esperado y evita que alumnos con mora sigan generando préstamos.

### D6 — Sin autenticación en la primera versión

- **Contexto:** el correo no menciona inicio de sesión ni roles de usuario.
- **Decisión:** implementar la API sin autenticación ni autorización.
- **Justificación:** reduce el alcance y permite entregar la solución en el plazo definido.

---

## 7. Códigos HTTP usados

| Código | Significado | Cuándo se usa |
|---|---|---|
| 200 | OK | GET exitosos |
| 201 | Created | POST exitosos que crean recursos |
| 400 | Bad Request | Body malformado o validación fallida |
| 404 | Not Found | Recurso no existe |
| 409 | Conflict | Reglas de negocio violadas (límite alcanzado, duplicado, etc.) |
| 500 | Internal Server Error | Error no controlado del servidor |

[Si usas otros, agrégalos.]

---

## 8. Restricciones técnicas

- **Stack:** [Node.js + Express]
- **Persistencia:** datos en memoria. No usar base de datos.
- **TypeScript**.
- **Sin autenticación** en esta versión.
- **Sin frontend** en esta versión. Solo API REST.