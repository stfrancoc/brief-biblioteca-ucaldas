# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #03

**Fecha y hora:** 2026-05-12 21:44

**Propósito en una línea:** Implementación de la capa de persistencia en memoria y generación de datos de prueba (Seed).

**Etapa del taller:** 2

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
Excelente avance. La configuración base y la definición de las entidades son sólidas. El uso de uuid y la estructura del package.json son correctos para un entorno profesional de TypeScript.

Aprobado. Puedes proceder con la Fase 2: Persistencia y Seed, siguiendo estas directrices técnicas:

1. Definición de Contratos (Interfaces):
Antes de implementar, define las interfaces en src/core/repositories/ (ej. IEstudianteRepository, ILibroRepository, IPrestamoRepository). Esto es vital para mantener el desacoplamiento de la Clean Architecture.

2. Implementación In-Memory (src/infrastructure/persistence/):
Usa el patrón Singleton o inyecta una instancia única de la 'Base de Datos' en memoria (usando Map o Array) para asegurar la consistencia de los datos en toda la aplicación.
Asegúrate de que el PrestamoRepository incluya métodos para buscar préstamos activos por estudianteId y para listar préstamos vencidos.

3. Implementación del Data Seed (src/infrastructure/persistence/seed.ts):
Crea una función de inicialización que cargue los siguientes datos de prueba:
Estudiantes:
1 Estudiante de Pregrado con 0 préstamos (Limpio).
1 Estudiante de Posgrado que ya tenga 5 préstamos activos (Para probar el límite).
1 Estudiante con saldoMultas: 5000 (Para probar el bloqueo por deuda).
Libros y Ejemplares:
3 Libros estándar (con 2 ejemplares cada uno).
2 Libros de 'Alta Demanda' (con 1 ejemplar cada uno).

4. Próximo Paso (Use Cases):
Una vez termines la persistencia, prepárate para el SolicitarPrestamoUseCase. La lógica debe validar:
Existencia de estudiante y ejemplar.
Disponibilidad del ejemplar.
Límite de préstamos según tipo de estudiante.
Bloqueo por multas o libros vencidos.

Muestra la implementación del InMemoryPrestamoRepository y el archivo del Seed antes de continuar con la lógica de los casos de uso.
```

---

### Resumen de la respuesta de la IA

Definí las interfaces de repositorio (`src/core/repositories/`) para desacoplar el dominio. Implementé `InMemoryDatabase` como un Singleton y creé los repositorios concretos en `src/infrastructure/persistence/`. Finalmente, desarrollé el motor de `seed.ts` para inicializar el sistema con estudiantes en diversos estados (limpio, al límite, con deuda) y libros con múltiples ejemplares para facilitar las pruebas.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [ x] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [ x] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[ ]

---
