import { AbstractError, ERROR_UNKNOWN } from '.';

class SomeError extends AbstractError {}

describe('AbstractError', () => {
    describe('constructor ::', () => {
        it('set defaults', () => {
            const expected = new SomeError();

            expect(expected.message).toBe('Unknown Error');
            expect(expected.code).toBe(ERROR_UNKNOWN);
        });

        it('set code', () => {
            const expected = new SomeError({ code: 'USER_ERROR' });

            expect(expected.code).toBe('USER_ERROR');
        });

        it('set name', () => {
            const expected = new SomeError();

            expect(expected.name).toBe('SomeError');
        });

        it('extends Error', () => {
            const expected = new SomeError();

            expect(expected instanceof Error).toBeTruthy();
        });

        it('add stack', () => {
            const expected = new SomeError();

            expect(expected.stack.includes('AbstractError/spec.ts')).toBeTruthy();
        });
    });

    describe('toString ::', () => {
        it('return stack trace', () => {
            const expected = new SomeError({ message: 'Hello' });

            expect(expected.toString().includes('Hello')).toBeTruthy();
        });
    });
});
