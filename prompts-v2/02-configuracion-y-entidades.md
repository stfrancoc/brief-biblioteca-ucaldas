# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #02

**Fecha y hora:** 2026-05-12 21:38

**Propósito en una línea:** Configuración del entorno de desarrollo y definición de entidades de dominio.

**Etapa del taller:** 2

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
Análisis aprobado. Tu interpretación de la RN4 (Renovación) es la más lógica dado el alcance: la renovación solo se denegará si el libro es de 'Alta Demanda'.

Para proceder con la creación de la configuración base y las Entities, integra estas especificaciones finales derivadas de la comunicación con el cliente:

1. Ajustes en el Modelo de Datos (Entities):
Estudiante: Debe incluir codigoUnico, nombre, programaAcademico, semestre, tipo (PREGRADO/POSGRADO) y un campo saldoMultas (numérico).
Libro: Debe incluir codigoInventario, titulo, autor, sala y un flag esAltaDemanda.
Ejemplar: Cada uno debe tener su propio ID único, vinculado a un Libro, y un estado (DISPONIBLE/PRESTADO).

2. Lógica de Negocio Refinada:
Límites de Préstamo: Pregrado (máx. 3), Posgrado (máx. 5).
Bloqueos: Un estudiante no puede prestar si tiene al menos un libro vencido o si su saldoMultas es > 0.
Cálculo de Multas: Al registrar la devolución, el sistema debe calcular $2,000 por cada día de retraso y sumarlo al saldoMultas del estudiante de forma persistente (en memoria).

3. Endpoints Adicionales Necesarios:
Implementa un endpoint POST /estudiantes/:id/pagar-multas que reinicie el saldoMultas a 0 para permitir nuevos préstamos.
Implementa un endpoint GET /prestamos/vencidos para listar los préstamos cuya fecha de devolución sea menor a la fecha actual.

4. Persistencia y Pruebas:
Como la persistencia es en memoria, crea un Data Seed inicial con al menos 5 libros (algunos con varios ejemplares) y 3 estudiantes de prueba para facilitar el testing inmediato.

ACCIONES A SEGUIR:
Genera los archivos de configuración base (package.json, tsconfig.json, jest.config.ts, .env.example).
Implementa las Entities en src/core/entities/.
Muestra el código de estas entidades y la estructura final del package.json antes de pasar a los Use Cases.
```

---

### Resumen de la respuesta de la IA

Inicialicé el proyecto `sistema-biblioteca-v2` con TypeScript y Jest. Creé los archivos de configuración (`package.json`, `tsconfig.json`, `jest.config.ts`, `.env.example`, `.gitignore`) y establecí la estructura de carpetas de Clean Architecture. Implementé las interfaces de dominio (`Estudiante`, `Libro`, `Ejemplar`, `Prestamo`, `Multa`) en `src/core/entities/` siguiendo los ajustes finales del cliente.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [x] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [x ] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[que se puede tener una verificacion mas especifica del codigo que se genera, y sobre todo que se valide que lo que necesitamos si cumpla con lo que se requiera]

---
