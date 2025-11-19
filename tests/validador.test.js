const { esNumero, esPar, esPositivo } = require('../src/validador');

describe('Validador', () => {
    test('esNumero valida correctamente un numero', () => {
        expect(esNumero(5)).toBe(true);
        expect(esNumero('5')).toBe(false);
    });

    test('esPar identifica numeros pares', () => {
        expect(esPar(4)).toBe(true);
        expect(esPar(5)).toBe(false);
    });

    test('esPar lanza error si no es numero', () => {
        expect(() => esPar('texto')).toThrow('El valor debe ser un número');
    });

    test('esPositivo identifica numeros positivos', () => {
        expect(esPositivo(10)).toBe(true);
        expect(esPositivo(-5)).toBe(false);
    });

    test('esPositivo lanza error si no es numero', () => {
        expect(() => esPositivo('texto')).toThrow('El valor debe ser un número');
    });
});
