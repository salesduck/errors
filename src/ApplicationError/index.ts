import { AbstractError, ErrorOptions } from '@project/AbstractError';

export class ApplicationError extends AbstractError {
    constructor(options?: ErrorOptions) {
        super({ message: 'Application error', ...options });
    }
}
