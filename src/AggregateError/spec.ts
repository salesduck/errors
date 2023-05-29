import { ApplicationError } from '@project/ApplicationError';
import { AggregateError, ERROR_AGGREGATE } from '.';

describe('AggregateError', () => {
    describe('constructor ::', () => {
        it('defaults', () => {
            const expected = new AggregateError();

            expect(expected.errors).toEqual([]);
            expect(expected.message).toBe('Aggregate Error');
            expect(expected.code).toBe(ERROR_AGGREGATE);
        });

        it('add errors to collection', () => {
            const expected = new AggregateError(
                [new TypeError('Id can not be boolean'), new ApplicationError({ message: 'User not found' })],
                'Validation error'
            );

            expect(expected.message).toBe('Validation error');
            expect(expected.errors.length).toBe(2);
            expect(expected.stack.includes('Id can not be boolean')).toBeTruthy();
            expect(expected.stack.includes('User not found')).toBeTruthy();
        });

        it('stringify errors', () => {
            const str = JSON.stringify(
                new AggregateError([new ApplicationError({ message: 'User hello' }), new ApplicationError({ message: 'Age invalid' })])
            );

            const parsed: unknown = JSON.parse(str);

            expect(parsed).toEqual({
                code: 'AGGREGATION',
                message: 'Aggregate Error',
                errors: [{ message: 'User hello', code: 'UNKNOWN' }, { message: 'Age invalid', code: 'UNKNOWN' }, {}, {}]
            });
        });
    });
});
