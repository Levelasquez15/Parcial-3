# Parcial - Calidad de Software Avanzado

Proyecto de CI/CD con GitHub Actions, linters y pruebas automatizadas.

## Tecnologías utilizadas

- **Lenguaje**: JavaScript (Node.js)
- **Linter**: ESLint
- **Framework de pruebas**: Jest
- **Herramienta de cobertura**: Jest (integrado)
- **CI/CD**: GitHub Actions

## Requisitos previos

- Node.js v18 o superior
- npm (viene con Node.js)
- Git

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/Parcial-3.git
cd Parcial-3
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias definidas en `package.json`:
- ESLint (linter)
- Jest (testing y cobertura)

## Cómo ejecutar el proyecto

### Ejecutar el linter

Verifica que el código cumple con las reglas de estilo:

```bash
npm run lint
```

**Salida esperada**: Sin errores si el código está bien formateado.

### Ejecutar las pruebas

Ejecuta todos los tests unitarios:

```bash
npm test
```

**Salida esperada**: 
```
Test Suites: 2 passed, 2 total
Tests:       19 passed, 19 total
```

### Verificar cobertura de código

Ejecuta las pruebas y genera reporte de cobertura:

```bash
npm run test:coverage
```

**Salida esperada**: Tabla con porcentajes de cobertura (debe ser ≥80%).

### Ejecutar todo el pipeline localmente

Para simular lo que hace GitHub Actions:

```bash
npm run lint
npm test
npm run test:coverage
```

O en una sola línea:

```bash
npm run lint && npm test && npm run test:coverage
```

## Pipeline CI/CD

El workflow `ci-quality.yml` se ejecuta en cada push o pull request a la rama main.

### Pasos del pipeline:

1. **Checkout code**: Descarga el código del repositorio
2. **Setup Node.js**: Configura Node.js v18
3. **Install dependencies**: Instala las dependencias con npm
4. **Run linter**: Ejecuta ESLint para validar el código
5. **Run tests**: Ejecuta las pruebas unitarias
6. **Check coverage**: Verifica que la cobertura cumpla el umbral mínimo (80%)

Si algún paso falla, el pipeline se detiene y el run se marca como fallido.

## Uso de nektos/act

### ¿Qué es act?

`act` es una herramienta que permite ejecutar GitHub Actions localmente usando Docker. Esto permite probar los workflows antes de hacer push al repositorio.


### Ejecutar el workflow localmente

```bash
# Ejecutar el workflow completo
act

# Ejecutar solo en eventos push
act push

# Ver qué trabajos se ejecutarían sin ejecutarlos
act -n
```

**Nota**: La primera vez que ejecutes act, descargará las imágenes Docker necesarias.

## Umbral de cobertura

Se ha establecido un umbral mínimo de **80%** para:
- Cobertura de ramas (branches)
- Cobertura de funciones (functions)
- Cobertura de líneas (lines)
- Cobertura de statements

Este umbral asegura que la mayoría del código está probado, sin ser demasiado estricto para desarrollo inicial.


