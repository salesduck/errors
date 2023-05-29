import { AbstractError, ErrorOptions } from '@project/AbstractError';

/**
 * Not specified error in application
 */
export class ApplicationError extends AbstractError {
    constructor(options?: ErrorOptions) {
        const { message = 'Application Error', code, cause, ...meta } = options || {};

        super({ message, code });

        const entries = Object.entries(meta);

        // Append more context to stack
        if (entries.length) {
            this.stack = `${this.stack}\n    by ${entries.map(([key, value]) => `${key} ${JSON.stringify(value)}`).join('\n    by ')}`;
        }

        this.stack = `${this.stack}\n    code ${this.code}`;

        if (cause) {
            this.stack = `${this.stack}\ncaused by ${cause.stack}`;
        }
    }
}
