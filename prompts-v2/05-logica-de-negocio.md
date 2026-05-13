# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #05

**Fecha y hora:** 2026-05-12 21:59

**Propósito en una línea:** Implementación de Casos de Uso (lógica de negocio), gestión de errores y validación mediante tests de integración.

**Etapa del taller:** 3

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
IMPORTANTE: NUEVO PROTOCOLO DE DOCUMENTACIÓN Y FINALIZACIÓN
Antes de generar cualquier lógica de negocio, establece el siguiente sistema de registro:
Crea una carpeta llamada prompts en la raíz del proyecto.
A partir de ahora, por cada interacción (incluyendo la anterior y esta misma), genera un archivo .md independiente dentro de esa carpeta siguiendo la nomenclatura 01-nombre.md, 02-nombre.md, etc.
El contenido debe seguir estrictamente el formato de # Plantilla — Registro de Prompts...

OBJETIVO: FINALIZACIÓN DE REQUISITOS DE NEGOCIO (FASE 3 Y 4)
Necesito que completes la lógica de negocio restante en este turno. El código debe ser auditable, profesional y seguir el formato de 02-tu-trabajo\plantilla-especificacion.md.

1. Errores de Dominio (src/core/errors/):
Crea los errores personalizados: EstudianteNoEncontradoError, EjemplarNoDisponibleError, LimitePrestamosExcedidoError, EstudianteBloqueadoError (por deuda o mora) y PrestamoNoEncontradoError.

2. Casos de Uso Restantes (src/core/use-cases/):
Implementa la lógica completa para:
SolicitarPrestamoUseCase: Aplica RN1 (límites 3/5), RN2 (bloqueos) y RN3 (plazos 3/15 días).
DevolverLibroUseCase: Al recibir el ejemplar, calcula la multa automáticamente (RN6: $2,000/día de retraso), actualiza el saldoMultas del estudiante y libera el ejemplar.
RenovarPrestamoUseCase: Aplica RN4 (solo si NO es alta demanda).
ConsultarHistorialUseCase: Retorna todos los préstamos pasados y actuales de un estudiante.
PagarMultaUseCase: El endpoint solicitado para limpiar el saldo de multas.

3. Auditoría y Resumen:
Para facilitar mi revisión, al finalizar el código, entrégame un Cuadro de Trazabilidad donde relaciones la RN con el código.

4. Testing de Integración:
Genera un archivo de test tests/integration/flujo-completo.test.ts que simule: Prestamo -> Intento de segundo préstamo con bloqueo -> Devolución tardía -> Verificación de multa acumulada.
```

---

### Resumen de la respuesta de la IA

Implementé el sistema de registro de prompts y la lógica de negocio completa. Creé errores de dominio personalizados para validaciones precisas. Desarrollé los 5 Casos de Uso integrando todas las Reglas de Negocio (RN1-RN6). Entregué un cuadro de trazabilidad para auditar la implementación y validé el sistema mediante un test de integración exitoso que simula un flujo completo de préstamo, mora y bloqueo.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [x ] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [ x] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[ que la implementacion de casos de uso es fundamental para el proyecto y tenerlos bien establecidos desde el principio ayuda mucho a que apartir de esta nueva metodologia se lleguen a implementar correctamente, obtener una mejor calidad ]

---
