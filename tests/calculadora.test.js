const { sumar, restar, multiplicar, dividir } = require('../src/calculadora');

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

    test('multiplicar dos numeros', () => {
        expect(multiplicar(3, 4)).toBe(12);
    });

    test('dividir dos numeros', () => {
        expect(dividir(10, 2)).toBe(5);
    });

    test('dividir por cero lanza error', () => {
        expect(() => dividir(10, 0)).toThrow('No se puede dividir por cero');
    });
});
