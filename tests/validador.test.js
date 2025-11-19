const { esNumero, esPar, esPositivo, esPrimo, estaEnRango, esEmailValido, longitudValida } = require('../src/validador');

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

    test('esPrimo identifica numeros primos', () => {
        expect(esPrimo(7)).toBe(true);
        expect(esPrimo(4)).toBe(false);
        expect(esPrimo(1)).toBe(false);
    });

    test('esPrimo valida numeros primos grandes', () => {
        expect(esPrimo(17)).toBe(true);
        expect(esPrimo(20)).toBe(false);
    });

    test('estaEnRango valida si numero esta en rango', () => {
        expect(estaEnRango(5, 1, 10)).toBe(true);
        expect(estaEnRango(15, 1, 10)).toBe(false);
    });

    test('estaEnRango lanza error si parametros no son numeros', () => {
        expect(() => estaEnRango('5', 1, 10)).toThrow('Todos los valores deben ser números');
    });

    test('esEmailValido valida formato de email', () => {
        expect(esEmailValido('test@example.com')).toBe(true);
        expect(esEmailValido('correo.valido@dominio.org')).toBe(true);
        expect(esEmailValido('invalido')).toBe(false);
        expect(esEmailValido('sin@dominio')).toBe(false);
    });

    test('esEmailValido retorna falso si no es string', () => {
        expect(esEmailValido(123)).toBe(false);
    });

    test('longitudValida verifica longitud de texto', () => {
        expect(longitudValida('hola', 3, 10)).toBe(true);
        expect(longitudValida('hi', 3, 10)).toBe(false);
    });

    test('longitudValida lanza error si no es string', () => {
        expect(() => longitudValida(123, 1, 10)).toThrow('El valor debe ser una cadena de texto');
    });
});
