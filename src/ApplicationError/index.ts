import { AbstractError, ErrorOptions } from '@project/AbstractError';

/**
 * Not specified error in application
 */
export class ApplicationError extends AbstractError {
    cause: Error;

    constructor(options?: ErrorOptions) {
        const { message = 'Application Error', code, cause, ...meta } = options || {};

        super({ message, code, cause });

        const entries = Object.entries(meta);

        // Append more context to stack
        if (entries.length) {
            this.stack = `${this.stack}\n    at code (${this.code})`;
            this.stack = `${this.stack}\n    at ${entries.map(([key, value]) => `${key} (${JSON.stringify(value)})`).join('\n    at ')}`;
        }
    }
}
