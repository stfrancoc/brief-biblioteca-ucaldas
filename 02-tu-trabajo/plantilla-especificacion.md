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
-consultar el catologo de libros disponibles y su estado de prestamo
-tomar prestamos
-devolver libros 
-calcular multas
-renovar prestamos
-consultar el historial de prestamos 
-consultar que estudiantes tienen prestamos vigentes
-notificar sobre prestamos vencidos
-manejar libros con varios ejemplares
-consultar prestamos de estudiantes de pregrado
-consultar prestamos de estudiantes de posgrado
]

**Explícitamente fuera del alcance:**

- [Lista lo que el correo menciona pero NO se va a implementar. Por ejemplo: el caso de los profesores investigadores.
-los profesores investigadores, por ahora no se van a implementar en el sistema
-el frontend por ahora solo vamos hacer la api rest
-la persistencia de datos por ahora va ser en memoria
]

---

## 3. Modelo de datos

### Entidad: Libro

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

### Entidad: Ejemplar

[Repite la tabla. Cada libro puede tener varios ejemplares. Decide tú la estructura.
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico del ejemplar
| 'libro_id'| string   | si          | identificador unico del libro
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

[Tabla de campos. Aquí va estudiante_id, ejemplar_id, fecha_prestamo, fecha_devolucion_esperada, fecha_devolucion_real, estado, etc.
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico del prestamo
| 'estudiante_id'| string   | si          | identificador unico del estudiante
| 'ejemplar_id'| string   | si          | identificador unico del ejemplar
| 'fecha_prestamo'| string   | si          | fecha en que se realizo el prestamo
| 'fecha_devolucion_esperada'| string   | si          | fecha en que se esperaba la devolucion del libro
| 'fecha_devolucion_real'| string   | si          | fecha en que se realizo la devolucion del libro
| 'estado'  | string   | si          | estado del prestamo
]


### Entidad: Multa

[Tabla de campos
| Campo     | Tipo     | Obligatorio | Descripción   |
| `[campo]` | `[tipo]` | sí/no       | [descripción] |
| 'id'      | string   | si          | identificador unico de la multa
| 'prestamo_id'| string   | si          | identificador unico del prestamo
| 'monto'   | number   | si          | monto de la multa
| 'fecha_pago'| string   | si          | fecha en que se realizo el pago
| 'estado'  | string   | si          | estado de la multa

]

### Diagrama de relaciones

```
[Dibuja con texto las relaciones. Por ejemplo:

Libro 1 --- N Ejemplar
Estudiante 1 --- N Prestamo
Ejemplar 1 --- N Prestamo (a lo largo del tiempo)
Prestamo 0..1 --- 1 Multa


]
```

---

## 4. Endpoints REST

| Método | Ruta | Propósito | Body / Query | Respuesta éxito | Códigos error posibles |
|---|---|---|---|---|---|
| `GET` | `/libros` | Listar catálogo | filtros opcionales | `200` con lista | - |
| `GET` | `/libros/:id` | Detalle libro | - | `200` con objeto | `404` |
| `POST` | `/prestamos` | Crear préstamo | `{estudiante_id, ejemplar_id}` | `201` con préstamo | `400`, `404`, `409` |
| ... | ... | ... | ... | ... | ... |

[Llena la tabla con todos los endpoints que necesitas. Mínimo 8.]

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

[Llena RN2, RN3, RN4... hasta cubrir todas las reglas del correo.]

### RN2 — [...]

[...]

### RN3 — [...]

[...]


---

## 6. Decisiones tomadas (lo que el correo no dice)

### D1 — [Decisión que tomaste]

- **Contexto:** [qué hueco había]
- **Decisión:** [qué decidiste]
- **Justificación:** [por qué esta decisión y no otra]

**Ejemplo:**

### D1 — Cálculo de días para multa

- **Contexto:** el correo no precisa si los días de retraso son calendario o hábiles.
- **Decisión:** usar días calendario.
- **Justificación:** es la interpretación más simple y se alinea con lo que la mayoría de bibliotecas hacen.

[Mínimo 5 decisiones documentadas.]

### D2, D3, D4, D5...

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