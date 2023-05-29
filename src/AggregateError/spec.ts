import { ApplicationError } from '@project/ApplicationError';
import { AggregateError } from '.';

describe('AggregateError', () => {
    describe('constructor ::', () => {
        it('defaults', () => {
            const expected = new AggregateError();

            expect(expected.errors).toEqual([]);
            expect(expected.message).toBe('Aggregate Error');
            expect(expected.stack).toBe('AggregateError: Aggregate Error\n  ');
        });

        it('with some errors', () => {
            const expected = new AggregateError(
                [new TypeError('Id can not be boolean'), new ApplicationError({ message: 'User not found' })],
                'Validation error'
            );

            expect(expected.message).toBe('Validation error');
            expect(expected.errors.length).toBe(2);
            expect(expected.stack.includes('Id can not be boolean')).toBeTruthy();
            expect(expected.stack.includes('User not found')).toBeTruthy();
        });
    });

    describe('toString ::', () => {
        it('some errors', () => {
            const expected = new AggregateError([new TypeError('Hello')], 'User');

            expect(expected.toString().includes('Hello')).toBeTruthy();
        });

        it('stringify', () => {
            const expected = JSON.parse(
                JSON.stringify(
                    new AggregateError([new ApplicationError({ message: 'User hello' }), new ApplicationError({ message: 'Age invalid' })])
                )
            );

            expect(expected).toEqual({
                code: 'AGGREGATION',
                message: 'Aggregate Error',
                errors: [
                    { message: 'User hello', code: 'UNKNOWN' },
                    { message: 'Age invalid', code: 'UNKNOWN' }
                ]
            });
        });
    });
});
