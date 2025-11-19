# Parcial - Calidad de Software Avanzado

Proyecto de CI/CD con GitHub Actions, linters y pruebas automatizadas.

## Tecnologías utilizadas

- **Lenguaje**: JavaScript (Node.js)
- **Linter**: ESLint
- **Framework de pruebas**: Jest
- **Herramienta de cobertura**: Jest (integrado)
- **CI/CD**: GitHub Actions

## Instalación

```bash
npm install
```

## Scripts disponibles

- `npm run lint` - Ejecuta el linter ESLint
- `npm test` - Ejecuta las pruebas unitarias
- `npm run test:coverage` - Ejecuta pruebas con reporte de cobertura

## Estructura del proyecto

```
.
├── src/
│   ├── calculadora.js
│   └── validador.js
├── tests/
│   ├── calculadora.test.js
│   └── validador.test.js
├── .github/
│   └── workflows/
│       └── ci-quality.yml
├── .eslintrc.json
├── jest.config.js
└── package.json
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

### Requisitos

- Docker instalado y en ejecución
- act instalado (https://github.com/nektos/act)

### Instalación de act

**Windows (con Chocolatey):**
```bash
choco install act-cli
```

**Linux/Mac:**
```bash
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

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

## Autor

Estudiante de Calidad de Software Avanzado
