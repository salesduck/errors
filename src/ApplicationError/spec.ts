import { ERROR_UNKNOWN } from '@project/AbstractError';
import { ApplicationError } from '.';

describe('ApplicationError', () => {
    describe('constructor ::', () => {
        it('set default parameters', () => {
            const expected = new ApplicationError();

            expect(expected.message).toBe('Application Error');
            expect(expected.code).toBe(ERROR_UNKNOWN);
        });

        it('set code', () => {
            const expected = new ApplicationError({ code: 'USER_ERROR' });

            expect(expected.code).toBe('USER_ERROR');
        });

        it('set name', () => {
            const expected = new ApplicationError();

            expect(expected.name).toBe('ApplicationError');
        });

        it('add stack', () => {
            const expected = new ApplicationError();

            expect(expected.stack.includes('ApplicationError')).toBeTruthy();
        });

        it('add caused error to stack', () => {
            const expected = new ApplicationError({
                cause: new TypeError('Hello')
            });

            expect(expected.stack.includes('Hello')).toBeTruthy();
        });

        it('add context', () => {
            const expected = new ApplicationError({
                id: 'users'
            });

            expect(expected.stack.includes('users')).toBeTruthy();
        });

        it('add context in nested errors', () => {
            const expected = new ApplicationError({
                cause: new ApplicationError({
                    id: 'users'
                })
            });

            expect(expected.stack.includes('users')).toBeTruthy();
        });
    });

    it('toString ::', () => {
        const expected = new ApplicationError().toString();

        expect(expected.includes('ApplicationError')).toBeTruthy();
    });
});
