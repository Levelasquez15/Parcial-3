// Funciones de validación

function esNumero(valor) {
    return typeof valor === 'number' && !isNaN(valor);
}

function esPar(numero) {
    if (!esNumero(numero)) {
        throw new Error('El valor debe ser un número');
    }
    return numero % 2 === 0;
}

function esPositivo(numero) {
    if (!esNumero(numero)) {
        throw new Error('El valor debe ser un número');
    }
    return numero > 0;
}

function esPrimo(numero) {
    if (!esNumero(numero)) {
        throw new Error('El valor debe ser un número');
    }
    if (numero <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

function estaEnRango(numero, min, max) {
    if (!esNumero(numero) || !esNumero(min) || !esNumero(max)) {
        throw new Error('Todos los valores deben ser números');
    }
    return numero >= min && numero <= max;
}

function esEmailValido(email) {
    if (typeof email !== 'string') {
        return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function longitudValida(texto, minLength, maxLength) {
    if (typeof texto !== 'string') {
        throw new Error('El valor debe ser una cadena de texto');
    }
    const longitud = texto.length;
    return longitud >= minLength && longitud <= maxLength;
}

module.exports = {
    esNumero,
    esPar,
    esPositivo,
    esPrimo,
    estaEnRango,
    esEmailValido,
    longitudValida
};
