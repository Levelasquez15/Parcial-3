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

module.exports = {
    esNumero,
    esPar,
    esPositivo
};
