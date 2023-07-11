import { AbstractError, ERROR_UNKNOWN } from '.';

class SomeError extends AbstractError {}

describe('AbstractError', () => {
    describe('constructor ::', () => {
        it('set defaults', () => {
            const expected = new SomeError();

            expect(expected.message).toBe('Unknown error');
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

        it('add cause', () => {
            const expected = new SomeError({ cause: new SomeError() });

            expect(expected.cause instanceof Error).toBeTruthy();
        });

        it('capture metadata', () => {
            const expected = new SomeError({ age: 18, cause: new SomeError({ name: 'user' }) });

            expect(expected.stack.includes('age = 18')).toBeTruthy();
            expect(expected.cause.stack.includes('name = "user"')).toBeTruthy();
        });

        it('add cause to stack', () => {
            const expected = new SomeError({ message: 'Hello', cause: new SomeError({ message: 'World' }) });

            expect(expected.stack.includes('World')).toBeTruthy();
            expect(expected.stack.includes('Hello')).toBeTruthy();
        });
    });

    describe('stringify', () => {
        it('message and code will be stringify', () => {
            const expected = new SomeError({ message: 'Hello' });

            expect(JSON.stringify(expected)).toBe('{"message":"Hello","code":"UNKNOWN"}');
        });
    });

    describe('toString ::', () => {
        it('return stack trace', () => {
            const expected = new SomeError({ message: 'Hello' });

            expect(expected.toString().includes('Hello')).toBeTruthy();
        });
    });
});
