# Plantilla — Registro de Prompts

> **Cómo usar esta plantilla:** copia este archivo y renómbralo `01-generacion-inicial.md`, `02-correccion-X.md`, etc. Llena un archivo por cada prompt que envíes a la IA.

---

## Prompt #01

**Fecha y hora:** 2026-05-12 16:53

**Propósito en una línea:** Generar la estructura inicial de una API REST en Node.js para gestión de biblioteca.

**Etapa del taller:** 1

**IA usada:** Gemini 3 Flash

---

### Prompt enviado (literal)

```
en la carpeta proyecto-v1 en la raiz, contruye una api rest en node.js para gestionar prestamos de libros de una biblioteca universitaria. necesito endpoints para listar libros, crear prestamos, devolver libros y consultar prestamos vigentes. usa express, datos en memoria 
```

---

### Resumen de la respuesta de la IA

Creé la carpeta `proyecto-v1`, inicialicé el proyecto con `npm init -y` e instalé la dependencia `express`. Implementé el archivo `index.js` con un sistema de datos en memoria para libros y préstamos, incluyendo los 4 endpoints solicitados. También configuré el script `start` en `package.json` y generé un `README.md` con instrucciones de uso.

---

### Mi evaluación

**¿La respuesta cumplió con lo que pedí?**

- [ ] Completamente.
- [ ] Parcialmente. Faltó: [...]
- [ ] No, se desvió. Hizo: [...]

**¿La acepté tal cual o la modifiqué?**

- [ ] Tal cual.
- [ ] La modifiqué a mano. Cambios: [...]
- [ ] Le pedí corrección con un prompt nuevo (ver prompt #[N+1]).
- [ ] La rechacé completamente. Razón: [...]

**¿Qué aprendí de esta interacción?**

[ ]

---
