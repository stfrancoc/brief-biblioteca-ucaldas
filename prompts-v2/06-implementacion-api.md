# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #06

**Fecha y hora:** 2026-05-12 22:41

**Propósito en una línea:** Implementación de la capa de interfaz (API REST) y configuración del servidor Express.

**Etapa del taller:** 4

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
Excelente trabajo con la organización de los registros en prompts-v2/. Ahora que la lógica de negocio está blindada, vamos a finalizar la Etapa 4: Interfaz de Entrada (API REST).

Objetivo: Exponer los casos de uso a través de Express y asegurar que el sistema sea totalmente funcional.

1. Controladores (src/infrastructure/controllers/):
Crea controladores que orquesten los casos de uso. Deben manejar las respuestas HTTP correctamente:
201 Created para préstamos exitosos.
200 OK para devoluciones, renovaciones y consultas.
400 Bad Request o 403 Forbidden cuando se disparen los Errores de Dominio...
404 Not Found si no existe el estudiante o ejemplar.

2. Rutas (src/infrastructure/routes/):
Define los siguientes endpoints de forma limpia:
POST /prestamos
PATCH /prestamos/:id/devolucion
PATCH /prestamos/:id/renovacion
GET /estudiantes/:id/historial
POST /estudiantes/:id/pagar-multas
GET /libros

3. Servidor y Middleware (src/infrastructure/webserver/):
Configura app.ts con Express, cors, helmet y express.json().
Crea un Middleware de manejo de errores global...
El archivo main.ts debe inicializar el Data Seed antes de levantar el servidor.

4. Documentación y Registro:
Genera el archivo 06-implementacion-api.md en la carpeta prompts-v2/.
Incluye al final de tu respuesta un ejemplo de cómo hacer una petición curl...
```

---

### Resumen de la respuesta de la IA

Completé la Etapa 4 implementando la infraestructura de red. Creé controladores específicos para Préstamos, Estudiantes y Libros, asegurando el mapeo correcto de errores de dominio a códigos HTTP (403 para bloqueos, 404 para recursos inexistentes, etc.). Configuré el servidor Express con seguridad (Helmet) y CORS, e implementé un manejador de errores global para centralizar la lógica de respuesta. El sistema ahora se auto-inicializa con datos de prueba al arrancar.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [x] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [x] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[ ]

---
