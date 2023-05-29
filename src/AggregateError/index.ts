import { AbstractError } from '@project/AbstractError';

export const ERROR_AGGREGATE = 'AGGREGATION';

export class AggregateError extends AbstractError {

    /**
     * Collection of errors
     */
    public readonly errors: Error[];

    constructor(errors: Error[] = [], message = 'Aggregate Error') {
        super({ message, code: ERROR_AGGREGATE });

        this.errors = errors;

        this.stack = `AggregateError: ${this.message}\n  ${this.errors.map(err => err.stack).join('\n  ')}`;
    }
}
