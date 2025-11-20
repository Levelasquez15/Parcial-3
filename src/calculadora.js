// Funciones básicas para el proyecto

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        throw new Error('No se puede dividir por cero');
    }
    return a / b;
}

function potencia(base, exponente) {
    return Math.pow(base, exponente);
}

function raizCuadrada(numero) {
    if (numero < 0) {
        throw new Error('No se puede calcular raiz de numero negativo');
    }
    return Math.sqrt(numero);
}

function promedio(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
        throw new Error('Debe proporcionar un array con al menos un numero');
    }
    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }
    return suma / numeros.length;
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    dividir,
    potencia,
    raizCuadrada,
    promedio
};
