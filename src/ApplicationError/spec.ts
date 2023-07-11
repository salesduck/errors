import { AbstractError } from '@project/AbstractError';
import { ApplicationError } from '.';

describe('ApplicationError', () => {
    describe('constructor ::', () => {
        it('set defaults', () => {
            const expected = new ApplicationError();

            expect(expected.message).toBe('Application error');
        });

        it('extends AbstractError', () => {
            const expected = new ApplicationError();

            expect(expected instanceof AbstractError).toBeTruthy();
        });
    });
});
