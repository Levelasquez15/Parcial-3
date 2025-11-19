# RESPUESTAS - Parcial de Calidad de Software

## Parte 1 – Estrategia

### 1. Diferencia entre CI y CD

**Continuous Integration (CI)**: Es la práctica de integrar código frecuentemente al repositorio principal. Cada integración se verifica automáticamente con builds y pruebas para detectar errores rápidamente. El objetivo es encontrar y resolver problemas de integración tempranamente.

**Continuous Delivery/Deployment (CD)**: Es la práctica de mantener el código en un estado que siempre pueda ser desplegado a producción. Continuous Delivery requiere aprobación manual para desplegar, mientras que Continuous Deployment despliega automáticamente cada cambio que pasa las pruebas.

**Diferencias principales**:
- CI se enfoca en integración y validación del código
- CD se enfoca en la entrega y despliegue automático
- CI es el primer paso, CD viene después
- CI valida que el código funciona, CD lo lleva a producción

### 2. Herramientas seleccionadas

**Lenguaje**: JavaScript/Node.js
- **Justificación**: Es un lenguaje ampliamente usado, con ecosistema maduro de herramientas de testing y CI/CD. Fácil de configurar y tiene buena documentación.

**Linter**: ESLint
- **Justificación**: Es el linter estándar para JavaScript. Detecta errores de sintaxis, problemas de estilo y malas prácticas. Es configurable y tiene reglas recomendadas por la comunidad.

**Herramienta de cobertura**: Jest
- **Justificación**: Jest incluye cobertura de código integrada sin necesidad de configuración adicional. Genera reportes detallados y permite establecer umbrales mínimos. Es rápido y fácil de usar.

### 3. Umbral mínimo de cobertura

**Umbral elegido**: 80%

**Justificación**:
- **70%** sería muy bajo y dejaría muchas partes del código sin probar
- **90%** sería muy estricto y difícil de mantener en desarrollo inicial
- **80%** es un balance razonable que asegura buena cobertura sin ser excesivamente restrictivo
- Permite flexibilidad para código de configuración o casos edge que son difíciles de probar
- Es un estándar común en la industria para proyectos de tamaño medio

---

## Parte 3 – nektos/act

### ¿Qué es act?

`act` es una herramienta open-source que permite ejecutar GitHub Actions localmente en tu máquina. Simula el entorno de GitHub Actions usando contenedores Docker, lo que permite probar workflows antes de hacer push al repositorio.

**Ventajas**:
- Ahorra tiempo al no necesitar hacer commits para probar workflows
- Reduce el uso de minutos de GitHub Actions
- Permite debugging más rápido
- Funciona offline (después de descargar imágenes)

### Requisitos

1. **Docker**: act usa Docker para crear contenedores que simulan el entorno de GitHub Actions
   - Debe estar instalado y corriendo en tu máquina
   - Windows: Docker Desktop
   - Linux: Docker Engine
   - Mac: Docker Desktop

2. **act CLI**: La herramienta de línea de comandos
   - Se instala con package managers (choco, brew, etc.)

### Comando para ejecutar el workflow localmente

```bash
# Ejecutar el workflow completo
act

# Ejecutar solo eventos push
act push

# Ejecutar solo eventos pull_request
act pull_request

# Ver la lista de eventos disponibles
act -l

# Ejecutar en modo dry-run (ver qué se ejecutaría)
act -n

# Usar una imagen Docker específica
act -P ubuntu-latest=node:18
```

**Ejemplo de salida**:
```
[CI Quality Pipeline/quality-check] 🚀  Start image=node:18-bullseye-slim
[CI Quality Pipeline/quality-check]   🐳  docker pull image=node:18-bullseye-slim platform= username= forcePull=false
[CI Quality Pipeline/quality-check]   ✅  Success - Checkout code
[CI Quality Pipeline/quality-check]   ✅  Success - Setup Node.js
[CI Quality Pipeline/quality-check]   ✅  Success - Install dependencies
[CI Quality Pipeline/quality-check]   ✅  Success - Run linter
[CI Quality Pipeline/quality-check]   ✅  Success - Run tests
[CI Quality Pipeline/quality-check]   ✅  Success - Check coverage
```

---

## Parte 4 – Validación y logs

### Identificación de fallos en logs

#### 1. Fallos de Linter

**Indicadores en logs**:
- Mensaje de error de ESLint
- Código de salida diferente de 0
- Lista de archivos y líneas con problemas

**Ejemplo de log de fallo**:
```
Run npm run lint

/home/runner/work/proyecto/src/calculadora.js
  12:5  error  'x' is assigned a value but never used  no-unused-vars
  15:1  error  Expected indentation of 4 spaces but found 2  indent

✖ 2 problems (2 errors, 0 warnings)

Error: Process completed with exit code 1.
```

**Cómo identificarlo**:
- Buscar líneas que empiezan con "error" o "warning"
- Ver el código de salida (exit code 1 = fallo)
- Los errores muestran archivo, línea y regla violada

#### 2. Fallos de Pruebas

**Indicadores en logs**:
- Tests marcados con ✕ (cruz)
- Mensaje "FAIL" en color rojo
- Stack trace del error
- Resumen con número de tests fallidos

**Ejemplo de log de fallo**:
```
Run npm test

FAIL tests/calculadora.test.js
  Calculadora
    ✓ sumar dos numeros positivos (3 ms)
    ✕ dividir por cero lanza error (5 ms)

  ● Calculadora › dividir por cero lanza error

    expect(received).toThrow(expected)

    Expected substring: "No se puede dividir por cero"
    Received function did not throw

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total

Error: Process completed with exit code 1.
```

**Cómo identificarlo**:
- Buscar "FAIL" en los logs
- Ver resumen al final: "X failed, Y passed"
- Leer el stack trace para entender qué falló

#### 3. Fallos de Cobertura

**Indicadores en logs**:
- Tabla de cobertura con porcentajes en rojo
- Mensaje: "Coverage threshold not met"
- Lista de archivos que no cumplen el umbral

**Ejemplo de log de fallo**:
```
Run npm run test:coverage

----------|---------|----------|---------|---------|
File      | % Stmts | % Branch | % Funcs | % Lines |
----------|---------|----------|---------|---------|
All files |   65.21 |    50.00 |   71.42 |   65.21 |
 calculadora.js | 60.00 | 50.00 | 66.66 | 60.00 |
 validador.js   | 70.00 | 50.00 | 75.00 | 70.00 |
----------|---------|----------|---------|---------|

Jest: "global" coverage threshold for branches (80%) not met: 50%
Jest: "global" coverage threshold for statements (80%) not met: 65.21%

Error: Process completed with exit code 1.
```

**Cómo identificarlo**:
- Ver la tabla de cobertura al final de los tests
- Buscar mensaje "coverage threshold not met"
- Comparar porcentajes con el umbral configurado (80%)

### Diferencia entre run exitoso y fallido

#### Run Exitoso ✅
- Todos los pasos tienen check verde (✓)
- No hay mensajes de error
- Exit code = 0
- Cobertura cumple o supera el umbral
- Todas las pruebas pasan
- Sin errores de linting

#### Run Fallido ❌
- Al menos un paso tiene cruz roja (✕)
- Mensajes de error en rojo
- Exit code = 1 (o diferente de 0)
- Workflow se detiene en el primer error
- Badge de status muestra "failing"

---

## Parte 5 – IA y Ética

### Métodos para detectar código generado por IA

#### 1. Análisis de patrones de escritura y estilo

**Características del código generado por IA**:
- Comentarios excesivamente descriptivos y formales
- Nombres de variables genéricos (data, result, temp)
- Estructura muy uniforme y "perfecta"
- Manejo exhaustivo de excepciones incluso en casos simples
- Falta de inconsistencias típicas de código humano
- Uso de patrones muy modernos o muy conservadores consistentemente

**Herramientas**:
- GPTZero: Analiza probabilidad de contenido generado por IA
- Copyleaks: Detector de contenido AI
- Análisis manual comparando con código previo del estudiante

**Limitaciones**:
- No es 100% preciso
- Código simple puede parecer generado por IA
- Un estudiante puede tener estilo similar a IA

#### 2. Análisis de historial y comportamiento de commits

**Indicadores sospechosos**:
- Commits muy grandes con código completo de una vez
- Falta de commits incrementales o correcciones de errores
- Código perfecto sin iteraciones
- Timestamps sospechosos (todo en minutos)
- Falta de commits de debugging o prueba-error
- Mensajes de commit genéricos ("Update file", "Fix bug")

**Análisis manual**:
- Revisar git log y ver progresión
- Pedir explicación en vivo del código
- Hacer preguntas específicas sobre decisiones de diseño
- Solicitar modificaciones en tiempo real

**Limitaciones**:
- Estudiantes pueden simular comportamiento humano
- Código puede ser copiado y commiteado gradualmente

### ¿Por qué no es posible asegurar al 100% la autoría?

1. **Falsos positivos**: Código bien escrito y documentado puede parecer generado por IA
2. **Evolución de la IA**: Las IAs mejoran constantemente y pueden imitar mejor el estilo humano
3. **Híbrido humano-IA**: Estudiantes pueden usar IA como referencia y modificar el código
4. **Limitaciones técnicas**: Los detectores no son perfectos y pueden equivocarse
5. **Variabilidad humana**: Algunos desarrolladores escriben código muy limpio naturalmente
6. **Código simple**: Problemas básicos tienen soluciones estándar que IA y humanos escriben similar

### Políticas razonables de uso de IA en educación

#### Para estudiantes:

**Permitido**:
- Usar IA para explicar conceptos que no se entienden
- Pedir ejemplos de sintaxis o uso de librerías
- Debugging: entender mensajes de error
- Generar ideas o enfoques (no código completo)
- Revisar código propio y sugerir mejoras

**No permitido**:
- Copiar código directamente sin entender
- Pedir a la IA que resuelva el ejercicio completo
- Usar código generado sin citarlo
- Reemplazar el proceso de aprendizaje

#### Para instituciones:

1. **Transparencia**: Definir claramente qué uso de IA es aceptable
2. **Citar siempre**: Si se usa IA, debe referenciarse
3. **Evaluación mixta**: Combinar código entregado con explicaciones en vivo
4. **Enfoque en comprensión**: Evaluar entendimiento, no solo código
5. **Adaptación**: Reconocer que IA es parte del desarrollo moderno

#### Para calidad de software:

1. **IA como herramienta**: Usarla para acelerar, no reemplazar aprendizaje
2. **Code review humano**: Siempre revisar código generado por IA
3. **Pruebas exhaustivas**: Código de IA también necesita testing
4. **Documentación**: Explicar decisiones de diseño (IA no lo hace bien)
5. **Responsabilidad**: El desarrollador es responsable del código, sin importar quién lo escribió

### Conclusión

El uso ético de IA en educación requiere balance entre aprovechar la tecnología y asegurar el aprendizaje real. La clave es la transparencia, la comprensión y el uso responsable.
