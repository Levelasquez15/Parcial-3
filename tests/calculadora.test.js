const { sumar, restar, multiplicar, dividir, potencia, raizCuadrada, promedio } = require('../src/calculadora');

describe('Calculadora', () => {
    test('sumar dos numeros positivos', () => {
        expect(sumar(2, 3)).toBe(5);
    });

    test('sumar numeros negativos', () => {
        expect(sumar(-5, -3)).toBe(-8);
    });

    test('restar dos numeros', () => {
        expect(restar(10, 4)).toBe(6);
    });

    test('restar resultado negativo', () => {
        expect(restar(3, 10)).toBe(-7);
    });

    test('multiplicar dos numeros', () => {
        expect(multiplicar(3, 4)).toBe(12);
    });

    test('multiplicar por cero', () => {
        expect(multiplicar(5, 0)).toBe(0);
    });

    test('dividir dos numeros', () => {
        expect(dividir(10, 2)).toBe(5);
    });

    test('dividir por cero lanza error', () => {
        expect(() => dividir(10, 0)).toThrow('No se puede dividir por cero');
    });

    test('calcular potencia de un numero', () => {
        expect(potencia(2, 3)).toBe(8);
    });

    test('potencia de base cero', () => {
        expect(potencia(0, 5)).toBe(0);
    });

    test('raiz cuadrada de numero positivo', () => {
        expect(raizCuadrada(16)).toBe(4);
    });

    test('raiz cuadrada de numero negativo lanza error', () => {
        expect(() => raizCuadrada(-4)).toThrow('No se puede calcular raiz de numero negativo');
    });

    test('calcular promedio de array de numeros', () => {
        expect(promedio([2, 4, 6])).toBe(4);
    });

    test('promedio con array vacio lanza error', () => {
        expect(() => promedio([])).toThrow('Debe proporcionar un array con al menos un numero');
    });

    test('promedio con parametro no array lanza error', () => {
        expect(() => promedio(5)).toThrow('Debe proporcionar un array con al menos un numero');
    });
});
