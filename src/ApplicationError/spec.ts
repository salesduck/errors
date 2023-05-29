import { AbstractError } from '@project/AbstractError';
import { ApplicationError } from '.';

describe('ApplicationError', () => {
    describe('constructor ::', () => {
        it('set defaults', () => {
            const expected = new ApplicationError();

            expect(expected.message).toBe('Application Error');
        });

        it('extends AbstractError', () => {
            const expected = new ApplicationError();

            expect(expected instanceof AbstractError).toBeTruthy();
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
});
