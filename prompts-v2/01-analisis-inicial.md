# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #01

**Fecha y hora:** 2026-05-12 21:28

**Propósito en una línea:** Análisis de requerimientos y diseño arquitectónico para la versión 2 del sistema.

**Etapa del taller:** 2

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
Contexto y Objetivo:
Actúa como un Desarrollador Senior Backend. Tu tarea es inicializar la versión 2 de un sistema en la carpeta proyecto-v2. Antes de generar cualquier línea de código, debes leer obligatoriamente el archivo @[02-tu-trabajo/plantilla-especificacion.md] para comprender el dominio y los requisitos de negocio.

Especificaciones Técnicas (Stack):
Runtime: Node.js con Express.
Lenguaje: TypeScript (configuración estricta).
Persistencia: Repositorios en memoria (In-memory Pattern). Prohibido instalar dependencias de bases de datos (SQL/NoSQL).
Seguridad: Sin capas de autenticación o autorización para esta versión.
Interfaz: Únicamente API REST (sin archivos estáticos o vistas).
Testing: Jest para pruebas unitarias y de integración.

Directrices de Arquitectura y Calidad:
Clean Architecture: Implementa una separación clara de capas (Entities, Use Cases, Controllers, Repositories).
Fidelidad: No asumas ni inventes funcionalidades. Si la especificación no menciona un campo o endpoint, no lo crees.
Configuración Base: Antes de la lógica de negocio, genera: package.json, tsconfig.json, .gitignore, README.md, .env.example y la estructura de carpetas de Jest.
Gestión de Ambigüedad: Si un requisito en el MD es contradictorio o incompleto, detente y solicita aclaración.

Protocolo de Ejecución:
Analiza el archivo de especificación.
Presenta una propuesta visual de la estructura de archivos y carpetas (Tree view).
Explica brevemente cómo aplicarás la arquitectura limpia al dominio detectado.
DETENTE: Espera mi aprobación antes de proceder con la creación de archivos o implementación de código.
```

---

### Resumen de la respuesta de la IA

Analicé el archivo de especificación formal, identifiqué las entidades principales (Libro, Ejemplar, Estudiante, Préstamo, Multa) y las reglas de negocio (RN1-RN6). Propuse una estructura de carpetas basada en Clean Architecture y aclaré una ambigüedad sobre la RN4 (Renovación) relacionada con la falta de un sistema de colas/reservas en el alcance actual.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [ x] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [x] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[ que entre mas detalles y requerimientos pidamos en el prompt se tiene mejor control y auditoria  de la creacion del software, tambien es bueno aclarar dudas y se va corroborando la informacion y los procesos de manera incremental]

---
