# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #04

**Fecha y hora:** 2026-05-12 21:49

**Propósito en una línea:** Resolución de errores de compilación por rutas relativas y dependencias faltantes.

**Etapa del taller:** 2

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
Explain what this problem is and help me fix it: Cannot find module '../core/entities/Estudiante' or its corresponding type declarations. @[c:\Users\stfra\Desktop\pruebasSoftware\quality-guardian-biblioteca\fork\brief-biblioteca-ucaldas\proyecto-v2\src\infrastructure\persistence\InMemoryDatabase.ts:L1]

Explain what this problem is and help me fix it: Cannot find module 'uuid' or its corresponding type declarations. @[c:\Users\stfra\Desktop\pruebasSoftware\quality-guardian-biblioteca\fork\brief-biblioteca-ucaldas\proyecto-v2\src\infrastructure\persistence\seed.ts:L1]
```

---

### Resumen de la respuesta de la IA

Identifiqué que los errores se debían a rutas relativas incorrectas (faltaba subir un nivel adicional `../../` para salir de la carpeta de persistencia hacia el core) y a que las dependencias declaradas en `package.json` no se habían instalado físicamente. Corregí los imports en `InMemoryDatabase.ts` y ejecuté `npm install` en el directorio del proyecto para resolver los módulos faltantes.

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

[ solucion a errores de compilacion, y rutas relativas ]

---
